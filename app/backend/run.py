from flask import Flask, request, jsonify
from app.controller import blueprints, login_manager
from flask_migrate import Migrate
from database import db
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.menu import MenuLink
from app.utils.secure_admin_view import SecureModelView, SecureIndexView
import app.models as models
import os


def create_app():
    app = Flask(__name__)

    env_config = os.getenv("APP_SETTINGS", "config.DevelopmentConfig")
    app.config.from_object(env_config)
    db.init_app(app)
    for bp in blueprints:
        app.register_blueprint(bp)
    CORS(app)
    login_manager.init_app(app)
    admin = Admin(
        app,
        name="management",
        template_mode="bootstrap3",
        url="/dashboard",
        index_view=SecureIndexView(name="Home", url="/dashboard"),
    )
    admin.add_link(MenuLink(name="Logout", category="", url="/administrator/logout"))

    for endpoint_name, table in models.admin_fields.items():
        admin.add_view(
            SecureModelView(table, db.session, name=endpoint_name, url=endpoint_name)
        )

    return app


app = create_app()


migrate = Migrate(
    app,
    db,
    directory=app.config.get("MIGRATIONS_DIR", "./migrations"),
)
migrate.init_app(app, db)

if __name__ == "__main__":
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument(
        "-p", "--port", default=5000, type=int, help="port to listen on"
    )
    args = parser.parse_args()
    port = args.port

    app.run(host="127.0.0.1", port=port)
