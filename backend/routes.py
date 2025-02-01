from flask import Blueprint, jsonify, request, make_response, current_app
from models import db, User ,Job , PersonalDetails , WorkExperience ,Certificate ,EducationalBackground ,Referee ,NextOfKin , ProfessionalQualifications ,RelevantCoursesAndProfessionalBody, EmploymentDetails
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer
from functools import wraps
from werkzeug.utils import secure_filename
import os


# Initialize bcrypt
bcrypt = Bcrypt()

routes = Blueprint('routes', __name__)

# Configuration for file uploads
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
        details = PersonalDetails.query.filter_by(user_id=current_user.id).first()
        if not details:
            return jsonify({'error': 'No personal details found'}), 404

        return jsonify({
            'title' : details.title,
            'full_names': details.full_names,
            'email_address': details.email_address,
            'mobile_number': details.mobile_number,
            # Add more fields as needed
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@routes.route('/work-experience', methods=['POST'])
@login_required  # Ensure the user is logged in
def add_work_experience(current_user):
    # Check if the user already has work experience (if needed, customize to allow multiple)
    existing_experience = WorkExperience.query.filter_by(user_id=current_user.id).first()
    if existing_experience:
        return jsonify({'error': 'Work experience already exists for this user'}), 400

    # Get JSON data from the request
    data = request.get_json()

    # Validate required fields (excluding user_id, as it's automatically set)
    if not data or 'job_title' not in data or 'company_name' not in data:
        return jsonify({'error': 'Missing required fields (job_title, company_name)'}), 400

    try:
        # Parse dates if provided
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date() if 'start_date' in data else None
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date() if 'end_date' in data else None

        # Create a new WorkExperience object
        new_experience = WorkExperience(
            user_id=current_user.id,  # Automatically set user_id to the current user's ID
            job_title=data['job_title'],
            company_name=data['company_name'],
            start_date=start_date,
            end_date=end_date,
            responsibilities=data.get('responsibilities'),
            achievements=data.get('achievements'),
            skills_acquired=data.get('skills_acquired')
        )

        # Add to the database session and commit
        db.session.add(new_experience)
        db.session.commit()

        # Return success response
        return jsonify({'message': 'Work experience added successfully', 'id': new_experience.id}), 201

    except Exception as e:
        # Handle errors
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@routes.route('/work-experience', methods=['GET'])
@login_required
def get_work_experience(current_user):
    try:
        # Fetch work experiences for the logged-in user
        experiences = WorkExperience.query.filter_by(user_id=current_user.id).all()
        return jsonify([{
            'id': exp.id,
            'job_title': exp.job_title,
            'company_name': exp.company_name,
            'start_date': exp.start_date.isoformat() if exp.start_date else None,
            'end_date': exp.end_date.isoformat() if exp.end_date else None,
            'responsibilities': exp.responsibilities,
            'achievements': exp.achievements,
            'skills_acquired': exp.skills_acquired
        } for exp in experiences]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@routes.route('/upload-certificate', methods=['POST'])
@login_required  # Ensure the user is logged in
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

    # Validate file upload
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'}), 400

    # Save the file to the configured upload folder
    filename = secure_filename(file.filename)
    upload_folder = current_app.config['UPLOAD_FOLDER']
    file_path = os.path.join(upload_folder, filename)

    try:
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)  # Create the upload folder if it doesn't exist
        file.save(file_path)  # Save the file
    except Exception as e:
        return jsonify({'error': 'File upload failed', 'details': str(e)}), 500

    # Create and save the certificate record
    try:
        certificate = Certificate(
            user_id=current_user.id,  # Automatically set user_id to the current user's ID
            certificate_type=certificate_type,
            specialization=specialization,
            institution_name=institution_name,
            year_of_completion=int(year_of_completion),
            grade=grade,
            additional_awards=additional_awards,
            file_path=file_path
        )
        db.session.add(certificate)
        db.session.commit()
        return jsonify({'message': 'Certificate uploaded successfully', 'id': certificate.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to save certificate', 'details': str(e)}), 500
    

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