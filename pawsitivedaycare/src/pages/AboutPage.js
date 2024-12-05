import React from "react";
import "../styles/AboutPage.css";
import logo from "../assets/logo.jpg";
import lefttcat from "../assets/aboutcat.jpg";
import leftdog from "../assets/aboutdog.jpg";
import rightcat from "../assets/aboutcat2.jpg";
import rightdog from "../assets/aboutdog2.jpg";

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <img src={logo} alt="Pawsitive Daycare Logo" className="hero-logo" />
      </div>

      {/* Vision Section */}
      <div className="vision-section">
        <h2 className="vision-title">Our Vision</h2>
        <div className="vision-content">
          <blockquote>
            "Where care, grooming, and tail-wagging adventures come together—
            because your pets deserve the best day, every day."
          </blockquote>
          <p>
            PAWsitive Daycare aims to provide pet owners and their pets with a
            one-of-a-kind experience through the many services that we offer.
            Each service is tailored to help owners who require their pets to
            have an expert touch. We believe that a happy pet means a happy
            owner and that should be reflected through our work and care that
            we put into our services.
          </p>
        </div>
      </div>

      {/* Pet Photos Section */}
      <div className="pet-photos">
        <img src={lefttcat} alt="Cat" className="pet-photo" />
        <img src={leftdog} alt="Dog" className="pet-photo" />
        <img src={rightcat} alt="Rabbit" className="pet-photo" />
        <img src={rightdog} alt="Parrot" className="pet-photo" />
      </div>
    </div>
  );
}

export default AboutPage;
