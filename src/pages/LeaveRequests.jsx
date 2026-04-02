import { useUserContext } from "../contexts/userContext";
import CustomTable from "../components/ui/CustomTable";
import { useEffect, useState } from "react";
import { escapeRegExp } from "../constants";

const LeaveRequests = () => {

  const { users, user, leaveRequests } = useUserContext();

  const [filters, setFilters] = useState({
    employeeName: "",
    from: "",
    to: "",
    days: {
      minDays: "",
      maxDays: ""
    },
    leaveType: "",
    note: "",
    status: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "minDays" || name === "maxDays") return setFilters(prev => ({ ...prev, days: { ...prev.days, [name]: value } }))
    setFilters(prev => ({ ...prev, [name]: value }))
  }

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

  const [filteredRequests, setFilteredRequests] = useState(rows);

  console.log("filteredRequests......................................", filteredRequests)


  useEffect(() => {

    const handler = setTimeout(() => {
      const { employeeName, from, to, days: { minDays, maxDays }, leaveType, note, status } = filters;

      if (!employeeName && !from && !to && !minDays && !maxDays && !leaveType && !note && !status) return setFilteredRequests(rows);

      const employeeNameRegex = new RegExp(escapeRegExp(employeeName), "i");
      const noteRegex = new RegExp(escapeRegExp(note), "i");


      const newFilteredRequests = rows.filter((currRequest) => {

        const matchesEmployeeName = employeeNameRegex.test(String(currRequest.employeeName ?? ""));
        const matchesNote = noteRegex.test(String(currRequest.note ?? ""));
        const matchesFrom = from !== "" ? new Date(currRequest.from) > new Date(from) : true;
        const matchesTo = to !== "" ? new Date(currRequest.to) < new Date(to) : true;
        const matchesMinDays = minDays !== "" ? currRequest.days >= minDays : true;
        const matchesMaxDays = maxDays !== "" ? currRequest.days <= maxDays : true;
        const matchesLeaveType = leaveType !== "" ? currRequest.leaveType === leaveType : true;
        const matchesStatus = status !== "" ? currRequest.status === status : true;
        
        return matchesEmployeeName && matchesNote && matchesFrom && matchesTo && matchesMinDays && matchesMaxDays && matchesLeaveType && matchesStatus;
      });

      setFilteredRequests(newFilteredRequests);
    }, 400);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const columns = [
    { Header: "Employee Name", accessor: "employeeName", filterBy: true, filterInputValue: filters.employeeName, handleChange },
    { Header: "From", accessor: "from", filterBy: true, filterInputValue: filters.from, handleChange },
    { Header: "To", accessor: "to", filterBy: true, filterInputValue: filters.to, handleChange },
    { Header: "Days", accessor: "days", filterBy: true, filterInputValue: filters.days, handleChange },
    { Header: "Leave Type", accessor: "leaveType", filterBy: true, filterInputValue: filters.leaveType, handleChange },
    { Header: "Note", accessor: "note", filterBy: true, filterInputValue: filters.note, handleChange },
    { Header: "Status", accessor: "status", filterBy: true, filterInputValue: filters.status, handleChange },
    { Header: "Action", accessor: "action" },
  ]

  return (
    <>
      <div className={`flex flex-col items-center gap-5 w-full min-w-0`}>
        <div className="mr-auto">
          <h1 className="text-2xl font-bold text-slate-800">Leave Requests</h1>
        </div>
        <div className="w-full overflow-x-auto">
          <CustomTable rows={filteredRequests} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default LeaveRequests;