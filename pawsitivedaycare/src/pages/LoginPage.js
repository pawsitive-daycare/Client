import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LogInPage.css";
import { loginUser } from "../components/api";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      console.log("login form data", loginFormData);

      await loginUser(loginFormData);

      navigate("/MainDashboard");
    } catch (error) {
      console.log("Error logging in", error);
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



// const LoginController = () => {
//   const { user, setUser } = useUserContext()
//   const [ form, setForm ] = useState({
//     email: "",
//     password: "",
//   });
//   const nav = useNavigate()

//   useEffect(() => {
//     if (user) {
//       nav("/MainDashboard");
//     }
//       console.log("LogIn page renders");
//   }, [user, nav]);

//   const handleForm = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };


//   const handleLogin = async (e) => {
//     e.preventDefault()
//     if (!form.email || !form.password) {
//       return alert("Please fill in all fields") 
//     }

//     try {
//       const returnedUser = await fetch(fetchURL + '/users/login', {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await returnedUser.json();

//         if (data.code === 200) {
//           setUser(data.user);
//           nav("/MainDashboard");
//         } else {
//           alert(data.message)
//         }
//     } catch (error) { 
//       console.log(error.message);
//       alert("An error occurred while logging in. Please try again.");
//     }
//   };
