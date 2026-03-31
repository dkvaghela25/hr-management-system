import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 flex flex-col flex-1 items-center  w-full relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;