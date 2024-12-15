import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginInPage.css";
import { fetchURL } from "../components/api";


const LoginController = () => {
  const { user, setUser } = useUserContext()
  const [ form, setForm ] = useState({
    email: "",
    password: ""
  })
  const nav = useNavigate()

  useEffect(() => {
    if (user) {
      nav("/MainDashboard")
    }
    try {
      console.log("Login page renders")
    } catch (error) {
      console.log(error.message)}
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      return alert("Please fill in all fields") 
    }
    try {
      const returnedUser = await fetch(`${fetchURL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      const data = await returnedUser.json().then((data)  => {
        if (data.code === 200) {
          setUser(data.user)
          nav("/MainDashboard")
        }
      }) 
          alert(data.message)
        }
    catch (error) { 
      console.log(error.message)
    }

    const handleForm = (e) => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
    }
  
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
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={handleForm} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={handleForm}/>
          </div>
          <button type="submit" className="submit-button">Log in</button>
          </form>
        </form>
      </div>
    </div>
  );
}
}


export default LoginController;
