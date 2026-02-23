import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useUserContext();

  const openMenu = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <>
      {user && <>

        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <img className="w-10 h-10 cursor-pointer" onClick={openMenu} src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000" alt="" />
          </div>
        </div>
        {isOpen &&
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
      }
    </>
  );
};

export default Navbar;