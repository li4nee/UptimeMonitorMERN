import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center text-gray-200">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl font-semibold mt-4">Oops! Page not found.</p>
        <p className="mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/">Return to homepage</Link>
      </div>
    </section>
  );
};

export default ErrorPage;
