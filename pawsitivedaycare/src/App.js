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
                <Route path="/Home" element={<LandingPage />} />
                <Route path="/Services" element={ <ServicesPage />} />  
                <Route path="/ContactUs" element={ <ContactPage />} />  
                <Route path="/AboutUs" element={ <AboutPage />} />
                <Route path="/LogIn" element={ <LoginPage />} />
                <Route path="/SignUp" element={ <SignUpPage />} />
                <Route path="/MainDashboard" element={ <MainDashboard />} />
                <Route path="/BookingDashboard" element={ <BookingDashboard />} />
            </Routes>
            </main>
            <Footer />
        </div>
        </Router>
    );
}

export default App;