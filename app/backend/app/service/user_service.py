from app.models import User, Appointment


def get_patients_for_doctor(doctor_id):
    patients = Patient.query.filter(Patient.doctors.any(doctor_id=doctor_id)).all()
    return patients, 200
