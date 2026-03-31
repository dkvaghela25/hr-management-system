import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

const EmployeeDashboard = () => {

    const { user, leaveRequests } = useUserContext();

    const navigate = useNavigate();

    const userLeaveRequests = leaveRequests.filter((request) => request.employeeId === user.id);

    const getBgColor = (status) => {
        switch (status) {
            case "APPROVED": return "bg-green-500";
            case "PENDING": return "bg-yellow-500";
            case "REJECTED": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-full min-w-0`}>
                <h1 className="font-extrabold text-3xl underline">Your Leave Requests</h1>
                <div className={`bg-white p-6 rounded-xl shadow-sm w-full max-w-full min-w-0 overflow-hidden`}>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[980px] w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-2 min-w-[110px]">From</th>
                                    <th className="py-3 px-2 min-w-[110px]">To</th>
                                    <th className="py-3 px-2 min-w-[70px]">Days</th>
                                    <th className="py-3 px-2 min-w-[150px]">Leave Type</th>
                                    <th className="py-3 px-2 min-w-[260px]">Note</th>
                                    <th className="py-3 px-2 min-w-[240px]">Reason</th>
                                    <th className="py-3 px-2 text-center min-w-[150px]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userLeaveRequests.length === 0 ?
                                    <tr className="text-center"><td className="p-5 text-gray-600" colSpan={7}>There are no leave requests.</td></tr> :
                                    userLeaveRequests.map((request) => {
                                        return (
                                            <tr key={request.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-2 whitespace-nowrap">{request.from}</td>
                                                <td className="py-3 px-2 whitespace-nowrap">{request.to}</td>
                                                <td className="py-3 px-2">{request.days}</td>
                                                <td className="py-3 px-2">{request.leaveType}</td>
                                                <td className="py-3 px-2 break-words">{request.note}</td>
                                                <td className="py-3 px-2 break-words">{request.reason || "N/A"}</td>
                                                <td className="py-3 px-2 text-center">
                                                    <span className={`inline-flex items-center justify-center text-white rounded-full px-5 py-1 text-center border border-black whitespace-nowrap ${getBgColor(request.status)}`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {user?.role === "HR" && <button onClick={() => navigate("/add_employee")} className="bg-[#1D293D] text-white p-[10px_20px] flex gap-3 items-center rounded cursor-pointer"><FaPlus /> <span>Add Employee</span></button>}
            </div>
        </>
    );
};

export default EmployeeDashboard;

