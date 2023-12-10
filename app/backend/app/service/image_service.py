from app.models.diagnostic import ImageUpload, db
from app.service import image_processing_service
from PIL import Image
import io


def create_image(file, patient_id):
    new_image = ImageUpload(
        patient_id=patient_id,
        is_processed=False,
        image=file.read(),
        file_name=file.filename,
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
        return {"message": "Image deleted successfully"}, 203
    return {"message": "Image not found"}, 404


def process_image(image_id, processing_type):
    image_upload = ImageUpload.query.get(image_id)
    if image_upload:
        image_data = io.BytesIO(image_upload.image)
        image = Image.open(image_data)
        try:
            processed_image = image_processing_service.process_image(
                image, processing_type
            )
        except Exception:
            return {"message": "Image processing failed"}, 500
        processed_file_name = (
            image_upload.file_name.split(".")[0] + processing_type + ".png"
        )

        # Transforming the PIL Image to a LargeBinary so it can be stored in the database
        processed_image_data = io.BytesIO()
        processed_image.save(processed_image_data, format="PNG")
        processed_image_binary = processed_image_data.getvalue()

        processed_image_upload = ImageUpload(
            patient_id=image_upload.patient_id,
            is_processed=True,
            image=processed_image_binary,
            file_name=processed_file_name,
        )
        db.session.add(processed_image_upload)
        db.session.commit()
        return processed_image_upload.serialize(), 200
    return {"message": "Image not found"}, 404
