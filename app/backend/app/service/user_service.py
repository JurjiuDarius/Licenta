from app.models import User, Patient, Doctor
from app.utils.jwt import get_user_id_from_token, get_user_role_from_token
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


def modify_user(data, authorization):
    if "id" not in data:
        return {"message": "User not found"}, 404

    token = authorization.split(" ")[1]

    user_id = data["id"]
    token_id = get_user_id_from_token(token)
    role = get_user_role_from_token(token)
    if user_id != token_id:
        return {"message": "Unauthorized"}, 401

    if role == "patient":
        user = Patient.query.get(user_id)
    elif role == "doctor":
        user = Doctor.query.get(user_id)
        user.education = data["education"]
    if not user:
        return {"message": "User not found"}, 404
    try:
        user.first_name = data["firstName"]
        user.last_name = data["lastName"]
        user.email = data["email"]
        user.phone_number = data["phone"]
        user.city = data["city"]
        user.birth_date = data["birthDate"]
    except Exception:
        return {"message": "Invalid data"}, 400
    db.session.commit()
    return user.serialize(), 203


def get_user_by_id(user_id, authorization):
    token = authorization.split(" ")[1]
    token_id = get_user_id_from_token(token)
    if user_id != token_id:
        return {"message": "Unauthorized"}, 401
    role = get_user_role_from_token(token)

    if role == "patient":
        user = Patient.query.get(user_id)
    elif role == "doctor":
        user = Doctor.query.get(user_id)

    if not user:
        return {"message": "User not found"}, 404
    return user.serialize(), 200
