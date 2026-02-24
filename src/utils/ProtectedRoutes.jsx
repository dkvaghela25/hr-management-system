import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const ProtectedRoutes = ({ role }) => {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;