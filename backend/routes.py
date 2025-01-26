from flask import Blueprint, jsonify, request, make_response, current_app
from models import db, User ,Job
from flask_bcrypt import Bcrypt
import jwt
import datetime
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer
from functools import wraps


# Initialize bcrypt
bcrypt = Bcrypt()

routes = Blueprint('routes', __name__)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Debug: Print all cookies
        print(f"Request Cookies: {request.cookies}")  # All cookies in the request

        # Corrected: Access the JWT token from cookies
        token = request.cookies.get('jwt')
        print(f"Received JWT Token: {token}")  # Specific JWT token

        if not token:
            return jsonify({"error": "Authentication required!"}), 401

        try:
            # Decode the JWT
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            print(f"Decoded Token Data: {data}")  # Debug decoded data
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 401

        return f(current_user, *args, **kwargs)
    return decorated_function

@routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Ensure all fields are provided
    if not data.get('first_name') or not data.get('last_name') or not data.get('email_address') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Check if password is less than 8 characters
    if len(data['password']) < 8:
        return jsonify({"error": "Password must be at least 8 characters long"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email_address=data['email_address']).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists , Please choose a different one"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Create a new user
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email_address=data['email_address'],
        mobile_number=data.get('mobile_number'),  # This is optional
        password=hashed_password
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User successfully created"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email_address=data['email_address']).first()

    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"error": "Invalid email or password"}), 401

    # Create JWT Token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=current_app.config['JWT_EXPIRATION_DELTA'])
    }, current_app.config['SECRET_KEY'], algorithm='HS256')

    # Ensure token is a string (PyJWT may return bytes in some versions)
    if isinstance(token, bytes):
        token = token.decode('utf-8')

    # Debugging: Print the token (remove this in production)
    print("Generated Token:", token)

    # Create response and set HTTP-only cookie
    response = make_response(jsonify({'message': 'Login successful'}))
    response.set_cookie(
        'jwt', 
        token, 
        httponly=True,  # Prevents JavaScript access (XSS protection)
        secure=False,   # For local development, set to True in production (HTTPS)
        samesite='Lax', # Helps protect against CSRF
        path='/'        # Make cookie available on all routes
    )

    return response, 200



@routes.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()

    email_address = data.get('email_address')

    if not email_address:
        return jsonify({"error": "Email address is required"}), 400

    user = User.query.filter_by(email_address=email_address).first()

    if not user:
        return jsonify({"error": "No user found with this email address"}), 404

    # Initialize the serializer inside the route function to access current_app
    s = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

    # Generate reset token
    token = s.dumps(email_address, salt='password-reset-salt')

    # Use the full URL (replace localhost:5000 with your actual frontend URL)
    reset_url = f"http://localhost:5173/reset-password/{token}"

    # Send the reset email with the URL (using Flask-Mail) - HTML formatted body
    msg = Message('Password Reset Request', 
                  sender=current_app.config['MAIL_USERNAME'], 
                  recipients=[email_address])
    
    # HTML content for email body
    msg.html = f"""
<html>
<head>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }}
        .email-container {{
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }}
        .header {{
            text-align: center;
            padding-bottom: 20px;
        }}
        .header img {{
            max-width: 200px;
        }}
        .content {{
            padding: 10px;
            font-size: 16px;
            line-height: 1.6;
        }}
        .cta-button {{
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            text-decoration: none;
            background-color: #008000;
            color: white !important;  /* Force the text color to white */
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
        }}
        .cta-button:hover {{
            background-color: #006400;  /* Darker green on hover */
        }}
        .cta-button:focus {{
            outline: none;
        }}
        /* Force link color and remove underline */
        .cta-button a {{
            color: white !important;  /* Ensure link text is white */
            text-decoration: none !important; /* Remove underline */
        }}
        .footer {{
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #888888;
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://gau.ac.ke/wp-content/uploads/2023/08/logo-600x131.jpg" alt="University Logo" />
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset the password for your account. To reset your password, please click the button below:</p>
            <a href="{reset_url}" class="cta-button">Click here to reset your password</a>
            <p>If you did not request this change, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; {datetime.datetime.now().year} University Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
"""



    try:
        # Import mail inside the function to avoid circular imports
        from app import mail
        
        # Send the email using the Flask-Mail instance
        mail.send(msg)
        return jsonify({"message": "Password reset email sent successfully"}), 200
    except Exception as e:
        print(f"Error sending email: {e}")  # Log the error for debugging
        return jsonify({"error": str(e)}), 500


# Reset Password Route
@routes.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    # Initialize the serializer to load the token
    s = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])

    try:
        # Decode the token to get the email address
        email_address = s.loads(token, salt='password-reset-salt', max_age=3600)  # Token expires in 1 hour

    except Exception as e:
        return jsonify({"error": "The reset link is invalid or has expired."}), 400

    data = request.get_json()
    new_password = data.get('password')

    if not new_password:
        return jsonify({"error": "New password is required"}), 400

    # Hash the new password
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    user = User.query.filter_by(email_address=email_address).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    user.password = hashed_password
    db.session.commit()

    return jsonify({"message": "Password has been successfully reset."}), 200

