import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginInPage.css";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock validation (Replace with actual API validation)
    if (email === "user@example.com" && password === "password") {
      navigate("Main Dashboard"); // Redirect to Dashboard
    } else {
      alert("Invalid login credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="form-title">Login</h1>
        <p className="form-subtitle">
          are you new here? <a href="/SignUp">sign up here</a>
        </p>
        <form className="login-form">
          <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="submit-button">Log in</button>
          </form>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
