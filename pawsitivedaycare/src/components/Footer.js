import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer>
            <div className="social-icons">
                <a href="/assets/Tiktok.png"><img src="/assets/Tiktok.png" alt="Tiktok"/></a>
                <a href="assets/Instagram.png"><img src="assets/Instagram.png" alt="Instagram"/></a>
                <a href="assets/Facebook.png"><img src="assets/Facebook.png" alt="Facebook"/></a>
            </div>
            <p>Call Us</p>
        </footer>
    );
}

export default Footer;