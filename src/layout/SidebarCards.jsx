import { NavLink } from "react-router-dom";
import {
    MdDashboard,
    MdEventNote,
    MdListAlt,
    MdPeople,
    MdSettings
} from "react-icons/md";
import { useUserContext } from "../contexts/userContext";

const SidebarCards = () => {

    const { user } = useUserContext();

    const linkClass = ({ isActive }) =>
        `flex flex-col items-center gap-2 py-5 text-center transition-all duration-200 group ${isActive
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        }`;

    return (
        <div className="w-[8%] bg-[#111827] text-white fixed h-screen flex flex-col border-r border-slate-800 top-0">
            <div className="text-center px-1 py-5 border-b border-slate-500">
                <img src="./images/hrms_logo_sidebarcard.svg" alt="HRMS Logo" className="w-full max-w-80" />
            </div>

            <nav className="flex-1 space-y-8">
                <div>
                    <div className="space-y-1">
                        <NavLink to="/dashboard" className={linkClass}>
                            <MdDashboard size={30} />
                            <span className="text-sm font-medium">Dashboard</span>
                        </NavLink>
                        <NavLink to="/employees" className={linkClass}>
                            <MdPeople size={30} />
                            <span className="text-sm font-medium">Employees</span>
                        </NavLink>
                        <NavLink to="/leave_requests" className={linkClass}>
                            <MdListAlt size={30} />
                            <span className="text-sm font-medium">{user?.role === "PROJECT_MANAGER" ? "Leave Requests" : "Your Leave Requests"}</span>
                        </NavLink>
                        {user?.role === "EMPLOYEE" && (
                            <NavLink to="/apply_leave" className={linkClass}>
                                <MdEventNote size={30} />
                                <span className="text-sm font-medium">Apply Leave</span>
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>

            <div className="p-4 mt-auto border-t border-slate-800">
                <div className="flex flex-col items-center gap-3 px-4 py-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
                    <MdSettings size={30} />
                    <span className="text-sm font-medium">Settings</span>
                </div>
            </div>
        </div>
    );
};

export default SidebarCards;