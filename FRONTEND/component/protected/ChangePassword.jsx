import React, { useState } from "react";
import axios from "axios";

const ChangePassword = ({ onClose, token }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/user/profile/password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setTimeout(() => onClose(), 500); 
    } catch (error) {
      console.error("Error updating password", error);
      setError(
        error.response?.data?.message ||
          "Failed to update password. Please try again." 
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="oldPassword"
              className="block text-lg font-medium mb-2"
            >
              Old Password:
            </label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full border-gray-300 rounded-lg p-2"
              placeholder="Enter your old password"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="newPassword"
              className="block text-lg font-medium mb-2"
            >
              New Password:
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border-gray-300 rounded-lg p-2"
              placeholder="Enter your new password"
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4 border border-red-300 p-2 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-500 mb-4 border border-green-300 p-2 rounded">
              {success}
            </div>
          )}
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

export default ChangePassword;
