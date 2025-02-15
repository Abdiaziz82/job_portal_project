from flask import Blueprint, jsonify, request, make_response, current_app
from models import db, User ,Job , PersonalDetails , Certificate ,EducationalBackground ,Referee ,NextOfKin , ProfessionalQualifications ,RelevantCoursesAndProfessionalBody, EmploymentDetails ,JobApplication ,SavedJobs
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer
from functools import wraps
from werkzeug.utils import secure_filename
import os
from flask import send_from_directory ,url_for


# Initialize bcrypt
bcrypt = Bcrypt()

routes = Blueprint('routes', __name__)

# Configuration for file uploads
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@routes.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files from the uploads folder."""
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Access the JWT token from cookies
        token = request.cookies.get('jwt')
        if not token:
            return jsonify({"error": "Authentication required!"}), 401

        try:
            # Decode the JWT
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({"error": "User not found!"}), 401
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
        mobile_number=data.get('mobile_number'), 
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
        'exp': datetime.utcnow() + timedelta(seconds=current_app.config['JWT_EXPIRATION_DELTA'])
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




@routes.route('/delete-user/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(current_user, user_id):
    """Delete a user by ID."""
    print("Received delete request for user ID:", user_id)  # Debugging

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        # Delete all related records
        PersonalDetails.query.filter_by(user_id=user_id).delete()
        Certificate.query.filter_by(user_id=user_id).delete()
        EducationalBackground.query.filter_by(user_id=user_id).delete()
        Referee.query.filter_by(user_id=user_id).delete()
        NextOfKin.query.filter_by(user_id=user_id).delete()
        ProfessionalQualifications.query.filter_by(user_id=user_id).delete()
        RelevantCoursesAndProfessionalBody.query.filter_by(user_id=user_id).delete()
        EmploymentDetails.query.filter_by(user_id=user_id).delete()

        # Now delete the user
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User and all related records deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

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
        # Generate Admin JWT Token with correct role field
        admin_token = jwt.encode({
            'role': 'admin',  # ✅ Correct role format
            'exp': datetime.utcnow() + timedelta(seconds=current_app.config['JWT_EXPIRATION_DELTA'])
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
        if data.get('role') == 'admin':  # ✅ Use 'role' instead of 'admin'
            return jsonify({"message": "Admin authenticated"}), 200
        else:
            return jsonify({"error": "Invalid admin privileges"}), 403
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Admin token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid admin token"}), 401

@routes.route('/users', methods=['GET'])
@admin_required  # Ensure only the admin can access
def get_users():
    """Fetch all registered users."""
    users = User.query.all()

    if not users:
        return jsonify({"message": "No users found"}), 200

    return jsonify([{
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email_address": user.email_address,
        "mobile_number": user.mobile_number
    } for user in users]), 200

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
        grade=int(data['grade']),
        requirements=data['requirements'],  
        duties=data['duties']  
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
        "grade": job.grade,
        "requirements": job.requirements,  
        "duties": job.duties,
        "createdAt": job.created_at  # Include the created_at field in the response
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
            "applicationDeadline": job.application_deadline,  # ✅ FIXED TYPO
            "grade": job.grade,
            "requirements": job.requirements, 
            "duties": job.duties,
            "createdAt": job.created_at
        }
        for job in jobs
    ]
    return jsonify(jobs_list), 200



@routes.route('/api/jobs/<int:id>', methods=['GET'])
def get_job_by_id(id):
    job = Job.query.get(id)
    if job:
        job_details = {
            "id": job.id,
            "position": job.position,
            "description": job.description,
            "advert": job.advert,
            "termsOfService": job.terms_of_service,
            "numberOfPosts": job.number_of_posts,
            "applicationDeadline": job.application_deadline,
            "grade": job.grade,
            "requirements": job.requirements,  
            "duties": job.duties,
            "createdAt": job.created_at  # Include the created_at field in the response
        }
        return jsonify(job_details), 200
    return jsonify({"message": "Job not found"}), 404



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
    job.grade = int(data.get('grade', job.grade))
    job.requirements = data.get('requirements', job.requirements)  
    job.duties = data.get('duties', job.duties)  
    db.session.commit()

    return jsonify({
        "id": job.id,
        "position": job.position,
        "description": job.description,
        "advert": job.advert,
        "termsOfService": job.terms_of_service,
        "numberOfPosts": job.number_of_posts,
        "applicationDeadline": job.application_deadline,
        "grade": job.grade,
        "requirements": job.requirements,  
        "duties": job.duties  
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

@routes.route('/save-job', methods=['POST'])
@login_required  # Ensure the user is logged in
def save_job(current_user):
    # Get JSON data from the request
    data = request.get_json()

    # Validate required field (job_id)
    if not data or 'job_id' not in data:
        return jsonify({'error': 'Missing required field: job_id'}), 400

    try:
        # Check if the job exists
        job = Job.query.get(data['job_id'])
        if not job:
            return jsonify({'error': 'Job not found'}), 404

        # Check if the job is already saved by the user
        existing_save = SavedJobs.query.filter_by(user_id=current_user.id, job_id=data['job_id']).first()
        if existing_save:
            return jsonify({'error': 'Job already saved'}), 400

        # Create a new SavedJobs object
        saved_job = SavedJobs(
            user_id=current_user.id,  # Automatically set user_id to the current user's ID
            job_id=data['job_id']
        )

        # Add to the database session and commit
        db.session.add(saved_job)
        db.session.commit()

        # Return success response
        return jsonify({
            'message': 'Job saved successfully',
            'job_id': saved_job.job_id
        }), 201

    except Exception as e:
        # Handle errors
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/saved-jobs', methods=['GET'])
@login_required
def get_saved_jobs(current_user):
    """Fetch all saved jobs for the logged-in user."""
    saved_jobs = SavedJobs.query.filter_by(user_id=current_user.id).all()

    if not saved_jobs:
        return jsonify({"message": "No saved jobs found"}), 200

    return jsonify([{
        "id": job.id,
        "job_id": job.job_id,
        "position": job.job.position,
        "advert": job.job.advert,
        "grade": job.job.grade,
        "applicationDeadline": job.job.application_deadline,
        
    } for job in saved_jobs]), 200


    
# Admin logout
@routes.route('/admin/logout', methods=['POST'])
def admin_logout():
    response = make_response(jsonify({"message": "Admin logged out successfully"}))
    response.set_cookie('admin_jwt', '', expires=0, path='/')  # Clear admin JWT cookie
    return response, 200


@routes.route('/personal-details', methods=['POST'])
@login_required  # Ensure the user is logged in
def add_personal_details(current_user):
    """Saves personal details linked to a user"""

    try:
        data = request.get_json()

        # Check if personal details already exist
        existing_details = PersonalDetails.query.filter_by(user_id=current_user.id).first()
        if existing_details:
            return jsonify({'error': 'Personal details already exist for this user'}), 400

        # Validate required fields
        required_fields = ['full_names', 'email_address']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Convert date fields safely
        def parse_date(date_str):
            try:
                return datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None
            except ValueError:
                return None

        new_details = PersonalDetails(
            user_id=current_user.id,
            full_names=data['full_names'],
            title=data.get('title', ''),  # Default to empty string if not provided
            date_of_birth=parse_date(data.get('date_of_birth')),
            id_number=data.get('id_number', ''),
            gender=data.get('gender', ''),
            nationality=data.get('nationality', ''),
            home_county=data.get('home_county', ''),
            constituency=data.get('constituency', ''),
            postal_address=data.get('postal_address', ''),
            mobile_number=data.get('mobile_number', ''),
            email_address=data['email_address'],
            alternative_contact_name=data.get('alternative_contact_name', ''),
            alternative_contact_phone=data.get('alternative_contact_phone', ''),
            disability=data.get('disability', 'no'),
            disability_details=data.get('disability_details', ''),
            disability_registration=data.get('disability_registration', ''),
            criminal_conviction=data.get('criminal_conviction', 'no'),
            criminal_offence_details=data.get('criminal_offence_details', ''),
            dismissal_from_employment=data.get('dismissal_from_employment', 'no'),
            dismissal_reason=data.get('dismissal_reason', ''),
            dismissal_date=parse_date(data.get('dismissal_date'))
        )

        # Save to the database
        db.session.add(new_details)
        db.session.commit()

        return jsonify({'message': 'Personal details added successfully', 'id': new_details.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/personal-details', methods=['GET'])
@login_required
def get_personal_details(current_user):
    """Fetches personal details for the logged-in user"""
    try:
        # Fetch personal details for the current user
        details = PersonalDetails.query.filter_by(user_id=current_user.id).first()
        if not details:
            return jsonify({'error': 'No personal details found'}), 404

        # Return all fields from the PersonalDetails model
        return jsonify({
            'id': details.id,
            'user_id': details.user_id,
            'title': details.title,
            'full_names': details.full_names,
            'date_of_birth': details.date_of_birth.isoformat() if details.date_of_birth else None,
            'id_number': details.id_number,
            'gender': details.gender,
            'nationality': details.nationality,
            'home_county': details.home_county,
            'constituency': details.constituency,
            'postal_address': details.postal_address,
            'mobile_number': details.mobile_number,
            'email_address': details.email_address,
            'alternative_contact_name': details.alternative_contact_name,
            'alternative_contact_phone': details.alternative_contact_phone,
            'disability': details.disability,
            'disability_details': details.disability_details,
            'disability_registration': details.disability_registration,
            'criminal_conviction': details.criminal_conviction,
            'criminal_offence_details': details.criminal_offence_details,
            'dismissal_from_employment': details.dismissal_from_employment,
            'dismissal_reason': details.dismissal_reason,
            'dismissal_date': details.dismissal_date.isoformat() if details.dismissal_date else None,
            
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@routes.route('/personal-details', methods=['PUT'])
@login_required  # Ensure the user is logged in
def update_personal_details(current_user):
    """Updates personal details linked to a user"""

    try:
        data = request.get_json()

        # Fetch the existing personal details for the current user
        existing_details = PersonalDetails.query.filter_by(user_id=current_user.id).first()
        if not existing_details:
            return jsonify({'error': 'Personal details not found for this user'}), 404

        # Validate required fields
        required_fields = ['full_names', 'email_address']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Convert date fields safely
        def parse_date(date_str):
            try:
                return datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None
            except ValueError:
                return None

        # Update the fields with new data
        existing_details.full_names = data['full_names']
        existing_details.title = data.get('title', existing_details.title)
        existing_details.date_of_birth = parse_date(data.get('date_of_birth')) or existing_details.date_of_birth
        existing_details.id_number = data.get('id_number', existing_details.id_number)
        existing_details.gender = data.get('gender', existing_details.gender)
        existing_details.nationality = data.get('nationality', existing_details.nationality)
        existing_details.home_county = data.get('home_county', existing_details.home_county)
        existing_details.constituency = data.get('constituency', existing_details.constituency)
        existing_details.postal_address = data.get('postal_address', existing_details.postal_address)
        existing_details.mobile_number = data.get('mobile_number', existing_details.mobile_number)
        existing_details.email_address = data['email_address']
        existing_details.alternative_contact_name = data.get('alternative_contact_name', existing_details.alternative_contact_name)
        existing_details.alternative_contact_phone = data.get('alternative_contact_phone', existing_details.alternative_contact_phone)
        existing_details.disability = data.get('disability', existing_details.disability)
        existing_details.disability_details = data.get('disability_details', existing_details.disability_details)
        existing_details.disability_registration = data.get('disability_registration', existing_details.disability_registration)
        existing_details.criminal_conviction = data.get('criminal_conviction', existing_details.criminal_conviction)
        existing_details.criminal_offence_details = data.get('criminal_offence_details', existing_details.criminal_offence_details)
        existing_details.dismissal_from_employment = data.get('dismissal_from_employment', existing_details.dismissal_from_employment)
        existing_details.dismissal_reason = data.get('dismissal_reason', existing_details.dismissal_reason)
        existing_details.dismissal_date = parse_date(data.get('dismissal_date')) or existing_details.dismissal_date

        # Save the updated details to the database
        db.session.commit()

        return jsonify({'message': 'Personal details updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/personal-details', methods=['DELETE'])
@login_required
def delete_personal_details(current_user):
    """Deletes personal details for the logged-in user"""
    try:
        # Fetch the personal details for the current user
        details = PersonalDetails.query.filter_by(user_id=current_user.id).first()
        if not details:
            return jsonify({'error': 'No personal details found'}), 404

        # Delete the personal details
        db.session.delete(details)
        db.session.commit()

        return jsonify({'message': 'Personal details deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@routes.route('/upload-certificate', methods=['POST'])
@login_required
def upload_certificate(current_user):
    """Endpoint for users to upload certificates."""
    # Extract form data
    certificate_type = request.form.get('certificate_type')
    specialization = request.form.get('specialization')
    institution_name = request.form.get('institution_name')
    year_of_completion = request.form.get('year_of_completion')
    grade = request.form.get('grade')
    additional_awards = request.form.get('additional_awards')

    # Validate required fields
    if not all([certificate_type, specialization, institution_name, year_of_completion]):
        return jsonify({'error': 'Missing required fields'}), 400

    # Handle file upload (if applicable)
    file_path = None
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            if not allowed_file(file.filename):
                return jsonify({'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

            # Save the file
            filename = secure_filename(file.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            file_path = os.path.join(upload_folder, filename)

            try:
                if not os.path.exists(upload_folder):
                    os.makedirs(upload_folder)
                file.save(file_path)
            except Exception as e:
                return jsonify({'error': 'File upload failed', 'details': str(e)}), 500

    # Save the certificate in the database
    try:
        certificate = Certificate(
            user_id=current_user.id,
            certificate_type=certificate_type,
            specialization=specialization,
            institution_name=institution_name,
            year_of_completion=int(year_of_completion),
            grade=grade,
            additional_awards=additional_awards,
            file_path=file_path  # Store full path
        )
        db.session.add(certificate)
        db.session.commit()
        return jsonify({'message': 'Certificate uploaded successfully', 'id': certificate.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to save certificate', 'details': str(e)}), 500

@routes.route('/certificates', methods=['GET'])
@login_required
def get_certificates(current_user):
    """Fetch certificates for the logged-in user."""
    try:
        certificates = Certificate.query.filter_by(user_id=current_user.id).all()

        certificate_data = [
            {
                "id": certificate.id,
                "certificate_type": certificate.certificate_type,
                "specialization": certificate.specialization,
                "institution_name": certificate.institution_name,
                "year_of_completion": certificate.year_of_completion,
                "grade": certificate.grade,
                "additional_awards": certificate.additional_awards,
                "file_path": url_for('routes.uploaded_file', filename=os.path.basename(certificate.file_path), _external=True) if certificate.file_path else None
            }
            for certificate in certificates
        ]

        return jsonify(certificate_data), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch certificates", "details": str(e)}), 500

@routes.route('/certificates/<int:id>', methods=['PUT'])
@login_required
def update_certificate(current_user, id):
    """Updates certificate details for a user"""
    try:
        data = request.get_json()

        # Fetch the existing certificate details
        certificate = Certificate.query.filter_by(id=id, user_id=current_user.id).first()
        if not certificate:
            return jsonify({'error': 'Certificate not found'}), 404

        # Update the fields
        certificate.certificate_type = data.get('certificate_type', certificate.certificate_type)
        certificate.specialization = data.get('specialization', certificate.specialization)
        certificate.institution_name = data.get('institution_name', certificate.institution_name)
        certificate.year_of_completion = data.get('year_of_completion', certificate.year_of_completion)
        certificate.grade = data.get('grade', certificate.grade)
        certificate.additional_awards = data.get('additional_awards', certificate.additional_awards)

        # Save to the database
        db.session.commit()

        return jsonify({'message': 'Certificate updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/certificates/<int:certificate_id>', methods=['DELETE'])
@login_required
def delete_certificate(current_user, certificate_id):
    """Deletes a specific certificate for the logged-in user"""
    try:
        certificate = Certificate.query.filter_by(user_id=current_user.id, id=certificate_id).first()
        if not certificate:
            return jsonify({'error': 'Certificate not found'}), 404

        # Remove file from storage if it exists
        if certificate.file_path and os.path.exists(certificate.file_path):
            os.remove(certificate.file_path)

        db.session.delete(certificate)
        db.session.commit()

        return jsonify({'message': 'Certificate deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


    
@routes.route('/upload-educational-background', methods=['POST'])
@login_required  # Ensure the user is logged in
def upload_educational_background(current_user):
    """Endpoint for users to upload their educational background."""
    # Extract form data
    school_name = request.form.get('school_name')
    year_completed = request.form.get('year_completed')
    high_school_grade = request.form.get('high_school_grade')
    high_school_activities = request.form.get('high_school_activities')
    university_name = request.form.get('university_name')
    degree_program = request.form.get('degree_program')
    field_of_study = request.form.get('field_of_study')
    university_grade = request.form.get('university_grade')
    start_date = request.form.get('start_date')
    end_date = request.form.get('end_date')

    # Validate required fields
    if not all([school_name, year_completed]):
        return jsonify({'error': 'Missing required fields (school_name, year_completed)'}), 400

    # Validate file upload (if applicable)
    file_path = None
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            if not allowed_file(file.filename):
                return jsonify({'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

            # Save the file
            filename = secure_filename(file.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            file_path = os.path.join(upload_folder, filename)

            try:
                if not os.path.exists(upload_folder):
                    os.makedirs(upload_folder)
                file.save(file_path)
            except Exception as e:
                return jsonify({'error': 'File upload failed', 'details': str(e)}), 500

    # Parse date fields (if provided)
    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date() if start_date else None
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date() if end_date else None
    except ValueError as e:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD', 'details': str(e)}), 400

    # Create and save the educational background record
    try:
        educational_background = EducationalBackground(
            user_id=current_user.id,  # Automatically set user_id to the current user's ID
            school_name=school_name,
            year_completed=int(year_completed),
            high_school_grade=high_school_grade,
            high_school_activities=high_school_activities,
            university_name=university_name,
            degree_program=degree_program,
            field_of_study=field_of_study,
            university_grade=university_grade,
            start_date=start_date,
            end_date=end_date,
            file_path=file_path
        )
        db.session.add(educational_background)
        db.session.commit()
        return jsonify({'message': 'Educational background uploaded successfully', 'id': educational_background.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to save educational background', 'details': str(e)}), 500

@routes.route('/education', methods=['GET'])
@login_required
def get_education(current_user):
    """Endpoint to fetch educational background for the logged-in user."""
    try:
        education = EducationalBackground.query.filter_by(user_id=current_user.id).all()

        education_data = [
            {
                "id": edu.id,
                "school_name": edu.school_name,
                "year_completed": edu.year_completed,
                "high_school_grade": edu.high_school_grade,
                "high_school_activities": edu.high_school_activities,
                "university_name": edu.university_name,
                "degree_program": edu.degree_program,
                "field_of_study": edu.field_of_study,
                "university_grade": edu.university_grade,
                "start_date": edu.start_date.isoformat() if edu.start_date else None,
                "end_date": edu.end_date.isoformat() if edu.end_date else None,
                "file_path": url_for('routes.uploaded_file', filename=os.path.basename(edu.file_path), _external=True) if edu.file_path else None
            }
            for edu in education
        ]

        return jsonify(education_data), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch educational background", "details": str(e)}), 500

@routes.route('/education/<int:id>', methods=['PUT'])
@login_required
def update_educational_background(current_user, id):
    """Updates educational background details for a user"""
    try:
        data = request.get_json()

        # Fetch the existing educational background details
        education = EducationalBackground.query.filter_by(id=id, user_id=current_user.id).first()
        if not education:
            return jsonify({'error': 'Educational background not found'}), 404

        # Update the fields
        education.school_name = data.get('school_name', education.school_name)
        education.year_completed = data.get('year_completed', education.year_completed)
        education.high_school_grade = data.get('high_school_grade', education.high_school_grade)
        education.high_school_activities = data.get('high_school_activities', education.high_school_activities)
        education.university_name = data.get('university_name', education.university_name)
        education.degree_program = data.get('degree_program', education.degree_program)
        education.field_of_study = data.get('field_of_study', education.field_of_study)
        education.university_grade = data.get('university_grade', education.university_grade)
        education.start_date = data.get('start_date', education.start_date)
        education.end_date = data.get('end_date', education.end_date)

        # Save to the database
        db.session.commit()

        return jsonify({'message': 'Educational background updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/education/<int:id>', methods=['DELETE'])
@login_required
def delete_education(current_user, id):
    """Endpoint to delete an educational background by ID."""
    try:
        education = EducationalBackground.query.filter_by(id=id, user_id=current_user.id).first()
        if not education:
            return jsonify({'error': 'Educational background not found'}), 404

        db.session.delete(education)
        db.session.commit()
        return jsonify({'message': 'Educational background deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete educational background', 'details': str(e)}), 500


@routes.route('/education/<int:id>/upload-file', methods=['POST'])
@login_required
def upload_educational_background_file(current_user, id):
    """Endpoint for users to upload a new file for their educational background."""
    try:
        # Fetch the existing educational background details
        education = EducationalBackground.query.filter_by(id=id, user_id=current_user.id).first()
        if not education:
            return jsonify({'error': 'Educational background not found'}), 404

        # Validate file upload
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

        # Save the file
        filename = secure_filename(file.filename)
        upload_folder = current_app.config['UPLOAD_FOLDER']
        file_path = os.path.join(upload_folder, filename)

        try:
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            file.save(file_path)
        except Exception as e:
            return jsonify({'error': 'File upload failed', 'details': str(e)}), 500

        # Update the file path in the database
        education.file_path = file_path
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@routes.route('/add-referees', methods=['POST'])
@login_required
def add_referees(current_user):
    """Saves both referees linked to a user"""

    try:
        data = request.json  # Expecting JSON data

        referee1 = data.get('referee1')
        referee2 = data.get('referee2')

        # Ensure both referees are provided
        if not referee1 or not referee2:
            return jsonify({'error': 'Both referees are required'}), 400

        # Check if referees already exist for the user
        existing_referees = Referee.query.filter_by(user_id=current_user.id).first()
        if existing_referees:
            return jsonify({'error': 'Referees already exist for this user'}), 409

        # Save Referee 1
        ref1 = Referee(
            user_id=current_user.id,
            full_name=referee1.get('full_name'),
            occupation=referee1.get('occupation'),
            address=referee1.get('address'),
            post_code=referee1.get('post_code'),
            city_town=referee1.get('city_town'),
            mobile_no=referee1.get('mobile_no'),
            email=referee1.get('email'),
            known_period=referee1.get('known_period')
        )
        db.session.add(ref1)

        # Save Referee 2
        ref2 = Referee(
            user_id=current_user.id,
            full_name=referee2.get('full_name'),
            occupation=referee2.get('occupation'),
            address=referee2.get('address'),
            post_code=referee2.get('post_code'),
            city_town=referee2.get('city_town'),
            mobile_no=referee2.get('mobile_no'),
            email=referee2.get('email'),
            known_period=referee2.get('known_period')
        )
        db.session.add(ref2)

        # Commit both referees to the database
        db.session.commit()

        return jsonify({'message': 'Referees saved successfully'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to save referees', 'details': str(e)}), 500
    
@routes.route('/referees', methods=['GET'])
@login_required  # Ensure the user is logged in
def get_referees(current_user):
    """Endpoint to fetch referees for the logged-in user."""
    try:
        # Query referees for the current user
        referees = Referee.query.filter_by(user_id=current_user.id).all()

        # Convert referees to a list of dictionaries
        referees_data = [
            {
                "id": ref.id,
                "full_name": ref.full_name,
                "occupation": ref.occupation,
                "address": ref.address,
                "post_code": ref.post_code,
                "city_town": ref.city_town,
                "mobile_no": ref.mobile_no,
                "email": ref.email,
                "known_period": ref.known_period,
               
            }
            for ref in referees
        ]

        return jsonify(referees_data), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch referees", "details": str(e)}), 500

@routes.route('/referees/<int:id>', methods=['PUT'])
@login_required
def update_referee(current_user, id):
    """Updates referee details for a user"""
    try:
        data = request.get_json()

        # Fetch the existing referee details
        referee = Referee.query.filter_by(id=id, user_id=current_user.id).first()
        if not referee:
            return jsonify({'error': 'Referee not found'}), 404

        # Update the fields
        referee.full_name = data.get('full_name', referee.full_name)
        referee.occupation = data.get('occupation', referee.occupation)
        referee.address = data.get('address', referee.address)
        referee.post_code = data.get('post_code', referee.post_code)
        referee.city_town = data.get('city_town', referee.city_town)
        referee.mobile_no = data.get('mobile_no', referee.mobile_no)
        referee.email = data.get('email', referee.email)
        referee.known_period = data.get('known_period', referee.known_period)

        # Save to the database
        db.session.commit()

        return jsonify({'message': 'Referee updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@routes.route('/referees/<int:id>', methods=['DELETE'])
@login_required
def delete_referee(current_user, id):
    """Endpoint to delete a referee by ID for the logged-in user."""
    try:
        # Query the referee by id and ensure it belongs to the logged-in user
        referee = Referee.query.filter_by(id=id, user_id=current_user.id).first()

        if not referee:
            return jsonify({'error': 'Referee not found or not owned by the current user'}), 404

        db.session.delete(referee)
        db.session.commit()

        return jsonify({'message': 'Referee deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete referee', 'details': str(e)}), 500
    
@routes.route('/next-of-kin', methods=['POST'])
@login_required  # Ensure the user is logged in
def add_next_of_kin(current_user):
    # Get JSON data from the request
    data = request.get_json()

    # Validate required fields
    if not data or 'kin_name' not in data or 'kin_address' not in data or 'kin_tel' not in data or 'kin_relationship' not in data:
        return jsonify({'error': 'Missing required fields (kin_name, kin_address, kin_tel, kin_relationship)'}), 400

    try:
        # Create a new NextOfKin object
        new_kin = NextOfKin(
            user_id=current_user.id,  # Automatically set user_id to the current user's ID
            kin_name=data['kin_name'],
            kin_address=data['kin_address'],
            kin_tel=data['kin_tel'],
            kin_relationship=data['kin_relationship']
        )

        # Add to the database session and commit
        db.session.add(new_kin)
        db.session.commit()

        # Return success response
        return jsonify({
            'message': 'Next of Kin details added successfully',
            'id': new_kin.id
        }), 201

    except Exception as e:
        # Handle errors
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/next-of-kin', methods=['GET'])
@login_required
def get_next_of_kin(current_user):
    """Fetches next of kin details for the logged-in user"""
    try:
        kin_details = NextOfKin.query.filter_by(user_id=current_user.id).all()
        if not kin_details:
            return jsonify({'error': 'No next of kin details found'}), 404

        return jsonify([{
            'id': kin.id,
            'kin_name': kin.kin_name,
            'kin_address': kin.kin_address,
            'kin_tel': kin.kin_tel,
            'kin_relationship': kin.kin_relationship
        } for kin in kin_details]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@routes.route('/next-of-kin/<int:id>', methods=['PUT'])
@login_required
def update_next_of_kin(current_user, id):
    """Updates next of kin details for a user"""
    try:
        data = request.get_json()

        # Fetch the existing next of kin details
        next_of_kin = NextOfKin.query.filter_by(id=id, user_id=current_user.id).first()
        if not next_of_kin:
            return jsonify({'error': 'Next of kin not found'}), 404

        # Update the fields
        next_of_kin.kin_name = data.get('kin_name', next_of_kin.kin_name)
        next_of_kin.kin_address = data.get('kin_address', next_of_kin.kin_address)
        next_of_kin.kin_tel = data.get('kin_tel', next_of_kin.kin_tel)
        next_of_kin.kin_relationship = data.get('kin_relationship', next_of_kin.kin_relationship)

        # Save to the database
        db.session.commit()

        return jsonify({'message': 'Next of kin updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/next-of-kin/<int:kin_id>', methods=['DELETE'])
@login_required
def delete_next_of_kin(current_user, kin_id):
    """Deletes a specific Next of Kin entry for the logged-in user"""
    try:
        kin = NextOfKin.query.filter_by(user_id=current_user.id, id=kin_id).first()
        if not kin:
            return jsonify({'error': 'Next of Kin not found'}), 404

        db.session.delete(kin)
        db.session.commit()

        return jsonify({'message': 'Next of Kin deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



    
@routes.route('/professional-qualifications', methods=['POST'])
@login_required
def add_professional_qualifications(current_user):
    data = request.get_json()

    if not data or 'qualifications' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Check if the user already has professional qualifications
        existing_qualifications = ProfessionalQualifications.query.filter_by(user_id=current_user.id).first()
        if existing_qualifications:
            return jsonify({'error': 'Professional qualifications already exist for this user'}), 400

        # Loop through the qualifications and save each one
        for qualification in data['qualifications']:
            new_qualification = ProfessionalQualifications(
                user_id=current_user.id,
                year_from=qualification['yearFrom'],
                year_to=qualification['yearTo'],
                institution=qualification['institution'],
                award=qualification['award'],
                specialization=qualification['specialization'],
                grade=qualification['grade'],
                created_at=datetime.utcnow()
            )
            db.session.add(new_qualification)

        db.session.commit()
        return jsonify({'message': 'Professional qualifications saved successfully'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/professional-qualifications', methods=['GET'])
@login_required  # Ensure the user is logged in
def get_professional_qualifications(current_user):
    """Endpoint to fetch professional qualifications for the logged-in user."""
    try:
        # Query professional qualifications for the current user
        qualifications = ProfessionalQualifications.query.filter_by(user_id=current_user.id).all()

        # Convert qualifications to a list of dictionaries
        qualifications_data = [
            {
                "id": qual.id,
                "year_from": qual.year_from,
                "year_to": qual.year_to,
                "institution": qual.institution,
                "award": qual.award,
                "specialization": qual.specialization,
                "grade": qual.grade,
                "created_at": qual.created_at.isoformat() if qual.created_at else None,
            }
            for qual in qualifications
        ]

        return jsonify(qualifications_data), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch professional qualifications", "details": str(e)}), 500

@routes.route('/professional-qualifications/<int:id>', methods=['PUT'])
@login_required
def update_professional_qualification(current_user, id):
    """Updates professional qualification details for a user"""
    try:
        data = request.get_json()

        # Fetch the existing professional qualification details
        qualification = ProfessionalQualifications.query.filter_by(id=id, user_id=current_user.id).first()
        if not qualification:
            return jsonify({'error': 'Professional qualification not found'}), 404

        # Update the fields
        qualification.award = data.get('award', qualification.award)
        qualification.institution = data.get('institution', qualification.institution)
        qualification.specialization = data.get('specialization', qualification.specialization)
        qualification.grade = data.get('grade', qualification.grade)
        qualification.year_from = data.get('year_from', qualification.year_from)
        qualification.year_to = data.get('year_to', qualification.year_to)

        # Save to the database
        db.session.commit()

        return jsonify({'message': 'Professional qualification updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/professional-qualifications/<int:id>', methods=['DELETE'])
@login_required
def delete_professional_qualification(current_user, id):
    """Endpoint to delete a professional qualification by ID."""
    try:
        qualification = ProfessionalQualifications.query.filter_by(id=id, user_id=current_user.id).first()
        if not qualification:
            return jsonify({'error': 'Qualification not found'}), 404

        db.session.delete(qualification)
        db.session.commit()
        return jsonify({'message': 'Professional qualification deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete qualification', 'details': str(e)}), 500

    
@routes.route('/relevant-courses-professional-body', methods=['POST'])
@login_required
def add_relevant_courses_and_professional_body(current_user):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Loop through each record (course + professional body)
        for record in data:
            new_record = RelevantCoursesAndProfessionalBody(
                user_id=current_user.id,
                year=record['year'],
                institution=record['institution'],
                course_name=record['course_name'],
                details=record['details'],
                duration=record['duration'],
                body_name=record['body_name'],
                membership_no=record['membership_no'],
                membership_type=record['membership_type'],
                renewal_date=datetime.strptime(record['renewal_date'], '%Y-%m-%d'),  # Convert the date
                created_at=datetime.utcnow()
            )

            db.session.add(new_record)
        
        db.session.commit()

        return jsonify({'message': 'Relevant courses and professional body records saved successfully'}), 201

    except Exception as e:
        db.session.rollback()  # Rollback any changes if an error occurs
        return jsonify({'error': str(e)}), 500

@routes.route('/relevant-courses', methods=['GET'])
@login_required  # Ensure the user is logged in
def get_relevant_courses(current_user):
    """Endpoint to fetch relevant courses and professional body data for the logged-in user."""
    try:
        # Query relevant courses and professional body data for the current user
        courses = RelevantCoursesAndProfessionalBody.query.filter_by(user_id=current_user.id).all()

        # Convert records to a list of dictionaries
        courses_data = [
            {
                "id": course.id,
                "year": course.year,
                "institution": course.institution,
                "course_name": course.course_name,
                "details": course.details,
                "duration": course.duration,
                "body_name": course.body_name,
                "membership_no": course.membership_no,
                "membership_type": course.membership_type,
                "renewal_date": course.renewal_date.isoformat() if course.renewal_date else None,
                "created_at": course.created_at.isoformat() if course.created_at else None,
            }
            for course in courses
        ]

        return jsonify(courses_data), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch relevant courses and professional body data", "details": str(e)}), 500

@routes.route('/relevant-courses/<int:id>', methods=['PUT'])
@login_required
def update_relevant_course(current_user, id):
    """Updates relevant course details for a user"""
    try:
        data = request.get_json()

        # Fetch the existing relevant course details
        course = RelevantCoursesAndProfessionalBody.query.filter_by(id=id, user_id=current_user.id).first()
        if not course:
            return jsonify({'error': 'Relevant course not found'}), 404

        # Update the fields
        course.course_name = data.get('course_name', course.course_name)
        course.institution = data.get('institution', course.institution)
        course.year = data.get('year', course.year)
        course.details = data.get('details', course.details)
        course.duration = data.get('duration', course.duration)
        course.body_name = data.get('body_name', course.body_name)
        course.membership_no = data.get('membership_no', course.membership_no)
        course.membership_type = data.get('membership_type', course.membership_type)
        course.renewal_date = data.get('renewal_date', course.renewal_date)

        # Save to the database
        db.session.commit()

        return jsonify({'message': 'Relevant course updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/relevant-courses/<int:id>', methods=['DELETE'])
@login_required
def delete_relevant_course(current_user, id):
    """Endpoint to delete a relevant course by ID."""
    try:
        course = RelevantCoursesAndProfessionalBody.query.filter_by(id=id, user_id=current_user.id).first()
        if not course:
            return jsonify({'error': 'Course not found'}), 404

        db.session.delete(course)
        db.session.commit()
        return jsonify({'message': 'Relevant course deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete course', 'details': str(e)}), 500

    
@routes.route('/employment-details', methods=['POST'])
@login_required  # Ensure the user is logged in
def add_employment_details(current_user):
    """Saves employment details linked to a user"""

    try:
        data = request.get_json()

        # Check if employment details already exist for the user (optional, if you want to restrict to one record per user)
        existing_details = EmploymentDetails.query.filter_by(user_id=current_user.id).first()
        if existing_details:
            return jsonify({'error': 'Employment details already exist for this user'}), 400

        # Validate required fields
        required_fields = ['year', 'designation', 'job_group', 'gross_salary', 'ministry']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Convert date fields safely
        def parse_date(date_str):
            try:
                return datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None
            except ValueError:
                return None

        # Create a new EmploymentDetails record
        new_details = EmploymentDetails(
            user_id=current_user.id,  # Link to the current logged-in user
            year=data['year'],
            designation=data['designation'],
            job_group=data['job_group'],
            gross_salary=data['gross_salary'],
            ministry=data['ministry'],
            from_date=parse_date(data.get('from_date')),
            to_date=parse_date(data.get('to_date')),
            duties=data.get('duties', ''),
            publications=data.get('publications', ''),
            skills_experience=data.get('skills_experience', '')
        )

        # Save to the database
        db.session.add(new_details)
        db.session.commit()

        return jsonify({'message': 'Employment details added successfully', 'id': new_details.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@routes.route('/employment-details', methods=['GET'])
@login_required  # Ensure the user is logged in
def get_employment_details(current_user):
    """Endpoint to fetch employment details for the logged-in user."""
    try:
        # Query employment details for the current user
        employment_details = EmploymentDetails.query.filter_by(user_id=current_user.id).all()

        # Convert employment details to a list of dictionaries
        employment_data = [
            {
                "id": emp.id,
                "year": emp.year,
                "designation": emp.designation,
                "job_group": emp.job_group,
                "gross_salary": emp.gross_salary,
                "ministry": emp.ministry,
                "from_date": emp.from_date.isoformat() if emp.from_date else None,
                "to_date": emp.to_date.isoformat() if emp.to_date else None,
                "duties": emp.duties,
                "publications": emp.publications,
                "skills_experience": emp.skills_experience,
                "created_at": emp.created_at.isoformat() if emp.created_at else None,
            }
            for emp in employment_details
        ]

        return jsonify(employment_data), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch employment details", "details": str(e)}), 500

@routes.route('/employment-details/<int:id>', methods=['PUT'])
@login_required
def update_employment_details(current_user, id):
    """Updates employment details for a user"""
    try:
        data = request.get_json()

        # Fetch the existing employment details
        employment = EmploymentDetails.query.filter_by(id=id, user_id=current_user.id).first()
        if not employment:
            return jsonify({'error': 'Employment details not found'}), 404

        # Update the fields
        employment.year = data.get('year', employment.year)
        employment.designation = data.get('designation', employment.designation)
        employment.job_group = data.get('job_group', employment.job_group)
        employment.gross_salary = data.get('gross_salary', employment.gross_salary)
        employment.ministry = data.get('ministry', employment.ministry)
        employment.from_date = data.get('from_date', employment.from_date)
        employment.to_date = data.get('to_date', employment.to_date)
        employment.duties = data.get('duties', employment.duties)
        employment.publications = data.get('publications', employment.publications)
        employment.skills_experience = data.get('skills_experience', employment.skills_experience)

        # Save to the database
        db.session.commit()

        return jsonify({'message': 'Employment details updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/employment-details/<int:id>', methods=['DELETE'])
@login_required
def delete_employment_detail(current_user, id):
    """Endpoint to delete employment details by ID for the logged-in user."""
    try:
        # Query the employment details by the id and the user_id
        employment = EmploymentDetails.query.filter_by(id=id, user_id=current_user.id).first()

        if not employment:
            return jsonify({'error': 'Employment detail not found or not owned by the current user'}), 404

        db.session.delete(employment)
        db.session.commit()

        return jsonify({'message': 'Employment detail deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete employment detail', 'details': str(e)}), 500
        
@routes.route('/apply-job/<int:job_id>', methods=['POST'])
@login_required
def apply_for_job(current_user, job_id):
    """Allows a user to apply for a job if their profile is complete"""

    # Function to check if the user's profile is complete
    def is_profile_complete(user_id):
        """Check if the user has completed all required profile sections."""
        required_models = [
            PersonalDetails, Certificate, EducationalBackground,
            Referee, NextOfKin, ProfessionalQualifications, RelevantCoursesAndProfessionalBody, EmploymentDetails
        ]

        for model in required_models:
            if not model.query.filter_by(user_id=user_id).first():
                return False
        return True

    try:
        # Check if profile is complete before allowing application
        if not is_profile_complete(current_user.id):
            return jsonify({'error': 'Please fill and update your profile before applying'}), 400

        # Check if the user has already applied for the job
        existing_application = JobApplication.query.filter_by(user_id=current_user.id, job_id=job_id).first()
        if existing_application:
            return jsonify({'error': 'You have already applied for this job'}), 400

        # Create a new job application
        application = JobApplication(
            user_id=current_user.id,
            job_id=job_id,
            status='Pending'  # Initial status
        )
        db.session.add(application)
        db.session.commit()

        return jsonify({'message': 'Application submitted successfully!'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@routes.route('/admin/job-applications', methods=['GET'])
@admin_required
def get_all_job_applications():
    try:
        applications = JobApplication.query.all()

        # Count applications by status
        status_counts = {
            "Pending": 0,
            "Accepted": 0,
            "Rejected": 0,
        }

        applications_data = []
        for app in applications:
            if app.status in status_counts:
                status_counts[app.status] += 1

            applications_data.append({
                "id": app.id,
                "user_id": app.user.id,
                "applicant_name": f"{app.user.first_name} {app.user.last_name}",
                "job_title": app.job.position,
                "status": app.status,
                "applied_at": app.applied_at.strftime("%Y-%m-%d %H:%M:%S") if app.applied_at else None
            })

        return jsonify({
            "applications": applications_data,
            "status_counts": status_counts
        }), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch job applications", "details": str(e)}), 500
    
@routes.route('/admin/job-applications/<int:application_id>', methods=['PUT'])
@login_required  # Ensure only admins can access
def update_application_status( application_id):
    """Allow admin to accept or reject job applications."""
    from flask import request  # Import inside the function to avoid circular imports
    try:
        data = request.get_json()
        new_status = data.get("status")

        if new_status not in ["Accepted", "Rejected"]:
            return jsonify({"error": "Invalid status. Use 'Accepted' or 'Rejected'."}), 400

        application = JobApplication.query.get(application_id)

        if not application:
            return jsonify({"error": "Application not found."}), 404

        application.status = new_status
        db.session.commit()

        return jsonify({"message": f"Application {new_status} successfully."}), 200

    except Exception as e:
        return jsonify({"error": "Failed to update application status", "details": str(e)}), 500

@routes.route('/user/job-applications', methods=['GET'])
@login_required
def get_user_job_applications(current_user):
    """Fetch job applications for the logged-in user."""
    try:
        status_filter = request.args.get('status')  # Get status filter from query params
        query = JobApplication.query.filter_by(user_id=current_user.id)

        if status_filter:
            query = query.filter_by(status=status_filter)  # Apply status filter if provided

        applications = query.all()

        applications_data = [
            {
                "id": app.id,
                "job_title": app.job.position, 
                "applied_at": app.applied_at.strftime("%Y-%m-%d %H:%M"),
                "status": app.status
            }
            for app in applications
        ]

        return jsonify(applications_data), 200

    except Exception as e:
        return jsonify({"error": "Failed to fetch job applications", "details": str(e)}), 500
    
@routes.route('/applications/<int:user_id>', methods=['GET'])
@login_required
def get_application_details(current_user, user_id):
    print(f"Fetching details for user ID: {user_id}")

    personal_details = PersonalDetails.query.filter_by(user_id=user_id).first()
    if not personal_details:
        return jsonify({"error": "User profile not found"}), 404

    response = {
        "personal_details": personal_details.to_dict() if personal_details else None,
        "next_of_kin": [kin.to_dict() for kin in NextOfKin.query.filter_by(user_id=user_id).all()],
        "certificates": [
            {
                **cert.to_dict(),
                "file_path": url_for('routes.uploaded_file', filename=os.path.basename(cert.file_path), _external=True) 
                if cert.file_path else None
            }
            for cert in Certificate.query.filter_by(user_id=user_id).all()
        ],
        "education": [
            {
                **edu.to_dict(),
                "file_path": url_for('routes.uploaded_file', filename=os.path.basename(edu.file_path), _external=True) 
                if edu.file_path else None
            }
            for edu in EducationalBackground.query.filter_by(user_id=user_id).all()
        ],
        "professional_qualifications": [qual.to_dict() for qual in ProfessionalQualifications.query.filter_by(user_id=user_id).all()],
        "relevant_courses": [course.to_dict() for course in RelevantCoursesAndProfessionalBody.query.filter_by(user_id=user_id).all()],
        "employment_details": [job.to_dict() for job in EmploymentDetails.query.filter_by(user_id=user_id).all()],
        "referees": [ref.to_dict() for ref in Referee.query.filter_by(user_id=user_id).all()],
    }

    return jsonify(response), 200

