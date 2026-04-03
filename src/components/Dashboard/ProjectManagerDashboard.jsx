import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import CustomTable from "../ui/CustomTable";
import { HiOutlineChevronRight } from "react-icons/hi";

const ProjectManagerDashboard = () => {

    const { users, user, leaveRequests } = useUserContext();

    const mappedUsers = {};

    users.forEach((user) => {
        mappedUsers[user.id] = user.name;
    });

    let rows = leaveRequests.filter((request) => request.managerId === user.id && request.status === "PENDING").slice(0, 5);
    rows = rows.map(row => (
        {
            ...row,
            employeeName: mappedUsers[row.employeeId],
            action: row.status === "PENDING" ? row.id : null
        }
    ))

    const columns = [
        { Header: "Id", accessor: "id" },
        { Header: "Employee Name", accessor: "employeeName" },
        { Header: "From", accessor: "from" },
        { Header: "To", accessor: "to" },
        { Header: "Days", accessor: "days" },
        { Header: "Leave Type", accessor: "leaveType" },
        { Header: "Note", accessor: "note" },
        { Header: "Status", accessor: "status" },
        { Header: "Action", accessor: "action" },
    ]

    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-full`}>
                <div className="flex flex-col p-5 bg-white rounded-lg items-center gap-5 w-full min-w-0">
                    <div className="w-full flex justify-between items-center font-bold text-slate-800">
                        <div>
                            <h1 className="text-2xl">Pending Leave Requests</h1>
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

export default ProjectManagerDashboard;

