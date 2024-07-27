#Imports
from flask import Flask, request
import json
from routerController import RouterController
from databaseController import DatabaseController
import datetime
from flask_cors import CORS

#Vars
Config = None

#Methods
def CreateApp():
    
    #Load config
    global Config
    with open("./config.json") as config:
        Config = json.load(config)
    
    #Load server
    print("Starting Server...")
    App = Flask(__name__)
    CORS(App)
    
    DatabaseController.Init(App)
    RouterController.Init(App)
    print("Server Successfully Started.")

    return App

#Init
App = CreateApp()
if __name__ == "__main__":
    App.run(
        debug=True,
        host="0.0.0.0",
        port = 80,
    )