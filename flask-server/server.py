#Imports
from flask import Flask
import json

#Vars
Config = None
ActiveServer = None

#Classes
def Server():
    def __init__(self):
        pass

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