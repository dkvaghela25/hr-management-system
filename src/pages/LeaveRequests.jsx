import { useUserContext } from "../contexts/userContext";
import CustomTable from "../components/ui/CustomTable";

const LeaveRequests = () => {

  const { users, user, leaveRequests } = useUserContext();

  const mappedUsers = {};

  users.forEach((mappedUser) => {
    mappedUsers[mappedUser.id] = mappedUser.name;
  });

  let rows = leaveRequests?.filter((request) => request.managerId === user.id) ?? [];
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
        <h1 className="font-extrabold text-3xl underline">Leave Requests</h1>
        <div className={`bg-white p-6 rounded-xl shadow-sm w-full max-w-full min-w-0 overflow-hidden`}>
          <div className="w-full overflow-x-auto">
            <CustomTable rows={rows} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequests;