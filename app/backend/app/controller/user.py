from flask import Blueprint, request, jsonify, make_response
from app.models import User, Doctor, db
from app.service.user_service import get_patients_for_doctor
from app.utils.jwt import check_authorization

user_bp = Blueprint("user", __name__, url_prefix="/users")


@user_bp.route("/doctor-patients/<int:doctor_id>", methods=["GET"])
@check_authorization(role="doctor")
def get_patients(doctor_id):
    patients, status_code = get_patients_for_doctor(doctor_id)
    return make_response(jsonify(patients), status_code)
