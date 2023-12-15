from flask import Blueprint, jsonify, request
from app.service import authentication_service
from flask_cors import cross_origin

login_bp = Blueprint("login", __name__, url_prefix="/auth")


@cross_origin
@login_bp.route("/login", methods=["POST"])
def login_endpoint():
    data = request.json
    response, status_code = authentication_service.login(data)
    return response, status_code


@login_bp.route("/signup", methods=["POST"])
def sign_up_endpoint():
    data = request.json
    response, status_code = authentication_service.sign_up(data)
    return jsonify(response), status_code
