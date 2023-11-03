from flask import Blueprint, jsonify, request
from app.service.authentication_service import login, sign_in

login_bp = Blueprint("login", __name__, url_prefix="/login")


@login_bp.route("/login", methods=["POST"])
def login_endpoint():
    email = request.json.get("email")
    password = request.json.get("password")
    response, status_code = login(email, password)
    return jsonify(response), status_code


@login_bp.route("/sign-in", methods=["POST"])
def sign_in_endpoint():
    password = request.json.get("password")
    email = request.json.get("email")
    name = request.json.get("name")
    phone_number = request.json.get("phone_number")
    city = request.json.get("city")
    birth_date = request.json.get("birth_date")
    response, status_code = sign_in(
        email, password, name, phone_number, city, birth_date
    )
    return jsonify(response), status_code
