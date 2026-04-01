import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useLocation } from "react-router-dom";
import { ImSwitch } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import UserData from "../components/UserData";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const { user, handleLogout } = useUserContext();

  const openMenu = () => {
    setIsOpen(prev => !prev);
  }

  const title = useLocation().pathname.slice(1).split("_").join(" ") || "Dashboard"

  const handleUserLogout = () => {
    handleLogout()
    setIsOpen(false);
  }

  return (
    <>
      <div className="relative bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl capitalize font-bold text-slate-900 leading-tight">{title}</h1>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="font-bold text-slate-900 text-lg leading-tight">Welcome, {user ? user.name : "Guest"}</span>
            {user && <span className="text-indigo-600 text-xs font-semibold uppercase tracking-wider">{user.role}, {user.department} Department</span>}
          </div>
          <img
            onClick={openMenu}
            className="w-14 h-14 cursor-pointer rounded-full bg-slate-100 p-1 border border-slate-200"
            src={user
              ? `https://ui-avatars.com/api/?name=${user.name}&background=random`
              : "https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
            }
            alt={user?.name}
          />
        </div>

        {isOpen && user && (
          <>
            <div className="absolute top-22 right-5 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-slate-50 md:hidden">
                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 uppercase">{user.role}</p>
              </div>

              <button
                onClick={() => { setIsUserProfileOpen(true); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <CgProfile className="text-lg" />
                <span>View Profile</span>
              </button>

              <button
                onClick={handleUserLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <ImSwitch className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </>
        )}

      </div>

      {isUserProfileOpen && <UserData userData={user} setIsOpen={setIsUserProfileOpen} userId={user.id} />}

    </>
  );
};

export default Navbar;