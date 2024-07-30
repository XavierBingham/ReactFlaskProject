from wtforms import StringField, PasswordField, validators
from wtforms.validators import DataRequired, Email, Length
from flask_wtf import FlaskForm
from flask import jsonify, request, current_app as App
from databaseController import DatabaseController
import jwt
import datetime
import os
from sqlalchemy.exc import IntegrityError

#Vars
firstValidator = StringField(
        "first",
        validators=[DataRequired(), Length(min=1, max=20)]
    )

lastValidator = StringField(
        "first",
        validators=[DataRequired(), Length(min=1, max=20)]
    )

emailValidator = StringField(
        "email",
        validators=[DataRequired(), Email()]
    )
passwordValidator = PasswordField(
        "password",
        validators=[DataRequired(), Length(min=6)]
    )

#Session management
def get_token(user, key, duration, tokenData):

    App.logger.info(f"Assigning token {key} for duration {duration}")
    currentTime = datetime.datetime.now(datetime.timezone.utc)
    try:
        tokenData['sub'] = user.user_id
        tokenData['iat'] = currentTime
        tokenData['exp'] = currentTime + duration
        token = jwt.encode(
            tokenData,
            key=App.config["SECRET_KEY"],
            algorithm='HS256',
        )
        return True, {
            "value": token,
            "maxAge": duration,
            "iat": currentTime,
            "exp": currentTime + duration,
        }
    except Exception as e:
        App.logger.error(f"Could not assign token {key}; Exception: {e}")
        return False, "Error authenticating"

def get_access_token(user):
    App.logger.info("Retrieving new access token")
    success, access_token = get_token(user, os.getenv("ACCESS_TOKEN_KEY"), datetime.timedelta(minutes=15), {
        'displayName': user.firstName + " " + user.lastName[0],
    })
    return success, access_token

def get_refresh_token(user):
    App.logger.info("Retrieving new refresh token")
    success, refresh_token = get_token(user, os.getenv("REFRESH_TOKEN_KEY"), datetime.timedelta(days=30), {})
    if success:
        try:

            App.logger.info("Saving Refresh Token to database")
            refreshTokensModel = DatabaseController.Models.get("RefreshToken")

            #Attempt saving refresh token to database
            dbToken = refreshTokensModel(
                user.user_id,
                refresh_token["value"],
                refresh_token["exp"],
                refresh_token["iat"],
            )

            #Add to database
            db = DatabaseController.Database
            db.session.add(dbToken)
            db.session.commit()
            
        except Exception as e:
            App.logger.error(f"Could not save Refesh Token to database; Exception: {e}")
            return False, "Refresh token could not be saved"

    return success, refresh_token

def apply_token(response, key, tokenData):
    App.logger.info(f"Applying token {key}")
    response.set_cookie(
            key,
            tokenData["value"],
            tokenData["maxAge"],
            tokenData["exp"],
            httponly=True
        )

def authenticate(user, successMessage, failMessage, doErrorMessage):

    App.logger.info(f"Authenticating session for user`{user}`")

    #Create authenticated session
    refresh_auth_success, refresh_data = get_refresh_token(user)
    access_auth_success, access_data = None, None
    if refresh_auth_success:
        access_auth_success, access_data = get_access_token(user)

    response = None
    if access_auth_success:
        #If tokens applied, update cookies
        response = jsonify({"message": successMessage})
        apply_token(response, os.getenv("ACCESS_TOKEN_KEY"), access_data)
        apply_token(response, os.getenv("REFRESH_TOKEN_KEY"), refresh_data)
        response.headers.set(os.getenv("ACCESS_TOKEN_KEY"), access_data["value"])
        App.logger.info("Session successfully authenticated")
    else:
        #If tokens could not be applied, request a redirect to the login page
        if doErrorMessage:
            response = jsonify({
                "error": failMessage,
                "redirect": "/login",
            })
        else:
            response = jsonify({
                "message": failMessage,
                "redirect": "/login",
            })
        #Apply refresh token if that was successfully made
        if refresh_auth_success:
            apply_token(response, os.getenv("REFRESH_TOKEN_KEY"), refresh_data)
            App.logger.error("Session could not be authenticated; new refresh token applied")
        else:
            App.logger.error("Session could not be authenticated")

    return response

