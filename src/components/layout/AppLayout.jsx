import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen pt-10 pb-10">
       <Outlet />
    </div>
  );
};

export default AppLayout;