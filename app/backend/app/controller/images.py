from flask import Blueprint, request, jsonify, make_response
from app.service import image_service
from app.utils.jwt import check_authorization

images_bp = Blueprint("images", __name__, url_prefix="/images")


@images_bp.route("/user-upload/<int:patient_id>", methods=["POST"])
@check_authorization(role=["patient", "doctor"])
def upload_image(patient_id):
    if request.files is None:
        return {"message": "No image uploaded"}, 400
    if "image" not in request.files:
        return {"message": "No image uploaded"}, 400
    file = request.files["image"]
    response, status_code = image_service.create_image(file, patient_id)
    return make_response(jsonify(response), status_code)


@images_bp.route("/user-images/<int:patient_id>", methods=["GET"])
@check_authorization(role="patient")
def get_original_images(patient_id):
    response, status_code = image_service.get_original_images_for_patient(patient_id)
    return make_response(jsonify(response), status_code)


@images_bp.route("/user-images-diagnosed/<int:patient_id>", methods=["GET"])
@check_authorization(role="doctor")
def get_diagnosed_images(patient_id):
    response, status_code = image_service.get_diagnosed_images(patient_id)
    return make_response(jsonify(response), status_code)


@images_bp.route("/user-images-all/<int:patient_id>", methods=["GET"])
@check_authorization(role="doctor")
def get_all_images(patient_id):
    response, status_code = image_service.get_all_images_for_patient(patient_id)
    return make_response(jsonify(response), status_code)


@images_bp.route("/<image_id>", methods=["DELETE"])
@check_authorization(role=["patient", "doctor"])
def delete_image(image_id):
    response, status_code = image_service.delete_image(image_id)
    return make_response(jsonify(response), status_code)


@images_bp.route("/process-image/<image_id>/<processing_type>", methods=["GET"])
@check_authorization(role="doctor")
def process_image(image_id, processing_type):
    response, status_code = image_service.process_image(image_id, processing_type)
    return make_response(jsonify(response), status_code)
