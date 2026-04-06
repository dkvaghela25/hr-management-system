import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SidebarCards from "./SidebarCards";
import Announcements from "./Announcements";

const EmployeeLayout = () => {

  return (
    <div className="relative flex min-h-screen bg-gray-100 overflow-x-hidden">
      <SidebarCards />

      <div className="absolute w-[92%] min-h-screen right-0 flex flex-col min-w-0 overflow-x-hidden">
        <Navbar />
        <div className="flex flex-1">
          <div className="w-[80%] p-6 flex flex-col items-center min-w-0 relative overflow-x-hidden">
            <Outlet />
          </div>
          <div className="w-[20%]">
            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );

};

export default EmployeeLayout;