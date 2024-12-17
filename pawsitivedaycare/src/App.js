import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import MainDashboard from "./pages/MainDashboard";
import BookingDashboard from "./pages/BookingDashboard";
import UpdateBooking from "./pages/UpdateBooking";
import "./App.css";
import { UserContextProvider } from "./components/UserContext";
import JoinController from "./pages/SignUpPage"
import LoginController from "./pages/LoginPage";

function App() {
    return (
        <UserContextProvider>
            <Router>
                <div className="page-container">
                    <Navbar />
                    <main className="content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Services" element={ <ServicesPage />} />  
                        <Route path="/ContactUs" element={ <ContactPage />} />  
                        <Route path="/AboutUs" element={ <AboutPage />} />
                        <Route path="/LogIn" element={ <LoginController />} />
                        <Route path="/SignUp" element={ <JoinController />} />
                        <Route path="/MainDashboard" element={ <MainDashboard />} />
                        <Route path="/BookingDashboard" element={ <BookingDashboard />} />
                        <Route path="/update-booking/:bookingId" element={ <UpdateBooking />} />

                        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </UserContextProvider>
    );
}

export default App;