import React from "react";

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-gray-900 py-16">
      <div className="container mx-auto px-4 py-2 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="pt-12 md:py-4 md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className=" text-4xl font-extrabold text-white mb-6">
              Why Choose Our Website Monitoring Service?
            </h2>
            <ul className="list-disc pl-5 text-lg text-gray-300 space-y-4">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Stay ahead of potential issues with our reliable monitoring
                  tool.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Receive email notifications within 2 minutes of downtime, so
                  you can act quickly and minimize impact.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Compatible with all formats and devices: PC, laptop, tablet,
                  smartphone.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="font-bold text-yellow-400">
                  Customize alerts and preferences, enjoy real-time updates, and
                  it’s completely FREE!
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="font-bold text-green-400">
                  Measure response times and analyze performance metrics to
                  ensure your site is always running at its best.
                </span>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="../src/images/features.jpg"
              alt="Monitoring Devices"
              className="rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 max-w-full h-auto"
              style={{ width: "100%", maxWidth: "1000px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
