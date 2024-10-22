import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const links = [
    { id: 1, link: "Home", path: "/home" },
    // Add more links as needed
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActive(!active);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'logoutSuccess' });
    localStorage.removeItem('user');
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div
        className={`hamburger ${active ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <img src={logo} className="logo" alt="Logo" />
     
        <menu className={`menu ${isOpen ? "open" : ""}`}>
          {links.map(({ id, link, path }) => (
            <li key={id} className="link">
              <Link to={path}>{link}</Link>
            </li>
          ))}

          {!isAuthenticated ? (
            <>
              <li className="link">
                <Link to="/login">Login</Link>
              </li>
              <li className="link">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li>
              <button className="btn-primary" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </menu>
      
    </nav>
  );
};

export default Navbar;
