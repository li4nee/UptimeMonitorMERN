import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useToken from "../../src/Context";

function ProtectedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/p/home" className="text-2xl font-bold text-blue-400 no-underline">
          MONITOR YOUR WEBSITE
          <span className="text-sm font-normal text-gray-400 no-underline">.com</span>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/p/add-website"
            className={`no-underline text-white px-3 py-2 rounded-md transition-all duration-300 ${
              isActive("/p/add-website")
                ? "border-b-2 border-slate-500"
                : "hover:bg-slate-700"
            }`}
          >
            Add Website
          </Link>
          <Link
            to="/p/profile"
            className={`no-underline text-white px-3 py-2 rounded-md transition-all duration-300 ${
              isActive("/p/profile")
                ? "border-b-2 border-slate-300"
                : "hover:bg-slate-700"
            }`}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 bg-slate-800 rounded-lg shadow-lg">
          <Link
            to="/p/add-website"
            className={`block px-4 py-2 text-white rounded-t-lg transition-all duration-300 no-underline ${
              isActive("/p/add-website")
                ? "border-b-2 border-slate-300"
                : "hover:bg-slate-700"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Add Website
          </Link>
          <Link
            to="/p/profile"
            className={`block px-4 py-2 text-white transition-all duration-300 no-underline ${
              isActive("/p/profile")
                ? "border-b-2 border-slate-300"
                : "hover:bg-slate-700"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="block w-full text-left px-4 py-2 no-underline bg-red-600 hover:bg-red-800 text-white rounded-b-lg transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default ProtectedNavbar;
