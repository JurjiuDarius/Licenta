from flask import Blueprint, request, jsonify, make_response
from app.service import image_service

images_bp = Blueprint("images", __name__)


@images_bp.route("/images/user-upload/<int:patient_id>", methods=["POST"])
def upload_image(patient_id):
    if request.files is None:
        return {"message": "No image uploaded"}, 400
    if "image" not in request.files:
        return {"message": "No image uploaded"}, 400
    file = request.files["image"]
    response, status_code = image_service.create_image(file, patient_id)
    return make_response(jsonify(response), status_code)


@images_bp.route("/images/user-images/<int:patient_id>", methods=["GET"])
def get_images(patient_id):
    response, status_code = image_service.get_images_for_patient(patient_id)
    return make_response(jsonify(response), status_code)


@images_bp.route("/images/<image_id>", methods=["GET"])
def get_image(image_id):
    pass


@images_bp.route("/images/<image_id>", methods=["DELETE"])
def delete_image(image_id):
    response, status_code = image_service.delete_image(image_id)
    return make_response(jsonify(response), status_code)
