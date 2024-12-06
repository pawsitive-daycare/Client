import React from "react";
import "../styles/LoginInPage.css";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="form-title">Login</h1>
        <p className="form-subtitle">
          are you new here? <a href="/signup">sign up here</a>
        </p>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="submit-button">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
