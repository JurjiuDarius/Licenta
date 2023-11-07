from flask import Blueprint, jsonify, request
from app.utils.jwt import check_authorization
from ..models import Appointment
from database import db

appointment_bp = Blueprint("appointment", __name__, url_prefix="/appointments")


@appointment_bp.route("/", methods=["GET"])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([appointment.to_dict() for appointment in appointments])


@appointment_bp.route("/<int:id>", methods=["GET"])
def get_appointment(id):
    appointment = Appointment.query.get(id)
    if appointment:
        return jsonify(appointment.to_dict())
    else:
        return jsonify({"error": "Appointment not found"}), 404


@appointment_bp.route("/", methods=["POST"])
@check_authorization(role="doctor")
def create_appointment():
    data = request.json
    appointment = Appointment(**data)
    db.session.add(appointment)
    db.session.commit()
    return jsonify(appointment.to_dict()), 201


@appointment_bp.route("/<int:id>", methods=["PUT"])
@check_authorization(role="doctor")
def update_appointment(id):
    appointment = Appointment.query.get(id)
    if appointment:
        data = request.json
        for key, value in data.items():
            setattr(appointment, key, value)
        db.session.commit()
        return jsonify(appointment.to_dict())
    else:
        return jsonify({"error": "Appointment not found"}), 404


@appointment_bp.route("/<int:id>", methods=["DELETE"])
@check_authorization(role="doctor")
def delete_appointment(id):
    appointment = Appointment.query.get(id)
    if appointment:
        db.session.delete(appointment)
        db.session.commit()
        return "", 204
    else:
        return jsonify({"error": "Appointment not found"}), 404
