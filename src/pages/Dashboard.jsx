import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";
import HRDashboard from "../components/Dashboard/HRDashboard";
import ProjectManagerDashboard from "../components/Dashboard/ProjectManagerDashboard";
import { useUserContext } from "../contexts/userContext";
const Dashboard = () => {

  const { user } = useUserContext();

  return (
    <>
      {user?.role === "HR" && <HRDashboard />}
      {user?.role === "EMPLOYEE" && <EmployeeDashboard />}
      {user?.role === "PROJECT_MANAGER" && <ProjectManagerDashboard />}
    </>
  );
};

export default Dashboard;