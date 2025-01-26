from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email_address = db.Column(db.String(120), unique=True, nullable=False)
    mobile_number = db.Column(db.String(15), nullable=True)  # assuming mobile number can be nullable
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'




class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    @staticmethod
    def create_admin(email, password):
        hashed_password = generate_password_hash(password)
        admin = Admin(email=email, password=hashed_password)
        db.session.add(admin)
        db.session.commit()

class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    position = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    advert = db.Column(db.Text, nullable=False)
    terms_of_service = db.Column(db.Text, nullable=False)
    application_deadline = db.Column(db.Date, nullable=False)
    number_of_posts = db.Column(db.Integer, nullable=False)
    application_instructions = db.Column(db.Text, nullable=False)  # New field
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Job {self.position}>'
