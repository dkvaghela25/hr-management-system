import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const Sidebar = () => {

  const { user } = useUserContext();

  return (
    <>
      <div className="w-56 bg-slate-800 text-white p-5">
        <h2 className="text-xl font-bold mb-8">HRMS</h2>

        <nav className="space-y-3">
          {!user
            ? <>
              <Link to="/login" className="block hover:bg-slate-700 p-2 rounded">Login</Link>
              <Link to="/user_list" className="block hover:bg-slate-700 p-2 rounded">User List</Link>
            </>
            : <>
              <Link to="/dashboard" className="block hover:bg-slate-700 p-2 rounded">Dashboard</Link>
              <Link to="/employees" className="block hover:bg-slate-700 p-2 rounded">Employees</Link>
              {user?.role === "EMPLOYEE" && <Link to="/apply_leave" className="block hover:bg-slate-700 p-2 rounded">Apply Leave</Link>}
              {user?.role === "PROJECT_MANAGER" && <Link to="/leave_requests" className="block hover:bg-slate-700 p-2 rounded">Leave Requests</Link>}
            </>
          }
        </nav>
      </div>
    </>
  );
};

export default Sidebar;


