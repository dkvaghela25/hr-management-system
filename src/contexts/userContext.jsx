/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import userData from "../api/users";
import leaveRequestsData from "../api/leaveRequests";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {


    const currentUsers = JSON.parse(localStorage.getItem('users'));
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentLeaveRequests = JSON.parse(localStorage.getItem('leaveRequests'));

    const [users, setUsers] = useState(currentUsers);
    const [user, setUser] = useState(currentUser);
    const [leaveRequests, setLeaveRequests] = useState(currentLeaveRequests);

    if (currentUsers === null) {
        localStorage.setItem('users', JSON.stringify(userData))
        setUsers(userData)
    }

    if (currentLeaveRequests === null) {
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequestsData))
        setLeaveRequests(leaveRequestsData)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    useEffect(() => {
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests))
    }, [leaveRequests])

    const handleLogin = (userId) => {
        console.log(users);
        const user = users.filter(user => user.id === userId)[0];
        setUser(user);
    }

    const handleLogout = () => {
        setUser(null);
    }

    const value = {
        users,
        setUsers,
        user,
        setUser,
        leaveRequests,
        setLeaveRequests,
        handleLogin,
        handleLogout
    }


    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )

}

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}
