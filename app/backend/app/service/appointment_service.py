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
    return Appointment.query.get(appointment_id).serialize(), 200


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
    )
    db.session.add(appointment)
    db.session.commit()
    return appointment.serialize(), 201


def delete_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    db.session.delete(appointment)
    db.session.commit()


def update_appointment(new_appointment):
    appointment = Appointment.query.get(new_appointment.id)
    appointment.title = new_appointment.title
    appointment.requirements = new_appointment.description
    appointment.start_time = new_appointment.start_time
    appointment.end_time = new_appointment.end_time
    db.session.commit()
    return appointment, 201
