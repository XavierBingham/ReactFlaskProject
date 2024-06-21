#Imports
import os
import secrets
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from models.user import RegisterModel as RegisterUserModel
from models.refreshToken import RegisterModel as RegisterRefreshTokenModel
from flask_bcrypt import Bcrypt
from flask_wtf import CSRFProtect

#Classes
class DatabaseController:

    Models = {}
    Database = None

    @staticmethod
    def Init(App):
        
        print("Starting DatabaseController...")
        
        load_dotenv()

        #Set App URI
        URI = os.getenv("DATABASE_URI")
        App.config["SQLALCHEMY_DATABASE_URI"] = URI
        App.config["SECRET_KEY"] = secrets.token_hex(32)
        DatabaseController.Database = SQLAlchemy(App)
        DatabaseController.Bcrypt = Bcrypt(App)
        DatabaseController.CSRF = CSRFProtect(App)

        #Load models
        ModelLoadOrder = [
            RegisterUserModel,
            RegisterRefreshTokenModel,
        ]
        for RegisterModel in ModelLoadOrder:
            Model, QueryName = RegisterModel(DatabaseController.Database)
            DatabaseController.Models[QueryName] = Model
            print(f"\tModel '{QueryName}' loaded.")

        print("DatabaseController Successfully Started.\n")