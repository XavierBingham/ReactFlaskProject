from flask import Blueprint
from controllers.account import (
    create as _create,
    login as _login,
    refresh_access as _refresh_access,
)
from middleware.middleware import (
    authenticated,
    unauthenticated,
    access_token_unauthenticated,
    refresh_token_authenticated,
)

class Router:

    RouteName = "account"

    @staticmethod
    def Init(App, RouterController):
        
        RouterBlueprint = Blueprint(Router.RouteName, __name__, url_prefix=f"/{Router.RouteName}")
        
        @RouterBlueprint.route("create", methods=["POST"], strict_slashes=False)
        @unauthenticated
        def create(): return _create()

        @RouterBlueprint.route("login", methods=["POST"], strict_slashes=False)
        @unauthenticated
        def login(): return _login()

        @RouterBlueprint.route("refresh_access", methods=["GET"], strict_slashes=False)
        @refresh_token_authenticated
        @access_token_unauthenticated
        def refresh_access(): return _refresh_access()
        
        return RouterBlueprint