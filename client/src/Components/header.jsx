
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#333", color: "white" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        </li>
        <li>
          <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
        </li>
        <li>
          <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
