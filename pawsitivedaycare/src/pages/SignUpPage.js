import React from "react";
import "../styles/SignUpPage.css";

function SignUpPage() {
  return (
    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <h1 className="form-title">sign up</h1>
        <p className="form-subtitle">
          already have an account? <a href="/login">Login here</a>
        </p>
        <form className="sign-up-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First name:</label>
            <input type="text" id="first-name" name="first-name" placeholder="Enter your first name" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name:</label>
            <input type="text" id="last-name" name="last-name" placeholder="Enter your last name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone number:</label>
            <input type="text" id="phone" name="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
