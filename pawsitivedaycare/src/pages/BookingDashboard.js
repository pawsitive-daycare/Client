import React, { useState } from "react";
import "../styles/BookingDashboard.css";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function BookingDashboard() {
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment Booked!\nService: ${service}\nTime: ${time}\nMessage: ${message}`);
  };

  return (
    <div className="book-appointment-page">
      <header className="book-appointment-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </header>

      <div className="book-appointment-container">
        <h2 className="appointment-title"><i>Book your appointment</i></h2>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <select id="service" value={service} onChange={(e) => setService(e.target.value)} required>
              <option value="" disabled>Select a service</option>
              <option value="Grooming">Grooming</option>
              <option value="Daycare">Daycare</option>
              <option value="Dog Walking">Dog Walking</option>
            </select>
          </div>

          <div className="form-group">
            <input type="name" id="name" placeholder="Name of pet" value={name} onChange={(e) => setName(e.target.value)}/>  
          </div>  

          <div className="form-group">
            <select id="time" value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="" disabled>Select a time</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 PM">10:30 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="11:30 PM">11:30 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="12:30 PM">12:30 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="1:30 PM">1:30 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="2:30 PM">2:30 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="3:30 PM">3:30 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="4:30 PM">4:30 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="5:30 PM">5:30 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <textarea
              id="message"
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="save-button">Save</button>
        </form>

        <div className="calendar-section">
          <h3>Select Date</h3>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p>Selected Date: {selectedDate.toDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default BookingDashboard;
