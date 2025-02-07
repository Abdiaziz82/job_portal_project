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
    mobile_number = db.Column(db.String(15), nullable=True)  
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'

class PersonalDetails(db.Model):
    __tablename__ = 'personal_details'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Link to users table
    full_names = db.Column(db.String(200), nullable=False)
    title = db.Column(db.String(50), nullable=True)
    date_of_birth = db.Column(db.Date, nullable=True)
    id_number = db.Column(db.String(20), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    nationality = db.Column(db.String(50), nullable=True)
    home_county = db.Column(db.String(50), nullable=True)
    constituency = db.Column(db.String(50), nullable=True)
    postal_address = db.Column(db.String(100), nullable=True)
    mobile_number = db.Column(db.String(20), nullable=True)
    email_address = db.Column(db.String(100), nullable=False)

    # New Fields
    alternative_contact_name = db.Column(db.String(200), nullable=True)
    alternative_contact_phone = db.Column(db.String(20), nullable=True)
    disability = db.Column(db.String(3), nullable=False, default="no")  # "yes" or "no"
    disability_details = db.Column(db.Text, nullable=True)
    disability_registration = db.Column(db.String(100), nullable=True)
    criminal_conviction = db.Column(db.String(3), nullable=False, default="no")  # "yes" or "no"
    criminal_offence_details = db.Column(db.Text, nullable=True)
    dismissal_from_employment = db.Column(db.String(3), nullable=False, default="no")  # "yes" or "no"
    dismissal_reason = db.Column(db.Text, nullable=True)
    dismissal_date = db.Column(db.Date, nullable=True)

    # Relationship to access user details
    user = db.relationship('User', backref=db.backref('personal_details', lazy=True))

    def __repr__(self):
        return f'<PersonalDetails for User {self.user_id}>'
    
class NextOfKin(db.Model):
    __tablename__ = 'next_of_kin'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key linking to User
    kin_name = db.Column(db.String(255), nullable=False)
    kin_address = db.Column(db.Text, nullable=False)
    kin_tel = db.Column(db.String(20), nullable=False)
    kin_relationship = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to User (only defined in this model)
    user = db.relationship('User', backref=db.backref('next_of_kin', lazy=True))

    def __repr__(self):
        return f'<NextOfKin {self.kin_name} ({self.kin_relationship}) for User {self.user_id}>'
        
class WorkExperience(db.Model):
    __tablename__ = 'work_experience'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key linking to User
    job_title = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)  # Nullable for ongoing roles
    responsibilities = db.Column(db.Text, nullable=True)
    achievements = db.Column(db.Text, nullable=True)
    skills_acquired = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to User (only defined in this model)
    user = db.relationship('User', backref=db.backref('work_experience', lazy=True))

    def __repr__(self):
        return f'<WorkExperience {self.job_title} at {self.company_name} for User {self.user_id}>'
    
class Certificate(db.Model):
    __tablename__ = 'certificates'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key linking to User
    certificate_type = db.Column(db.String(50), nullable=False)  # KCSE, Diploma, Degree, etc.
    specialization = db.Column(db.String(100), nullable=False)  # Program specialization (e.g., Computer Science)
    institution_name = db.Column(db.String(200), nullable=False)  # Name of the institution
    year_of_completion = db.Column(db.Integer, nullable=False)  # Year of completion
    grade = db.Column(db.String(50), nullable=True)  # Grade/Score (e.g., A, First Class)
    additional_awards = db.Column(db.String(255), nullable=True)  # Additional awards
    file_path = db.Column(db.String(255), nullable=True)  # Path to the uploaded certificate file
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp for creation
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Timestamp for updates

    # Relationship to User (only defined in this model)
    user = db.relationship('User', backref=db.backref('certificates', lazy=True))

    def __repr__(self):
        return f'<Certificate {self.certificate_type} from {self.institution_name} for User {self.user_id}>'
    
