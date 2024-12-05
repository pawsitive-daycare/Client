import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    return (
        <Router>
        <div className="page-container">
            <Navbar />
            <Routes>
                <Route path="Home" element={<LandingPage />} /> 
                <Route path="Services" element={<ServicesPage />} />
            </Routes>
            <main className="content">
                <LandingPage />   
            </main>
            <Footer />
        </div>
        </Router>
    );
}


export default App;