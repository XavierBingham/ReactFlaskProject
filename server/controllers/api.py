from flask import jsonify
from flask_wtf import csrf

def test():
    return jsonify({
        "message":"Success",
    }), 200

def get_csrf_token():
    response = jsonify({
        "message":"Successfully generated CSRF token",
    })
    csrf_token = csrf.generate_csrf()
    response.headers.set("X-CSRFToken", csrf_token)
    return response, 200