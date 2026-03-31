import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {

    const { user, leaveRequests, setLeaveRequests } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        from: "",
        to: "",
        days: 0,
        leaveType: "",
        note: ""
    });

    const [errors, setErrors] = useState({
        from: "",
        to: "",
        leaveType: "",
        note: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setErrors((prev) => ({ ...prev, [name]: "" }));

        setFormData((prev) => {
            const nextData = { ...prev, [name]: value };

            if (name === "from" || name === "to") {

                const fromDate = new Date(nextData.from).getTime();
                const toDate = new Date(nextData.to).getTime();

                if (!isNaN(fromDate) && !isNaN(toDate)) {
                    const diff = toDate - fromDate;
                    const days = diff < 0 ? 0 : (diff === 0 ? 1 : (diff / (1000 * 60 * 60 * 24) + 1));

                    nextData.days = Math.round(days);
                }

            }

            return nextData;
        });
    };

    function formatDate(date) {
        if (!date) return;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const applyLeave = (e) => {
        e.preventDefault();

        if (!formData.from) return setErrors(prev => ({ ...prev, from: "Please Select From Date" }));
        if (!formData.to) return setErrors(prev => ({ ...prev, to: "Please Select To Date" }));
        if (new Date(formData.to).getTime() < new Date(formData.from).getTime()) {
            return setErrors((prev) => ({ ...prev, to: "To date must be same as or after From date" }));
        }
        if (!formData.leaveType) return setErrors(prev => ({ ...prev, leaveType: "Please Select Leave Type" }));
        if (!formData.note) return setErrors(prev => ({ ...prev, note: "Please write something in note" }));

        const newRequest = {
            id: leaveRequests.length ? Math.max(...leaveRequests.map((request) => request.id)) + 1 : 1,
            employeeId: user.id,
            managerId: user.managerId,
            from: new Date(formData.from).toLocaleDateString(),
            to: new Date(formData.to).toLocaleDateString(),
            days: formData.days,
            leaveType: formData.leaveType,
            note: formData.note,
            status: "PENDING"
        };

        setLeaveRequests(prev => [...prev, newRequest]);
        navigate("/dashboard");
    };

    return (
        <>
            <div className="w-full h-full flex items-center justify-center p-4">
                <div className="w-[50%] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Apply Leave</h1>
                            <p className="text-gray-500 mt-2">Submit your leave request details</p>
                        </div>

                        <form className="space-y-6" onSubmit={applyLeave}>
                            <div className="w-full flex justify-between gap-4">
                                <div className="flex flex-col gap-1 w-[40%]">
                                    <label htmlFor="from" className="block text-sm font-semibold text-gray-700 mb-1">
                                        From <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="from"
                                        className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${errors.from ? "border-red-500" : ""}`}
                                        type="date"
                                        value={formData.from}
                                        onChange={handleChange}
                                        min={formatDate(new Date())}
                                        max={formatDate(new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)))}
                                    />
                                    {errors.from && (<div className="text-red-500 text-sm mt-1">* {errors.from}</div>)}
                                </div>

                                <div className="flex flex-col gap-1 w-[15%]">
                                    <label htmlFor="days" className="block text-sm font-semibold text-gray-700 mb-1">Days</label>
                                    <input
                                        disabled
                                        name="days"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                                        type="text"
                                        value={formData.days}
                                    />
                                </div>

                                <div className="flex flex-col gap-1 w-[40%]">
                                    <label htmlFor="to" className="block text-sm font-semibold text-gray-700 mb-1">
                                        To <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        disabled={!formData.from}
                                        name="to"
                                        className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${errors.to ? "border-red-500" : ""}`}
                                        type="date"
                                        value={formData.to}
                                        onChange={handleChange}
                                        min={formData?.from}
                                        max={formatDate(new Date(new Date(formData?.from).getTime() + (15 * 24 * 60 * 60 * 1000)))}
                                    />
                                    {errors.to && (<div className="text-red-500 text-sm mt-1">* {errors.to}</div>)}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="leaveType" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Leave Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="leaveType"
                                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${formData.leaveType === "" ? "text-slate-500" : ""} ${errors.leaveType ? "border-red-500" : ""}`}
                                    value={formData.leaveType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Leave Type</option>
                                    <option value="Paid Leave">Paid Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Unpaid Leave">Unpaid Leave</option>
                                </select>
                                {errors.leaveType && (<div className="text-red-500 text-sm mt-1">* {errors.leaveType}</div>)}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Note <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="note"
                                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${errors.note ? "border-red-500" : ""}`}
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Write your leave reason"
                                    rows={4}
                                ></textarea>
                                {errors.note && (<div className="text-red-500 text-sm mt-1">* {errors.note}</div>)}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#1D293D] hover:bg-[#2a3b57] text-white font-bold py-3 rounded-lg transition-colors shadow-md"
                            >
                                Apply Leave
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplyLeave;