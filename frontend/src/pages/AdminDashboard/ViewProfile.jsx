import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  const { userId, jobId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("User ID:", userId);  // Debugging
    console.log("Job ID:", jobId);    // Debugging

    if (!userId || !jobId) {
      setError("Invalid user or job ID.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:5000/admin/user-profile/${userId}/${jobId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProfile(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("An error occurred while fetching the profile.");
        setLoading(false);
      });
  }, [userId, jobId]);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">User Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">{profile.personal_details?.full_name}</h3>
        <p><strong>Email:</strong> {profile.personal_details?.email}</p>
        <p><strong>Phone:</strong> {profile.personal_details?.phone}</p>

        <h4 className="mt-4 font-bold text-lg">Education</h4>
        {profile.education.length > 0 ? (
          profile.education.map((edu, index) => (
            <p key={index}>{edu.degree} - {edu.institution}</p>
          ))
        ) : (
          <p>No education details available.</p>
        )}

        <h4 className="mt-4 font-bold text-lg">Certificates</h4>
        {profile.certificates.length > 0 ? (
          profile.certificates.map((cert, index) => (
            <p key={index}>{cert.name}</p>
          ))
        ) : (
          <p>No certificates available.</p>
        )}

        <h4 className="mt-4 font-bold text-lg">Employment</h4>
        {profile.employment_details.length > 0 ? (
          profile.employment_details.map((job, index) => (
            <p key={index}>{job.position} at {job.company}</p>
          ))
        ) : (
          <p>No employment details available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
