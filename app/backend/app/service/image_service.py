from models.diagnostic import ImageUpload, db


def create_image(patient_id, data):
    image_file = data.image
    new_image = ImageUpload(patient_id=patient_id, image=image_file)
    db.session.add(new_image)
    db.session.commit()
    return new_image, 201


def get_images_for_patient(patient_id):
    return ImageUpload.query.filter_by(patient_id=patient_id).all(), 200


def get_image(image_id):
    return ImageUpload.query.get(image_id), 200


def delete_image(image_id):
    image_upload = ImageUpload.query.get(image_id)
    if image_upload:
        db.session.delete(image_upload)
        db.session.commit()
        return {"message": "Image deleted successfully"}, 200
    return {"message": "Image not found"}, 404
