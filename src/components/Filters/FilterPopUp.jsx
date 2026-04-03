import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const FilterPopUp = ({ accessor, handleChange, value, iconRef }) => {
    const [style, setStyle] = useState({ position: "fixed", zIndex: 9999, opacity: 0 });

    useEffect(() => {

        if (!iconRef?.current) return;

        const rect = iconRef.current.getBoundingClientRect();

        setStyle({
            position: "fixed",
            top: rect.bottom + 15,
            left: rect.left - 290,
            zIndex: 9999,
            opacity: 1
        });

    }, []);

    return (
        <div
            style={style}
            className="bg-white p-3 w-80 rounded-sm shadow-lg border border-slate-300 transition-opacity duration-300 ease-in-out"
        >
            {renderInput(accessor, value, handleChange)}
            <div className="w-3 h-3 absolute rotate-45 bg-white -top-1.5 right-4 border-l border-t border-slate-300" />
        </div>
    );
};

export default FilterPopUp;


const renderInput = (accessor, value, handleChange) => {

    if (accessor === "status") {
        return (
            <div className="grid grid-cols-[0.6fr_2fr] items-center">
                <label htmlFor="" className="text-slate-900">Status : </label>
                <select name={accessor} value={value} onChange={handleChange} id="" className="w-full border focus:outline-none p-1 rounded-sm">
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="PENDING">PENDING</option>
                </select>
            </div>
        );
    }

    if (accessor === "leaveType") {
        return (
            <div className="grid grid-cols-[1fr_2fr] items-center">
                <label htmlFor="" className="text-slate-900">LEAVE TYPE : </label>
                <select name={accessor} value={value} onChange={handleChange} className="w-full border focus:outline-none p-1 rounded-sm">
                    <option value="Paid Leave">Paid Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
            </div>
        );
    }

    if (accessor === "from") {
        return (
            <div className="flex flex-col gap-2">
                <div className="mb-1">Select Date Range</div>
                <div className="grid grid-cols-[0.8fr_2fr] items-center">
                    <label htmlFor="" className="text-slate-900 capitalize">Start Date : </label>
                    <input type="date" name="startDate" value={value.startDate} onChange={handleChange} className="w-full border focus:outline-none p-1 rounded-sm" />
                </div>
                <div className="grid grid-cols-[0.8fr_2fr] items-center">
                    <label htmlFor="" className="text-slate-900 capitalize">End Date : </label>
                    <input disabled={!value.startDate} min={value.startDate} type="date" name="endDate" value={value.endDate} onChange={handleChange} className="w-full border focus:outline-none p-1 rounded-sm" />
                </div>
            </div>
        );
    }

    if (accessor === "days") {
        return (
            <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-[0.8fr_2fr] items-center">
                    <label htmlFor="" className="text-slate-900 capitalize">MIN : </label>
                    <input type="number" name="minDays" value={value.minDays} onChange={handleChange} className="w-full border focus:outline-none p-1 rounded-sm" />
                </div>
                <div className="grid grid-cols-[0.8fr_2fr] gap-1 items-center">
                    <label htmlFor="" className="text-slate-900 capitalize">MAX : </label>
                    <input type="number" name="maxDays" value={value.maxDays} onChange={handleChange} className="w-full border focus:outline-none p-1 rounded-sm" />
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[0.6fr_2fr] items-center">
            <label htmlFor="" className="text-slate-900">Search : </label>
            <input type="text" name={accessor} value={value} onChange={handleChange} className="w-full border focus:outline-none p-1 rounded-sm" />
        </div>
    );
};
