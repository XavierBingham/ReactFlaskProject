#Imports
from flask import Flask, request
import json
from routerController import RouterController
from databaseController import DatabaseController

#Vars
Config = None
ActiveServer = None

#Classes
class Server():

    #Fields
    App = None

    #Methods
    def __init__(self):

        print("Starting Server...")
        self.App = Flask(__name__)
        DatabaseController.Init(self.App)
        RouterController.Init(self.App)
        print("Server Successfully Started.")
        self.App.run(debug=True)

#Methods
def Init():
    
    #Load config
    with open("./config.json") as config:
        Config = json.load(config)
    
    #Load server
    ActiveServer = Server()

#Init
if __name__ == "__main__":
    Init()