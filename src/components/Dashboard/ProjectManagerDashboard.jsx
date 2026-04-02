import { useUserContext } from "../../contexts/userContext";
import CustomTable from "../ui/CustomTable";

const ProjectManagerDashboard = () => {

    const { users, user, leaveRequests } = useUserContext();

    const mappedUsers = {};

    users.forEach((mappedUser) => {
        mappedUsers[mappedUser.id] = mappedUser.name;
    });

    let rows = leaveRequests.filter((request) => request.managerId === user.id && request.status === "PENDING");
    rows = rows.map(row => (
        {
            ...row,
            employeeName: mappedUsers[row.id],
            action: row.status === "PENDING" ? row.id : null
        }
    ))

    const columns = [
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
            <div className={`flex flex-col items-center gap-5 w-full min-w-0`}>
                <div className="mr-auto">
                    <h1 className="text-2xl font-bold text-slate-800"> Pending Leave Requests</h1>
                </div>
                <div className="w-full overflow-x-auto">
                    <CustomTable rows={rows} columns={columns} />
                </div>
            </div>
        </>
    );
};

export default ProjectManagerDashboard;

