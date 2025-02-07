import React, { useState } from "react";

const ManageJobs = () => {
  const [formData, setFormData] = useState({
    position: "",
    description: "",
    advert: "",
    termsOfService: "",
    numberOfPosts: "",
    applicationDeadline: "",
    grade: "", 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to post the job");
      }

      // Reset form
      setFormData({
        position: "",
        description: "",
        advert: "",
        termsOfService: "",
        numberOfPosts: "",
        applicationDeadline: "",
        grade: "", 
      });

      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Post a New Job</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-xl font-semibold">Job Details</h3>

        {/* Position */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Advert */}
        <div>
          <label htmlFor="advert" className="block text-sm font-medium">
            Advert
          </label>
          <textarea
            id="advert"
            name="advert"
            value={formData.advert}
            onChange={handleChange}
            required
            rows="2"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Terms of Service */}
        <div>
          <label htmlFor="termsOfService" className="block text-sm font-medium">
            Terms of Service
          </label>
          <textarea
            id="termsOfService"
            name="termsOfService"
            value={formData.termsOfService}
            onChange={handleChange}
            required
            rows="3"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Number of Posts */}
        <div>
          <label htmlFor="numberOfPosts" className="block text-sm font-medium">
            Number of Posts
          </label>
          <input
            type="number"
            id="numberOfPosts"
            name="numberOfPosts"
            value={formData.numberOfPosts}
            onChange={handleChange}
            required
            min="1"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label htmlFor="applicationDeadline" className="block text-sm font-medium">
            Application Deadline
          </label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Grade */}
        <div>
          <label htmlFor="grade" className="block text-sm font-medium">
            Grade
          </label>
          <input
            type="number"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 mt-4 text-white font-semibold rounded-md ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Posting Job..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default ManageJobs;
