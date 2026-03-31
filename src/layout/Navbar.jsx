import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useUserContext();

  const openMenu = () => {
    setIsOpen(prev => !prev);
  }

  const title = useLocation().pathname.slice(1).split("_").join(" ") || "Dashboard"

  return (
    <>
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold capitalize">{title}</h1>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-black">Welcome, {user ? user.name : "Guest"}</span>
            {user && <span className="text-right text-[12px] text-gray-600">{user.role}, {user.department} Department</span>}
          </div>
          <img className="w-10 h-10 cursor-pointer" onClick={openMenu} src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000" alt="" />
        </div>
      </div>
      {(isOpen && user) &&
        <div
          className="absolute right-5 top-20 bg-white p-[5px_20px] z-20 rounded cursor-pointer"
          onClick={
            () => {
              handleLogout()
              setIsOpen(false);
            }
          }
        >
          Logout
        </div>}
    </>
  );
};

export default Navbar;