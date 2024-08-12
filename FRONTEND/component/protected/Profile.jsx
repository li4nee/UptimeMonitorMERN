import { useState, useEffect } from "react";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeEmailPreference from "./ChangeEmailPreference";
import useToken from "../../src/Context";
import axios from "axios";
import Pnavbar from "../protected/PNavbar";

const Profile = () => {
  const [modals, setModals] = useState({
    username: false,
    email: false,
    password: false,
    emailPreference: false,
  });

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    emailNotificationUser: "",
  });

  const { token } = useToken();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile({
          username: response.data.username,
          email: response.data.email,
          emailNotificationUser: response.data.emailNotificationUser,
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, [token]);

  const toggleModal = (type) => {
    setModals((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <>
      <Pnavbar />
      <div className="bg-gray-900 text-gray-800 min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
        <div className="bg-gray-800 p-6 md:p-10 rounded-xl shadow-lg w-full max-w-4xl">
          <h2 className="text-3xl text-white font-bold mb-6 border-b border-gray-600 pb-3">
            Profile Management
          </h2>
          <div className="space-y-8 text-white">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <p className="text-xl mb-3">
                <span className="font-semibold">Username:</span>{" "}
                {profile.username}
              </p>
              <p className="text-xl mb-3">
                <span className="font-semibold">Email:</span> {profile.email}
              </p>
              <p className="text-xl">
                <span className="font-semibold">Email Notifications:</span>{" "}
                {profile.emailNotificationUser ? "Enabled" : "Disabled"}
              </p>
            </div>
            <div className="space-y-4">
              <button
                className="w-full bg-gray-600 text-white py-3 px-5 rounded-lg shadow-sm hover:bg-gray-500 transition-transform transform hover:scale-105"
                onClick={() => toggleModal("username")}
              >
                Change Username
              </button>
              <button
                className="w-full bg-gray-600 text-white py-3 px-5 rounded-lg shadow-sm hover:bg-gray-500 transition-transform transform hover:scale-105"
                onClick={() => toggleModal("email")}
              >
                Change Email
              </button>
              <button
                className="w-full bg-gray-600 text-white py-3 px-5 rounded-lg shadow-sm hover:bg-gray-500 transition-transform transform hover:scale-105"
                onClick={() => toggleModal("password")}
              >
                Change Password
              </button>
              <button
                className="w-full bg-gray-600 text-white py-3 px-5 rounded-lg shadow-sm hover:bg-gray-500 transition-transform transform hover:scale-105"
                onClick={() => toggleModal("emailPreference")}
              >
                Change Email Preference
              </button>
            </div>
          </div>

          {modals.username && (
            <ChangeUsername
              onClose={() => toggleModal("username")}
              token={token}
              setUsername={(username) =>
                setProfile((prev) => ({ ...prev, username }))
              }
            />
          )}
          {modals.email && (
            <ChangeEmail
              onClose={() => toggleModal("email")}
              token={token}
              setEmail={(email) => setProfile((prev) => ({ ...prev, email }))}
              initialEmail={profile.email}
            />
          )}
          {modals.password && (
            <ChangePassword
              onClose={() => toggleModal("password")}
              token={token}
            />
          )}
          {modals.emailPreference && (
            <ChangeEmailPreference
              onClose={() => toggleModal("emailPreference")}
              token={token}
              initialEmailNotification={profile.emailNotificationUser}
              setEmailNotificationUser={(emailNotificationUser) =>
                setProfile((prev) => ({ ...prev, emailNotificationUser }))
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
