import unittest
from flask import json
from run import create_app, db
from app.models import ImageUpload, Patient, Doctor
import base64


class TestImageUploadRoutes(unittest.TestCase):
    def setUp(self):
        self.app = create_app("config.TestConfig")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

            self.add_dummy_data()

    def add_dummy_data(self):
        test_patient = Patient(email="testpatient", password="testpassword")
        test_doctor = Doctor(email="testdoctor", password="testpassword")
        with open("./test/assets/test_image.png", "rb") as image_file:
            test_image = ImageUpload(
                file_name="testimage",
                patient_id=test_patient.id,
                image=image_file.read(),
            )

        db.session.add(test_patient)
        db.session.add(test_doctor)
        db.session.commit()
        patient = Patient.query.filter_by(email="testpatient").first()
        test_image.patient_id = patient.id
        db.session.add(test_image)
        db.session.commit()
        image = ImageUpload.query.filter_by(file_name="testimage").first()
        self.image_id = image.id
        self.patient_id = patient.id
        self.doctor_id = Doctor.query.filter_by(email="testdoctor").first().id

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_delete_image(self):
        response = self.client.delete(f"/images/{self.image_id}")
        self.assertEqual(response.status_code, 200)

    def test_get_original_images(self):
        response = self.client.get(f"/images/user-images/{self.patient_id}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["fileName"], "testimage")

    def test_get_diagnosed_images(self):
        response = self.client.get(f"/images/user-images-diagnosed/{self.patient_id}")
        self.assertEqual(response.status_code, 200)

    def test_get_all_images(self):
        response = self.client.get(f"/images/user-images-all/{self.patient_id}")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["fileName"], "testimage")

    def test_process_image(self):
        response = self.client.get(f"/images/process-image/{self.image_id}/test-algo")
        self.assertEqual(response.status_code, 200)
        process_response = self.client.get(f"/images/user-images-all/{self.patient_id}")
        self.assertEqual(process_response.status_code, 200)
        data = json.loads(process_response.get_data(as_text=True))
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]["fileName"], "testimage")
        self.assertEqual(data[1]["fileName"], "testimagetest-algo.png")

    def test_process_image_failure(self):
        response = self.client.get(f"/images/process-image/{self.image_id+1}/test-algo")
        self.assertEqual(response.status_code, 404)

    def test_processed_image_delete_failure(self):
        process_response = self.client.get(
            f"/images/process-image/{self.image_id}/test-algo"
        )
        self.assertEqual(process_response.status_code, 200)

        delete_response = self.client.delete(f"/images/{self.image_id}")
        self.assertEqual(delete_response.status_code, 403)

    def test_image_delete_failure(self):
        response = self.client.delete(f"/images/{self.image_id+1}")
        self.assertEqual(response.status_code, 404)


if __name__ == "__main__":
    unittest.main()
