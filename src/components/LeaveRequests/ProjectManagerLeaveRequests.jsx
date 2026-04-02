
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { escapeRegExp } from "../../constants";
import CustomTable from "../ui/CustomTable";
import PaginationBar from "../ui/PaginationBar";

const ProjectManagerLeaveRequests = () => {

  const { users, user, leaveRequests } = useUserContext();

  const [filters, setFilters] = useState({
    employeeName: "",
    dateRange: {
      startDate: "",
      endDate: ""
    },
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
    if (name === "startDate" || name === "endDate") return setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, [name]: value } }))
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const mappedUsers = {};

  users.forEach(user => {
    mappedUsers[user.id] = user.name;
  });


  let initialData = leaveRequests?.filter((request) => request.managerId === user.id) ?? [];
  initialData = initialData.map(data => (
    {
      ...data,
      employeeName: mappedUsers[data.employeeId],
      action: data.status === "PENDING" ? data.id : null
    }
  ))

  const [filteredRequests, setFilteredRequests] = useState(initialData);
  const [rows, setRows] = useState([]);

  useEffect(() => {

    const handler = setTimeout(() => {
      const { employeeName, dateRange: { startDate, endDate }, days: { minDays, maxDays }, leaveType, note, status } = filters;

      if (!employeeName && !startDate && !endDate && !minDays && !maxDays && !leaveType && !note && !status) return setFilteredRequests(initialData);

      const employeeNameRegex = new RegExp(escapeRegExp(employeeName), "i");
      const noteRegex = new RegExp(escapeRegExp(note), "i");

      const newFilteredRequests = initialData.filter((currRequest) => {

        const matchesEmployeeName = employeeNameRegex.test(String(currRequest.employeeName ?? ""));
        const matchesNote = noteRegex.test(String(currRequest.note ?? ""));

        const matchesRange = (startDate && endDate)
          ? (new Date(currRequest.from) > new Date(startDate)) && new Date(currRequest.to) < new Date(endDate)
          : true

        const matchesMinDays = minDays !== "" ? currRequest.days >= minDays : true;
        const matchesMaxDays = maxDays !== "" ? currRequest.days <= maxDays : true;
        const matchesLeaveType = leaveType !== "" ? currRequest.leaveType === leaveType : true;
        const matchesStatus = status !== "" ? currRequest.status === status : true;

        return matchesEmployeeName && matchesNote && matchesRange && matchesMinDays && matchesMaxDays && matchesLeaveType && matchesStatus;
      });

      setFilteredRequests(newFilteredRequests);
    }, 400);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const columns = [
    { Header: "Employee Name", accessor: "employeeName", filterBy: true, filterInputValue: filters.employeeName, handleChange },
    { Header: "From", accessor: "from", filterBy: true, filterInputValue: filters.dateRange, handleChange },
    { Header: "To", accessor: "to" },
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
          <CustomTable rows={rows} columns={columns} />
        </div>
        <PaginationBar totalRows={filteredRequests} setRows={setRows} />
      </div>
    </>
  );
};

export default ProjectManagerLeaveRequests;