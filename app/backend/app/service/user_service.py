from app.models import User, Patient, Doctor
from database import db


def get_patients_for_doctor(doctor_id):
    patients = Patient.query.filter(Patient.doctors.any(id=doctor_id)).all()
    return [patient.serialize() for patient in patients], 200


def add_patient_for_doctor(doctor_id, patient_email):
    doctor = Doctor.query.get(doctor_id)
    patient = Patient.query.filter_by(email=patient_email).first()
    doctor.patients.append(patient)
    db.session.commit()


def get_name_for_user(user_id):
    user = User.query.get(user_id)
    return user.name, 200
