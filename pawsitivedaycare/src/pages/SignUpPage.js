import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";
import axios from "axios";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSignUp = (e) => {
  //   e.preventDefault();

  //   // Mock sign-up logic (replace with API call in production)
  //   if (email && firstName && lastName && phoneNumber && password) {
  //     // Redirect to Dashboard after successful sign-up
  //     alert("Sign-Up Successful");
  //     navigate("Main Dashboard");
  //   } else {
  //     alert("Please fill in all the fields.");
  //   }
  // };
const handleSignUp = (e) => {
    e.preventDefault();
    axios.post ("http://localhost:8080", {email, firstName, lastName, phoneNumber, password})
    .then(result => console.log(result))
    .catch(error => console.log(error))
    
    if (email && firstName && lastName && phoneNumber && password) {
      // Redirect to Dashboard after successful sign-up
      alert("Sign-Up Successful");
      navigate("Main Dashboard");
    } else {
      alert("Please fill in all the fields.");
    }
  
  return (
    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <h1 className="form-title">sign up</h1>
        <p className="form-subtitle">
          already have an account? <a href="/LogIn">Login here</a>
        </p>
        <form className="sign-up-form" onSubmit={handleSignUp}>
          <form className="sign-up-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="first-name">First name:</label>
              <input type="text" id="first-name" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last name:</label>
              <input type="text" id="last-name" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number:</label>
              <input type="number" id="phone-number" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </form>  
      </div>
    </div>
  );
}

export default SignUpPage;
