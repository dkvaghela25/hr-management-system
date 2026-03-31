import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const PublicRoutes = () => {
    const { user } = useUserContext();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />

};

export default PublicRoutes;