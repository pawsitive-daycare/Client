import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchURL } from "../components/api";
import { useUserContext } from "../components/UserContext";
import "../styles/UpdateBooking.css";

const UpdateBooking = () => {
  const { user, addBookingToUserContext } = useUserContext();
  const { bookingId } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    price: "",
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`${fetchURL}/bookings/${bookingId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: user.token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }

        const data = await response.json();
        setForm({
          service: data.booking.service,
          date: data.booking.date,
          time: data.booking.time,
          price: data.booking.price,
        });

        addBookingToUserContext(data.booking);
      } catch (error) {
        console.error("Error fetching booking details:", error.message);
      }
    };

    fetchBookingDetails();
  }, [bookingId, user.token, addBookingToUserContext]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${fetchURL}/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: user.token,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking");
      }

      alert("Booking updated successfully!");
      nav("/MainDashboard");
    } catch (error) {
      console.error("Error updating booking:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="update-booking-page">
      <h1>Update Booking</h1>
      <form className="update-booking-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="service">Service:</label>
          <input
            type="text"
            id="service"
            name="service"
            value={form.service}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={form.time}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleFormChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Booking</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
