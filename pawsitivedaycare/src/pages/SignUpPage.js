import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";
import { signUp } from "../api";
import { useUserContext } from "../components/UserContext";
import { useEffect } from "react";
import { Link} from "react-router-dom";

// function SignUpPage() {
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     const userData = {
//       email,
//       firstName,
//       lastName,
//       phoneNumber,
//       password,
//     };

//     if (email && firstName && lastName && phoneNumber && password) {
//       try {
//         const response = await signUp(userData);
//         console.log("Sign-Up Sucessful:", response);
//       alert("Sign-Up Successful");
//       navigate("/LoginPage");
//     } catch (error) {
//       console.error("Error signing up:", error);
//       alert("Error signing up. Please try again.");
//     }
//     } else {
//       alert("Please fill in all the fields.");
//     }
//   };
const SignUpController = () => {
  const Join = () => {
    const nav = useNavigate();
    const { user, setUser } = useUserContext();
    const [usersList, setUsersList] = useState([]);
    const [form, setForm] = useState({
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    });
    const [email, firstName, lastName, phoneNumber, password] = form;

    const handleForm = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    useEffect(() => {
      console.log("Join page renders");
    }, []);

    const addUserDetails = async (
      email,
      firstName,
      lastName,
      phoneNumber,
      password
    ) => {
      const newUser = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: password,
      };
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
      if (data.code == 201) {
        setUser({
          _id: data.user_id,
          email: data.email,
          firstName: data.firstName,
          tk: data.token
  });
  alert("Thanks for registering!");
            return nav("/LoginPage");
        }
      }
    
 
  const submit = async (evt) => {
    evt.preventDefault()
    console.log("Checking the form valid")
    if (!form.email || !form.password || !form.first_name || !form.last_name) {
      return alert('Please enter the required fields')
    } else {
      console.log("Creating new user", form)
      await addUserDetail( 
        form.email,  
        form.first_name, 
        form.last_name, 
        form.phone_number, 
        form.password )
    }
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
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first-name">First name:</label>
              <input
                type="text"
                id="first-name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last name:</label>
              <input
                type="text"
                id="last-name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone number:</label>
              <input
                type="tel"
                id="phone-number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleForm}
              />
            </div>
            <Link name="submit" onClick={submit} className="submit-button">
            {<div type="submit" className="submit-button">
              <p>Submit</p>
            </div>}
            </Link>
          </form>
        </form>
      </div>
    </div>
  );
  };
};
export default SignUpPage;
