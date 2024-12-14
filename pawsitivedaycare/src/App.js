import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import LandingPage from "../pages/LandingPage";
import Footer from "./Footer";
import ContactPage from "../pages/ContactPage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import MainDashboard from "../pages/MainDashboard";
import BookingDashboard from "../pages/BookingDashboard";
import "./App.css";
import { UserContextProvider } from "./UserContext";
import Joincontroller from "../pages/SignUpPage"
import LoginController from "../pages/LoginPage";
function App() {

    return (
        <UserContextProvider>
        <div className="page-container">
            <Navbar />
            <main className="content">
            <Routes>
                <Route path="/Home" element={<LandingPage />} />
                <Route path="/Services" element={ <ServicesPage />} />  
                <Route path="/ContactUs" element={ <ContactPage />} />  
                <Route path="/AboutUs" element={ <AboutPage />} />
                <Route path="/LogIn" element={ <LoginController />} />
                <Route path="/SignUp" element={ <Joincontroller />} />
                <Route path="/MainDashboard" element={ <MainDashboard />} />
                <Route path="/BookingDashboard" element={ <BookingDashboard />} />
            </Routes>
            </main>
            <Footer />
        </div>
        </UserContextProvider>
    );
}

export default App;