
// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useUserContext } from "../components/UserContext";
// import { fetchURL, ourServices } from "../components/api";
// import "../styles/BookingDashboard.css";

// const BookingDashboard = () => {
//   const { user } = useUserContext();
//   const { state } = useLocation();
//   const [time, setTime] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const nav = useNavigate();
//   const [form, setForm] = useState({
//     _id: "",
//     date: "",
//     service_name: state ? state.service_name : "",
//     service_price: state ? state.service_name : "",
//     pet_animal: "",
//     pet_name: "",
//     pet_breed: "",
//     pet_age: "",
//   });

//   useEffect(() => {
//     if (!user) {
//       nav("/login");
//     }
//   });

//   const matchPrice = (name) => {
//     for (const i of ourServices) {
//       if (name === i.service_name) {
//         return i.service_price;
//       }
//     }
//   };

//   const handleForm = (e) => {
//     const { name, value } = e.target;
//     if (name === "service_name") {
//       form.service_price = matchPrice(value);
//     }
//     setForm({ ...form, [name]: value });
//     console.log(form);
//   };

//   const formatDateToDDMMYYYY = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const addBooking = async (
//     date,
//     service_name,
//     service_price,
//     pet_animal,
//     pet_name,
//     pet_breed,
//     pet_age
//   ) => {
//     const formattedDate = formatDateToDDMMYYYY(selectedDate);
//     const newBooking = {
//       user: user._id,
//       service: {
//         service_name,
//         service_price,
//       },
//       date: formattedDate,
//       time: time,
//       pet: {
//         animal: pet_animal,
//         name: pet_name,
//         breed: pet_breed,
//         age: pet_age,
//       },
//     };
//     console.log(`${fetchURL}/mybookings/${user._id}`)
//     try {
//       console.log("User", user);
//       const response = await fetch(`${fetchURL}/mybookings/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": user.token,
//         },
//         body: JSON.stringify(newBooking),
//         // body: JSON.stringify(dataToSubmit),
//       });
//       console.log("user.token", user.token);
//       const data = await response.json();
//       console.log("Server Response:", data);

//       alert("Booking registered successfully!");
//       console.log(data);

//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while registering the booking.");
//     };
//   };

//   console.log(`${fetchURL}/mybookings/${user._id}`);


//   const emptyForm = () => {
//     if (
//       form.service_name === "" ||
//       form.pet_animal === "" ||
//       form.pet_name === "" ||
//       form.pet_breed === "" ||
//       form.pet_age === ""
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(form, "before submit");
//     if (!emptyForm()) {
//       await addBooking(
//         form.date,
//         form.service_name,
//         form.service_price,
//         form.pet_animal,
//         form.pet_name,
//         form.pet_breed,
//         form.pet_age
//       );
//       alert("Appointment Booked!");
//       // Reset form fields after booking
//       setForm({
//         _id: "",
//         date: "",
//         service_name: "",
//         service_price: "",
//         pet_animal: "",
//         pet_name: "",
//         pet_breed: "",
//         pet_age: "",
//       });
//     } else {
//       alert("Please fill all fields");
//     }
//   };

//   return (
//     <div className="book-appointment-page">
//       <header className="book-appointment-header">
//         <h1 className="dashboard-title">Dashboard</h1>
//       </header>

//       <div className="book-appointment-container">
//         <h2 className="appointment-title">
//           <i>Book your appointment</i>
//         </h2>

//         <form className="appointment-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <select
//               defaultValue={
//                 state?.service_name ? state.service_name : "DEFAULT"
//               }
//               onChange={handleForm}
//               id="packages-dropbox"
//               required
//               name="service_name"
//             >
//               <option value="DEFAULT" disabled>
//                 Select a service
//               </option>
//               {ourServices.map((el, idx) => {
//                 return (
//                   <option key={idx} value={el.service_name}>
//                     {el.service_name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           <div className="form-group">
//             <input
//               onChange={handleForm}
//               value={form.pet_animal}
//               type="text"
//               className="booking-input"
//               name="pet_animal"
//               required
//               placeholder={"pet animal"}
//             />
//             <input
//               onChange={handleForm}
//               value={form.pet_name}
//               type="text"
//               className="booking-input"
//               name="pet_name"
//               required
//               placeholder={"pet name *"}
//             />
//             <input
//               onChange={handleForm}
//               value={form.pet_breed}
//               type="text"
//               className="booking-input"
//               name="pet_breed"
//               placeholder={"pet breed"}
//             />
//             <input
//               onChange={handleForm}
//               value={form.pet_age}
//               type="number"
//               className="booking-input"
//               name="pet_age"
//               placeholder={"pet age"}
//             />
//           </div>

//           <div className="calendar-section">
//             <h3>Select Date</h3>
//             <Calendar onChange={setSelectedDate} value={selectedDate} />
//             <p>Selected Date: {selectedDate.toDateString()}</p>
//           </div>

//           <div className="form-group">
//             <select
//               id="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               required
//             >
//               <option value="" disabled>
//                 Select a time
//               </option>
//               <option value="10:00 AM">10:00 AM</option>
//               <option value="10:30 AM">10:30 AM</option>
//               <option value="11:00 AM">11:00 AM</option>
//               <option value="11:30 AM">11:30 AM</option>
//               <option value="12:00 PM">12:00 PM</option>
//               <option value="12:30 PM">12:30 PM</option>
//               <option value="1:00 PM">1:00 PM</option>
//               <option value="1:30 PM">1:30 PM</option>
//               <option value="2:00 PM">2:00 PM</option>
//               <option value="2:30 PM">2:30 PM</option>
//               <option value="3:00 PM">3:00 PM</option>
//               <option value="3:30 PM">3:30 PM</option>
//               <option value="4:00 PM">4:00 PM</option>
//               <option value="4:30 PM">4:30 PM</option>
//               <option value="5:00 PM">5:00 PM</option>
//               <option value="5:30 PM">5:30 PM</option>
//               <option value="6:00 PM">6:00 PM</option>
//             </select>
//           </div>
//           <button type="submit" className="save-button">
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingDashboard;


import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchURL, ourServices } from "../components/api";
import "../styles/BookingDashboard.css";

const BookingDashboard = () => {
  const { user } = useUserContext();
  const { state } = useLocation();
  const [time, setTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const nav = useNavigate();
  const [form, setForm] = useState({
    service_name: state ? state.service_name : "",
    pet_animal: "",
    pet_name: "",
    pet_breed: "",
    pet_age: "",
  });

  useEffect(() => {
    if (!user) {
      nav("/login");
    }
  }, [user, nav]);

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

  const handleSubmit = async (e) => {
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

    const newBooking = {
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
    console.log("New Booking:", newBooking);
    try {
      const response = await fetch(`${fetchURL}/mybookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Booking successfully created!");
        console.log("Booking Created:", data);
        nav("/MainDashboard"); // Redirect to bookings list
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the booking.");
    }
  };

  return (
    <div className="book-appointment-page">
      <header className="book-appointment-header">
        <h1 className="dashboard-title">Book Your Appointment</h1>
      </header>

      <div className="book-appointment-container">
        <form className="appointment-form" onSubmit={handleSubmit}>
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
            Save Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingDashboard;