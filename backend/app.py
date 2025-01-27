from flask import Flask
from flask_mail import Mail
from config import Config
from models import db
from routes import routes
from flask_migrate import Migrate
from flask_cors import CORS

# Initialize Flask-Mail
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    mail.init_app(app)  # Initialize Flask-Mail with the app

    # Enable CORS for all routes
    CORS(app, supports_credentials=True)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Register blueprints
    app.register_blueprint(routes)

    # Ensure the database is set up
    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
