import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignUpPage.css";
import { createUser } from "../components/api";

const SignUpPage = () => {
  const [userData , setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: ""
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }))};

    const handleSubmit = async (event) => {
      event.preventDefault();

      const { email, firstName, lastName, phoneNumber, password } = userData;

      if (!email || !firstName || !lastName || !phoneNumber || !password) {
        return alert("Please fill in all fields");
      }

      try {
        await createUser(userData);
        setUserData({
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          password: ""
        });

        navigate("/login", {
          state: { message: "Account created successfully. Please log in." }
        })
        alert("Account Created Successfully, Please Log In");
      } catch (error) {
        console.log(error);
        alert("Account Already Exists, Please Log In");
      }
    }

  return (

    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <h1 className="form-title">Sign Up</h1>
        <p className="form-subtitle">
          Already have an account? <Link to="/LogIn">Login here</Link>
        </p>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={userData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={userData.phoneNumber}
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
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
