from wtforms import StringField, PasswordField, validators
from wtforms.validators import DataRequired, Email, Length
from flask_wtf import FlaskForm
from flask import jsonify, request
from databaseController import DatabaseController

def index():
    return jsonify({
        "data": "yes",
    }), 200

class CreateAccountForm(FlaskForm):
    first = StringField(
        "first",
        validators=[DataRequired(), Length(min=1, max=20)]
    )
    last= StringField(
        "last",
        validators=[DataRequired(), Length(min=1, max=20)]
    )
    email = StringField(
        "email",
        validators=[DataRequired(), Email()]
    )
    password = PasswordField(
        "password",
        validators=[DataRequired(), Length(min=6)]
    )

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
    password = form.password.data.encode("utf-8")
    bcrypt = DatabaseController.Bcrypt
    password = bcrypt.generate_password_hash(form.password.data)

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
    
    return jsonify({
        "data": "yes",
    }), 200

def login():
    form = {
        'email': request.form.get("email"),
        'password': request.form.get("password"),
    }
    print(form['email'], form['password'])
    return jsonify({
        "data": "yes",
    }), 200