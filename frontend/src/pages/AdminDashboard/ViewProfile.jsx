import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const ViewProfile = () => {
  const { userId } = useParams(); // ✅ Extract userId from URL
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          `http://127.0.0.1:5000/applications/${userId}`, // ✅ userId is now properly used
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>

      {/* ✅ Personal Details */}
      {profileData.personal_details && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Personal Details</h3>
          <p><strong>Name:</strong> {profileData.personal_details.full_name}</p>
          <p><strong>Email:</strong> {profileData.personal_details.email_address}</p>
          <p><strong>Phone:</strong> {profileData.personal_details.mobile_number}</p>
          <p><strong>Gender:</strong> {profileData.personal_details.gender}</p>
          <p><strong>Nationality:</strong> {profileData.personal_details.nationality}</p>
        </div>
      )}

      {/* ✅ Next of Kin */}
      {profileData.next_of_kin?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Next of Kin</h3>
          {profileData.next_of_kin.map((kin, index) => (
            <div key={index} className="mb-3">
              <p><strong>Name:</strong> {kin.full_name}</p>
              <p><strong>Relationship:</strong> {kin.relationship}</p>
              <p><strong>Phone:</strong> {kin.phone_number}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Educational Background */}
      {profileData.education?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Educational Background</h3>
          {profileData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <p><strong>Institution:</strong> {edu.university_name || edu.school_name}</p>
              <p><strong>Degree:</strong> {edu.degree_program}</p>
              <p><strong>Field:</strong> {edu.field_of_study}</p>
              <p><strong>Year:</strong> {edu.year_completed}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Certificates */}
      {profileData.certificates?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Certificates</h3>
          {profileData.certificates.map((cert, index) => (
            <div key={index} className="mb-3">
              <p><strong>Type:</strong> {cert.certificate_type}</p>
              <p><strong>Specialization:</strong> {cert.specialization}</p>
              <p><strong>Institution:</strong> {cert.institution_name}</p>
              <p><strong>Year:</strong> {cert.year_of_completion}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Professional Qualifications */}
      {profileData.professional_qualifications?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Professional Qualifications</h3>
          {profileData.professional_qualifications.map((qual, index) => (
            <div key={index} className="mb-3">
              <p><strong>Institution:</strong> {qual.institution}</p>
              <p><strong>Award:</strong> {qual.award}</p>
              <p><strong>Specialization:</strong> {qual.specialization}</p>
              <p><strong>Year:</strong> {qual.year_from} - {qual.year_to}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Relevant Courses & Professional Body */}
      {profileData.relevant_courses?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Relevant Courses & Professional Membership</h3>
          {profileData.relevant_courses.map((course, index) => (
            <div key={index} className="mb-3">
              <p><strong>Course:</strong> {course.course_name}</p>
              <p><strong>Institution:</strong> {course.institution}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Membership:</strong> {course.body_name} ({course.membership_no})</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Employment Details */}
      {profileData.employment_details?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Employment Details</h3>
          {profileData.employment_details.map((job, index) => (
            <div key={index} className="mb-3">
              <p><strong>Designation:</strong> {job.designation}</p>
              <p><strong>Ministry:</strong> {job.ministry}</p>
              <p><strong>From:</strong> {job.from_date} - <strong>To:</strong> {job.to_date}</p>
              <p><strong>Gross Salary:</strong> ${job.gross_salary}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Referees */}
      {profileData.referees?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Referees</h3>
          {profileData.referees.map((ref, index) => (
            <div key={index} className="mb-3">
              <p><strong>Name:</strong> {ref.full_name}</p>
              <p><strong>Occupation:</strong> {ref.occupation}</p>
              <p><strong>Email:</strong> {ref.email}</p>
              <p><strong>Phone:</strong> {ref.mobile_no}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
