import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./pages/Signup/Signup";
// import SignupForm from './pages/Signup/Try';
// import Signin from './components/signin';
import SigninForm from "./pages/Signin/Signin";

import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./pages/Signup/Signup"; // Make sure to import your SignUp component
import SignIn from "./pages/Signin/Signin";
<<<<<<< HEAD
import Profile from "./pages/Profile/Profile";


=======
import Profile from "./pages/Profile"
import Homepage from "./pages/HomePage/Home";
>>>>>>> c5806424d51067f26364f78d1f1cf6b59910c0a7

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> //trying to make the default the homepage
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Add other routes as necessary */}
      </Routes>
      {/* <Signup/> */}
    </Router>
    // <SigninForm/>
  );
}
export default App;
