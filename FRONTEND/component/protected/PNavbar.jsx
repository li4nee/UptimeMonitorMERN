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
    <nav className="bg-slate-900 p-3 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/p/home"
          className="no-underline text-white flex items-center"
        >
          <div className="text-2xl font-bold text-blue-400">
            MONITOR YOUR WEBSITE
            <span className="text-sm font-normal text-gray-400">.com</span>
          </div>
        </Link>

        <div className="hidden md:flex space-x-6 flex items-center">
          <Link
            to="/p/add-website"
            className={`relative no-underline text-white px-3 py-2 rounded-md transition-all duration-300 ${
              isActive("/p/add-website")
                ? "text-white border-b-2 border-slate-300"
                : "hover:bg-slate-700"
            }`}
          >
            Add Website
          </Link>
          <Link
            to="/profile"
            className={`relative no-underline text-white px-3 py-2 rounded-md transition-all duration-300 ${
              isActive("/profile")
                ? "text-white border-b-2 border-slate-300"
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

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
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
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/p/add-website"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                isActive("/p/add-website")
                  ? "text-white border-b-2 border-slate-300"
                  : "text-white hover:bg-slate-700"
              }`}
            >
              Add Website
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                isActive("/profile")
                  ? "text-white border-b-2 border-slate-300"
                  : "text-white hover:bg-slate-700"
              }`}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full block px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-800 text-white mt-2 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default ProtectedNavbar;
