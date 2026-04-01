import { useState } from "react";
import { MdEmail, MdLocationOn, MdWork } from "react-icons/md";
import UserData from "./UserData";

const UserCard = ({ user }) => {

    const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
                <div>
                    <img
                        className="w-16 h-16 rounded-full bg-slate-100 p-1 border border-slate-200"
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt={user.name}
                    />
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{user.name}</h3>
                    <p className="text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-3">{user.role}</p>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <MdWork className="text-slate-400" />
                            <span>{user.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <MdLocationOn className="text-slate-400" />
                            <span>Surat, India</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm truncate">
                            <MdEmail className="text-slate-400" />
                            <span className="truncate">{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={() => setIsUserProfileOpen(true)} className="w-full mt-5 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg transition-colors">
                View Full Profile
            </button>

            {isUserProfileOpen && <UserData userData={user} setIsOpen={setIsUserProfileOpen} />}
        </div>
    );
};

export default UserCard;