from sqlalchemy import Column, ForeignKey, String, Integer
from sqlalchemy.orm import relationship
from database import db


class ProjectUser(db.Model):
    __tablename__ = "clinic_doctor"

    id = Column(Integer, primary_key=True)
    doctor_id = Column(Integer, ForeignKey("doctor.id"))
    clinic_id = Column(Integer, ForeignKey("clinic.id"))


class Clinic(db.Model):
    __tablename__ = "clinic"

    id = Column(Integer, primary_key=True, autoincrement=True)
    address = Column(String(128))
    name = Column(String(128))

    doctors = relationship(
        "Doctor", secondary="clinic_doctor", back_populates="clinics"
    )
