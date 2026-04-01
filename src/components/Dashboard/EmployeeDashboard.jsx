import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import CustomTable from "../ui/CustomTable";

const EmployeeDashboard = () => {

    const { user, leaveRequests } = useUserContext();

    const rows = leaveRequests.filter((request) => request.employeeId === user.id);
    const columns = Object.keys(rows[0]).map((key) => ({ Header: key.toLocaleUpperCase(), accessor: key }))


    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-full min-w-0`}>
                <h1 className="font-extrabold text-3xl underline">Your Leave Requests</h1>
                <div className={`bg-white p-6 rounded-xl shadow-sm w-full max-w-full min-w-0 overflow-hidden`}>
                    <div className="w-full overflow-x-auto">
                        <CustomTable rows={rows} columns={columns} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDashboard;

