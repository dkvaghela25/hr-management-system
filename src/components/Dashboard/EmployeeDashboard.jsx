import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import CustomTable from "../ui/CustomTable";
import { HiOutlineChevronRight } from "react-icons/hi";

const EmployeeDashboard = () => {

    const { user, leaveRequests } = useUserContext();

    const rows = leaveRequests.filter((request) => request.employeeId === user.id).slice(0,5);
    const columns = Object.keys(rows[0]).map((key) => ({ Header: key.toLocaleUpperCase(), accessor: key }))

    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-full`}>
                <div className="flex flex-col p-5 bg-white rounded-lg items-center gap-5 w-full min-w-0">
                    <div className="w-full flex justify-between items-center font-bold text-slate-800">
                        <div>
                            <h1 className="text-2xl">Your Leave Requests</h1>
                        </div>

                        <NavLink to="/leave_requests">
                            <button
                                className="hover:cursor-pointer px-4 py-2 flex gap-2 items-center font-medium"
                            >
                                View All <HiOutlineChevronRight className="text-xl -ml-1" />
                            </button>
                        </NavLink>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <CustomTable rows={rows} columns={columns} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDashboard;

