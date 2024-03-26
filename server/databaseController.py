#Imports
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from models.user import RegisterModel as RegisterUserModel

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
        DatabaseController.Database = SQLAlchemy(App)

        #Load models
        ModelLoadOrder = [
            RegisterUserModel,
        ]
        for RegisterModel in ModelLoadOrder:
            Model, QueryName = RegisterModel(DatabaseController.Database)
            DatabaseController.Models[QueryName] = Model
            print(f"\tModel '{QueryName}' loaded.")

        print("DatabaseController Successfully Started.\n")