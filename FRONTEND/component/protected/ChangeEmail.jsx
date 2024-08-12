import React, { useState, useEffect } from "react";
import axios from "axios";

const ChangeEmail = ({ onClose, token, setEmail, initialEmail }) => {
  const [newEmail, setNewEmail] = useState(initialEmail || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/user/profile/email",
        { newEmail: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmail(newEmail);
      setSuccess("Email updated successfully.");
      setNewEmail(""); // Clear input field
      setTimeout(() => onClose(), 500); // Close modal after 2 seconds
    } catch (error) {
      console.error("Error updating email", error);
      setError(
        error.response?.data?.message ||
          "Failed to update email. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="newEmail"
              className="block text-lg font-medium mb-2"
            >
              New Email:
            </label>
            <input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new email"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
