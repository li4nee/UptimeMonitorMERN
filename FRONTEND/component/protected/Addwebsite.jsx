import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import ProtectedNavbar from "./PNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToken from "../../src/Context";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  website: yup.string().required("Website URL is required"),
});

const AddWebsite = () => {
  const [form, setForm] = useState({ email: "", website: "" });
  const [errors, setErrors] = useState({});
  const { token } = useToken();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    try {
      validationSchema.validateSync(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://127.0.0.1:8000/p/website", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setForm({ email: "", website: "" });
        toast.success("Website added successfully!", {
          autoClose: 3000,
        });
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <ProtectedNavbar />
      <ToastContainer />
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8 md:mt-0">
            <h2 className="text-4xl font-bold mb-4 text-green-400">
              Add a New Website
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg mb-1 text-green-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-lg mb-1 text-green-300"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com"
                  value={form.website}
                  onChange={handleChange}
                  required
                />
                {errors.website && (
                  <p className="text-red-500">{errors.website}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition"
              >
                Add Website
              </button>
            </form>
          </div>

          <div className="flex-1 bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8 md:mt-0">
            <h2 className="text-4xl font-bold mb-4 text-green-400">
              How It Works
            </h2>
            <p className="mb-4 text-white">
              We ensure you are always informed about the status of your
              websites. Here’s how you’ll receive updates:
            </p>
            <ul className="space-y-4">
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
                  <span className="font-semibold text-green-300">
                    Email Notifications:
                  </span>{" "}
                  Receive instant email notifications if your website goes down.
                  We ensure that critical alerts reach you promptly.
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
                  <span className="font-semibold text-green-300">
                    Mark as Favorite:
                  </span>{" "}
                  To prevent important emails from being marked as spam, you can
                  mark your websites as favorites.
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
                  <span className="font-semibold text-green-300">
                    Toggle Notifications:
                  </span>{" "}
                  You can toggle notifications for each website individually or
                  turn notifications on or off for all websites.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWebsite;
