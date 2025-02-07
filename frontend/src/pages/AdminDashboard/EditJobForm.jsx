import React from "react";

const EditJobForm = ({ formData, handleChange, handleUpdate, onCancel }) => {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Edit Job</h3>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="advert"
          value={formData.advert}
          onChange={handleChange}
          placeholder="Advert"
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="termsOfService"
          value={formData.termsOfService}
          onChange={handleChange}
          placeholder="Terms of Service"
          rows="2"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="number"
          name="numberOfPosts"
          value={formData.numberOfPosts}
          onChange={handleChange}
          placeholder="Number of Posts"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Grade"
          rows="2"
          className="w-full p-2 border rounded-md"
          required
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Update Job
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobForm;
