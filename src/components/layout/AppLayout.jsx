import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

const AppLayout = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 flex items-center justify-center w-full relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;