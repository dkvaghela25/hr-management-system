
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import CustomTable from "../ui/CustomTable";
import PaginationBar from "../ui/PaginationBar";
import { MdRotateLeft } from "react-icons/md";
import { getSortingLogic } from "../../utils/getSortingLogic";
import { useFilteredRows } from "../../hooks/useFilteredRows";

const EmployeeLeaveRequests = () => {

    const { user, leaveRequests } = useUserContext();

    const initialFiltersValue = {
        id: "",
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
    }

    let initialData = leaveRequests.filter((request) => request.employeeId === user.id) ?? [];

    const [rows, setRows] = useState([]);

    const { filters, filteredRequests, setFilteredRequests, clearFilters, handleChange } = useFilteredRows(initialData, initialFiltersValue, setRows);

    const columns = [
        { Header: "Id", accessor: "id", filterBy: true, filterInputValue: filters.id, handleChange, sortBy: getSortingLogic(setFilteredRequests)  },
        { Header: "From", accessor: "from", filterBy: true, filterInputValue: filters.dateRange, handleChange, sortBy: getSortingLogic(setFilteredRequests)  },
        { Header: "To", accessor: "to" },
        { Header: "Days", accessor: "days", filterBy: true, filterInputValue: filters.days, handleChange, sortBy: getSortingLogic(setFilteredRequests)  },
        { Header: "Leave Type", accessor: "leaveType", filterBy: true, filterInputValue: filters.leaveType, handleChange },
        { Header: "Note", accessor: "note", filterBy: true, filterInputValue: filters.note, handleChange },
        { Header: "Status", accessor: "status", filterBy: true, filterInputValue: filters.status, handleChange },
    ]

    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-full min-w-0`}>
                <div className="flex w-full justify-between items-center pb-3 border-b border-slate-300">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Leave Requests</h1>
                        <p className="text-sm text-slate-500">View details of all current leave requests that require immediate attention.</p>
                    </div>

                    {filteredRequests.length !== initialData.length && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all"
                        >
                            <MdRotateLeft className="text-lg" />
                            <span>Reset Filters</span>
                        </button>
                    )}

                </div>
                <div className="w-full overflow-x-auto">
                    <CustomTable rows={rows} columns={columns} />
                </div>
                {filteredRequests.length !== 0 && <PaginationBar totalRows={filteredRequests} setRows={setRows} />}
            </div>
        </>
    );
};

export default EmployeeLeaveRequests;

