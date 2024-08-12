import React, { useState, useEffect } from "react";
import axios from "axios";

const ChangeEmailPreference = ({
  onClose,
  token,
  setEmailNotificationUser,
  initialEmailNotification,
}) => {
  const [emailNotification, setEmailNotification] = useState(
    initialEmailNotification
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/user/profile/notification",
        { emailNotificationUser: emailNotification },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmailNotificationUser(emailNotification);
      setSuccessMessage("Email notification preference updated successfully.");
      setTimeout(() => onClose(), 500);
    } catch (error) {
      console.error("Error updating email notification preference", error);
      setErrorMessage(
        "Failed to update email notification preference. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Change Email Preference</h2>
        {successMessage && (
          <div className="text-green-500 mb-4 border border-green-300 p-2 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 mb-4 border border-red-300 p-2 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={emailNotification}
              onChange={(e) => setEmailNotification(e.target.checked)}
              className="mr-2"
            />
            <label className="text-lg">Receive email notifications</label>
          </div>
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

export default ChangeEmailPreference;
