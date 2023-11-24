from flask import Blueprint, jsonify, request, make_response
from app.utils.jwt import check_authorization
from ..models import Appointment
from database import db
from flask import Blueprint, jsonify, request
from app.utils.jwt import check_authorization
from app.service.appointment_service import (
    get_all_appointments_for_patient,
    get_all_appointments_for_doctor,
    get_appointment_by_id,
    create_appointment,
    update_appointment,
    delete_appointment,
)

appointment_bp = Blueprint("appointment", __name__, url_prefix="/appointments")


@appointment_bp.route("/patient/<int:userId>", methods=["GET"])
@check_authorization(role="patient")
def get_appointments_patient(userId):
    appointments, status_code = get_all_appointments_for_patient(userId)
    return make_response(
        jsonify([appointment for appointment in appointments]), status_code
    )


@appointment_bp.route("/doctor/<int:userId>", methods=["GET"])
@check_authorization(role="doctor")
def get_appointments_doctor(userId):
    appointments, status_code = get_all_appointments_for_doctor(userId)
    return make_response(
        jsonify([appointment for appointment in appointments]), status_code
    )


@appointment_bp.route("/<int:id>", methods=["GET"])
@check_authorization(role=None)
def get_appointment(id):
    response, status_code = get_appointment_by_id(id)
    return make_response(jsonify(response), status_code)


@appointment_bp.route("", methods=["POST"])
@check_authorization(role="doctor")
def create_appointment():
    data = request.json
    response, status_code = create_appointment(data)
    return make_response(jsonify(response), status_code)


@appointment_bp.route("", methods=["PUT"])
@check_authorization(role="doctor")
def update_appointment():
    appointment = get_appointment_by_id(id)
    response, status_code = update_appointment(appointment)
    return make_response(jsonify(response), status_code)


@appointment_bp.route("/<int:id>", methods=["DELETE"])
@check_authorization(role="doctor")
def delete_appointment(id):
    delete_appointment(id)
    return make_response(jsonify("Delete successful"), 202)
