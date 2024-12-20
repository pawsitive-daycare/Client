import React, { useEffect, useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchURL, ourServices } from "../components/api";
import "../styles/BookingDashboard.css";

const UpdateBooking = () => {
  const { bookingId } = useParams();
  const { user } = useUserContext();
  const nav = useNavigate();
  const [time, setTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [form, setForm] = useState({
    service_name: "",
    pet_animal: "",
    pet_name: "",
    pet_breed: "",
    pet_age: "",
  });
  console.log("Booking:", bookingId);
  
  const fetchBookingDetails = useCallback(async () => {
    console.log(`${fetchURL}/mybookings/${bookingId}`);
    try {
      console.log("User Token:", user.token);
      const response = await fetch(`${fetchURL}/mybookings/${bookingId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      console.log("Fetched Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch booking details");
      }

      if (data.message === "No bookings found") {
        alert("No booking found with the provided ID.");
        nav("/MainDashboard");
        return;
      }

      if (data && data.service && data.pet && data.date) {
        setForm({
          service_name: data.service.name,
          pet_animal: data.pet.animal,
          pet_name: data.pet.name,
          pet_breed: data.pet.breed,
          pet_age: data.pet.age,
        });
        setSelectedDate(new Date(data.date.year, data.date.month - 1, data.date.day));
        setTime(data.date.time);
      } else {
        throw new Error("Incomplete booking data received.");
      }
    } catch (error) {
      console.error("Error fetching booking details:", error.message);
      alert("Failed to load booking details. Please try again.");
    }
  }, [bookingId ,user, nav]);

  useEffect(() => {
    console.log("fetching booking details");
    if (!user || !user.token) {
      console.error("User token is missing.");
      nav("/Login");
    } else {
      fetchBookingDetails();
    }
  }, [user, nav, fetchBookingDetails]);

  const matchPrice = (name) => {
    const service = ourServices.find((s) => s.service_name === name);
    return service ? service.service_price : "";
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name === "service_name") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        service_price: matchPrice(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!time || !form.service_name || !form.pet_animal || !form.pet_name) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedDate = {
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1, // Months are 0-indexed in JavaScript
      day: selectedDate.getDate(),
      time,
    };

    const updatedBooking = {
      user: user,
      service: {
        name: form.service_name,
        price: matchPrice(form.service_name),
      },
      date: formattedDate,
      pet: {
        animal: form.pet_animal,
        name: form.pet_name,
        breed: form.pet_breed,
        age: form.pet_age,
      },
    };

    console.log("Updated Booking:", updatedBooking);
    
    try {
      const response = await fetch(`${fetchURL}/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedBooking),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Booking successfully updated!");
        console.log("Booking Updated:", data);
        nav("/MainDashboard"); // Redirect to bookings list
      } else {
        const error = await response.json();
        alert(`Error: ${error.message|| "Failed to update booking."}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the booking.");
    }
  };

  const handleCancel = () => {
    nav("/MainDashboard");
  };

  return (
    <div className="book-appointment-page">
      <header className="book-appointment-header">
        <h1 className="dashboard-title">Update Your Appointment</h1>
      </header>

      <div className="book-appointment-container">
        <form className="appointment-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Service</label>
            <select
              value={form.service_name}
              onChange={handleForm}
              name="service_name"
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              {ourServices.map((service, idx) => (
                <option key={idx} value={service.service_name}>
                  {service.service_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Pet Information</label>
            <input
              type="text"
              placeholder="Animal"
              name="pet_animal"
              value={form.pet_animal}
              onChange={handleForm}
              required
            />
            <input
              type="text"
              placeholder="Name"
              name="pet_name"
              value={form.pet_name}
              onChange={handleForm}
              required
            />
            <input
              type="text"
              placeholder="Breed"
              name="pet_breed"
              value={form.pet_breed}
              onChange={handleForm}
            />
            <input
              type="number"
              placeholder="Age"
              name="pet_age"
              value={form.pet_age}
              onChange={handleForm}
            />
          </div>

          <div className="calendar-section">
            <h3>Select Date</h3>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <p>Selected Date: {selectedDate.toDateString()}</p>
          </div>

          <div className="form-group">
            <label>Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a time
              </option>
              {[
                "10:00 AM",
                "10:30 AM",
                "11:00 AM",
                "11:30 AM",
                "12:00 PM",
                "12:30 PM",
                "1:00 PM",
                "1:30 PM",
                "2:00 PM",
                "2:30 PM",
                "3:00 PM",
                "3:30 PM",
                "4:00 PM",
                "4:30 PM",
                "5:00 PM",
              ].map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="save-button">
            Update Booking
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooking;