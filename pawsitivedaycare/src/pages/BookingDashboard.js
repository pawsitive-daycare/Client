import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import { fetchURL, ourServices } from "../components/api";
import axios from "axios";
import "../styles/BookingDashboard.css";

const BookingDashboard = () => {
  const { user } = useUserContext();
  const { state } = useLocation();
  const [time, setTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const nav = useNavigate();
  const [form, setForm] = useState({
    _id: "",
    date: "",
    service_name: state ? state.service_name : "",
    service_price: state ? state.service_name : "",
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
    for (const i of ourServices) {
      if (name === i.service_name) {
        return i.service_price;
      }
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name === "service_name") {
      form.service_price = matchPrice(value);
    }
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const addBooking = async (
    date,
    service_name,
    service_price,
    pet_animal,
    pet_name,
    pet_breed,
    pet_age
  ) => {
    date = formatDateToDDMMYYYY(selectedDate);

    const newBooking = {
      user: user._id,
      service: {
        service_name,
        service_price,
      },
      date: formatDateToDDMMYYYY(selectedDate),
      time: time,
      pet: {
        animal: pet_animal,
        name: pet_name,
        breed: pet_breed,
        age: pet_age,
      },
    };

    try {
      console.log("Sending booking request:", newBooking);
      const response = await axios.post(`${fetchURL}/mybookings`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.tk}`,
        },
      });

      if (response.status !== 201) {
        console.error("Error booking appointment:", response.data);
        alert(`Error booking appointment: ${response.data.message}`);
        return;
      }

      const data = response.data;
      console.log("Booking response data:", data);
      alert(`Appointment Booked!\nService: ${data.service_name}\nDate: ${data.date}\nTime: ${data.time}\nPet: ${data.pet_name}\nPrice: ${data.service_price}`);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking the appointment. Please try again.");
    }
  };

  const emptyForm = () => {
    if (
      form.service_name === "" ||
      form.pet_animal === "" ||
      form.pet_name === "" ||
      form.pet_breed === "" ||
      form.pet_age === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, "before submit");
    if (!emptyForm()) {
      await addBooking(
        form.date,
        form.service_name,
        form.service_price,
        form.pet_animal,
        form.pet_name,
        form.pet_breed,
        form.pet_age
      );
      alert("Appointment Booked!");
      // Reset form fields after booking
      setForm({
        _id: "",
        date: "",
        service_name: "",
        service_price: "",
        pet_animal: "",
        pet_name: "",
        pet_breed: "",
        pet_age: "",
      });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="book-appointment-page">
      <header className="book-appointment-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </header>

      <div className="book-appointment-container">
        <h2 className="appointment-title">
          <i>Book your appointment</i>
        </h2>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              defaultValue={
                state?.service_name ? state.service_name : "DEFAULT"
              }
              onChange={handleForm}
              id="packages-dropbox"
              required
              name="service_name"
            >
              <option value="DEFAULT" disabled>
                Select a service
              </option>
              {ourServices.map((el, idx) => {
                return (
                  <option key={idx} value={el.service_name}>
                    {el.service_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <input
              onChange={handleForm}
              value={form.pet_animal}
              type="text"
              className="booking-input"
              name="pet_animal"
              required
              placeholder={"pet animal"}
            />
            <input
              onChange={handleForm}
              value={form.pet_name}
              type="text"
              className="booking-input"
              name="pet_name"
              required
              placeholder={"pet name *"}
            />
            <input
              onChange={handleForm}
              value={form.pet_breed}
              type="text"
              className="booking-input"
              name="pet_breed"
              placeholder={"pet breed"}
            />
            <input
              onChange={handleForm}
              value={form.pet_age}
              type="number"
              className="booking-input"
              name="pet_age"
              placeholder={"pet age"}
            />
          </div>

          <div className="calendar-section">
            <h3>Select Date</h3>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <p>Selected Date: {selectedDate.toDateString()}</p>
          </div>

          <div className="form-group">
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a time
              </option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
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
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingDashboard;

// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useUserContext } from "../components/UserContext";
// import { fetchURL } from "../components/api";
// import "../styles/BookingDashboard.css";
// import { ourServices } from "../components/api";

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

//     date = formatDateToDDMMYYYY(selectedDate);


//     const newBooking = {
//       user: user._id,
//       service: {
//         service_name,
//         service_price,
//       },
//       date: formatDateToDDMMYYYY(selectedDate),
//       time: time,
//       pet: {
//         animal: pet_animal,
//         name: pet_name,
//         breed: pet_breed,
//         age: pet_age,
//       },
//     };
//     try {
//       const response = await fetch(`${fetchURL}/mybookings`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           authorization: user.tk,
//         },
//         body: JSON.stringify(newBooking),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error booking appointment:", errorData);
//         alert(`Error booking appointment: ${errorData.message}`);
//         return;
//       }
  
//       const data = await response.json();
//       console.log(data);
//       alert(`Appointment Booked!\nService: ${data.service_name}\nDate: ${data.date}\nTime: ${data.time}\nPet: ${data.pet_name}\nPrice: ${data.service_price}`);
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       alert("An error occurred while booking the appointment. Please try again.");
//     }
//   };
//   //   const returnedBooking = await fetch(fetchURL+'/mybookings', {
//   //           method: 'POST',
//   //           headers: {
//   //             Accept: 'application/json',
//   //             'Content-Type': 'application/json',
//   //             authorization: user.tk
//   //           },
//   //           body: JSON.stringify(newBooking)
//   //   });

//   //   const data = await returnedBooking.json();
//   //   console.log(data);
//   //   alert(`Appointment Booked!\nService: ${data.service_name}\nDate: ${data.date}\nTime: ${data.time}\nPet: ${data.pet_name}\nPrice: ${data.service_price}`);
//   // };



// // Reset form fields after booking
//   const emptyForm = () => {
//   if (
//     form.service_name === "" ||
//     form.pet_animal === "" ||
//     form.pet_name === "" ||
//     form.pet_breed === "" ||
//     form.pet_age === ""
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log(form, "before submit");
//   if (!emptyForm()) {
//     await addBooking(
//       form.date,
//       form.service_name,
//       form.service_price,
//       form.pet_animal,
//       form.pet_name,
//       form.pet_breed,
//       form.pet_age
//     );
//     alert("Appointment Booked!");
//     // Reset form fields after booking
//     setForm({
//       _id: "",
//       date: "",
//       service_name: "",
//       service_price: "",
//       pet_animal: "",
//       pet_name: "",
//       pet_breed: "",
//       pet_age: "",
//     });
//   } else {
//     alert("Please fill all fields");
//   }
// };

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
// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { useNavigate } from "react-router-dom";
// import { useUserContext } from "../components/UserContext";
// import { fetchURL } from "../components/api";
// import "../styles/BookingDashboard.css";

// const BookingDashboard = () => {
//   const [service, setService] = useState("");
//   const [time, setTime] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [name, setName] = useState("");

//   const { user } = useUserContext();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !user._id) {
//       alert("User not logged in. Please log in to book an appointment.");
//       return;
//     }

//     const formatDateToDDMMYYYY = (date) => {
//       const day = String(date.getDate()).padStart(2, "0");
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const year = date.getFullYear();
//       return `${day}-${month}-${year}`;
//     };

//     const newBooking = {
//       service,
//       name,
//       date: formatDateToDDMMYYYY(selectedDate),
//       time,
//       message,
//     };

//     try {
//       const response = await fetch(`${fetchURL}/mybookings`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(newBooking),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save booking");
//       }

//       alert(`Appointment Booked!\nService: ${service}\nTime: ${time}\nMessage: ${message}`);

//       // Reset form fields after booking
//       setService("");
//       setName("");
//       setTime("");
//       setMessage("");
//       setSelectedDate(new Date());

//       // Navigate to MainDashboard after successful booking
//       navigate("/MainDashboard");
//     } catch (error) {
//       console.error("Error saving booking:", error.message);
//       alert("Error saving booking. Please try again.");
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
//               id="service"
//               value={service}
//               onChange={(e) => setService(e.target.value)}
//               required
//             >
//               <option value="" disabled>
//                 Select a service
//               </option>
//               <option value="Grooming">Grooming</option>
//               <option value="Daycare">Daycare</option>
//               <option value="Dog Walking">Dog Walking</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <input
//               type="text"
//               id="name"
//               placeholder="Name of pet"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
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

//           <div className="form-group">
//             <textarea
//               id="message"
//               placeholder="Add a message (optional)"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
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