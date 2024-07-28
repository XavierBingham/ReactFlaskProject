from flask import jsonify
from flask_wtf import csrf

def test():
    return jsonify({
        "message":"Success",
    }), 200

def get_csrf_token():
    csrf_token = csrf.generate_csrf()
    response = jsonify({
        "message":"Successfully generated CSRF token",
        "token":csrf_token
    })
    return response, 200