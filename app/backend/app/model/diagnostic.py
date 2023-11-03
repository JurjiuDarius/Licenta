from database import db
import datetime
from sqlalchemy import DateTime


class ImageUpload(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))

    patient = db.relationship("Patient", back_populates="images")

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    diagnostics = db.relationship("Diagnostic", back_populates="image")

    is_processed = db.Column(db.Boolean, default=False)

    image = db.Column(db.LargeBinary)

    def __init__(self, patient_id=None, date_created=None, is_processed=None):
        self.patient_id = patient_id
        self.date_created = date_created
        self.is_processed = is_processed


class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))

    patient = db.relationship("Patient", back_populates="appointments")

    doctor_id = db.Column(db.Integer, db.ForeignKey("doctor.id"))

    doctor = db.relationship("Doctor", back_populates="appointments")

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    start_time = db.Column(DateTime)

    end_time = db.Column(DateTime)

    def __init__(
        self,
        patient_id=None,
        doctor_id=None,
        date_created=None,
        start_time=None,
        end_time=None,
    ):
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.date_created = date_created
        self.start_time = start_time
        self.end_time = end_time


class Diagnostic(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))

    patient = db.relationship("Patient", back_populates="diagnostics")

    doctor_id = db.Column(db.Integer, db.ForeignKey("doctor.id"))

    doctor = db.relationship("Doctor", back_populates="diagnostics")

    image = db.relationship("ImageUpload", back_populates="diagnostics")

    image_id = db.Column(db.Integer, db.ForeignKey("image_upload.id"))

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(
        self, patient_id=None, doctor_id=None, image_id=None, date_created=None
    ):
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.date_created = date_created
        self.image_id = image_id
