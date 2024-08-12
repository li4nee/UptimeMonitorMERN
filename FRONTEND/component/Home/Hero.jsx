export default function Hero() {
  return (
    <div className="bg-gray-900 h-screen w-full flex flex-col">
      <div className="relative w-full flex-grow">
        <div className="relative container p-6 md:p-12 lg:p-16 bg-gray-800 text-white rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 h-full max-w-screen-xl mx-auto">
          <div className="flex flex-col justify-center items-start space-y-6 p-6">
            <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Welcome to <br />
              <span className="text-blue-400">MONITOR YOUR WEBSITE</span>
              <span className="text-2xl lg:text-3xl font-normal text-gray-400">
                .com
              </span>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-medium">
              "Stay Ahead with Instant Alerts and Reliable Monitoring. Keep Your
              Websites Running Smoothly and Proactively Manage Downtime.{" "}
              <span className="text-green-400 font-bold">Completely Free</span>
              !"
            </p>

            <button className="px-6 py-3 lg:px-8 lg:py-4 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </button>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="../src/images/Website-Monitoring (1).jpeg"
              alt="Monitoring"
              className="rounded-xl shadow-lg transform transition duration-500 hover:scale-105 max-w-full h-auto lg:max-w-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
