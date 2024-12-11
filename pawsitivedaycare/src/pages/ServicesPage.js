import React, { useState } from "react";
import "../styles/ServicesPage.css";
import Rabbit from "../assets/rabbit.jpg";
import Parrot from "../assets/parrot.jpg";
import Hamster from "../assets/Hamster.jpg";
import { Link } from "react-router-dom";

const ServicesPage = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

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
          <div className="services-content"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <img src={Rabbit} alt="Small Animal" className="service-image" />
            <h3 className="services-pricing">Prices</h3>
            {isHovered && <p className="services-description">Keep your pet happy and healthy with play dates, exercise, and playful games, all supervised by our expert PAWsitive team</p>}
          </div>
        </div>

        <div className="services-section">
          <h2>Pet Grooming</h2>
          <div className="services-content"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <img src={Parrot} alt="Small Animal" className="service-image" />
            <h3 className="services-pricing">Prices</h3>
            {isHovered && <p className="services-description">We also offer grooming services so your pets can enjoy a bath, clip, and tidy, leaving them clean and looking their best!</p>}
          </div>
        </div>
        
        <div className="services-section">
          <h2>Dog Walking</h2>
          <div className="services-content"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <img src={Hamster} alt="Small Animal" className="service-image" />
            <h3 className="services-pricing">Prices</h3>
            {isHovered && <p className="services-description">We provide professional dog walking services to keep your furry friend active, happy, and well-exercised, no matter how busy your day gets!</p>}
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
