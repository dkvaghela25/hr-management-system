import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import {
  MdDashboard,
  MdPeople,
  MdEventNote,
  MdLogin,
  MdListAlt,
  MdSettings
} from "react-icons/md";

const Sidebar = () => {
  const { user } = useUserContext();

  // Helper for active styling
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
    }`;

  return (
    <div className="w-[18%] bg-[#111827] text-white fixed h-screen flex flex-col border-r border-slate-800 top-0">
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
          <img src="./images/hrms_logo_sidebar.svg" alt="HRMS Logo" className="pr-10 w-full max-w-80" />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-8">
        <div>
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
            Main Menu
          </p>

          <div className="space-y-1">
            {!user ? (
              <>
                <NavLink to="/login" className={linkClass}>
                  <MdLogin size={20} />
                  <span className="font-medium">Login</span>
                </NavLink>
                <NavLink to="/user_list" className={linkClass}>
                  <MdListAlt size={20} />
                  <span className="font-medium">User List</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" className={linkClass}>
                  <MdDashboard size={20} />
                  <span className="font-medium">Dashboard</span>
                </NavLink>
                <NavLink to="/employees" className={linkClass}>
                  <MdPeople size={20} />
                  <span className="font-medium">Employees</span>
                </NavLink>

                {user?.role !== "HR" && (
                  <NavLink to="/leave_requests" className={linkClass}>
                    <MdListAlt size={20} />
                    <span className="font-medium">{user?.role === "PROJECT_MANAGER" ? "Leave Requests" : "Your Leave Requests"}</span>
                  </NavLink>
                )}

                {user?.role === "EMPLOYEE" && (
                  <>
                    <NavLink to="/apply_leave" className={linkClass}>
                      <MdEventNote size={20} />
                      <span className="font-medium">Apply Leave</span>
                    </NavLink>
                  </>
                )}

              </>
            )}
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
          <MdSettings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;