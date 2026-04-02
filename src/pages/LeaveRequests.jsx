import { useUserContext } from "../contexts/userContext";
import EmployeeLeaveRequests from "../components/LeaveRequests/EmployeeLeaveRequests";
import ProjectManagerLeaveRequests from "../components/LeaveRequests/ProjectManagerLeaveRequests";

const LeaveRequests = () => {

  const { user } = useUserContext();

  return (
    <>
      {user?.role === "EMPLOYEE" && <EmployeeLeaveRequests />}
      {user?.role === "PROJECT_MANAGER" && <ProjectManagerLeaveRequests />}
    </>
  );
};

export default LeaveRequests;