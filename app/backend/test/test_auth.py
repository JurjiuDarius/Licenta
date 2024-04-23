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
        test_user = Patient(email="testuser@yahoo.com", password=test_password)
        extra_user = Doctor(email="extrauser@yahoo.com", password=extra_password)
        db.session.add(test_user)
        db.session.add(extra_user)
        db.session.commit()

    def test_login_endpoint(self):
        with self.app.app_context():
            test_user = {
                "email": "testuser@yahoo.com",
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
                "email": "testuser@yahoo.com",
                "password": "wrongpassword",
                "role": "patient",
            }
            response = self.client.post("/auth/login", json=test_user)

            self.assertEqual(response.status_code, 401)
            json_data = response.get_json()
            self.assertIn("message", json_data)
            self.assertEqual(json_data["message"], "Incorrect password!")

    def test_sign_up_endpoint_already_exists(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2001-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 409)
            json_data = response.get_json()
            self.assertEqual(json_data["message"], "User already exists!")

    def test_sign_up_endpoint_ecp_proper(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2001-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 201)

    def test_sign_up_endpoint_ecp_no_dot(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoocom",
                    "password": "testpassword",
                    "birthDate": "2001-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 400)

    def test_sign_up_endpoint_ecp_no_at(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2001-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 400)

    def test_sign_up_endpoint_proper_bva(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2001-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 201)
            json_data = response.get_json()
            self.assertIn("message", json_data)
            self.assertEqual(json_data["message"], "User created successfully!")

    def test_sign_up_endpoint_lower_ecp(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "1898-12-31",
                },
                "role": "patient",
            }
            self.assertEqual(response.status_code, 400)
            response = self.client.post("/auth/signup", json=test_user)

    def test_sign_up_endpoint_below_lower_ecp(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "1990-01-01",
                },
                "role": "patient",
            }
            self.assertEqual(response.status_code, 400)
            response = self.client.post("/auth/signup", json=test_user)

    def test_sign_up_endpoint_upper(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2005-12-31",
                },
                "role": "patient",
            }
            self.assertEqual(response.status_code, 400)
            response = self.client.post("/auth/signup", json=test_user)

    def test_sign_up_endpoint_below_lower_bva(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "1899-12-31",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 400)

    def test_sign_up_endpoint_lower_bva(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "1900-01-01",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 201)

    def test_sign_up_endpoint_above_lower_bva(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "1900-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 201)

    def test_sign_up_endpoint_below_upper_bva(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2002-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 201)

    def test_sign_up_endpoint_upper_bva(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2003-01-01",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 201)

    def test_sign_up_endpoint_above_upper_bva(self):
        with self.app.app_context():
            test_user = {
                "user": {
                    "email": "testuser2@yahoo.com",
                    "password": "testpassword",
                    "birthDate": "2003-01-02",
                },
                "role": "patient",
            }

            response = self.client.post("/auth/signup", json=test_user)

            self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
