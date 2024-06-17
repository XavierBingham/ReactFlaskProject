from wtforms import StringField, PasswordField, validators
from wtforms.validators import DataRequired, Email, Length
from flask_wtf import FlaskForm
from flask import jsonify, request
from databaseController import DatabaseController
import jwt
import datetime
from flask import current_app as app

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

AUTH_TOKEN_KEY = "auth_token"

def index():
    return jsonify({
        "data": "yes",
    }), 200

class CreateAccountForm(FlaskForm):
    first = firstValidator
    last = lastValidator
    email = emailValidator
    password = passwordValidator

def authenticate_session(user):
    currentTime = datetime.datetime.now()
    maxAge = datetime.timedelta(hours=1)
    expireTime = currentTime + maxAge
    try:
        auth_token = jwt.encode(
            {
                'sub': user.id,
                'iat': currentTime,
                'exp': expireTime,
                'displayName': user.firstName + " " + user.lastName[0],
            },
            key=app.config["SECRET_KEY"],
            algorithm='HS256',
        )
        return True, {
            "value": auth_token,
            "maxAge": maxAge,
            "expires": expireTime
        }
    except Exception as e:
        print("Auth Token Exception:", e)
        return False, "Error authenticating"

def create():
    
    #Get + verify form data
    form = CreateAccountForm(request.form)
    
    if not form.validate_on_submit():
        for field, errors in form.errors.items():
            for error in errors:
                print(f"Validation error in field '{field}': {error}")
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
    db = DatabaseController.Database
    db.session.add(user)
    db.session.commit()
    
    #Create authenticated session
    response = jsonify({"message": "Account successfully created"})
    auth_success, data = authenticate_session(user)
    if auth_success:
        response.set_cookie(AUTH_TOKEN_KEY, data["value"], data["maxAge"], data["expires"])

    return response, 200

class LoginAccountForm(FlaskForm):
    email = emailValidator
    password = passwordValidator

def login():

    #Get + verify form data
    form = LoginAccountForm(request.form)
    
    if not form.validate_on_submit():
        for field, errors in form.errors.items():
            for error in errors:
                print(f"Validation error in field '{field}': {error}")
        return jsonify({
            "error": "Invalid form data"
        }), 400

    #Retrieve user
    usersModel = DatabaseController.Models.get("User")
    existingUser = usersModel.query.filter_by(email=form.email.data).first()

    if existingUser == None:
        response = jsonify({"error":"Username or password is incorrect"})
        return response, 401

    #Verify password match
    bcrypt = DatabaseController.Bcrypt
    validPassword = bcrypt.check_password_hash(existingUser.password, form.password.data)

    if not validPassword:
        response = jsonify({"error":"Username or password is incorrect"})
        return response, 401

    #Create authenticated session
    auth_success, data = authenticate_session(existingUser)
    
    if auth_success:
        response = jsonify({"message":"Successfully logged in"})
        response.set_cookie(AUTH_TOKEN_KEY, data["value"], data["maxAge"], data["expires"])
        return response, 200
    else:
        response = jsonify({"error":"Could not authenticate user"})
        return response, 400