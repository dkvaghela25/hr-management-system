import { useNavigate } from "react-router-dom";
import StatCard from "../components/ui/StatCard";
import { useUserContext } from "../contexts/userContext";
import HRDashboard from "../components/ui/Dashboard/HRDashboard";
import { useEffect } from "react";

const Dashboard = () => {

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user === null) navigate('/login');
  }, [])
  
  return (
    <>
      {user?.role === "HR" && <HRDashboard />}
    </>
  );
};

export default Dashboard;