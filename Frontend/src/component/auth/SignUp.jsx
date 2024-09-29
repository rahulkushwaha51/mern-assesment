import { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/userAction";

import img from "../../assets/login.png";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", formData.name);
    myForm.append("email", formData.email);
    myForm.append("password", formData.password);
    dispatch(signup(myForm));
    setSignedUp(true);
    if (signedUp) {
      return navigate("/login");
    }
  };

  return (
    <div>

      <div className="signup">
        <div className="signup-intro">
          <h2>Signup</h2>
          <img src={img} alt="Signup" />
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <p>
            Already Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
