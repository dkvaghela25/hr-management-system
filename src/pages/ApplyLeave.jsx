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
    })

    const [errors, setErrors] = useState({
        from: "",
        to: "",
        leaveType: "",
        note: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const nextData = { ...prev, [name]: value };

            if (name === "from" || name === "to") {

                const fromDate = new Date(nextData.from).getTime();
                const toDate = new Date(nextData.to).getTime();

                if (!isNaN(fromDate) && !isNaN(toDate)) {
                    const diff = toDate - fromDate;
                    const days = diff === 0 ? 1 : (diff / (1000 * 60 * 60 * 24) + 1);

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
        if (!formData.leaveType) return setErrors(prev => ({ ...prev, leaveType: "Please Select Leave Type" }));
        if (!formData.note) return setErrors(prev => ({ ...prev, note: "Please write something in note" }));

        const newRequest = {
            id: Math.max(...(leaveRequests.map(request => request.id))) + 1,
            employeeId: user.id,
            managerId: user.managerId,
            from: new Date(formData.from).toLocaleDateString(),
            to: new Date(formData.to).toLocaleDateString(),
            days: formData.days,
            leaveType: formData.leaveType,
            note: formData.note,
            status: "PENDING"
        }
        console.log(newRequest);
        setLeaveRequests(prev => [...prev, newRequest]);
        navigate("/dashboard");
    }

    return (
        <>
            {<div className="z-10 w-full flex justify-center ">
                <div className="w-[50%] bg-white opacity relative flex flex-col gap-5 p-5 items-center rounded">
                    <h1 className="font-extrabold text-2xl underline">Apply Leave</h1>
                    <form action="" className="flex flex-col gap-5 w-full">
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col gap-1 w-[40%]">
                                <label htmlFor="from">From <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    name="from"
                                    className={`border border-black p-2 rounded ${errors.from ? "border-red-500" : ""}`}
                                    type="date"
                                    value={formData.from}
                                    onChange={handleChange}
                                    min={formatDate(new Date())}
                                    max={formatDate(new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)))}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-[15%]">
                                <label htmlFor="days">Days</label>
                                <input
                                    disabled
                                    required
                                    name="days"
                                    className="border border-black p-2 rounded"
                                    type="text"
                                    value={formData.days}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-[40%]">
                                <label htmlFor="to">To <span className="text-red-500">*</span></label>
                                <input
                                    disabled={!formData.from}
                                    required
                                    name="to"
                                    className={`border border-black p-2 rounded ${errors.to ? "border-red-500" : ""}`}
                                    type="date"
                                    value={formData.to}
                                    onChange={handleChange}
                                    min={formData?.from}
                                    max={formatDate(new Date(new Date(formData?.from).getTime() + (15 * 24 * 60 * 60 * 1000)))}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="from">Leave Type <span className="text-red-500">*</span></label>
                            <select required name="leaveType" className={`border border-black p-2 rounded ${formData.leaveType === "" ? "text-slate-500" : ""} ${errors.leaveType ? "border-red-500" : ""}`} value={formData.leaveType} onChange={handleChange} >
                                <option value="">Select Leave Type</option>
                                <option value="Paid Leave">Paid Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Unpaid Leave">Unpaid Leave</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="from">Note <span className="text-red-500">*</span></label>
                            <textarea
                                required
                                name="note"
                                className={`border border-black p-2 rounded ${errors.from ? "border-red-500" : ""}`}
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Note"
                            ></textarea>
                        </div>
                        <button onClick={applyLeave} className="bg-[#1D293D] m-auto text-white p-[10px_20px] flex gap-3 items-center rounded cursor-pointer w-fit"><span>Apply</span></button>
                    </form>
                </div>
            </div>}
        </>
    );
};

export default ApplyLeave;