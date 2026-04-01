import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { FaPlus, FaSearch } from "react-icons/fa";
import UserCard from "../components/UserCard";
import FilterInputs from "../components/FilterInputs";
import { useState } from "react";

const Employees = () => {
    const { user, users } = useUserContext();
    const initialFilteredUsers = users.filter(currUser => currUser.department === user.department);
    const [filteredUsers, setFilteredUsers] = useState(initialFilteredUsers);

    const navigate = useNavigate();

    console.log(filteredUsers)

    return (
        <div className="p-8 w-full max-w-7xl mx-auto flex flex-col gap-8">
            
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Employee Directory</h1>
                    <p className="text-slate-500 text-sm">Managing team members in {user.department} Department</p>
                </div>
                
                {user?.role === "HR" && (
                    <button 
                        onClick={() => navigate("/add_employee")} 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 flex gap-2 items-center rounded-lg transition-all shadow-sm font-medium"
                    >
                        <FaPlus size={14} /> Add Employee
                    </button>
                )}
            </div>

            <FilterInputs setFilteredUsers={setFilteredUsers} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Employees;