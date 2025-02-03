import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function FetchedCertificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/certificates", {
        credentials: "include", // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      } else {
        console.error("Failed to fetch certificates:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Certificates
        </h2>
        <Link
          to="certificates"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          {certificates.length > 0 ? `Update Certificates` : `Add Certificates`}
        </Link>
      </div>
      {certificates.length > 0 ? (
        certificates.map((certificate) => (
          <div key={certificate.id} className="mt-4 space-y-2">
            <h3 className="text-md font-semibold">{certificate.certificate_type}</h3>
            <p className="text-sm text-gray-600">
              <strong>Specialization:</strong> {certificate.specialization}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Institution:</strong> {certificate.institution_name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Year of Completion:</strong> {certificate.year_of_completion}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Grade:</strong> {certificate.grade}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Additional Awards:</strong> {certificate.additional_awards}
            </p>
            {certificate.file_path && (
              <a
                href={`http://localhost:5000/${certificate.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View Certificate File
              </a>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No certificates added yet.</p>
      )}
    </div>
  );
}