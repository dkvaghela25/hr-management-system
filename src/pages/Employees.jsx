import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { FaPlus } from "react-icons/fa";
import PaginationBar from "../components/ui/PaginationBar";
import { useState } from "react";

const Employees = () => {

    const { user, users } = useUserContext();

    const [tableRows, setTableRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState(users);

    const navigate = useNavigate();

    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-[80%]`}>
                <h1 className="font-extrabold text-3xl underline">Employees List</h1>
                <div className={`bg-white p-6 rounded-xl shadow-sm w-full`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2">Employee Id</th>
                                    <th className="py-2">Employee</th>
                                    <th className="py-2">Role</th>
                                    <th className="py-2">Department</th>
                                    <th className="py-2">Joining Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map(user => {
                                    return (
                                        <tr key={user.id} className="border-b hover:bg-gray-50">
                                            <td className="py-2">{user.id}</td>
                                            <td className="py-2">{user.name}</td>
                                            <td className="py-2">{user.role}</td>
                                            <td className="py-2">{user.department}</td>
                                            <td className="py-2">{(new Date(user.joiningDate)).toLocaleDateString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {user?.role === "HR" && <button onClick={() => navigate("/add_employee")} className="bg-[#1D293D] text-white p-[10px_20px] flex gap-3 items-center rounded cursor-pointer"><FaPlus /> <span>Add Employee</span></button>}
            </div>

            <PaginationBar filteredRows={filteredRows} setTableRows={setTableRows} />
        </>
    );
};

export default Employees;

