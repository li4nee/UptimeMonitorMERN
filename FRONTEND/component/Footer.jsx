import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto  text-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Link
              to="/"
              className=" text-blue-400 text-2xl font-bold no-underline "
            >
              MONITOR YOUR WEBSITE
              <span className="text-sm font-normal text-gray-400 no-underline">
                .com
              </span>
            </Link>
            <p className="mt-2 text-gray-500">
              © 2024 Monitor Your Website. All rights reserved.
            </p>
          </div>
          <div className="flex justify-center md:justify-end space-x-6">
            <Link
              to="/about"
              className="text-gray-400 hover:text-white transition"
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className="text-gray-400 hover:text-white transition"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-white transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
