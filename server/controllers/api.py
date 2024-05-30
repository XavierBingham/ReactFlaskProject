from flask import jsonify
from flask_wtf import csrf

def get_csrf_token():
    response = jsonify({})
    response.headers.set("X-CSRFToken", csrf.generate_csrf())
    return response, 200