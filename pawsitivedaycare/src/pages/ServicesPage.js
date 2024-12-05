import React from "react";
import "../styles/ServicesPage.css";
import Rabbit from "../assets/rabbit.jpg";
import Parrot from "../assets/parrot.jpg";
import Hamster from "../assets/Hamster.jpg";

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
              <p><strong>One Pet:</strong></p>
              <p>Casual Day - $78 a day</p>
              <p>5 pack - $330 ($66 a day)</p>
              <p>10 pack - $620 ($62 a day)</p>
              <p>20 pack - $1180 ($59 a day)</p>
              <p><strong>Two Pets:</strong></p>
              <p>Casual Day - $135 a day</p>
              <p>5 pack - $630 ($126 a day)</p>
              <p>10 pack - $1200 ($120 a day)</p>
              <p>20 pack - $2360 ($118 a day)</p>
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
              <p>Tidy-up Trim - $43</p>
              <p>Teddy Bear Cut - $100</p>
              <p>Lion Cut - $100</p>
              <p>Asian Scissor Trim - $120</p>
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
              <p>Small Dog (0-10kg): $15</p>
              <p>Medium Dog (11-20kg): $24</p>
              <p>Large Dog (21-45kg): $36</p>
              <p>Giant Dog (46kg+): $45</p>
              <p>Cat (All): $13</p>
              <p>Small Animal: $10</p>
            </div>
            
            <img src={Hamster} alt="Small Animal" className="service-image" />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <button className="cta-button">Book Now!</button>
      </div>
    </div>
  );
}

export default ServicesPage;
