from functools import wraps
from flask import current_app as app, request, jsonify
import jwt

def authenticated(callback):

    @wraps(callback)
    def decoratedFunction(*args, **kwargs):
        
        auth_token = request.cookies.get("auth_token")
        if not auth_token:
            return jsonify({
                "error": "Invalid authentication token"
            }), 401

        try:
            decoded_auth_token = jwt.decode(
                auth_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
        except jwt.exceptions.ExpiredSignatureError as e:
            return jsonify({
                "error": "Could not authenticate user"
            }), 401
        except Exception as e:
            return jsonify({
                "error": "Authentication expired"
            }), 401
        
        return callback(*args, **kwargs)
    
    return decoratedFunction

def unauthenticated(callback):

    @wraps(callback)
    def decoratedFunction(*args, **kwargs):
        
        auth_token = request.cookies.get("auth_token")
        try:
            decoded_auth_token = jwt.decode(
                auth_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
            return jsonify({
                "error": "User is already authenticated"
            }), 401
        except Exception as e:
            return callback(*args, **kwargs)
    
    return decoratedFunction