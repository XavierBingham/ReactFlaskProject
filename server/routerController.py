from routers.api import Router as ApiRouter
from routers.test import Router as TestRouter

from flask import Blueprint

class RouterController:

    Routers = {}

    @staticmethod
    def Init(App):
        
        print("Starting RouterController...")

        #Setup sub-directory routers
        RunOrder = [
            #/api
            {"Router": ApiRouter, "Parent": App},
            #/api/test
            {"Router": TestRouter, "Parent": ApiRouter},
        ]

        print("\t[[Loading Routers:")

        for RouterData in RunOrder:
            Router = RouterData.get("Router")
            print(f"\tLoading Router '{Router.RouteName}'.")
            if RouterController.Routers.get(Router.RouteName) is not None:
                print("\t[WARNING]: Router could not load.  RouteName already exists.")
                continue
            Blueprint = Router.Init(App, RouterController)
            RouterController.Routers[Router.RouteName] = Blueprint

        print("\n\t[[Registering Routers:")

        #Registering blueprints
        for RouterData in reversed(RunOrder):
            Router = RouterData.get("Router")
            Parent = RouterData.get("Parent")
            Blueprint = RouterController.Routers[Router.RouteName]
            if Parent == App:
                App.register_blueprint(Blueprint)
            else:
                ParentBlueprint = RouterController.Routers.get(Parent.RouteName)
                ParentBlueprint.register_blueprint(Blueprint)
            print(f"\tRouter '{Router.RouteName}' registered.")
        
        print("RouterController Successfully Started.\n")
            