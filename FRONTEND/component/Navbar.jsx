import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({whatToDisplay}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav className="bg-slate-900 p-3 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="no-underline text-white flex items-center">
          <div className="text-2xl font-bold text-blue-400">
            MONITOR YOUR WEBSITE
            <span className="text-sm font-normal text-gray-400">.com</span>
          </div>
        </Link>

        <div className="hidden md:flex space-x-6 flex items-center">
          <Link
            to="/"
            className="no-underline text-white"
            onClick={() => handleScrollTo("about")}
          >
            About Us
          </Link>
          <Link
            to="/"
            className="no-underline text-white"
            onClick={() => handleScrollTo("faq")}
          >
            FAQ
          </Link>
          <Link
            to="#faq"
            className="no-underline text-white"
            onClick={() => handleScrollTo("testimonal")}
          >
           What People Say
          </Link>
          <Link to="/signup">
            <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
              {whatToDisplay}
            </button>
          </Link>
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
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium no-underline text-white hover:bg-slate-700"
              onClick={() => handleScrollTo("about")}
            >
              About Us
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 no-underline rounded-md text-base font-medium text-white hover:bg-slate-700"
              onClick={() => handleScrollTo("faq")}
            >
              FAQ
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 no-underline rounded-md text-base font-medium text-white hover:bg-slate-700"
              onClick={() => handleScrollTo("testimonal")}
            >
              What People Say
            </Link>
            <Link to="/signup">
              <button className="w-full no-underline bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-2">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
