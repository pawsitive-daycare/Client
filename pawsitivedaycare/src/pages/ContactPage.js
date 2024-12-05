import React from "react";
import "../styles/ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-text">
          <h1>Contact Us</h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-container">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone number:</label>
            <input type="text" id="phone" name="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Enter your message"></textarea>
          </div>
          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>

      {/* Footer Section */}
      <div className="contact-footer">
        <button className="call-us-button">CALL US</button>
        <div className="social-icons">
          <a href="#"><i className="fab fa-tiktok"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fas fa-envelope"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
