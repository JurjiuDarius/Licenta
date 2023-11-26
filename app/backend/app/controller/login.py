from flask import Blueprint, jsonify, request
from app.service.authentication_service import login, sign_up
from flask_cors import cross_origin

login_bp = Blueprint("login", __name__, url_prefix="/auth")


@cross_origin
@login_bp.route("/login", methods=["POST"])
def login_endpoint():
    email = request.json.get("email")
    password = request.json.get("password")
    role = request.json.get("role")
    response, status_code = login(email, password, role)
    return response, status_code


@login_bp.route("/signup", methods=["POST"])
def sign_up_endpoint():
    user = request.json.get("user")
    role = request.json.get("role")
    password = user.get("password")
    first_name = user.get("firstName")
    last_name = user.get("lastName")
    email = user.get("email")
    phone_number = user.get("phone")
    city = user.get("city")
    birth_date = user.get("birthDate")
    education = user.get("education")
    response, status_code = sign_up(
        email,
        first_name,
        last_name,
        password,
        phone_number,
        city,
        birth_date,
        education,
        role,
    )
    return jsonify(response), status_code
