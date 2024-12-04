import React from "react";
import "./Services.css";
import PetDaycare from "../assets/Pet Daycare.jpg";
import PetGrooming from "../assets/Pet Grooming.jpg";
import DogWalking from "../assets/Dog Walking.jpg"


const servicesData = [
    { title: "Pet Daycare", image: PetDaycare },
    { title: "Pet Grooming", image: PetGrooming },
    { title: "Dog Walking", image: DogWalking },
  ];

    function Services() {
      return (
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
          <button className="learn-more-button">Learn More</button>
      </section>
    );
}

export default Services;