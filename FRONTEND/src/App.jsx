import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import AddWebsite from "../component/protected/Addwebsite";
import "./App.css";
import Signup from "../component/loginSignup/Signup";
import ErrorPage from "../component/Error";
import Login from "../component/loginSignup/Login";
import { TokenProvider } from "./Context";
import PrivateRoutes from "../component/loginSignup/PrivateRoute";
import PHome from "../component/protected/Home";
import WebsiteDetails from "../component/protected/WebsiteDetail";
import ProfileSection from "../component/protected/Profile";
const App = () => {
  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/p/home" element={<PHome></PHome>} />
            <Route path="/p/add-website" element={<AddWebsite />} />
            <Route path="/p/website/:id" element={<WebsiteDetails />}></Route>
            <Route path="/p/profile" element={<ProfileSection></ProfileSection>}></Route>
          </Route>
        </Routes>
      </Router>
    </TokenProvider>
  );
};

export default App;
