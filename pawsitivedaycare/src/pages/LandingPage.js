import React from "react";
import "../styles/LandingPage.css";
import PetDaycare from "../assets/Pet Daycare.jpg";
import PetGrooming from "../assets/Pet Grooming.jpg";
import DogWalking from "../assets/Dog Walking.jpg";
import { Link } from "react-router-dom";

function LandingPage() {
  // Services Data
  const servicesData = [
    { title: "Pet Daycare", image: PetDaycare },
    { title: "Pet Grooming", image: PetGrooming },
    { title: "Dog Walking", image: DogWalking },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to PAWsitive Daycare</h1>
          <p>A PAWsitive Perfect Getaway For Your Furry Friend!</p>
          <div className="hero-buttons">
            <Link to="/BookingDashboard">
              <button>Book Now</button>
            </Link>
            <Link to="/ContactUs">
              <button>Send Inquiry</button>
            </Link>
          </div>   
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2 className="services-title">Our Services</h2>
        <div className="services-container">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <h3 className="service-title">{service.title}</h3>
            </div>
          ))}
        </div>
        <Link to="/Services">
          <button className="learn-more-button">Learn More</button>
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
