from app.models import User, Patient, Doctor
from database import db


def get_patients_for_doctor(doctor_id):
    patients = Patient.query.filter(Patient.doctors.any(id=doctor_id)).all()
    return [patient.serialize() for patient in patients], 200


def add_patient_for_doctor(doctor_id, patient_email):
    doctor = Doctor.query.get(doctor_id)
    patient = Patient.query.filter_by(email=patient_email).first()
    if not patient:
        return {"message": "Patient not found!"}, 404
    doctor.patients.append(patient)
    db.session.commit()
    return patient.name, 201


def get_name_for_user(user_id):
    user = User.query.get(user_id)
    name = user.first_name + " " + user.last_name
    return name, 200
