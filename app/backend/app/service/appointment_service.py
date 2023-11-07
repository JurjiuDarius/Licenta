from ..models.diagnostic import Appointment
from database import db


def get_all_appointments():
    """
    Returns a list of all appointments.
    """
    return Appointment.query.all()


def add_appointment(appointment):
    """
    Adds a new appointment to the database.
    """
    db.session.add(appointment)
    db.session.commit()
    return appointment


def delete_appointment(appointment_id):
    """
    Deletes an appointment from the database.
    """
    appointment = Appointment.query.get(appointment_id)
    db.session.delete(appointment)
    db.session.commit()


def edit_appointment(appointment_id, new_appointment):
    """
    Edits an existing appointment in the database.
    """
    appointment = Appointment.query.get(appointment_id)
    appointment.title = new_appointment.title
    appointment.requirements = new_appointment.description
    appointment.start_time = new_appointment.start_time
    appointment.end_time = new_appointment.end_time
    db.session.commit()
    return appointment
