from flask import Blueprint, make_response, jsonify, request
from app.service import diagnostic_service

diagnostic_bp = Blueprint("diagnostic", __name__)


@diagnostic_bp.route("/diagnostic", methods=["POST"])
def create_diagnostic():
    data = request.json
    response, status = diagnostic_service.create_diagnostic(data)
    return make_response(jsonify(response), status)


@diagnostic_bp.route("/diagnostic/<image_id>", methods=["GET"])
def get_diagnostic_for_image(image_id):
    response, status = diagnostic_service.get_diagnostic_for_image(image_id)
    return make_response(jsonify(response), status)


@diagnostic_bp.route("/diagnostic/<diagnostic_id>", methods=["GET"])
def get_diagnostic_by_id(diagnostic_id):
    response, status = diagnostic_service.get_diagnostic(diagnostic_id)
    return make_response(jsonify(response), status)


@diagnostic_bp.route("/diagnostic/<diagnostic_id>", methods=["PUT"])
def update_diagnostic(diagnostic_id):
    data = request.json
    response, status = diagnostic_service.update_diagnostic(diagnostic_id, data)
    return make_response(jsonify(response), status)


@diagnostic_bp.route("/diagnostic/<diagnostic_id>", methods=["DELETE"])
def delete_diagnostic(diagnostic_id):
    response, status = diagnostic_service.delete_diagnostic(diagnostic_id)
    return make_response(jsonify(response), status)
