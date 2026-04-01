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
    });

    const [errors, setErrors] = useState({
        action: "",
        reason: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setErrors((prev) => ({ ...prev, [name]: "" }));

        if (name === "action" && value !== "REJECTED") {
            setFormData((prev) => ({ ...prev, action: value, reason: "" }));
            setErrors((prev) => ({ ...prev, reason: "" }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const request = leaveRequests.find((leaveRequest) => String(leaveRequest.id) === String(requestId));
    const employee = users.find((user) => user.id === request?.employeeId);

    const takeAction = (e) => {
        e.preventDefault();

        if (!formData.action) {
            return setErrors((prev) => ({ ...prev, action: "Please select an action" }));
        }
        if (formData.action === "REJECTED" && !formData.reason.trim()) {
            return setErrors((prev) => ({ ...prev, reason: "Reason is required when rejecting leave" }));
        }

        setLeaveRequests((prev) => {
            return prev.map((leaveRequest) => {
                if (String(leaveRequest.id) === String(requestId)) {
                    return {
                        ...leaveRequest,
                        status: formData.action,
                        reason: formData.action === "REJECTED" ? formData.reason.trim() : ""
                    };
                } else {
                    return leaveRequest;
                }
            });
        });
        navigate("/leave_requests");
    };

    if (!request || !employee) {
        return (
            <div className="w-full h-full flex items-center justify-center p-4">
                <div className="w-[50%] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Take Action</h1>
                        <p className="text-red-500 mt-3">Leave request was not found.</p>
                        <button
                            type="button"
                            onClick={() => navigate("/leave_requests")}
                            className="mt-6 bg-[#1D293D] hover:bg-[#2a3b57] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                        >
                            Back to Leave Requests
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full h-full flex items-center justify-center p-4">
                <div className="w-[50%] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Take Action</h1>
                            <p className="text-gray-500 mt-2">Review leave details and update request status</p>
                        </div>

                        <form className="space-y-6" onSubmit={takeAction}>
                            <div className="flex flex-col gap-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Employee Name</label>
                                <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">{employee.name}</div>
                            </div>

                            <div className="w-full flex justify-between gap-4">
                                <div className="flex flex-col gap-1 w-[40%]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">From</label>
                                    <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">{request.from}</div>
                                </div>
                                <div className="flex flex-col gap-1 w-[15%]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Days</label>
                                    <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">{request.days}</div>
                                </div>
                                <div className="flex flex-col gap-1 w-[40%]">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">To</label>
                                    <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">{request.to}</div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Leave Type</label>
                                <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">{request.leaveType}</div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Note</label>
                                <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50">{request.note}</div>
                            </div>

                            <hr className="border border-gray-200" />

                            <div className="flex flex-col gap-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Take Action
                                </label>
                                <select
                                    required
                                    name="action"
                                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${errors.action ? "border-red-500" : ""}`}
                                    value={formData.action}
                                    onChange={handleChange}
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>
                                {errors.action && (<div className="text-red-500 text-sm mt-1">* {errors.action}</div>)}
                            </div>

                            {formData.action === "REJECTED" && (
                                <div className="flex flex-col gap-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Reason <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="reason"
                                        className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${errors.reason ? "border-red-500" : ""}`}
                                        value={formData.reason}
                                        onChange={handleChange}
                                        placeholder="Write reason for rejection"
                                        rows={4}
                                    ></textarea>
                                    {errors.reason && (<div className="text-red-500 text-sm mt-1">* {errors.reason}</div>)}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-[#1D293D] hover:bg-[#2a3b57] text-white font-bold py-3 rounded-lg transition-colors shadow-md"
                            >
                                Take Action
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TakeAction;
