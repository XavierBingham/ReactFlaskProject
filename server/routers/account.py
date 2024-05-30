from flask import Blueprint
from controllers.account import (
    create as _create,
    login as _login,
)

class Router:

    RouteName = "account"

    @staticmethod
    def Init(App, RouterController):
        
        RouterBlueprint = Blueprint(Router.RouteName, __name__, url_prefix=f"/{Router.RouteName}")
        
        @RouterBlueprint.route("create", methods=["POST"], strict_slashes=False)
        def create(): return _create()

        @RouterBlueprint.route("login", methods=["POST"], strict_slashes=False)
        def login(): return _login()
        
        return RouterBlueprint