#Imports
from flask import Flask, request
from flask.logging import default_handler
from logging.handlers import RotatingFileHandler
import json
from routerController import RouterController
from databaseController import DatabaseController
import datetime, logging
from flask_cors import CORS

#Vars
Config = None

#Methods
def CreateApp():
    
    #Load server
    print("Starting Server...")
    App = Flask(__name__)
    CORS(App)
    
    #Load logger
    print("Loading Logger...")
    App.logger.removeHandler(default_handler)
    loggerFormatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(filename)s: %(lineno)d]')
    loggerFile = RotatingFileHandler("./logs/logger.log", maxBytes=16384, backupCount=20)
    App.logger.setLevel(logging.INFO)
    loggerFile.setFormatter(loggerFormatter)
    App.logger.addHandler(loggerFile)
    App.logger.info("Logger loaded.")
    
    #Load modules
    DatabaseController.Init(App)
    RouterController.Init(App)
    print("Server Successfully Started.")

    return App

#Init
App = CreateApp()
if __name__ == "__main__":
    App.run(
        debug=True,
        #host="0.0.0.0",
        #port = 80,
        host="localhost",
        port="5008",
    )