import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const PrivateRoutes = () => {
  const location = useLocation();
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };
  return isTokenValid() ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};
export default PrivateRoutes;
