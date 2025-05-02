import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup/Signup";
import SignIn from "./pages/Signin/Signin";
import Profile from "./pages/Profile/Profile";
import Homepage from "./pages/HomePage/Home";
import CardiologyPage from "./pages/HomePage/CardiologyPage";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/departments/cardiology" element={<CardiologyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
