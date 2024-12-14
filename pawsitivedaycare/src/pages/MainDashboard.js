import React, { useEffect, useState } from "react";
import "../styles/MainDashboard.css";
import { fetchURL } from "../components/api";
import { useUserContext } from "../components/UserContext";

// function Dashboard() {
//   return (
//     <div className="dashboard-page">
//       {/* Header */}
//       <header className="dashboard-header">
//         <h1>Dashboard</h1>
//       </header>


//       {/* Bookings Section */}
//       <div className="dashboard-bookings">
//         <h2>My Bookings</h2>
//         <div className="booking-cards">
//           <div className="booking-card">
//             <h3>Booking 1</h3>
//             <p>11am Nov 19, 2024</p>
//             <p>Bear</p>
//             <p>Grooming</p>
//           </div>
//           <div className="booking-card">
//             <h3>Booking 2</h3>
//             <p>3pm Nov 26, 2024</p>
//             <p>Bear</p>
//             <p>Dog Walk</p>
//           </div>
//           <div className="booking-card">
//             <h3>Booking 3</h3>
//             <p>10am Dec 3rd, 2024</p>
//             <p>Bear, Misty</p>
//             <p>Daycare</p>
//           </div>
//           <div className="booking-card">
//             <h3>Booking 4</h3>
//             <p>12pm Jan 15th, 2025</p>
//             <p>Misty</p>
//             <p>Grooming</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const Dashboard = () => {
  const {user, setUser} = useUserContext()
  const [bookings, setBookings] = useState([])
  const nav = useNavigate()

  async function fetchBookings() {
    const returnedBookings = await fetch(`${fetchURL}/bookings/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify({ user_id: user._id }),
    }).catch((error) => {
      console.log(error.message)
    })

    const data = await bookings.json()
    setBookings(data.bookings)
  }

    useEffect(() => {
      try {
        if (user == undefined) {
          nav('/LogIn')}
        fetchBookings()
      } catch (error) {
        console.log(error.message)
      }
      }
    , [])
  


    const bookingCard = ({booking, date, service, time, price}) => {

      const nthNumber = (str) => {
        let i = Number(str)
        let j = i % 10, k = i % 100;
        if (j === 1 && k !== 11) {
          return i + "st";
        }
        if (j === 2 && k !== 12) {
          return i + "nd";
        }
        if (j === 3 && k !== 13) {
          return i + "rd";
        }
        return i + "th";
      }

      const addBookingToUserContext = () => {
        setUser({...user, booking: booking})
        console.log(booking, user, "Booking to modify added on user")
      }
      
      
      const removeBooking = async () => {
        const bookingToRemove = await fetch(`${fetchURL}/bookings/${booking._id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: user.token,
          }})
          const data = await bookingToRemove.json().then((data) => {
            if (data.code === 200) {
              fetchBookings()
            } else {
              return true
            }
          })
          
        }
      }
    }



export default Dashboard;
