import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { MdChevronRight, MdAccountCircle } from "react-icons/md";

const UserList = () => {
    const { users, handleLogin } = useUserContext();
    const navigate = useNavigate();

    const onUserSelect = (id) => {
        handleLogin(id);
        navigate("/dashboard");
    };

    return (
        <div className="p-8 mx-auto flex flex-col min-h-screen w-[60%] justify-center">
            {/* Minimalist Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                    HR Management System
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Select a user to sign in</p>
            </div>

            {/* Clean List Container */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <ul className="divide-y divide-slate-100">
                    {users.map((user) => (
                        <li key={user.id}>
                            <button
                                onClick={() => onUserSelect(user.id)}
                                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all group outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    {/* ID Badge */}
                                    <span className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                        {user.id}
                                    </span>
                                    
                                    {/* Name & Role */}
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="text-base font-bold text-slate-700 group-hover:text-indigo-700">
                                            {user.name}
                                        </span>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                            {user.role.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Indicator */}
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
    );
};

export default UserList;