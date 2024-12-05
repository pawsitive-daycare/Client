import React from "react";
import "../styles/Footer.css";
import FacebookLogo from "../assets/Facebook.png";
import InstagramLogo from "../assets/Instagram.png";
import TiktokLogo from "../assets/Tiktok.png";
import EmailLogo from "../assets/Email.png";

function Footer() {
    return (
        <footer className="footer">
            <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={FacebookLogo} alt="Facebook Logo" className="social-icon"/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={InstagramLogo} alt="Instagram Logo" className="social-icon"/>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    <img src={TiktokLogo} alt="TikTok Logo" className="social-icon"/>
                </a>
                <a href="mailto:info@pawsitive.com">
                    <img src={EmailLogo} alt="Email Logo" className="social-icon"/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;