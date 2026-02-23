/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import data from "../api/users";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {


    const currentUsers = JSON.parse(localStorage.getItem('users'));
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const [users, setUsers] = useState(currentUsers);
    const [user, setUser] = useState(currentUser);

    console.log(users);
    
    if (currentUsers === null) {
        localStorage.setItem('users', JSON.stringify(data))
        setUsers(data)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    const handleLogin = (userId) => {
        console.log(users);
        const user = users.filter(user => user.id === userId)[0];
        setUser(user);
    }

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ users, user, setUsers, setUser, handleLogin, handleLogout }}>{children}</UserContext.Provider>
    )

}

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}
