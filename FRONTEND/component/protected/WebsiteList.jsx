import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useToken from "../../src/Context";
import { toast, ToastContainer } from "react-toastify";
const WebsitesList = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    const fetchWebsites = async () => {
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/p/website", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userNotification = response.data.userNotification;

        if (!userNotification) {
          toast.info(
            "You won't receive notification emails as your profile settings are off. Please enable them in your profile.",
            {
              autoClose: 10000,
            }
          );
        }

        if (Array.isArray(response.data.websites)) {
          setWebsites(response.data.websites);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        setError("Failed to fetch websites.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, [token]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-400";
      case "Down":
        return "bg-red-400";
      case "Checking":
        return "bg-yellow-400";
      default:
        return "bg-gray-400";
    }
  };

  const ErrorDisplay = ({ message }) => (
    <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
      {message}
    </div>
  );

  const EmptyState = () => (
    <div className="bg-slate-700 text-gray-400 p-4 rounded-lg shadow-lg text-center">
      No websites to display.
    </div>
  );

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="w-full min-h-screen p-4 bg-slate-700">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Websites to Monitor
          </h2>
          {loading && <div className="text-white text-center">Loading...</div>}
          {error && <ErrorDisplay message={error} />}
          {!loading && !error && websites.length === 0 && <EmptyState />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(websites) &&
              websites.map((website) => (
                <div
                  key={website._id}
                  className="bg-gray-800 p-6 rounded-lg border border-gray-500 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block w-4 h-4 rounded-full ${getStatusClass(
                          website.status
                        )}`}
                      ></span>
                      <h3 className="text-xl font-semibold text-blue-500">
                        {website.website}
                      </h3>
                    </div>

                    <p className="text-gray-300">
                      <strong>Email:</strong> {website.email}
                    </p>
                    <p className="text-gray-300">
                      <strong>Last Checked:</strong>{" "}
                      {new Date(website.lastChecked).toLocaleString()}
                    </p>

                    <p className="text-gray-300 capitalize">
                      <strong>Status:</strong> {website.status}
                    </p>
                    <p className="text-gray-300 capitalize">
                      <strong>Notifications:</strong>{" "}
                      {website.notificationsEnabled ? "Enabled" : "Disabled"}
                    </p>
                    <Link
                      to={`/p/website/${website._id}`}
                      className="text-white text-center bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded shadow-md transition duration-300 ease-in-out"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsitesList;
