import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt

# Load environment variables from the .env file
load_dotenv()

bcrypt = Bcrypt()

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')

    # Admin Credentials (Loaded Securely)
    ADMIN_EMAIL = os.getenv('ADMIN_EMAIL')
    ADMIN_PASSWORD = bcrypt.generate_password_hash(os.getenv('ADMIN_PASSWORD')).decode('utf-8')

    # Security Keys
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_EXPIRATION_DELTA = int(os.getenv('JWT_EXPIRATION_DELTA', 7200))  # Default to 7200 if missing

    # File Upload Configuration
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')  # Setting up uploads folder in the current working directory
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # Maximum file size of 16 MB
