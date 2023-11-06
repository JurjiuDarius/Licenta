from database import db
from sqlalchemy import DateTime
import datetime


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)

#     email = db.Column(db.String(128))

#     password = db.Column(db.String(258), default=0)

#     date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

#     type: Mapped[str]

#     __mapper_args__ = {
#         "polymorphic_identity": "user",
#         "polymorphic_on": "type",
#     }

#     def __init__(self, email=None, name=None, date_created=None):
#         self.email = email
#         self.name = name
#         self.date_created = date_created


class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    first_name = db.Column(db.String(128))

    last_name = db.Column(db.String(128))

    city = db.Column(db.String(128))

    birth_date = db.Column(DateTime, default=datetime.datetime.utcnow)

    images = db.relationship("ImageUpload", back_populates="patient")

    appointments = db.relationship("Appointment", back_populates="patient")

    diagnostics = db.relationship("Diagnostic", back_populates="patient")

    email = db.Column(db.String(128))

    password = db.Column(db.String(258), default=0)

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(
        self,
        first_name=None,
        last_name=None,
        phone_number=None,
        city=None,
        birth_date=None,
        email=None,
        password=None,
        date_created=None,
    ):
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.city = city
        self.birth_date = birth_date
        self.email = email
        self.password = password
        self.date_created = date_created

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "city": self.city,
            "birth_date": self.birth_date.strftime("%Y-%m-%d %H:%M:%S"),
            "email": self.email,
            "password": self.password,
            "date_created": self.date_created.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    first_name = db.Column(db.String(128))

    last_name = db.Column(db.String(128))

    appointments = db.relationship("Appointment", back_populates="doctor")

    diagnostics = db.relationship("Diagnostic", back_populates="doctor")

    city = db.Column(db.String(128))

    birth_date = db.Column(DateTime, default=datetime.datetime.utcnow)

    education = db.Column(db.String(128))

    email = db.Column(db.String(128))

    password = db.Column(db.String(258), default=0)

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(
        self,
        first_name=None,
        last_name=None,
        city=None,
        birth_date=None,
        education=None,
        email=None,
        password=None,
        date_created=None,
    ):
        self.first_name = first_name
        self.last_name = last_name
        self.city = city
        self.birth_date = birth_date
        self.education = education
        self.email = email
        self.password = password
        self.date_created = date_created

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "city": self.city,
            "birth_date": self.birth_date.strftime("%Y-%m-%d %H:%M:%S"),
            "education": self.education,
            "email": self.email,
            "password": self.password,
            "date_created": self.date_created.strftime("%Y-%m-%d %H:%M:%S"),
        }


class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    username = db.Column(db.String(128))

    email = db.Column(db.String(128))

    password = db.Column(db.String(258), default=0)

    date_created = db.Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, username=None):
        self.username = username
