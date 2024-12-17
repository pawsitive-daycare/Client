import React, { useState, useEffect, use } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignUpPage.css";
import { useUserContext } from "../components/UserContext";
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

      if (!email || !firstName || !lastName || !password) {
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
      } catch (error) {
        console.log(error);
        alert("An error occurred while creating your account. Please try again.");
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
//   return (
//     <div className="sign-up-page">
//       <div className="sign-up-form-container">
//         <h1 className="form-title">Sign Up</h1>
//         <p className="form-subtitle">
//           Already have an account? <Link to="/LogIn">Login here</Link>
//         </p>
//         <form className="sign-up-form" onSubmit={handleSignUp}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleForm}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="firstName">First name:</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               placeholder="Enter your first name"
//               value={form.firstName}
//               onChange={handleForm}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last name:</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               placeholder="Enter your last name"
//               value={form.lastName}
//               onChange={handleForm}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phoneNumber">Phone number:</label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               placeholder="Enter your phone number"
//               value={form.phoneNumber}
//               onChange={handleForm}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleForm}
//             />
//           </div>
//           <button type="submit" className="submit-button" onClick={handleSignUp}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpController;







// const SignUpController = () => {
  //   const nav = useNavigate();
  //   const { setUser } = useUserContext();
  
  //   const [form, setForm] = useState({
  //     email: "",
  //     firstName: "",
  //     lastName: "",
  //     phoneNumber: "",
  //     password: "",
  //   });
  
  //   const handleForm = (e) => {
  //     const { name, value } = e.target;
  //     setForm({ ...form, [name]: value });
  //   };
  
  //   useEffect(() => {
  //     console.log("SignUp page renders");
  //   }, []);
  
  
  //   const handleSignUp = async (e) => {
  //     e.preventDefault();
  
  //     console.log("Form Submitted", form);  
  
  //     if (!form.email || !form.firstName || !form.lastName || !form.password) {
  //       return alert("Please enter the required fields");
  //     }
  
  //     console.log("Creating new user", form);
  //     await addUserDetails(form.email, form.firstName, form.lastName, form.phoneNumber, form.password);
  //   };
  


  // const addUserDetails = async (email, firstName, lastName, phoneNumber, password) => {
  //   const newUser = {
  //     email,
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     password,
  //   };

  //   try {
  //     const returnedUser = await fetch(fetchURL + '/users/signup', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newUser),
  //     });

  //     const data = await returnedUser.json()
  //     .then((res) => {
  //       console.log(res);
  //       console.log("Attempting to register in DB")


  //       if (data.code === 201) {
  //         setUser({
  //           _id: data.user_id,
  //           email: data.email,
  //           firstName: data.firstName,
  //           tk: data.token
  //           })
  //       alert("Thanks for registering!");
  //       return nav('/login');
  //     } else if (res.code === 406) {
  //       setUser(null)
  //     }
  //   })
  //     .catch(error => {
  //       setUser(null)
  //     console.log("Error during sign-up:", error.message);
  //     alert(`We're experiencing server fail. Please try again later.`)
  //   })
  // } catch (err) {
  //   setUser(null)
  //   alert(`We're experiencing server fail. Please try again later.`)
  //         return
  //     }}


