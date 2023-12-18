import hashlib
import unittest
from flask import Flask
from flask.testing import FlaskClient
from run import create_app, db
from app.models import Patient, Doctor


class TestAuthApi(unittest.TestCase):
    def setUp(self):
        self.app = create_app("config.TestConfig")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

            self.add_dummy_data()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def add_dummy_data(self):
        test_password = hashlib.sha256("testpassword".encode()).hexdigest()
        extra_password = hashlib.sha256("extrapassword".encode()).hexdigest()
        test_user = Patient(email="testuser", password=test_password)
        extra_user = Doctor(email="extrauser", password=extra_password)
        db.session.add(test_user)
        db.session.add(extra_user)
        db.session.commit()

    def test_login_endpoint(self):
        with self.app.app_context():
            test_user = {
                "email": "testuser",
                "password": "testpassword",
                "role": "patient",
            }
            response = self.client.post("/auth/login", json=test_user)

            self.assertEqual(response.status_code, 200)
            json_data = response.get_json()
            self.assertIn("token", json_data)

    def test_login_endpoint_wrong_password(self):
        with self.app.app_context():
            test_user = {
                "email": "testuser",
                "password": "wrongpassword",
                "role": "patient",
            }
            response = self.client.post("/auth/login", json=test_user)

            self.assertEqual(response.status_code, 401)
            json_data = response.get_json()
            self.assertIn("message", json_data)
            self.assertEqual(json_data["message"], "Incorrect password!")

    def test_sign_up_endpoint(self):
        with self.app.app_context():
            test_user = {
                "user": {"email": "testuser2", "password": "testpassword"},
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 201)
            json_data = response.get_json()
            self.assertIn("message", json_data)
            self.assertEqual(json_data["message"], "User created successfully!")

    def test_sign_up_endpoint_already_exists(self):
        with self.app.app_context():
            test_user = {
                "user": {"email": "testuser", "password": "testpassword"},
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 409)
            json_data = response.get_json()
            self.assertEqual(json_data["message"], "User already exists!")


if __name__ == "__main__":
    unittest.main()
