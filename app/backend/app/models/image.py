from database import db
from app.utils.json import json_serial_date
from sqlalchemy import DateTime
import datetime
import base64


class ImageUpload(db.Model):
    __tablename__ = "image_upload"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))

    patient = db.relationship("Patient", back_populates="images")

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    diagnostic = db.relationship(
        "Diagnostic", back_populates="image_upload", uselist=False
    )

    file_name = db.Column(db.String(1000))

    image = db.Column(db.LargeBinary)

    processed_images = db.relationship(
        "ProcessedImage", back_populates="original_upload"
    )

    def __init__(
        self,
        image=None,
        patient_id=None,
        date_created=None,
        file_name=None,
    ):
        self.image = image
        self.patient_id = patient_id
        self.date_created = date_created
        self.file_name = file_name

    def serialize(self):
        image_base64 = (
            base64.b64encode(self.image).decode("utf-8") if self.image else None
        )
        return {
            "id": self.id,
            "patientId": self.patient_id,
            "dateCreated": json_serial_date(self.date_created),
            "fileName": self.file_name,
            "image": image_base64,
        }


class ProcessedImage(db.Model):
    __tablename__ = "processed_image"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))

    patient = db.relationship("Patient", back_populates="processed_images")

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    file_name = db.Column(db.String(1000))

    image = db.Column(db.LargeBinary)

    original_upload_id = db.Column(db.Integer, db.ForeignKey("image_upload.id"))

    original_upload = db.relationship("ImageUpload")

    def __init__(
        self,
        image=None,
        patient_id=None,
        date_created=None,
        file_name=None,
        original_upload_id=None,
    ):
        self.image = image
        self.patient_id = patient_id
        self.date_created = date_created
        self.file_name = file_name
        self.original_upload_id = original_upload_id

    def serialize(self):
        image_base64 = (
            base64.b64encode(self.image).decode("utf-8") if self.image else None
        )
        return {
            "id": self.id,
            "patientId": self.patient_id,
            "dateCreated": json_serial_date(self.date_created),
            "fileName": self.file_name,
            "image": image_base64,
            "originalImageId": self.original_upload_id,
        }
