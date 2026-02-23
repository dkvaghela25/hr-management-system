/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import LoginPage from "../pages/LoginPage";
import { useEffect } from "react";

const ProtectedRoutes = ({role}) => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } else if (user.role !== role) {
            navigate("/dashboard")
        }
    }, [user,role])

    return (
        <>
            <Outlet />
        </>
    );
};

export default ProtectedRoutes;