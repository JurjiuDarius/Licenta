import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = False
    DEVELOPMENT = False
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URI"]
    MIGRATIONS_DIR = os.environ["MIGRATIONS_DIR"]


class ProductionConfig(Config):
    pass


class StagingConfig(Config):
    DEBUG = True


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True
