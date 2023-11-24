from ..models.diagnostic import Appointment
from database import db


def get_all_appointments_for_patient(patient_id):
    return Appointment.query.where(Appointment.patient_id == patient_id).all(), 200


def get_all_appointments_for_doctor(doctor_id):
    return Appointment.query.where(Appointment.doctor_id == doctor_id).all(), 200


def get_appointment_by_id(appointment_id):
    return Appointment.query.get(appointment_id), 200


def create_appointment(appointment):
    db.session.add(appointment)
    db.session.commit()
    return appointment, 201


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
