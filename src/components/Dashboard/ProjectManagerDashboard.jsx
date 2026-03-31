import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

const ProjectManagerDashboard = () => {

    const { users, user, leaveRequests } = useUserContext();

    const navigate = useNavigate();

    const userLeaveRequests = leaveRequests.filter(
        (request) => request.managerId === user.id && request.status === "PENDING"
    );

    const mappedUsers = {};

    users.forEach((mappedUser) => {
        mappedUsers[mappedUser.id] = mappedUser.name;
    });


    const takeAction = (requestId) => {
        navigate(`/take_action/${requestId}`);
    };

    return (
        <>
            <div className={`flex flex-col items-center gap-5 w-full min-w-0`}>
                <h1 className="font-extrabold text-3xl underline">Pending Leave Requests</h1>
                <div className={`bg-white p-6 rounded-xl shadow-sm w-full max-w-full min-w-0 overflow-hidden`}>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[1080px] w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-2 min-w-[220px]">Employee Name</th>
                                    <th className="py-3 px-2 min-w-[110px]">From</th>
                                    <th className="py-3 px-2 min-w-[110px]">To</th>
                                    <th className="py-3 px-2 min-w-[70px]">Days</th>
                                    <th className="py-3 px-2 min-w-[150px]">Leave Type</th>
                                    <th className="py-3 px-2 min-w-[280px]">Note</th>
                                    <th className="py-3 px-2 text-center min-w-[150px]">Status</th>
                                    <th className="py-3 px-2 text-center min-w-[170px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userLeaveRequests.length === 0 ?
                                    <tr className="text-center">
                                        <td className="p-5 text-gray-600" colSpan={8}>There are no pending requests.</td>
                                    </tr> :
                                    userLeaveRequests.map((request) => {
                                        return (
                                            <tr key={request.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-2 whitespace-nowrap">{mappedUsers[request.employeeId] || "N/A"}</td>
                                                <td className="py-3 px-2 whitespace-nowrap">{request.from}</td>
                                                <td className="py-3 px-2 whitespace-nowrap">{request.to}</td>
                                                <td className="py-3 px-2">{request.days}</td>
                                                <td className="py-3 px-2">{request.leaveType}</td>
                                                <td className="py-3 px-2 break-words">{request.note}</td>
                                                <td className="py-3 px-2 text-center">
                                                    <span className="inline-flex items-center justify-center text-white rounded-full px-5 py-1 text-center border border-black bg-yellow-500 whitespace-nowrap">
                                                        {request.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-center">
                                                    {request.status === "PENDING" && <button onClick={() => takeAction(request.id)} className="text-black cursor-pointer rounded-full px-6 py-1 text-center border border-black hover:bg-gray-100 whitespace-nowrap">
                                                        Take Action
                                                    </button>}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectManagerDashboard;

