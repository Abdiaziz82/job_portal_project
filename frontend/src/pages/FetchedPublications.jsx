import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Importing react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importing the CSS for react-toastify

export default function FetchedPublications() {
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/publications", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setPublications(data);
      } else {
        console.error("Failed to fetch publications:", response.statusText);
        toast.error("Failed to fetch publications"); // Toast for fetch error
      }
    } catch (error) {
      console.error("Error fetching publications:", error);
      toast.error("Error fetching publications"); // Toast for fetch error
    }
  };

  const handleEditClick = (publication) => {
    navigate("edit-publication", { state: { publication } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this publication?"))
      return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/publications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setPublications(publications.filter((pub) => pub.id !== id));
        toast.success("Publication deleted successfully"); // Toast for delete success
      } else {
        console.error("Failed to delete publication:", response.statusText);
        toast.error("Failed to delete publication"); // Toast for delete error
      }
    } catch (error) {
      console.error("Error deleting publication:", error);
      toast.error("Error deleting publication"); // Toast for delete error
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden">
      <ToastContainer /> {/* ToastContainer to display notifications */}
      {/* Thin Line at the Top */}
      <div className="border-t-2 border-gray-300 mb-4"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Publications
        </h2>
        <Link
          to="publications-form"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Publications
        </Link>
      </div>

      {publications.length > 0 ? (
        publications.map((publication) => (
          <div key={publication.id} className="mt-4 border-b pb-4">
            <h3 className="text-md font-semibold mb-2">Publication Details</h3>

            {/* Grid for Two-Column Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <strong>Publications:</strong> {publication.publications}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(publication)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDelete(publication.id)}
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-600">
          No publications added yet. Click on Add Publications to add your
          publications.
        </p>
      )}
    </div>
  );
}