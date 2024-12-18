import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LogInPage.css";
import { loginUser } from "../components/api";
import { useUserContext } from "../components/UserContext";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("Login form data", loginFormData);

        const response = await loginUser(loginFormData);
        console.log("Login response:", response);

        if (response && response.userId && response.token) {
          setUser({
            userId: response.userId,
            token: response.token,
        });

        console.log("User logged in successfully");
        navigate("/MainDashboard");
      } else {
        console.error("Invalid response structure:", response);
        alert("Invalid response. Please try again.");
      }
    } catch (error) {
      console.log("Error logging in", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="form-title">Login</h1>
        <p className="form-subtitle">
          are you new here? <Link to="/SignUp">sign up here</Link>
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
            type="email" 
            id="email"
            name="email"
            placeholder="Enter your email" 
            value={loginFormData.email} 
            onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Enter your password" 
            value={loginFormData.password} 
            onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">Log in</button>
          </form>
      </div>
    </div>
  );

}
export default Login;




