from flask import Blueprint, request, jsonify, make_response
from app.models import User, Doctor, db
from app.service import user_service
from app.utils.jwt import check_authorization

user_bp = Blueprint("user", __name__, url_prefix="/users")


@user_bp.route("/doctor-patients/<int:doctor_id>", methods=["GET"])
@check_authorization(role="doctor")
def get_patients(doctor_id):
    patients, status_code = user_service.get_patients_for_doctor(doctor_id)
    return make_response(jsonify(patients), status_code)


@user_bp.route("/add-patient/<int:doctor_id>", methods=["POST"])
@check_authorization(role="doctor")
def add_patient(doctor_id):
    patient_email = request.json.get("email")
    name, status_code = user_service.add_patient_for_doctor(doctor_id, patient_email)
    return make_response(jsonify(name), status_code)


@user_bp.route("/name/<int:user_id>", methods=["GET"])
@check_authorization(role="patient")
def get_user_name(user_id):
    name, status_code = user_service.get_name_for_user(user_id)
    return make_response(jsonify(name), status_code)


@user_bp.route("/modify", methods=["PUT"])
@check_authorization(role=["patient", "doctor"])
def modify_user():
    data = request.json
    authorization = request.headers.get("Authorization")
    name, status_code = user_service.modify_user(data, authorization)
    return make_response(jsonify(name), status_code)


@user_bp.route("/<int:user_id>", methods=["GET"])
@check_authorization(role={"patient", "doctor"})
def get_user_by_id(user_id):
    authorization = request.headers.get("Authorization")
    name, status_code = user_service.get_user_by_id(user_id, authorization)
    return make_response(jsonify(name), status_code)
