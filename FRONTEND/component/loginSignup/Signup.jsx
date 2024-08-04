import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from "../../src/Context";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    username: Yup.string().required("Username is required"),
  });

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const { saveToken } = useToken();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      return true;
    } catch (err) {
      const errorMessages = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(errorMessages);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/user/signup",
          formValues
        );
        saveToken(response.data.token);
        setFormValues({
          email: "",
          password: "",
          username: "",
        });
        navigate("/p/home")
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen flex flex-col">
      <ToastContainer />
      <div className="container mx-auto px-4 py-10 flex-1 flex flex-col justify-center">
        <div className="text-center m-4">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition text-sm font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold mb-4">Sign Up</h2>
          <p className="text-lg text-gray-300 mb-4">
            Join us at{" "}
            <span className="font-semibold">Monitor Your Website .com</span> and
            start monitoring your website effortlessly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 mb-16">
          <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <h3 className="text-4xl font-bold mb-4">Create an Account</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-lg mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                    errors.username ? "border-red-500" : "border-gray-600"
                  } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="John Doe"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-lg mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="you@example.com"
                  name="email"
                  onChange={handleChange}
                  value={formValues.email}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-lg mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 border ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                  value={formValues.password}
                  name="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition"
              >
                Sign Up
              </button>
            </form>

            <button
              aria-label="Sign Up with Google"
              className="flex items-center justify-center w-full text-black font-bold py-2 px-4 rounded-lg shadow-lg transition my-2"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              <FaGoogle className="w-6 h-6 mr-2" />
              <span>Sign Up with Google</span>
            </button>
            <div className="text-center my-3">
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>

          <div className="flex-1 bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8 md:mt-0">
            <h3 className="text-4xl font-bold mb-4">Why Choose Us?</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
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
                  />
                </svg>
                <div>
                  <span className="font-semibold text-white">
                    Real-time Monitoring:
                  </span>{" "}
                  Track your website's status in real-time to ensure it’s always
                  up and running smoothly.
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10l4 4L17 7"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-white">Free:</span> Enjoy
                  top-tier monitoring services without breaking the bank.
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9l2 2-2 2M9 17L7 15l2-2"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-white">
                    Instant Alerts:
                  </span>{" "}
                  Receive immediate notifications to address any issues before
                  they impact your users.
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12H3m12 0h-6M15 6h-6M15 18H9"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-white">
                    User-Friendly Interface:
                  </span>{" "}
                  Easily navigate our platform with an intuitive and modern
                  design.
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10l4 4L17 7"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-white">
                    Secure Data Encryption:
                  </span>{" "}
                  Protect your data with top-notch encryption and security
                  protocols.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
