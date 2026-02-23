import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

const Sidebar = () => {

  const { user } = useUserContext();

  return (
    <>
      {user &&
        <div className="w-64 bg-slate-800 text-white p-5">
          <h2 className="text-xl font-bold mb-8">HRMS</h2>

          <nav className="space-y-3">
            <Link to="/dashboard" className="block hover:bg-slate-700 p-2 rounded">
              Dashboard
            </Link>
            <Link to="/employees" className="block hover:bg-slate-700 p-2 rounded">
              Employees
            </Link>
            <Link to="/leave" className="block hover:bg-slate-700 p-2 rounded">
              Leave
            </Link>
            <Link to="/salary" className="block hover:bg-slate-700 p-2 rounded">
              Salary
            </Link>
          </nav>
        </div>
      }
    </>
  );
};

export default Sidebar;