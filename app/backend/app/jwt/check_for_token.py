from functools import wraps
from flask import request, jsonify
import jwt
from dotenv import load_dotenv
import os
import jwt
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.environ.get("SECRET_JWT_KEY", "secret")


def check_authorization(f, role):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("Authorization")
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except Exception as e:
            return jsonify({"message": "Token is invalid!"}), 401
        if data["role"] != role:
            return jsonify({"message": "You do not have access to this resource!"}), 401

        return f(*args, **kwargs)

    return decorated


def create_token(user_id, user_role):
    payload = {"user_id": user_id, "role": user_role}
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token
