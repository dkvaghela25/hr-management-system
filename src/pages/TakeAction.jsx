import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useNavigate, useParams } from "react-router-dom";

const TakeAction = () => {

    const { users, leaveRequests, setLeaveRequests } = useUserContext();
    const navigate = useNavigate();
    const { requestId } = useParams();

    const [formData, setFormData] = useState({
        action: "PENDING",
        reason: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => { return { ...prev, [name]: value } })
    }

    const request = leaveRequests.filter(request => request.id == requestId)[0];
    const employee = users.filter(user => user.id == request.employeeId)[0];
    console.log(request);

    const takeAction = () => {

        setLeaveRequests(prev => {
            return prev.map(request => {
                if(request.id == requestId){
                    return {...request, status: formData.action, reason: formData.reason}
                } else {
                    return request
                }
            })
        } )
        navigate("/leave_requests");

    }

    return (
        <>
            {<div className="z-10 w-full flex justify-center ">
                <div className="w-[50%] bg-white opacity relative flex flex-col gap-5 p-5 items-center rounded">
                    <h1 className="font-extrabold text-2xl underline">Take Action</h1>
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-1">
                            <div>Employee Name : </div>
                            <div className="border border-black p-2 rounded">{employee.name}</div>
                        </div>
                        <div className="w-full grid grid-cols-[225px_112.5px_225px] gap-5">
                            <div className="flex flex-col gap-1">
                                <div>From : </div>
                                <div className="border border-black p-2 rounded">{request.from}</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Days : </div>
                                <div className="border border-black p-2 rounded">{request.days}</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>To : </div>
                                <div className="border border-black p-2 rounded">{request.to}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Leave Type : </div>
                            <div className="border border-black p-2 rounded">{request.leaveType}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Note : </div>
                            <div className="border border-black p-2 rounded">{request.note}</div>
                        </div>
                        <hr className="border border-gray-400" />
                        <div className="flex flex-col gap-1">
                            <div>Take Action : </div>
                        <select required name="action" className="border border-black p-2 rounded" value={formData.action} onChange={handleChange} >
                            <option value="PENDING">PENDING</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                        </div>
                        {formData.action === "REJECTED" && <textarea
                            required
                            name="reason"
                            className="border border-black p-2 rounded"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Reason *"
                        ></textarea>}
                        <button onClick={takeAction} className="bg-[#1D293D] m-auto text-white p-[10px_20px] flex gap-3 items-center rounded cursor-pointer w-fit"><span>Take Action</span></button>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default TakeAction;
