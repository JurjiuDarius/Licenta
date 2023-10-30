from flask import Flask, request, jsonify
from blueprints.home.home import home_api


def create_app():
    app = Flask(__name__)

    app.register_blueprint(home_api, url_prefix="/api-home")

    return app


if __name__ == "__main__":
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument(
        "-p", "--port", default=5000, type=int, help="port to listen on"
    )
    args = parser.parse_args()
    port = args.port

    app = create_app()

    app.run(host="127.0.0.1", port=port)
