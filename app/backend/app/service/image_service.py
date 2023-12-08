from app.models.diagnostic import ImageUpload, db
from PIL import Image


def create_image(file, patient_id):
    new_image = ImageUpload(
        patient_id=patient_id, is_processed=False, image=file.read()
    )
    db.session.add(new_image)
    db.session.commit()
    return new_image.serialize(), 201


def get_images_for_patient(patient_id):
    return [
        image.serialize()
        for image in ImageUpload.query.filter_by(patient_id=patient_id).all()
    ], 200


def get_image(image_id):
    return ImageUpload.query.get(image_id).serialize(), 200


def delete_image(image_id):
    image_upload = ImageUpload.query.get(image_id)
    if image_upload:
        db.session.delete(image_upload)
        db.session.commit()
        return {"message": "Image deleted successfully"}, 200
    return {"message": "Image not found"}, 404
