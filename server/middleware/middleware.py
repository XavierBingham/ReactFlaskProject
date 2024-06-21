from functools import wraps
from flask import current_app as app, request, jsonify
import jwt
import os

def authenticated(callback):

    @wraps(callback)
    def decoratedFunction(*args, **kwargs):
        
        access_token = request.cookies.get(os.getenv("ACCESS_TOKEN_KEY"))
        refresh_token = request.cookies.get(os.getenv("REFRESH_TOKEN_KEY"))
    
        if not access_token or not refresh_token:
            return jsonify({
                "error": "Could not authenticate. Please login again.",
                "redirect": "/login",
            }), 401

        try:
            decoded_auth_token = jwt.decode(
                access_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
            decoded_auth_token = jwt.decode(
                refresh_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
        except jwt.exceptions.ExpiredSignatureError as e:
            return jsonify({
                "error": "Session expired. Please login again.",
                "redirect": "/login",
            }), 401
        except Exception as e:
            return jsonify({
                "error": "Could not authenticate. Please login again.",
                "redirect": "/login",
            }), 401
        
        return callback(*args, **kwargs)
    
    return decoratedFunction

def unauthenticated(callback):

    @wraps(callback)
    def decoratedFunction(*args, **kwargs):
        
        access_token = request.cookies.get(os.getenv("ACCESS_TOKEN_KEY"))
        refresh_token = request.cookies.get(os.getenv("REFRESH_TOKEN_KEY"))
        try:
            decoded_access_token = jwt.decode(
                access_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
            decoded_refresh_token = jwt.decode(
                refresh_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
            return jsonify({
                "message": "User is already authenticated."
            }), 401
        except Exception as e:
            return callback(*args, **kwargs)
    
    return decoratedFunction

def refresh_token_authenticated(callback):

    @wraps(callback)
    def decoratedFunction(*args, **kwargs):
        
        refresh_token = request.cookies.get(os.getenv("REFRESH_TOKEN_KEY"))
        try:
            decoded_refresh_token = jwt.decode(
                refresh_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
            return callback(*args, **kwargs)
        except Exception as e:
            return jsonify({
                "error": "Session expired. Please login again.",
                "redirect": "/login",
            }), 401

    return decoratedFunction

def access_token_unauthenticated(callback):

    @wraps(callback)
    def decoratedFunction(*args, **kwargs):
        
        access_token = request.cookies.get(os.getenv("ACCESS_TOKEN_KEY"))
        try:
            decoded_access_token = jwt.decode(
                access_token,
                key=app.config["SECRET_KEY"],
                algorithms=['HS256'],
            )
            return jsonify({
                "message": "User is already authenticated"
            }), 401
        except Exception as e:
            return callback(*args, **kwargs)
    
    return decoratedFunction