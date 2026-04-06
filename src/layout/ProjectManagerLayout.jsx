import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SidebarCards from "./SidebarCards";

const ProjectManagerLayout = () => {

  return (
    <div className="relative flex min-h-screen bg-gray-100 overflow-x-hidden">
      <SidebarCards />

      <div className="absolute w-[92%] -right-1 flex flex-col min-w-0 overflow-x-hidden">
        <Navbar />
        <div className="p-6 flex flex-col flex-1 items-center w-full min-w-0 relative overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
  
};

export default ProjectManagerLayout;