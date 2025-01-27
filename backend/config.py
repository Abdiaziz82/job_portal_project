import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()
# Load environment variables from the .env file
load_dotenv()

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'SQLALCHEMY_DATABASE_URI', 
        'mysql+pymysql://flask_user:password@localhost/university_jobs'
    )
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'abdiazizhared64@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'zgdj edcr dtnz zugp')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'abdiazizhared64@gmail.com')

    # Frontend URL
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5176')

    # Admin Credentials (Securely loaded from environment variables)
    ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'abdiazizhared64@gmail.com')
    ADMIN_PASSWORD = bcrypt.generate_password_hash(os.getenv('ADMIN_PASSWORD', 'admin123')).decode('utf-8')

    # Manually Added JWT and Security Configuration
    SECRET_KEY = 'supersecretkey'  # Replace with a strong secret key for production
    JWT_EXPIRATION_DELTA = 7200  # 2 hours in seconds (adjust if needed)
