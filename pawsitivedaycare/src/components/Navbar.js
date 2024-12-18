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
                <Link to="/">
                    <img src={logo} alt="PAWsitive Daycare Logo"/>
                </Link>
                <Link to="/">
                    <span className="brand-name">
                        <strong>PAWsitive</strong>
                        <br />
                        Daycare
                    </span>
                </Link>
            </a>

            <nav className={`nav-content ${menuOpen ? "open" : ""}`}>
                <ul className="nav-links">
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/Services" onClick={toggleMenu}>Services</Link></li>
                    <li><Link to="/ContactUs" onClick={toggleMenu}>Contact Us</Link></li>
                    <li><Link to="/AboutUs" onClick={toggleMenu}>About Us</Link></li>
                    <li><Link to="/MainDashboard" onClick={toggleMenu}>Main Dashboard</Link></li>
                    <li><Link to="/update-booking/ :bookingId" onClick={toggleMenu}>Update Booking</Link></li>
                </ul>   
            </nav>

            <div className="action-btn">
                <Link to="/LogIn">
                    <button className="login-btn">
                        <span className="login-text">Log In</span>
                    </button>
                </Link>
                <Link to="/SignUp">
                    <button className="signup-btn">
                        <span className="signup-text">Sign Up</span>
                    </button>
                </Link>
            </div>
            <button className="hamburger-menu" onClick={toggleMenu}>
                {menuOpen ? "✖" : "☰"}
            </button>
        </header>
    );
}

export default Navbar