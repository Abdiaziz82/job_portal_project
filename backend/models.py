from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from datetime import datetime ,timedelta ,timezone

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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
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
    alternative_contact_name = db.Column(db.String(200), nullable=True)
    alternative_contact_phone = db.Column(db.String(20), nullable=True)
    disability = db.Column(db.String(3), nullable=False, default="no")
    disability_details = db.Column(db.Text, nullable=True)
    disability_registration = db.Column(db.String(100), nullable=True)
    criminal_conviction = db.Column(db.String(3), nullable=False, default="no")
    criminal_offence_details = db.Column(db.Text, nullable=True)
    dismissal_from_employment = db.Column(db.String(3), nullable=False, default="no")
    dismissal_reason = db.Column(db.Text, nullable=True)
    dismissal_date = db.Column(db.Date, nullable=True)

    user = db.relationship('User', backref=db.backref('personal_details', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f'<PersonalDetails for User {self.user_id}>'

    
class NextOfKin(db.Model):
    __tablename__ = 'next_of_kin'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    kin_name = db.Column(db.String(255), nullable=False)
    kin_address = db.Column(db.Text, nullable=False)
    kin_tel = db.Column(db.String(20), nullable=False)
    kin_relationship = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('next_of_kin', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f'<NextOfKin {self.kin_name} ({self.kin_relationship}) for User {self.user_id}>'


    
class Certificate(db.Model):
    __tablename__ = 'certificates'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    certificate_type = db.Column(db.String(50), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    institution_name = db.Column(db.String(200), nullable=False)
    year_of_completion = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.String(50), nullable=True)
    additional_awards = db.Column(db.String(255), nullable=True)
    file_path = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('certificates', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f'<Certificate {self.certificate_type} from {self.institution_name} for User {self.user_id}>'

class EducationalBackground(db.Model):
    __tablename__ = 'educational_backgrounds'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    school_name = db.Column(db.String(200), nullable=False)
    year_completed = db.Column(db.Integer, nullable=False)
    high_school_grade = db.Column(db.String(50))
    high_school_activities = db.Column(db.Text)
    university_name = db.Column(db.String(200))
    degree_program = db.Column(db.String(100))
    field_of_study = db.Column(db.String(100))
    university_grade = db.Column(db.String(50))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    file_path = db.Column(db.Text, nullable=False)

    user = db.relationship('User', backref=db.backref('educational_backgrounds', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

class ProfessionalQualifications(db.Model):
    __tablename__ = 'professional_qualifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    year_from = db.Column(db.Integer, nullable=False)
    year_to = db.Column(db.Integer, nullable=False)
    institution = db.Column(db.String(255), nullable=False)
    award = db.Column(db.String(255), nullable=False)
    specialization = db.Column(db.String(255), nullable=False)
    grade = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('professional_qualifications', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    
class RelevantCoursesAndProfessionalBody(db.Model):
    __tablename__ = 'relevant_courses_and_professional_bodies'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    year = db.Column(db.String(255))  # Ensure this matches your database schema
    institution = db.Column(db.String(255))
    course_name = db.Column(db.String(255))
    details = db.Column(db.Text)
    duration = db.Column(db.String(255))
    body_name = db.Column(db.String(255))
    membership_no = db.Column(db.String(255))
    membership_type = db.Column(db.String(255))
    renewal_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('relevant_courses_and_professional_bodies', lazy=True))

    def to_dict(self):
        """Convert the model instance to a dictionary dynamically."""
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f"<RelevantCoursesAndProfessionalBody {self.course_name} - {self.institution}>"

class EmploymentDetails(db.Model):
    __tablename__ = 'employment_details'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    year = db.Column(db.String(10), nullable=True)
    designation = db.Column(db.String(255), nullable=True)
    job_group = db.Column(db.String(100), nullable=True)
    gross_salary = db.Column(db.Numeric(10, 2), nullable=True)
    ministry = db.Column(db.String(255), nullable=True)
    from_date = db.Column(db.Date, nullable=True)
    to_date = db.Column(db.Date, nullable=True)
    duties = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('employment_details', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f'<EmploymentDetails {self.designation} for User {self.user_id}>'

class Referee(db.Model):
    __tablename__ = 'referees'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    occupation = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    post_code = db.Column(db.String(20), nullable=True)
    city_town = db.Column(db.String(100), nullable=False)
    mobile_no = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    known_period = db.Column(db.String(100), nullable=False)

    user = db.relationship('User', backref=db.backref('referees', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f"<Referee {self.full_name} - {self.occupation}>"
    
class Publication(db.Model):
    __tablename__ = 'publications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    publications = db.Column(db.Text, nullable=False)  # Field to store publications

    # Relationship to the User model
    user = db.relationship('User', backref=db.backref('publications', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f"<Publication {self.id} - User {self.user_id}>"

class Duties(db.Model):
    __tablename__ = 'duties'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Link to the user
    duties = db.Column(db.Text, nullable=False)  # Field to store duties

    # Relationship to the User model
    user = db.relationship('User', backref=db.backref('duties', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f"<Duties {self.id} - User {self.user_id}>"
    
class Declaration(db.Model):
    __tablename__ = 'declarations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Link to the user
    date = db.Column(db.Date, nullable=False)  # Field to store the date
    name = db.Column(db.String(255), nullable=False)  # Field to store the name

    # Relationship to the User model
    user = db.relationship('User', backref=db.backref('declarations', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f"<Declaration {self.id} - User {self.user_id}>"

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
        
class AdminRefreshToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    admin_email = db.Column(db.String(255), nullable=False, unique=True)
    token = db.Column(db.String(512), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)


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
    requirements = db.Column(db.Text, nullable=False)
    duties = db.Column(db.Text, nullable=False) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)  # Soft delete flag
    interview_date = db.Column(db.DateTime, nullable=True)  # Nullable to avoid issues with old records

    def __repr__(self):
        return f'<Job {self.position}>'

class JobApplication(db.Model):
    __tablename__ = 'job_applications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id', ondelete="SET NULL"), nullable=True)
    status = db.Column(db.String(20), default='Pending')  # Pending, Accepted, Rejected
    applied_at = db.Column(db.DateTime, default=lambda: datetime.utcnow() + timedelta(hours=3))

    user = db.relationship('User', backref='applications')
    job = db.relationship('Job', backref=db.backref('applications', lazy=True))

    def __repr__(self):
        return f'<JobApplication User {self.user_id} - Job {self.job_id}>'
    
class SavedJobs(db.Model):
    __tablename__ = 'saved_jobs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id', ondelete="CASCADE"), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('saved_jobs', lazy=True, cascade="all, delete-orphan"))
    job = db.relationship('Job', backref=db.backref('saved_by_users', lazy=True, cascade="all, delete-orphan"))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f'<SavedJobs User {self.user_id} saved Job {self.job_id}>'
