import React, { createContext, useState, useContext } from "react";


export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  console.log("UserContextProvider is rendering");

  const [user, setUser] = useState(null);

  console.log("Initial user state:", user);
  console.log("setUser function:", setUser);

  const addBookingToUserContext = (booking) => {
    setUser((prevUser) => ({ ...prevUser, booking }));
    console.log(booking, user, "Booking to modify added on user");
  };

  
  return (
    <UserContext.Provider value={{ user, setUser, addBookingToUserContext }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
}

export { UserContextProvider, useUserContext };