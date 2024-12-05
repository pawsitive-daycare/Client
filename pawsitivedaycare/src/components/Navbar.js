import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="navbar">
            <a href="#home" className="logo">
                <img src={logo} alt="PAWsitive Daycare Logo"/>
                <span className="brand-name">
                    <strong>PAWsitive</strong>
                    <br />
                    Daycare
                </span>
            </a>
            
            <nav className={`nav-content ${menuOpen ? "mobile" : ""}`}>
                <ul className="nav-links">
                    <li><Link to="Home">Home</Link></li>
                    <li><Link to="Services">Services</Link></li>
                    <li><Link to="Contact Us">Contact Us</Link></li>
                    <li><Link to="About Us">About Us</Link></li>
                </ul>
                    <button className="login-btn">
                        <span className="login-text">Log In</span>
                    </button>
                    <button className="signup-btn">
                        <span className="signup-text">Sign Up</span>
                    </button>
                    
            </nav>
            <button className="hamburger-menu" onClick={toggleMenu}>
                {menuOpen ? "✖" : "☰"}
            </button>
        </header>
    );
}

export default Navbar