from flask import jsonify
from databaseController import DatabaseController

def index():
    usersModel = DatabaseController.Models.get("User")
    usersRaw = usersModel.query.all()
    users = []
    for user in usersRaw:
        users.append({
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
        })
    payload = {
        "data": users
    }
    return jsonify(payload)