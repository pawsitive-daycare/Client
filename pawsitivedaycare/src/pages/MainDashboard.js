import React, { useCallback, useEffect, useState } from "react";
import "../styles/MainDashboard.css";
import { fetchURL } from "../components/api";
import { useUserContext } from "../components/UserContext";
import { Link, useNavigate } from "react-router-dom";

const getMonthName = (monthNumber) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[monthNumber - 1] || "Invalid Month"; 
};

const Dashboard = () => {
  const { user, setUser } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const nav = useNavigate();

  const returnedBookings = useCallback(async () => {
    console.log(`${fetchURL}/mybookings/${user._id}`);
    try {
      console.log("User", user);
      const response = await fetch(`${fetchURL}/mybookings/${user._id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      });
      const data = await response.json();
      console.log("Bookings found");
      setBookings(data);
    } catch (err) {
      console.log("Error fetching bookings: ", err.message);
    }
  }, [user]);

  useEffect(() => {
    console.log("fetching bookings");
    if (user === undefined) {
      nav("/login");
    } else {
      returnedBookings();
    }
  }, [user, nav, returnedBookings]);

  const BookingCard = ({ booking ,day, month, year, service, time, price , petName}) => {
    const nthNumber = (x) => {
      let i = parseInt(String(x), 10);
      let j = i % 10;
      let k = i % 100;

      if (j === 1 && k !== 11) return i + "st";
      if (j === 2 && k !== 12) return i + "nd";
      if (j === 3 && k !== 13) return i + "rd";
      return i + "th";
    };

    const addBookingToUserContext = () => {
      setUser({
        ...user,
        booking: booking,
      });
      console.log(booking, user, "Booking to modify added on user");
    };

    const deleteBooking = async () => {
      try {
        const response = await fetch(`${fetchURL}/mybookings/${booking._id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });

    //     const data = await bookingToDelete.json();
    //     if (data.code === 200) {
    //       returnedBookings();
    //     } else {
    //       alert("Failed to remove booking");
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

    if (response.ok) {
      await response.json();
      alert("Booking removed successfully!");
      returnedBookings(); // Refresh the bookings list
    } else {
      const errorData = await response.json();
      alert(`Failed to remove booking: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    alert("An error occurred while deleting the booking. Please try again.");
  }
};

    return (
      <div className="booking-card">
        <div className="booking-date">
          <h3>{nthNumber(day)} {getMonthName(month)} {year}</h3>
        </div>
        <div className="booking-info">
          <h3>{petName}</h3>
          <h3>{service}</h3>
          <p>{time}</p>
          <div className="booking-buttons">
            <Link
              className="update-button"
              to={`/update-booking/${booking._id}`}
              onClick={addBookingToUserContext}
            >
              Modify Booking
            </Link>
            <Link className="delete-button" to="" onClick={deleteBooking}>
              Cancel booking
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const BookingNowCard = () => {
    return (
      <div className="booking-cta-button">
        <div id="book-now-card" className="booking-date flex column a-i-center">
          <Link className="" to={`/BookingDashboard`}>
            <button className="book-now-button">New booking</button>
          </Link>
        </div>
      </div>
    );
  };

  const BookingCardContainer = () => {
    console.log("Bookings: ", bookings);
    return (
      <div className="booking-card-container">
        {Array.isArray(bookings) && bookings.map((el, idx) => {
          const today = new Date();
          const bookingDate = new Date(
            `${el.date.year} ${el.date.month} ${el.date.day}`
          );
          console.log("el", today, bookingDate, { day: el.date.day, month: el.date.month, year: el.date.year });
          /*if (today.getTime() > bookingDate.getTime()) {
            return null;
          }*/
          return (
            <BookingCard
              key={idx}
              booking={el}
              day={el.date.day}
              month={el.date.month}
              year={el.date.year}
              service={el.service.name}
              time={el.time}
              price={el.service.price}
              petName={el.pet.name}
            />
          );
        })}
      </div>
    );
  };

  return (
    <main id="my-account-page">
    <article className="page-header flex column j-c-center a-i-center">
      <div id="my-account" className="main-bg-container"/>
      <div className="heading-container text-shadow">
        <h2 className="heading ">Welcome back, <br/>{ user !== undefined ? user.firstName : "Visitor"} </h2>
        <p className="heading-description">
          Please see more information below.
        </p>
      </div>
    </article>
    <section className="context-container flex column a-i-left">
      {/* <div className="flex" id="my-detail-container">
        <h2 className="heading" id="my-detail">My detail</h2>
        <Link id="update-my-detail" to="/update-booking/:bookingId" className='sub-menu flex'>
          <p>Update my detail</p>
          <i className="fas fa-chevron-right"></i></Link>
      </div> */}
      <h2 className="heading">My bookings</h2>
        <BookingCardContainer/>
        <BookingNowCard/>
    </section>
  </main>
  );
};

export default Dashboard;



