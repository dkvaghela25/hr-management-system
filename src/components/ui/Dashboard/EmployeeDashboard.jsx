import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/userContext";

const EmployeeDashboard = () => {

    const { user, leaveRequests } = useUserContext();

    const navigate = useNavigate();

    const userLeaveRequests = leaveRequests.filter(request => request.employeeId === user.id);
    console.log(userLeaveRequests);

    const getBgColor = (status) => {
        switch (status) {
            case "APPROVED": return "bg-green-500";
            case "PENDING": return "bg-yellow-500";
            case "REJECTED": return "bg-red-500";
        }
    }

    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-full`}>
                <h1 className="font-extrabold text-3xl underline">Your Leave Requests</h1>
                <div className={`bg-white p-6 rounded-xl shadow-sm w-full`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-spacing-5 table-fixed">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 w-[12%]">From</th>
                                    <th className="py-2 w-[12%]">To</th>
                                    <th className="py-2 w-[8%]">Days</th>
                                    <th className="py-2 w-[12%]">Leave Type</th>
                                    <th className="py-2 w-[30%]">Note</th>
                                    <th className="py-2 w-[25%]">Reason</th>
                                    <th className="py-2 text-center w-[12%]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userLeaveRequests.length === 0 ?
                                    <tr className="text-center"><td className="p-5" colSpan={7}>Their isn't any Leave Requests</td></tr> :
                                    userLeaveRequests.map(request => {
                                        return (
                                            <tr key={request.id} className="border-b hover:bg-gray-50">
                                                <td className="py-2">{request.from}</td>
                                                <td className="py-2">{request.to}</td>
                                                <td className="py-2">{request.days}</td>
                                                <td className="py-2">{request.leaveType}</td>
                                                <td className="py-2">{request.note}</td>
                                                <td className="py-2">{request.reason || "N/A"}</td>
                                                <td className={`py-2 flex justify-center`}>
                                                    <span className={`text-white rounded-full p-[5px_20px] text-center border border-black ${getBgColor(request.status)}`}>
                                                        {request.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
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

