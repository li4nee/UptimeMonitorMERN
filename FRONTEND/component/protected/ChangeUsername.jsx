import React, { useState } from "react";
import axios from "axios";

const ChangeUsername = ({ onClose, token, setUsername }) => {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const [success, setSuccess] = useState(""); // State to store success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before making the request
    setSuccess(""); // Reset success state before making the request

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/user/profile/username",
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(newUsername); 
      setSuccess("Username updated successfully.");
      setNewUsername(""); 
      setTimeout(() => onClose(), 500); 
    } catch (error) {
      console.error("Error updating username", error);
      setError(
        error.response?.data?.message || 
        "Failed to update username. Please try again."
      ); // Display error message
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-4">Change Username</h3>
        {success && (
          <div className="text-green-500 mb-4 border border-green-300 p-2 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="text-red-500 mb-4 border border-red-300 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeUsername;
