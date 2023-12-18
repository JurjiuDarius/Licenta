import unittest
from flask import json
from run import create_app, db
from app.models import User, Doctor, Patient
from app.utils.jwt import create_token


class TestUserRoutes(unittest.TestCase):
    def setUp(self):
        self.app = create_app("config.TestConfig")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

            self.add_dummy_data()

    def add_dummy_data(self):
        test_doctor = Doctor(
            email="testdoctor",
            password="testpassword",
            first_name="John",
            last_name="Doe",
        )
        test_patient = Patient(
            email="testpatient",
            password="testpassword",
            first_name="John",
            last_name="Doe",
        )

        test_doctor.patients.append(test_patient)
        db.session.add(test_doctor)
        db.session.add(test_patient)
        db.session.commit()
        self.doctor_id = Doctor.query.filter_by(email="testdoctor").first().id
        self.patient_id = Patient.query.filter_by(email="testpatient").first().id

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_patients(self):
        response = self.client.get(f"/users/doctor-patients/{self.doctor_id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.get_data(as_text=True))), 1)

    def test_add_patient(self):
        with self.app.app_context():
            new_patient = Patient(email="newpatient", password="testpassword")
            db.session.add(new_patient)
            db.session.commit()
            new_patient_id = Patient.query.filter_by(email="newpatient").first().id

            response = self.client.post(
                f"/users/add-patient/{self.doctor_id}",
                json={
                    "email": "newpatient",
                },
            )
            self.assertEqual(response.status_code, 201)

    def test_get_user_name(self):
        response = self.client.get(f"/users/name/{self.patient_id}")
        self.assertEqual(response.status_code, 200)

    def test_modify_user(self):
        token = create_token(self.patient_id, "patient")

        response = self.client.put(
            "/users/modify",
            json={
                "id": self.patient_id,
                "firstName": "updated name",
                "lastName": "updated last name",
                "email": "updated email",
                "phone": "0734160081",
                "city": "updated city",
                "birthDate": "2003-01-01",
            },
            headers={"Authorization": f"Bearer {token}"},
        )
        self.assertEqual(response.status_code, 201)

    def test_get_user_by_id(self):
        token = create_token(self.patient_id, "patient")
        response = self.client.get(
            f"/users/{self.patient_id}", headers={"Authorization": f"Bearer {token}"}
        )
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
