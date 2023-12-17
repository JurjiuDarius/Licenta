from app.models.image import ImageUpload, ProcessedImage, db
from app.models.diagnostic import Diagnostic
from app.service import image_processing_service
from sqlalchemy import not_
from PIL import Image
import cv2
import numpy as np
import io


def create_image(file, patient_id):
    new_image = ImageUpload(
        patient_id=patient_id,
        image=file.read(),
        file_name=file.filename,
    )
    db.session.add(new_image)
    db.session.commit()
    return new_image.serialize(), 201


def get_original_images_for_patient(patient_id):
    return [
        image.serialize()
        for image in ImageUpload.query.filter_by(patient_id=patient_id).all()
    ], 200


def get_diagnosed_images(patient_id):
    images_with_diagnostic = (
        db.session.query(ImageUpload)
        .join(Diagnostic, ImageUpload.id == Diagnostic.image_id)
        .filter(
            ImageUpload.patient_id == patient_id, not_(Diagnostic.image_id.is_(None))
        )
        .all()
    )

    return [image.serialize() for image in images_with_diagnostic], 200


def get_all_images_for_patient(patient_id):
    original_images = ImageUpload.query.filter_by(patient_id=patient_id).all()
    processed_images = ProcessedImage.query.filter_by(patient_id=patient_id).all()
    return [image.serialize() for image in original_images + processed_images], 200


def get_image(image_id):
    return ImageUpload.query.get(image_id).serialize(), 200


def delete_image(image_id):
    image_upload = ImageUpload.query.get(image_id)

    if image_upload is None:
        image_upload = ProcessedImage.query.get(image_id)

    if (type(image_upload) is ImageUpload) and (
        (image_upload.diagnostic is not None)
        or (len(image_upload.processed_images) > 0)
    ):
        return {"message": "This image is already being used by your doctor!"}, 403
    if image_upload:
        db.session.delete(image_upload)
        db.session.commit()
        return {"message": "Image deleted successfully"}, 203
    return {"message": "Image not found"}, 404


def process_image(image_id, processing_type):
    image_upload = ImageUpload.query.get(image_id)
    if image_upload:
        image_data = io.BytesIO(image_upload.image)
        image_bytes = np.asarray(bytearray(image_data.read()), dtype=np.uint8)
        image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)
        try:
            processed_image = image_processing_service.process_image(
                image, processing_type
            )
        except Exception:
            return {"message": "Image processing failed"}, 500
        processed_file_name = (
            image_upload.file_name.split(".")[0] + processing_type + ".png"
        )

        processed_image_data = get_image_data(processed_image)
        processed_image_binary = processed_image_data.getvalue()

        processed_image_upload = ProcessedImage(
            patient_id=image_upload.patient_id,
            image=processed_image_binary,
            file_name=processed_file_name,
            original_upload_id=image_upload.id,
        )
        db.session.add(processed_image_upload)
        db.session.commit()
        return processed_image_upload.serialize(), 200
    return {"message": "Image not found"}, 404


def get_image_data(image):
    # Going from numpy array to PIL Image
    pil_image = Image.fromarray(image)

    # Transforming the PIL Image to a LargeBinary so it can be stored in the database
    processed_image_data = io.BytesIO()
    pil_image.save(processed_image_data, format="PNG")
    return processed_image_data
