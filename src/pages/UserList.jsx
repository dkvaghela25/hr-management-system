import { useUserContext } from "../contexts/userContext";
import { NavLink, useNavigate } from "react-router-dom";
import { MdChevronRight, MdAccountCircle } from "react-icons/md";

const UserList = () => {
    const { users, handleLogin } = useUserContext();
    const navigate = useNavigate();

    const onUserSelect = (id) => {
        handleLogin(id);
        navigate("/dashboard");
    };

    return (
        <div className="bg-slate-100 ">
            <div className="p-8 mx-auto flex flex-col min-h-screen w-[50%] justify-center">
                <div className="border-b pb-5 mb-5 border-slate-300 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                            HR Management System
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">Select a user to sign in</p>
                    </div>
                    <NavLink to="/login">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 flex gap-2 items-center rounded-lg transition-all shadow-sm font-medium"
                        >
                            Login Page
                        </button>
                    </NavLink>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <ul className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <li key={user.id}>
                                <button
                                    onClick={() => onUserSelect(user.id)}
                                    className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all group outline-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                            {user.id}
                                        </span>

                                        <div className="flex flex-col items-start leading-tight">
                                            <span className="text-base font-bold text-slate-700 group-hover:text-indigo-700">
                                                {user.name}
                                            </span>
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                {user.role.replace('_', ' ')}, {user.department} Department
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all">
                                        <span className="text-xs font-semibold opacity-0 group-hover:opacity-100">Login</span>
                                        <MdChevronRight size={24} />
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserList;