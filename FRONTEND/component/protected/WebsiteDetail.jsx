import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from "../../src/Context";

const WebsiteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useToken();

  const [website, setWebsite] = useState(null);
  const [status, setStatus] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
//   const [performance, setPerformance] = useState("");

  useEffect(() => {
    const fetchWebsiteDetails = async () => {
      try {
     
        const response = await axios.get(
          `http://127.0.0.1:8000/p/website/status/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWebsite(response.data);
        setStatus(response.data.status);

       
        // const performanceResponse = await axios.get(`http://127.0.0.1:8000/p/website/performance/${id}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // setPerformance(performanceResponse.data);

        // // Fetch notification settings if needed
        // const notificationResponse = await axios.get(`http://127.0.0.1:8000/p/website/notification/${id}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // setNotificationsEnabled(notificationResponse.data.enabled);

      } catch (error) {
        console.error("Error fetching website details:", error);
        toast.error("Failed to fetch website details.");
      }
    };

    fetchWebsiteDetails();
  },[]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/p/website/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Website deleted successfully.");
      navigate("/p/home");
    } catch (error) {
      toast.error("Failed to delete website.");
    }
  };

  const handleToggleNotifications = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/p/website/notification/${id}`,
        { enabled: !notificationsEnabled },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotificationsEnabled(!notificationsEnabled);
      toast.success("Notification settings updated.");
    } catch (error) {
      console.error("Error updating notifications:", error);
      toast.error("Failed to update notification settings.");
    }
  };

  if (!website) return <p className="text-white">Loading...</p>;

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <div className="container mx-auto max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">{website.name}</h1>
          <p className="text-lg mb-4">Status: <span className={`font-semibold ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{status}</span></p>
       
          {/* <p className="text-lg mb-4">Performance: {performance}</p> */}

          <div className="flex gap-4 mb-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg"
            >
              Delete Website
            </button>

            <button
              onClick={handleToggleNotifications}
              className={`font-bold py-2 px-4 rounded-lg ${
                notificationsEnabled ? "bg-green-600 hover:bg-green-800" : "bg-blue-600 hover:bg-blue-800"
              } text-white`}
            >
              {notificationsEnabled ? "Disable Notifications" : "Enable Notifications"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsiteDetails;