@routes.route('/user/authcheck', methods=['GET'])
def user_auth_check():
    token = request.cookies.get('jwt')
    if not token:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        # Decode user JWT
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = data.get('user_id')
        user = User.query.get(user_id)

        if user:
            initials = f"{user.first_name[0].upper()}{user.last_name[0].upper()}"
            return jsonify({
                "initials": initials,
                "email": user.email_address
            }), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "User token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid user token"}), 401







@routes.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({'message': 'Logged out successfully'}))
    response.set_cookie('jwt', '', expires=0, path='/')  # Clear the JWT cookie
    return response, 200




def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('admin_jwt')
        if not token:
            return jsonify({"error": "Admin authentication required!"}), 403
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            if data.get('role') != 'admin':
                return jsonify({"error": "Unauthorized access!"}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 403

        return f(*args, **kwargs)
    return decorated_function

# Admin login route
@routes.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()

    admin_email = current_app.config['ADMIN_EMAIL']
    admin_password_hash = current_app.config['ADMIN_PASSWORD']  # Hashed password

    if data['email_address'] == admin_email and bcrypt.check_password_hash(admin_password_hash, data['password']):
        # Generate Admin JWT Token
        admin_token = jwt.encode({
            'admin': True,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=current_app.config['JWT_EXPIRATION_DELTA'])
        }, current_app.config['SECRET_KEY'], algorithm='HS256')

        response = make_response(jsonify({'message': 'Admin Login successful'}))
        response.set_cookie(
            'admin_jwt',
            admin_token,
            httponly=True,
            secure=False,  # Set to True in production
            samesite='Lax',
            path='/'
        )

        return response, 200

    return jsonify({'error': 'Invalid email or password'}), 401
   
   
   
@routes.route('/admin/authcheck', methods=['GET'])
def admin_auth_check():
    admin_token = request.cookies.get('admin_jwt')
    if not admin_token:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        # Decode admin JWT
        data = jwt.decode(admin_token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if data.get('admin'):
            return jsonify({"message": "Admin authenticated"}), 200
        else:
            return jsonify({"error": "Invalid admin privileges"}), 403
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Admin token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid admin token"}), 401
    

# Admin-only route for managing jobs@routes.route('/api/jobs', methods=['POST'])
@routes.route('/api/jobs', methods=['POST'])
def create_job():
    data = request.get_json()

    job = Job(
        position=data['position'],
        description=data['description'],
        advert=data['advert'],
        terms_of_service=data['termsOfService'],
        number_of_posts=int(data['numberOfPosts']),
        application_deadline=data['applicationDeadline'],
        application_instructions=data['instructions']  # Use the frontend field name
    )
    db.session.add(job)
    db.session.commit()

    return jsonify({
        "id": job.id,
        "position": job.position,
        "description": job.description,
        "advert": job.advert,
        "termsOfService": job.terms_of_service,
        "numberOfPosts": job.number_of_posts,
        "applicationDeadline": job.application_deadline,
        "applicationInstructions": job.application_instructions  # Include in the response
    }), 201



@routes.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    jobs_list = [
        {
            "id": job.id,
            "position": job.position,
            "description": job.description,
            "advert": job.advert,
            "termsOfService": job.terms_of_service,
            "numberOfPosts": job.number_of_posts,
            "applicationDeadline": job.application_deadline,
            "applicationInstructions": job.application_instructions  # Include the new field
        }
        for job in jobs
    ]
    return jsonify(jobs_list), 200

    
    
@routes.route('/api/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    data = request.get_json()
    job.position = data.get('position', job.position)
    job.description = data.get('description', job.description)
    job.advert = data.get('advert', job.advert)
    job.terms_of_service = data.get('termsOfService', job.terms_of_service)
    job.number_of_posts = int(data.get('numberOfPosts', job.number_of_posts))
    job.application_deadline = data.get('applicationDeadline', job.application_deadline)
    job.application_instructions = data.get('instructions', job.application_instructions)  # New field
    db.session.commit()

    return jsonify({
        "id": job.id,
        "position": job.position,
        "description": job.description,
        "advert": job.advert,
        "termsOfService": job.terms_of_service,
        "numberOfPosts": job.number_of_posts,
        "applicationDeadline": job.application_deadline,
        "applicationInstructions": job.application_instructions  # Include in the response
    }), 200

@routes.route('/api/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    """
    Delete a job by its ID.
    """
    job = Job.query.get(job_id)

    if not job:
        return jsonify({"error": "Job not found"}), 404

    try:
        db.session.delete(job)
        db.session.commit()
        return jsonify({"message": f"Job with ID {job_id} has been deleted."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An error occurred while deleting the job.", "details": str(e)}), 500

    
# Admin logout
@routes.route('/admin/logout', methods=['POST'])
def admin_logout():
    response = make_response(jsonify({"message": "Admin logged out successfully"}))
    response.set_cookie('admin_jwt', '', expires=0, path='/')  # Clear admin JWT cookie
    return response, 200