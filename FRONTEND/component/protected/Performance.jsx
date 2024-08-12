import { useState, useEffect } from "react";
import axios from "axios";

const Performance = ({ id, token }) => {
  const [performanceData, setPerformanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError("Failed to fetch performance data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-white">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600">
        <h1 className="mt-4 text-2xl font-semibold">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className=" bg-gray-800 text-white p-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Website Performance</h2>
        <div className="space-y-4 text-lg">
          <div>
            <span className="font-semibold">Status:</span>{" "}
            {performanceData.status}
          </div>
          <div>
            <span className="font-semibold">Time Taken:</span>{" "}
            {performanceData.timeTaken
              ? `${performanceData.timeTaken.toFixed(2)} ms`
              : "N/A"}
          </div>
          <div>
            <span className="font-semibold">Error:</span>{" "}
            {performanceData.error || "None"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
