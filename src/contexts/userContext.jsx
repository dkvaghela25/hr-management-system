/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import users from "../api/users";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user,setUser] = useState({});

    const handleLogin = (userId) => {
        const user = users.filter(user => user.id === userId);
        setUser(user[0]);
    }

    return (
        <UserContext.Provider value={{user, setUser, handleLogin}}>{children}</UserContext.Provider>
    )

}

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}
