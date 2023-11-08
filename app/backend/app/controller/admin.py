from flask import Blueprint, Flask, request, render_template, redirect, url_for
from flask_login import LoginManager, login_user, logout_user
from app.models import load_user

from app.models import Admin

admin_bp = Blueprint("administrator", __name__, url_prefix="/administrator")
login_manager = LoginManager()
login_manager.user_loader(load_user)


@admin_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = Admin.query.filter_by(email=email).first()
        if user and user.is_password_valid(password):
            login_user(user)
            return redirect("/dashboard")
    return render_template("login.html")


@admin_bp.route("/logout", methods=["GET"])
def logout():
    logout_user()
    return render_template("login.html")
