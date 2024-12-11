import React from "react";
import "../styles/MainDashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>


      {/* Bookings Section */}
      <div className="dashboard-bookings">
        <h2>My Bookings</h2>
        <div className="booking-cards">
          <div className="booking-card">
            <h3>Booking 1</h3>
            <p>11am Nov 19, 2024</p>
            <p>Bear</p>
            <p>Grooming</p>
          </div>
          <div className="booking-card">
            <h3>Booking 2</h3>
            <p>3pm Nov 26, 2024</p>
            <p>Bear</p>
            <p>Dog Walk</p>
          </div>
          <div className="booking-card">
            <h3>Booking 3</h3>
            <p>10am Dec 3rd, 2024</p>
            <p>Bear, Misty</p>
            <p>Daycare</p>
          </div>
          <div className="booking-card">
            <h3>Booking 4</h3>
            <p>12pm Jan 15th, 2025</p>
            <p>Misty</p>
            <p>Grooming</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
