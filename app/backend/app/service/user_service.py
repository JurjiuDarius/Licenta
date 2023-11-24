from app.models import User, Patient


def get_patients_for_doctor(doctor_id):
    patients = Patient.query.filter(Patient.doctors.any(doctor_id=doctor_id)).all()
    return patients, 200


def get_name_for_user(user_id):
    user = User.query.get(user_id)
    return user.name, 200