class EducationalBackground(db.Model):
    __tablename__ = 'educational_backgrounds'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key to the User table
    school_name = db.Column(db.String(200), nullable=False)  # High school name
    year_completed = db.Column(db.Integer, nullable=False)  # Year graduated
    high_school_grade = db.Column(db.String(50))  # High school grade/class
    high_school_activities = db.Column(db.Text)  # Extracurricular activities
    university_name = db.Column(db.String(200))  # University name
    degree_program = db.Column(db.String(100))  # Degree/Program
    field_of_study = db.Column(db.String(100))  # Field of study
    university_grade = db.Column(db.String(50))  # University grade/class
    start_date = db.Column(db.Date)  # University start date
    end_date = db.Column(db.Date)  # University end date
    file_path = db.Column(db.String(500))  # Path to uploaded certificates or transcripts

    # Relationship to the User model
    user = db.relationship('User', backref=db.backref('educational_backgrounds', lazy=True))

class ProfessionalQualifications(db.Model):
    __tablename__ = 'professional_qualifications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key to User
    year_from = db.Column(db.Integer, nullable=False)
    year_to = db.Column(db.Integer, nullable=False)
    institution = db.Column(db.String(255), nullable=False)
    award = db.Column(db.String(255), nullable=False)
    specialization = db.Column(db.String(255), nullable=False)
    grade = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp for record creation

    # Relationship to User
    user = db.relationship('User', backref=db.backref('professional_qualifications', lazy=True))

    def __repr__(self):
        return f"<ProfessionalQualifications {self.id}>"
    
class RelevantCoursesAndProfessionalBody(db.Model):
    __tablename__ = 'relevant_courses_and_professional_bodies'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key to User
    year = db.Column(db.Integer)  # Year of the course
    institution = db.Column(db.String(255))  # Institution offering the course
    course_name = db.Column(db.String(255))  # Name of the course
    details = db.Column(db.Text)  # Course details
    duration = db.Column(db.String(255))  # Duration of the course
    body_name = db.Column(db.String(255))  # Name of the professional body
    membership_no = db.Column(db.String(255))  # Membership number for the professional body
    membership_type = db.Column(db.String(255))  # Type of membership (e.g., Full, Associate)
    renewal_date = db.Column(db.Date)  # Date when membership needs to be renewed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp for record creation

    # Relationship to User
    user = db.relationship('User', backref=db.backref('relevant_courses_and_professional_bodies', lazy=True))

    def __repr__(self):
        return f"<RelevantCoursesAndProfessionalBody {self.id} - {self.course_name} / {self.body_name}>"

class EmploymentDetails(db.Model):
    __tablename__ = 'employment_details'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key linking to User
    year = db.Column(db.String(10), nullable=True)
    designation = db.Column(db.String(255), nullable=True)
    job_group = db.Column(db.String(100), nullable=True)
    gross_salary = db.Column(db.Numeric(10, 2), nullable=True)
    ministry = db.Column(db.String(255), nullable=True)
    from_date = db.Column(db.Date, nullable=True)
    to_date = db.Column(db.Date, nullable=True)
    duties = db.Column(db.Text, nullable=True)
    publications = db.Column(db.Text, nullable=True)
    skills_experience = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to User (only defined in this model)
    user = db.relationship('User', backref=db.backref('employment_details', lazy=True))

    def __repr__(self):
        return f'<EmploymentDetails {self.designation} for User {self.user_id}>'
    
class Referee(db.Model):
    __tablename__ = 'referees'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Link referees to a user
    full_name = db.Column(db.String(255), nullable=False)
    occupation = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    post_code = db.Column(db.String(20), nullable=True)
    city_town = db.Column(db.String(100), nullable=False)
    mobile_no = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    known_period = db.Column(db.String(100), nullable=False)

    user = db.relationship('User', backref=db.backref('referees', lazy=True))

    def __repr__(self):
        return f"<Referee {self.full_name} - {self.occupation}>"
    
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
    grade = db.Column(db.Integer, nullable=False)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Job {self.position}>'
