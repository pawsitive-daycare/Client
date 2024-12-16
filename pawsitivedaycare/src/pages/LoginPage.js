import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchURL } from "../components/api";
import "../styles/LogInPage.css";

const LoginController = () => {
  const { user, setUser } = useUserContext()
  const [ form, setForm ] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate()

  useEffect(() => {
    if (user) {
      nav("/MainDashboard");
    }
      console.log("LogIn page renders");
  }, [user, nav]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleLogin = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      return alert("Please fill in all fields") 
    }

    try {
      const returnedUser = await fetch(fetchURL + '/users/login', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await returnedUser.json();

        if (data.code === 200) {
          setUser(data.user);
          nav("/MainDashboard");
        } else {
          alert(data.message)
        }
    } catch (error) { 
      console.log(error.message);
      alert("An error occurred while logging in. Please try again.");
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="form-title">Login</h1>
        <p className="form-subtitle">
          are you new here? <Link to="/SignUp">sign up here</Link>
        </p>
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit" className="submit-button">Log in</button>
          </form>
      </div>
    </div>
  );
};

export default LoginController;
