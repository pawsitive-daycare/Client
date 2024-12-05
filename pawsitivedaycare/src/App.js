import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import "./App.css";
import ServicesPage from "./pages/ServicesPage";

function App() {
    return (
        <Router>
        <div className="page-container">
            <Navbar />
            <main className="content">
            <Routes>
                <Route path="Home" element={<LandingPage />} />
                <Route path="Services" element={ <ServicesPage />} />  
            </Routes>
            </main>
            <Footer />
        </div>
        </Router>
    );
}


export default App;