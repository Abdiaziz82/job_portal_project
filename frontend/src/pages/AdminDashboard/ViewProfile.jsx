import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaUsers,
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaUserTie,
  FaBook,
  FaAddressBook,
  FaFilePdf,
  FaArrowLeft, // Back icon
} from "react-icons/fa";

const ViewProfile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in URL");
      setLoading(false);
      return;
    }

    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/applications/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      {/* Back Button - Top Right */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <FaArrowLeft className="text-lg" /> {/* Larger icon */}
          <span className="text-sm">Go Back</span>
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <FaUser className="mr-2" /> User Profile
      </h2>

      {/* ✅ Personal Details */}
      {profileData.personal_details && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="mr-2" /> Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Name:</strong> {profileData.personal_details.full_names}</p>
            <p><strong>Title:</strong> {profileData.personal_details.title}</p>
            <p><strong>Date of Birth:</strong> {profileData.personal_details.date_of_birth}</p>
            <p><strong>ID Number:</strong> {profileData.personal_details.id_number}</p>
            <p><strong>Gender:</strong> {profileData.personal_details.gender}</p>
            <p><strong>Nationality:</strong> {profileData.personal_details.nationality}</p>
            <p><strong>Home County:</strong> {profileData.personal_details.home_county}</p>
            <p><strong>Constituency:</strong> {profileData.personal_details.constituency}</p>
            <p><strong>Postal Address:</strong> {profileData.personal_details.postal_address}</p>
            <p><strong>Mobile:</strong> {profileData.personal_details.mobile_number}</p>
            <p><strong>Email:</strong> {profileData.personal_details.email_address}</p>
            <p><strong>Alternative Contact Name:</strong> {profileData.personal_details.alternative_contact_name}</p>
            <p><strong>Alternative Contact Phone:</strong> {profileData.personal_details.alternative_contact_phone}</p>
            <p><strong>Disability:</strong> {profileData.personal_details.disability}</p>
            <p><strong>Disability Details:</strong> {profileData.personal_details.disability_details}</p>
            <p><strong>Disability Registration:</strong> {profileData.personal_details.disability_registration}</p>
            <p><strong>Criminal Conviction:</strong> {profileData.personal_details.criminal_conviction}</p>
            <p><strong>Criminal Offence Details:</strong> {profileData.personal_details.criminal_offence_details}</p>
            <p><strong>Dismissal from Employment:</strong> {profileData.personal_details.dismissal_from_employment}</p>
            <p><strong>Dismissal Reason:</strong> {profileData.personal_details.dismissal_reason}</p>
            <p><strong>Dismissal Date:</strong> {profileData.personal_details.dismissal_date}</p>
          </div>
        </div>
      )}

      {/* ✅ Next of Kin */}
      {profileData.next_of_kin?.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaUsers className="mr-2" /> Next of Kin
          </h3>
          {profileData.next_of_kin.map((kin, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Name:</strong> {kin.kin_name}</p>
              <p><strong>Relationship:</strong> {kin.kin_relationship}</p>
              <p><strong>Phone:</strong> {kin.kin_tel}</p>
              <p><strong>Address:</strong> {kin.kin_address}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Educational Background */}
      {profileData.education?.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaGraduationCap className="mr-2" /> Educational Background
          </h3>
          {profileData.education.map((edu, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Institution:</strong> {edu.university_name || edu.school_name}</p>
              <p><strong>Degree:</strong> {edu.degree_program}</p>
              <p><strong>Field:</strong> {edu.field_of_study}</p>
              <p><strong>Year:</strong> {edu.year_completed}</p>
              <p><strong>High School Grade:</strong> {edu.high_school_grade}</p>
              <p><strong>High School Activities:</strong> {edu.high_school_activities}</p>
              <p><strong>University Grade:</strong> {edu.university_grade}</p>
              <p><strong>Start Date:</strong> {edu.start_date}</p>
              <p><strong>End Date:</strong> {edu.end_date}</p>

              {/* ✅ Display Multiple File Links */}
              {edu.file_paths?.length > 0 ? (
                <div className="flex flex-col sm:col-span-2">
                  <strong className="text-sm text-gray-700 w-40">Documents:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {edu.file_paths.map((file, i) => (
                      <a
                        key={i}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1 rounded-md shadow-sm transition-all hover:bg-blue-700 duration-200"
                      >
                        <FaFilePdf className="text-white text-sm" />
                        <span>View {i + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No document uploaded</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Employment Details */}
      {profileData.employment_details?.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaBriefcase className="mr-2" /> Employment Details
          </h3>
          {profileData.employment_details.map((job, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Designation:</strong> {job.designation}</p>
              <p><strong>Ministry:</strong> {job.ministry}</p>
              <p><strong>From:</strong> {job.from_date} - <strong>To:</strong> {job.to_date}</p>
              <p><strong>Gross Salary:</strong> ${job.gross_salary}</p>
              <p><strong>Job Group:</strong> {job.job_group}</p>
              <p><strong>Duties:</strong> {job.duties}</p>
              <p><strong>Publications:</strong> {job.publications}</p>
              <p><strong>Skills and Experience:</strong> {job.skills_experience}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Certificates */}
      {profileData.certificates?.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaCertificate className="mr-2" /> Certificates
          </h3>
          {profileData.certificates.map((cert, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Type:</strong> {cert.certificate_type}</p>
              <p><strong>Specialization:</strong> {cert.specialization}</p>
              <p><strong>Institution:</strong> {cert.institution_name}</p>
              <p><strong>Year:</strong> {cert.year_of_completion}</p>
              <p><strong>Grade:</strong> {cert.grade}</p>
              <p><strong>Additional Awards:</strong> {cert.additional_awards}</p>

              {/* ✅ Display Multiple Certificate Files */}
              {cert.file_paths?.length > 0 ? (
                <div className="flex flex-col sm:col-span-2">
                  <strong className="text-sm text-gray-700 w-40">Certificates:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {cert.file_paths.map((file, i) => (
                      <a
                        key={i}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1 rounded-md shadow-sm transition-all hover:bg-blue-700 duration-200"
                      >
                        <FaFilePdf className="text-white text-sm" />
                        <span>View {i + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No certificate uploaded</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Professional Qualifications */}
      {profileData.professional_qualifications?.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaUserTie className="mr-2" /> Professional Qualifications
          </h3>
          {profileData.professional_qualifications.map((qual, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Institution:</strong> {qual.institution}</p>
              <p><strong>Award:</strong> {qual.award}</p>
              <p><strong>Specialization:</strong> {qual.specialization}</p>
              <p><strong>Year:</strong> {qual.year_from} - {qual.year_to}</p>
              <p><strong>Grade:</strong> {qual.grade}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Relevant Courses and Professional Bodies */}
      {profileData.relevant_courses?.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaBook className="mr-2" /> Relevant Courses and Professional Bodies
          </h3>
          {profileData.relevant_courses.map((course, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Year:</strong> {course.year}</p>
              <p><strong>Institution:</strong> {course.institution}</p>
              <p><strong>Course Name:</strong> {course.course_name}</p>
              <p><strong>Details:</strong> {course.details}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Body Name:</strong> {course.body_name}</p>
              <p><strong>Membership No:</strong> {course.membership_no}</p>
              <p><strong>Membership Type:</strong> {course.membership_type}</p>
              <p><strong>Renewal Date:</strong> {course.renewal_date}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Referees */}
      {profileData.referees?.length > 0 && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaAddressBook className="mr-2" /> Referees
          </h3>
          {profileData.referees.map((ref, index) => (
            <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Name:</strong> {ref.full_name}</p>
              <p><strong>Occupation:</strong> {ref.occupation}</p>
              <p><strong>Email:</strong> {ref.email}</p>
              <p><strong>Phone:</strong> {ref.mobile_no}</p>
              <p><strong>Address:</strong> {ref.address}</p>
              <p><strong>Post Code:</strong> {ref.post_code}</p>
              <p><strong>City/Town:</strong> {ref.city_town}</p>
              <p><strong>Known Period:</strong> {ref.known_period}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;