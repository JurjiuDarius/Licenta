from .appointment import appointment_bp
from .login import login_bp
from .user import user_bp
from .admin import admin_bp, login_manager
from .images import images_bp
from .diagnostic import diagnostic_bp

blueprints = [appointment_bp, login_bp, user_bp, admin_bp, images_bp, diagnostic_bp]
