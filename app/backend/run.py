from flask import Flask, request, jsonify
from app.blueprints.home.home import home_api
from flask_migrate import Migrate
from database import db
import os


def create_app():
    app = Flask(__name__)

    env_config = os.getenv("APP_SETTINGS", "config.DevelopmentConfig")
    app.config.from_object(env_config)
    db.init_app(app)
    app.register_blueprint(home_api, url_prefix="/api-home")

    return app


import app.models

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
