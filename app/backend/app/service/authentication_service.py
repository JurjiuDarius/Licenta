import hashlib
from app.models.user import Patient, Doctor, Admin
from app.utils.jwt import create_token
from database import db


def login(email, password, role):
    if role == "patient":
        query_class = Patient
    elif role == "doctor":
        query_class = Doctor
    elif role == "admin":
        query_class = Admin

    user = query_class.query.filter_by(email=email).first()
    if not user or not user.is_active:
        return {"message": "User not found!"}, 404
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if not hashed_password == user.password:
        return {"message": "Incorrect password!"}, 401
    token = create_token(user.id, role)
    return {"token": token, "user": user.serialize()}, 200


def sign_up(
    email,
    first_name,
    last_name,
    password,
    phone_number,
    city,
    birth_date,
    education,
    role,
):
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if role == "patient":
        query_class = Patient
    elif role == "doctor":
        query_class = Doctor
    user = query_class.query.filter_by(email=email).first()
    if user:
        return {"message": "User already exists!"}, 409
    if role == "patient":
        new_user = Patient(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=hashed_password,
            phone_number=phone_number,
            city=city,
            birth_date=birth_date,
            is_active=True,
        )
    elif role == "doctor":
        new_user = Doctor(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=hashed_password,
            phone_number=phone_number,
            city=city,
            education=education,
            birth_date=birth_date,
            is_active=False,
        )
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User created successfully!"}, 201
