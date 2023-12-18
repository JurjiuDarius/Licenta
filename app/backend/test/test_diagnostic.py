import unittest
from flask import json
from run import create_app, db
from app.models import Diagnostic, ImageUpload, Doctor


class TestDiagnosticRoutes(unittest.TestCase):
    def setUp(self):
        self.app = create_app("config.TestConfig")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

            self.add_dummy_data()

    def add_dummy_data(self):
        test_image = ImageUpload(file_name="testimage")
        test_doctor = Doctor(email="testdoctor", password="testpassword")
        test_diagnostic = Diagnostic(
            text="test diagnostic",
            image_id=test_image.id,
            doctor_id=test_doctor.id,
        )
        db.session.add(test_image)
        db.session.add(test_doctor)
        db.session.commit()
        image = ImageUpload.query.filter_by(file_name="testimage").first()
        doctor = Doctor.query.filter_by(email="testdoctor").first()
        test_diagnostic.image_id = image.id
        test_diagnostic.doctor_id = doctor.id
        db.session.add(test_diagnostic)
        db.session.commit()
        diagnostic = Diagnostic.query.filter_by(text="test diagnostic").first()
        self.diagnostic_id = diagnostic.id
        self.image_id = image.id
        self.doctor_id = doctor.id

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_diagnostic(self):
        response = self.client.get(f"/diagnostic/{self.diagnostic_id}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data["text"], "test diagnostic")

    def test_create_diagnostic(self):
        response = self.client.post(
            "/diagnostic",
            json={
                "text": "new diagnostic",
                "image_id": self.image_id,
                "doctor_id": self.doctor_id,
            },
        )
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data["text"], "new diagnostic")

    def test_update_diagnostic(self):
        response = self.client.put(
            "/diagnostic",
            json={
                "id": self.diagnostic_id,
                "text": "updated diagnostic",
            },
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data["text"], "updated diagnostic")

    def test_update_diagnostic_failure(self):
        response = self.client.put(
            "/diagnostic",
            json={
                "id": self.diagnostic_id + 1,
                "text": "updated diagnostic",
            },
        )
        self.assertEqual(response.status_code, 404)

    def test_delete_diagnostic(self):
        response = self.client.delete(f"/diagnostic/{self.diagnostic_id}")
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
