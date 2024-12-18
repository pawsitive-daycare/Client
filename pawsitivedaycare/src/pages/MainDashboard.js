import React, { useEffect, useState, useCallback } from "react";
import "../styles/MainDashboard.css";
import { fetchURL } from "../components/api";
import { useUserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const nav = useNavigate();

  // Fetch bookings function
  const fetchBookings = useCallback(async () => {
    if (!user) return;

    try {
      const returnedBookings = await fetch(`${fetchURL}/bookings/${user._id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: user.token,
        },
      });

      if (!returnedBookings.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await returnedBookings.json();
      setBookings(data.bookings);
    } catch (error) {
      console.log("Error fetching bookings:", error.message);
    }
  }, [user]);


  useEffect(() => {
    if (!user || !user.token) {
      nav("/LogIn");
    } else {
      fetchBookings();
    }
  }, [user, nav, fetchBookings]);

  // BookingCard component
  const BookingCard = ({ booking }) => {
    const nthNumber = (str) => {
      let i = Number(str);
      let j = i % 10,
        k = i % 100;
      
      if (j === 1 && k !== 11) return i + "st";
      if (j === 2 && k !== 12) return i + "nd";
      if (j === 3 && k !== 13) return i + "rd";
      return i + "th";
    };

    // Format the booking date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = nthNumber(date.getDate());
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${day} of ${month}, ${year}`;
    };

    const removeBooking = async () => {
      try {
        const response = await fetch(`${fetchURL}/bookings/${booking._id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: user.token,
          },
        });

        const data = await response.json();
        if (data.code === 200) {
          fetchBookings();
        } else {
          alert("Failed to remove booking");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <div className="booking-card">
        <h3>Service: {booking.service}</h3>
        <p>Your User ID: {user?.userId}</p>
        <p>Date: {formatDate(booking.date)}</p>
        <p>Time: {booking.time}</p>
        <p>Price: ${booking.price}</p>
        <button
          onClick={() => nav(`/update-booking/${booking._id}`)}
          className="update-button"
        >
          Modify Booking
        </button>
        <button onClick={removeBooking}>Remove Booking</button>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.firstName}</h1>
      <h2>Your Bookings</h2>
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => <BookingCard key={booking._id} booking={booking} />)
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
