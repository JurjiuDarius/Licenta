from database import db
from sqlalchemy import DateTime
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
import datetime


class User(db.Model):
    id = mapped_column(Integer, primary_key=True, autoincrement=True)

    email = Column(String(128))

    password = Column(String(258), default=0)

    date_created = Column(DateTime, default=datetime.datetime.utcnow)

    type: Mapped[str]

    __mapper_args__ = {
        "polymorphic_identity": "user",
        "polymorphic_on": "type",
    }

    def __init__(self, email=None, password=None, date_created=None):
        self.date_created = date_created
        self.email = email
        self.password = password


class Patient(User):
    __tablename__ = "patient"

    id = mapped_column(ForeignKey("user.id"), primary_key=True)

    first_name = Column(String(128))

    last_name = Column(String(128))

    city = Column(String(128))

    birth_date = Column(DateTime, default=datetime.datetime.utcnow)

    images = relationship("ImageUpload", back_populates="patient")

    appointments = relationship("Appointment", back_populates="patient")

    diagnostics = relationship("Diagnostic", back_populates="patient")

    __mapper_args__ = {
        "polymorphic_identity": "patient",
    }

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
        super().__init__(email, password, date_created)
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.city = city
        self.birth_date = birth_date

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


class Doctor(User):
    __tablename__ = "doctor"

    id = mapped_column(ForeignKey("user.id"), primary_key=True)

    first_name = Column(String(128))

    last_name = Column(String(128))

    appointments = relationship("Appointment", back_populates="doctor")

    diagnostics = relationship("Diagnostic", back_populates="doctor")

    city = Column(String(128))

    birth_date = Column(DateTime, default=datetime.datetime.utcnow)

    education = Column(String(128))

    clinics = relationship(
        "Clinic", secondary="clinic_doctor", back_populates="doctors"
    )

    __mapper_args__ = {
        "polymorphic_identity": "doctor",
    }

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
        super().__init__(email, password, date_created)
        self.first_name = first_name
        self.last_name = last_name
        self.city = city
        self.birth_date = birth_date
        self.education = education

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
    id = Column(Integer, primary_key=True, autoincrement=True)

    username = Column(String(128))

    email = Column(String(128))

    password = Column(String(258), default=0)

    date_created = Column(DateTime, default=datetime.datetime.utcnow)

    def __init__(self, username=None):
        self.username = username
