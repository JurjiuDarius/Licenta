from database import db
import datetime
from app.utils.json import json_serial_date
from sqlalchemy import DateTime, Date, Time


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

    requirements = db.Column(db.String(1000))

    address = db.Column(db.String(200))

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))

    patient = db.relationship("Patient", back_populates="appointments")

    doctor_id = db.Column(db.Integer, db.ForeignKey("doctor.id"))

    doctor = db.relationship("Doctor", back_populates="appointments")

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    date = db.Column(Date)

    start_time = db.Column(Time)

    end_time = db.Column(Time)

    requires_upload = db.Column(db.Boolean, default=False)

    def __init__(
        self,
        address=None,
        requirements=None,
        patient_id=None,
        doctor_id=None,
        date=None,
        start_time=None,
        end_time=None,
    ):
        self.address = address
        self.requirements = requirements
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.date = date
        self.start_time = start_time
        self.end_time = end_time

    def serialize(self):
        return {
            "id": self.id,
            "address": self.address,
            "requirements": self.requirements,
            "patientId": self.patient_id,
            "doctorId": self.doctor_id,
            "date": json_serial_date(self.date),
            "startTime": json_serial_date(self.start_time),
            "endTime": json_serial_date(self.end_time),
        }


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
