import { createContext } from "react";


const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const {user, setUser} = useState(undefined)

    return (
        <UserContext.Provider value={{ user, setUser }}/>
            
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