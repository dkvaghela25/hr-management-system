import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const LeaveRequests = () => {

  const {users, user, leaveRequests } = useUserContext();

  const navigate = useNavigate();

  const userLeaveRequests = leaveRequests?.filter(request => request.managerId === user.id);

  const mappedUsers = {};

  users.forEach(user => {
    mappedUsers[user.id] = user.name; 
  });


  const getBgColor = (status) => {
    switch (status) {
      case "APPROVED": return "bg-green-500";
      case "PENDING": return "bg-yellow-500";
      case "REJECTED": return "bg-red-500";
    }
  }

  const takeAction = (requestId) => {
    console.log(requestId);
    navigate(`/take_action/${requestId}`)
  }

  return (
    <>
      <div className={`flex flex-col items-center gap-5 w-full`}>
        <h1 className="font-extrabold text-3xl underline">Leave Requests</h1>
        <div className={`bg-white p-6 rounded-xl shadow-sm w-full`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="border-b">
                  <th className="py-2 w-[15%]">Employee Name</th>
                  <th className="py-2 w-[7%]">From</th>
                  <th className="py-2 w-[7%]">To</th>
                  <th className="py-2 w-[4%]">Days</th>
                  <th className="py-2 w-[8%]">Leave Type</th>
                  <th className="py-2 w-[24%]">Note</th>
                  <th className="py-2 text-center w-[10%]">Status</th>
                  <th className="py-2 text-center w-[10%]">Action</th>
                </tr>
              </thead>
              <tbody>
                {userLeaveRequests.length === 0 ?
                  <tr className="text-center"><td className="p-5" colSpan={7}>Their isn't any Leave Requests</td></tr> :
                  userLeaveRequests.map(request => {
                    return (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="py-2">{mappedUsers[request.employeeId]}</td>
                        <td className="py-2">{request.from}</td>
                        <td className="py-2">{request.to}</td>
                        <td className="py-2">{request.days}</td>
                        <td className="py-2">{request.leaveType}</td>
                        <td className="py-2 w-fit">{request.note}</td>
                        <td className={`py-2 flex justify-center`}>
                          <span className={`text-white rounded-full p-[5px_25px] text-center border border-black ${getBgColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td>
                          {request.status === "PENDING" && <button onClick={() => takeAction(request.id)} className={`text-black cursor-pointer rounded-full p-[5px_25px] text-center border border-black`}>
                            Take Action
                          </button>}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequests;

