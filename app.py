from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from settings import JWT_SECRET_KEY

# Setup DB
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    # Load CONFIG:
    app.config.from_pyfile('settings.py')

    # INIT:
    db.init_app(app)
    migrate = Migrate(app, db)

    # JWT CONFIGURATION:
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    jwt = JWTManager(app)

    # IMPORT BLUEPRINT:
    from src.api.routes import user_bp

    # REGISTER BLUEPRINT:
    app.register_blueprint(user_bp)

    return app