#Index
def index():
    App.logger.info("CALL - Account Index")
    return jsonify({
        "data": "yes",
    }), 200

#Access token refreshing
def refresh_access():
    
    App.logger.info("Refreshing access token")

    refresh_token = request.cookies.get(os.getenv("REFRESH_TOKEN_KEY"))
    user = None

    try:
        
        #Retrieve user
        decoded_refresh_token = jwt.decode(
            refresh_token,
            key=App.config["SECRET_KEY"],
            algorithms=['HS256'],
        )
        
        usersModel = DatabaseController.Models.get("User")
        user = usersModel.query.filter_by(user_id=decoded_refresh_token["sub"]).first()
        
        if not user:
            raise Exception("User does not exist any longer, user_id: " + decoded_refresh_token.sub)

    except Exception as e:
        App.logger.error(f"Could not refresh access token: {e}")
        return jsonify({
            "error": "Could not authenticate. Please login again.",
            "redirect": "/login",
        }), 400

    response = authenticate(
        user,
        successMessage = "Successfully refreshed authentication.",
        failMessage = "Could not refresh authentication.",
        doErrorMessage = True,
    )
    
    return response, 200

#Account creation
class CreateAccountForm(FlaskForm):
    first = firstValidator
    last = lastValidator
    email = emailValidator
    password = passwordValidator

def create():
    
    App.logger.info("CALL - Create Account")

    #Get + verify form data
    form = CreateAccountForm(request.form)
    
    if not form.validate_on_submit():
        App.logger.error("Create account validation unsuccessful:")
        for field, errors in form.errors.items():
            for error in errors:
                App.logger.error(f"Validation error in field '{field}': {error}")
        return jsonify({
            "error": "Invalid form data"
        }), 400
    
    #Modify form data
    bcrypt = DatabaseController.Bcrypt
    password = bcrypt.generate_password_hash(form.password.data)
    password = password.decode("utf-8")

    #Create new account
    usersModel = DatabaseController.Models.get("User")
    user = usersModel(
        firstName = form.first.data,
        lastName = form.last.data,
        email = form.email.data,
        password = password,
    )
    
    #Add to database
    try:
        App.logger.info("Saving user to database")
        db = DatabaseController.Database
        db.session.add(user)
        db.session.commit()
        
    except IntegrityError as e:
        App.logger.error(f"Account could not be created; IntegrityError: {e}")
        return jsonify({
            "error": "Email is already in use."
        }), 409
    
    except Exception as e:
        App.logger.error(f"Account could not be created; Exception: {e}")
        return jsonify({
            "error": "Account could not be created, please try again."
        }), 500
    
    #Authenticate user
    response = authenticate(
        user = user,
        successMessage = "Account successfully created!",
        failMessage = "Account successfully created!",
        doErrorMessage = False,
    )
    return response, 200

#Account login
class LoginAccountForm(FlaskForm):
    email = emailValidator
    password = passwordValidator

def login():

    App.logger.info("CALL - Login to Account")

    #Get + verify form data
    form = LoginAccountForm(request.form)
    
    if not form.validate_on_submit():
        App.logger.error("Login validation unsuccessful:")
        for field, errors in form.errors.items():
            for error in errors:
                App.logger.error(f"Login validation error in field '{field}': {error}")
        return jsonify({
            "error": "Invalid form data"
        }), 400

    #Retrieve user
    usersModel = DatabaseController.Models.get("User")
    existingUser = usersModel.query.filter_by(email=form.email.data).first()

    if existingUser == None:
        App.logger.error(f"Account does not exist with email '{form.email.data}'")
        response = jsonify({"error":"Username or password is incorrect"})
        return response, 401

    #Verify password match
    bcrypt = DatabaseController.Bcrypt
    validPassword = bcrypt.check_password_hash(existingUser.password, form.password.data)

    if not validPassword:
        App.logger.error(f"Password does not match")
        response = jsonify({"error":"Username or password is incorrect"})
        return response, 401

    #Authenticate user
    response = authenticate(
        user = existingUser,
        successMessage = "Successfully logged in!",
        failMessage = "Could not authenticate. Please login again.",
        doErrorMessage = True,
    )
    return response