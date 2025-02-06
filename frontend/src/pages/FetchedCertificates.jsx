import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function FetchedCertificates() {
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/certificates", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleEditClick = (certificate) => {
    navigate("edit-certificate", { state: { certificate } });
  };

  const handleDelete = async (certificateId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/certificates/${certificateId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setCertificates((prevCertificates) =>
          prevCertificates.filter((cert) => cert.id !== certificateId)
        );
        alert("Certificate deleted successfully.");
      } else {
        const error = await response.json();
        console.error("Failed to delete certificate:", error.error);
        alert(`Failed to delete certificate: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert("An error occurred while deleting the certificate. Please try again.");
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
          Add Certificate
        </Link>
      </div>
  
      {certificates.length > 0 && <div className="border-t-2 border-gray-300 my-6"></div>}
  
      {certificates.length > 0 ? (
        certificates.map((certificate, index) => (
          <div key={certificate.id}>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Certificate Type:</strong>
                <span className="text-sm text-gray-600 flex-1">{certificate.certificate_type}</span>
              </div>
  
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Specialization:</strong>
                <span className="text-sm text-gray-600 flex-1">{certificate.specialization}</span>
              </div>
  
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Institution:</strong>
                <span className="text-sm text-gray-600 flex-1">{certificate.institution_name}</span>
              </div>
  
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Year of Completion:</strong>
                <span className="text-sm text-gray-600 flex-1">{certificate.year_of_completion}</span>
              </div>
  
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Grade:</strong>
                <span className="text-sm text-gray-600 flex-1">{certificate.grade}</span>
              </div>
  
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Additional Awards:</strong>
                <span className="text-sm text-gray-600 flex-1">{certificate.additional_awards}</span>
              </div>
  
              {certificate.file_path && (
                <div className="flex items-start sm:col-span-2">
                  <strong className="text-sm text-gray-700 w-40">File:</strong>
                  <a
                    href={certificate.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Certificate
                  </a>
                </div>
              )}
            </div>
  
            <div className="flex space-x-4 mt-4">
              <div
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(certificate)}
              >
                <FaEdit className="mr-2" />
                <span>Edit</span>
              </div>
              <div
                className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDelete(certificate.id)}
              >
                <FaTrash className="mr-2" />
                <span>Remove</span>
              </div>
            </div>
  
            {index !== certificates.length - 1 && <div className="border-t-2 border-gray-300 my-6"></div>}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No certificates added yet.</p>
      )}
    </div>
  );
  
}
