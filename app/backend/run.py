from flask import Flask, request, jsonify
from app.controller import blueprints
from flask_migrate import Migrate
from database import db
from flask_cors import CORS
import os


def create_app():
    app = Flask(__name__)

    env_config = os.getenv("APP_SETTINGS", "config.DevelopmentConfig")
    app.config.from_object(env_config)
    db.init_app(app)
    for bp in blueprints:
        app.register_blueprint(bp)
    CORS(app)

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
