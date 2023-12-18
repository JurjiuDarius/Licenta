import unittest
from flask import json
from run import create_app, db
from app.models import Appointment, Patient, Doctor


class TestAppointmentRoutes(unittest.TestCase):
    def setUp(self):
        self.app = create_app("config.TestConfig")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

            self.add_dummy_data()

    def add_dummy_data(self):
        test_patient = Patient(email="testpatient", password="testpassword")
        test_doctor = Doctor(email="testdoctor", password="testpassword")
        test_appointment = Appointment(
            requirements="test requirements",
            date="2022-01-01",
            start_time="10:00:00",
            end_time="11:00:00",
        )
        db.session.add(test_patient)
        db.session.add(test_doctor)
        db.session.commit()
        patient = Patient.query.filter_by(email="testpatient").first()
        doctor = Doctor.query.filter_by(email="testdoctor").first()
        test_appointment.patient_id = patient.id
        test_appointment.doctor_id = doctor.id
        db.session.add(test_appointment)
        db.session.commit()
        appointment = Appointment.query.filter_by(
            requirements="test requirements"
        ).first()
        self.appointment_id = appointment.id
        self.patient_id = patient.id
        self.doctor_id = doctor.id

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_appointments_patient(self):
        with self.app.app_context():
            response = self.client.get(f"/appointments/patient/{self.patient_id}")
            self.assertEqual(response.status_code, 200)

    def test_get_appointments_doctor(self):
        with self.app.app_context():
            response = self.client.get(f"/appointments/doctor/{self.doctor_id}")
            self.assertEqual(response.status_code, 200)

    def test_get_appointment(self):
        with self.app.app_context():
            response = self.client.get(f"/appointments/{self.appointment_id}")
            self.assertEqual(response.status_code, 200)

    def test_create_appointment(self):
        with self.app.app_context():
            data = {
                "patientId": self.patient_id,
                "doctorId": self.doctor_id,
                "requirements": "test requirements",
                "address": "test address",
                "date": "2022-01-02",
                "startTime": "11:00:00",
                "endTime": "12:00:00",
                "requiresUpload": False,
            }
            response = self.client.post(
                "/appointments", data=json.dumps(data), content_type="application/json"
            )
            self.assertEqual(response.status_code, 201)


if __name__ == "__main__":
    unittest.main()
