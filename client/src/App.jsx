import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import ProfilePage from './Components/ProfilePage';
import Header from './Components/header'; 

const App = () => {
  return (
    <Router>
      <Header /> {/* so it always shows */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<div style={{ color: "red", fontSize: "2rem" }}>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
