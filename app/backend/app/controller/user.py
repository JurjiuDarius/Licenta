from flask import Blueprint, request, jsonify
from app.models import User, Doctor, db

user_bp = Blueprint("user", __name__)


@user_bp.route("/add-doctor", methods=["POST"])
def add_doctor():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    specialty = data.get("specialty")

    if not name or not email or not password or not specialty:
        return jsonify({"error": "Missing data"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"error": "Email already exists"}), 400

    doctor = Doctor(name=name, email=email, password=password, specialty=specialty)
    db.session.add(doctor)
    db.session.commit()

    return jsonify({"message": "Doctor added successfully"}), 201


@user_bp.route("/delete-account/<int:user_id>", methods=["DELETE"])
def delete_account(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200
