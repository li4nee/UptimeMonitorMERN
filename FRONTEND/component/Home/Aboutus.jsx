import { FaRocket, FaHandshake, FaUserShield, FaStar } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div
      className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-16"
      id="about"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-extrabold text-white mb-4">About Us</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to Monitor Your Website, where our mission is to provide
            top-notch website monitoring services. We’re dedicated to ensuring
            your site’s performance and uptime, letting you concentrate on
            growing your business.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 mb-16">
          <div className="flex-1 bg-gray-800 p-10 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4 text-green-500">
              <FaRocket className="h-8 w-8 mr-4" />
              <h3 className="text-4xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-400">
              Our mission is to deliver reliable and efficient website
              monitoring services. We provide timely notifications about any
              issues, ensuring a seamless online experience for your users.
            </p>
          </div>
          <div className="flex-1 bg-gray-800 p-10 rounded-lg shadow-lg mt-8 md:mt-0 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4 text-yellow-500">
              <FaStar className="h-8 w-8 mr-4" />
              <h3 className="text-4xl font-bold text-white">Our Values</h3>
            </div>
            <ul className="list-disc list-inside text-lg text-gray-400 space-y-2">
              <li>
                <strong>
                  <FaHandshake className="inline-block h-5 w-5 mr-2 text-blue-500" />{" "}
                  Integrity:
                </strong>{" "}
                Transparent and honest services.
              </li>
              <li>
                <strong>
                  <FaRocket className="inline-block h-5 w-5 mr-2 text-green-500" />{" "}
                  Innovation:
                </strong>{" "}
                Continually improving our technology.
              </li>
              <li>
                <strong>
                  <FaUserShield className="inline-block h-5 w-5 mr-2 text-red-500" />{" "}
                  Customer Focus:
                </strong>{" "}
                Tailored solutions and exceptional support.
              </li>
              <li>
                <strong>
                  <FaStar className="inline-block h-5 w-5 mr-2 text-yellow-500" />{" "}
                  Excellence:
                </strong>{" "}
                Delivering high-quality services that exceed expectations.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
