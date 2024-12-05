import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
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
            </Routes>
            </main>
            <Footer />
        </div>
        </Router>
    );
}


export default App;