import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MainDashboard from "./pages/MainDashboard";
import BookingDashboard from "./pages/BookingDashboard";
import "./App.css";

function App() {
    return (
        <Router>
        <div className="page-container">
            <Navbar />
            <main className="content">
            <Routes>
                <Route path="Home" element={<LandingPage />} />
                <Route path="Services" element={ <ServicesPage />} />  
                <Route path="Contact Us" element={ <ContactPage />} />  
                <Route path="About Us" element={ <AboutPage />} />
                <Route path="Log In" element={ <LoginPage />} />
                <Route path="Sign Up" element={ <SignUpPage />} />
                <Route path="Main Dashboard" element={ <MainDashboard />} />
                <Route path="Booking Dashboard" element={ <BookingDashboard />} />
            </Routes>
            </main>
            <Footer />
        </div>
        </Router>
    );
}

export default App;