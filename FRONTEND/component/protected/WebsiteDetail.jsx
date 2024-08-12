import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import useToken from "../../src/Context";
import PNavbar from "./PNavbar";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WebsiteDetail() {
  const { id } = useParams();
  const { token } = useToken();
  const [website, setWebsite] = useState({});
  const [websiteStatus, setWebsiteStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [performanceData, setPerformanceData] = useState({});
  const [performanceLoading, setPerformanceLoading] = useState(true);
  const [performanceError, setPerformanceError] = useState(null);
  const navigate = useNavigate();

  const fetchWebsitesImmediateStatus = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/p/website/status/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWebsite(response.data.website);
      setWebsiteStatus(response.data.msg);
    } catch (error) {
      console.error("Error fetching website status:", error);
      setWebsiteStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  const fetchPerformance = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/p/website/performance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPerformanceData(response.data.performance);
    } catch (error) {
      setPerformanceError("Failed to fetch performance data.");
      console.error(error);
    } finally {
      setPerformanceLoading(false);
    }
  };

  const handleNotificationOption = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/p/website/notification/${id}`,
        {
          notificationsEnabled: !website.notificationsEnabled,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWebsite((prevWebsite) => ({
        ...prevWebsite,
        notificationsEnabled: !website.notificationsEnabled,
      }));
    } catch (error) {
      toast.error("Some error occurred!", {
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/p/website/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/p/home");
    } catch (error) {
      toast.error("Some error occurred!", {
        autoClose: 3000,
      });
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Down":
        return "bg-red-500";
      case "Checking":
        return "bg-yellow-500";
      case "Error":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleCheckAgain = async () => {
    setLoading(true);
    setPerformanceLoading(true);
    await fetchWebsitesImmediateStatus();
    await fetchPerformance();
  };

  useEffect(() => {
    fetchWebsitesImmediateStatus();
    fetchPerformance();
  }, [id, token]);

  return (
    <>
      <PNavbar />
      <div className="min-h-screen bg-gray-800 text-white p-6">
        {loading || performanceLoading ? (
          <div className="text-center p-6">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <h1 className="mt-4 text-2xl font-semibold">Loading...</h1>
          </div>
        ) : (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <ToastContainer />
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <FaArrowLeft
                  className="text-xl text-white hover:text-gray-400 cursor-pointer"
                  onClick={() => navigate("/p/home")}
                />
                <h2 className="text-2xl font-bold">Website Details</h2>
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                <button
                  className="p-2 bg-blue-500 rounded-lg font-bold text-white hover:bg-blue-600"
                  onClick={handleCheckAgain}
                >
                  Check Again
                </button>
                <button
                  className={`p-2 rounded-lg font-bold ${
                    website.notificationsEnabled
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  onClick={handleNotificationOption}
                >
                  {website.notificationsEnabled
                    ? "Disable Notification"
                    : "Enable Notification"}
                </button>
                <button
                  className="p-2 bg-red-600 rounded-lg font-bold"
                  onClick={() => setShowConfirmDialog(true)}
                >
                  Remove Website
                </button>
              </div>
            </div>
            <div className="space-y-4 text-lg mb-6">
              <div>
                <span className="font-semibold">URL:</span> {website.website}
              </div>
              <div className="flex items-center">
                <span className="font-semibold">Status: </span>{website.status}
                <span
                  className={`inline-block w-5 h-5 rounded-full ml-1 ${getStatusClass(
                    websiteStatus
                  )}`}
                ></span>
              </div>
              <div>
                <span className="font-semibold">Email:</span> {website.email}
              </div>
              <div>
                <span className="font-semibold">Last Checked:</span>{" "}
                {new Date(website.lastChecked).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Notifications Enabled:</span>{" "}
                {website.notificationsEnabled ? "Yes" : "No"}
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Website Performance</h2>
              {performanceError ? (
                <div className="text-center text-red-600">
                  <h1 className="text-xl font-semibold">
                    Error: {performanceError}
                  </h1>
                </div>
              ) : (
                <div className="space-y-4 text-lg">
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {performanceData.status}
                  </div>
                  <div>
                    <span className="font-semibold">Response Time:</span>{" "}
                    {performanceData.timeTaken
                      ? `${performanceData.timeTaken.toFixed(2)} ms`
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Error:</span>{" "}
                    {performanceData.error || "None"}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4 text-white">
              Are you sure you want to delete this website?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="p-2 bg-red-600 rounded-lg font-bold text-white"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="p-2 bg-green-600 rounded-lg font-bold text-white"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
