from flask import jsonify, current_app as App
from flask_wtf import csrf

def test():
    App.logger.info("CALL - Test")
    return jsonify({
        "message":"Success",
    }), 200

def get_csrf_token():
    App.logger.info("CALL - Get CSRF Token")
    csrf_token = csrf.generate_csrf()
    response = jsonify({
        "message":"Successfully generated CSRF token",
        "token":csrf_token
    })
    return response, 200