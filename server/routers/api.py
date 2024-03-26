from flask import Blueprint
from controllers.api import index as _index

class Router:

    RouteName = "api"

    @staticmethod
    def Init(App, RouterController):
        
        RouterBlueprint = Blueprint(Router.RouteName, __name__, url_prefix=f"/{Router.RouteName}")

        @RouterBlueprint.route("/", methods=["GET"], strict_slashes=False)
        def index(): return _index()
        
        return RouterBlueprint