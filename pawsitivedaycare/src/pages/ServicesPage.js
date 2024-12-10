import React from "react";
import "../styles/ServicesPage.css";
import Rabbit from "../assets/rabbit.jpg";
import Parrot from "../assets/parrot.jpg";
import Hamster from "../assets/Hamster.jpg";
import { Link } from "react-router-dom";

function ServicesPage() {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <div className="services-hero-text">
          <h1>Our Services</h1>
        </div>
      </div>

      {/* Services Details */}
      <div className="services-details">
        <div className="services-section">
          <h2>Pet Daycare</h2>
          <div className="services-content">
            <p className="services-description">
              Keep your pet happy and healthy with play dates, exercise, and playful games, all supervised by our expert PAWsitive team!
            </p>
            <div className="services-pricing">
              <h3>Prices</h3>
            </div>
            
            <img src={Rabbit} alt="Small Animal" className="service-image" />
          </div>
        </div>

        <div className="service-section">
          <h2>Pet Grooming</h2>
          <div className="services-content">
            <p className="services-description">
              We also offer grooming services so your pets can enjoy a bath, clip, and tidy, leaving them clean and looking their best!
            </p>
            <div className="services-pricing">
            <h3>Prices</h3>
            </div>
            
            <img src={Parrot} alt="Small Animal" className="service-image" />
          </div>
        </div>

        <div className="service-section">
          <h2>Dog Walking</h2>
          <div className="services-content">
            <p className="services-description">
              We provide professional dog walking services to keep your furry friend active, happy, and well-exercised, no matter how busy your day gets!
            </p>
            <div className="services-pricing">
              <h3>Prices</h3>
              
            </div>
            
            <img src={Hamster} alt="Small Animal" className="service-image" />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <Link to="Booking Dashboard">
          <button className="cta-button">Book Now!</button>
        </Link>
      </div>
    </div>
  );
}

export default ServicesPage;
