from ..models.diagnostic import Appointment
from ..models.user import Patient, Doctor
from database import db


def get_all_appointments_for_patient(patient_id):
    return [
        appointment.serialize()
        for appointment in Appointment.query.where(
            Appointment.patient_id == patient_id
        ).all()
    ], 200


def get_all_appointments_for_doctor(doctor_id):
    return [
        appointment.serialize()
        for appointment in Appointment.query.where(
            Appointment.doctor_id == doctor_id
        ).all()
    ], 200


def get_appointment_by_id(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return {"message": "Appointment not found!"}, 404
    return appointment.serialize(), 200


def create_appointment(data):
    if data["endTime"] > data["startTime"]:
        return {"message": "End time must be after start time"}, 400

    appointment = Appointment(
        requirements=data["requirements"],
        address=data["address"],
        date=data["date"],
        start_time=data["startTime"],
        end_time=data["endTime"],
        patient_id=data["patientId"],
        doctor_id=data["doctorId"],
        requires_upload=data["requiresUpload"],
    )
    db.session.add(appointment)
    db.session.commit()
    return appointment.serialize(), 201


def delete_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    db.session.delete(appointment)
    db.session.commit()


def update_appointment(id, data):
    appointment = Appointment.query.get(id)
    appointment.requirements = data["requirements"]
    appointment.address = data["address"]
    appointment.date = data["date"]
    appointment.start_time = data["startTime"]
    appointment.end_time = data["endTime"]
    appointment.patient_id = data["patientId"]
    appointment.doctor_id = data["doctorId"]
    appointment.requires_upload = data["requiresUpload"]
    db.session.commit()
    return appointment.serialize(), 201
