import { createContext, useState, useContext } from "react";


export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const {user, setUser} = useState(undefined)

  const addBookingToUserContext = (booking) => {
    setUser({ ...user, booking });
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
    return UserContext;
}

export { UserContextProvider, useUserContext };