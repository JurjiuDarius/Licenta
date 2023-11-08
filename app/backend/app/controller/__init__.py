from .appointment import appointment_bp
from .login import login_bp
from .user import user_bp
from .admin import admin_bp, login_manager

blueprints = [appointment_bp, login_bp, user_bp, admin_bp]
