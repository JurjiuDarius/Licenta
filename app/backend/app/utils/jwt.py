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


def check_authorization(role):
    def check_role(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not request.headers.get("Authorization"):
                return jsonify({"message": "Token is missing!"}), 401
            token = request.headers.get("Authorization").split(" ")[1]
            if not token:
                return jsonify({"message": "Token is missing!"}), 401
            try:
                data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            except Exception as e:
                return jsonify({"message": "Token is invalid!"}), 401
            if (role != None) and (data["role"] != role):
                return (
                    jsonify({"message": "You do not have access to this resource!"}),
                    401,
                )

            return f(*args, **kwargs)

        return decorated

    return check_role


def create_token(user_id, user_role):
    payload = {"userId": user_id, "role": user_role}
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token
