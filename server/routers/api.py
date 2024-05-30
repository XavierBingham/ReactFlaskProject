from flask import Blueprint
from controllers.api import get_csrf_token as _get_csrf_token

class Router:

    RouteName = "api"

    @staticmethod
    def Init(App, RouterController):
        
        RouterBlueprint = Blueprint(Router.RouteName, __name__, url_prefix=f"/{Router.RouteName}")

        @RouterBlueprint.route("get_csrf_token", methods=["GET"], strict_slashes=False)
        def get_csrf_token(): return _get_csrf_token()

        return RouterBlueprint