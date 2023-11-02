from database import db


class ImageUpload(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id"))

    patient = db.relationship("Patient", back_populates="images")
