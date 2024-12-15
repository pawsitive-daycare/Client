import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignUpPage.css"
import { fetchURL } from "../components/api";
import { useUserContext } from "../components/UserContext";


const SignUpController = () => {
    const nav = useNavigate();
    const { setUser } = useUserContext();
    const [form, setForm] = useState({
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    });

    const handleForm = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    useEffect(() => {
      console.log("SignUp page renders");
    }, []);

    const addUserDetails = async (email, firstName, lastName, phoneNumber, password) => {
      const newUser ={
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
      };
     

      try {
        const returnedUser = await fetch(`${fetchURL}/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      

      const data = await returnedUser.json();
      console.log(data);
      console.log("Attempting to register in DB");

      if (data.code === 201) {
        setUser({
          _id: data.user_id,
          email: data.email,
          firstName: data.firstName,
          tk: data.token
        });
        alert("Thanks for registering!");
        nav("/LogIn");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    
 
  const handleSignUp = async (evt) => {
    evt.preventDefault()
    console.log("Checking the form valid");

    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      return alert('Please enter the required fields');
    } else {
      console.log("Creating new user", form);
      await addUserDetails( 
        form.email,  
        form.firstName, 
        form.lastName, 
        form.phoneNumber, 
        form.password 
      );
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <h1 className="form-title">sign up</h1>
        <p className="form-subtitle">
          already have an account? <Link to="/LogIn">Login here</Link>
        </p>
        <form className="sign-up-form" onSubmit={handleSignUp}>
          <form className="sign-up-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first-name">First name:</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last name:</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number:</label>
              <input
                type="tel"
                id="phone-number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={form.phoneNumber}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleForm}
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </form>
      </div>
    </div>
  );
  };
export default SignUpController;
