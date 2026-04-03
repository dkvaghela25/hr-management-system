import { NavLink } from "react-router-dom";
import FilterIcon from "../Filters/FilterIcon";
import { useState } from "react";
import SortButton from "./SortButton";

const CustomTable = ({ rows, columns }) => {


    const [displayId, setDisplayId] = useState(false);
    const handleToggle = (index) => {
        setDisplayId(prev => prev === index ? false : index)
    }


    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200">
                        {columns.map((col, index) => (
                            <th
                                className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500"
                                key={col.accessor}
                            >
                                <div className="relative flex items-center justify-between w-full">
                                    <span>{col.Header}</span>
                                    <div className="flex items-center">
                                        {col.sortBy && <SortButton sortBy={col.sortBy} accessor={col.accessor} />}
                                        {col.filterBy && <FilterIcon index={index} rows={rows} col={col} displayId={displayId} handleToggle={handleToggle} />}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {rows.length === 0 ? (
                        <tr className="text-center">
                            <td className="p-12 text-slate-400 italic text-sm" colSpan={columns.length}>
                                No leave requests found.
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                                {columns.map(col => (
                                    <td
                                        key={col.accessor}
                                        className="py-4 px-4 text-sm text-slate-700 whitespace-nowrap"
                                    >
                                        {formattedValue(row[col.accessor], col.accessor)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div >
    );
};

const formattedValue = (value, accessor) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case "APPROVED":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "PENDING":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "REJECTED":
                return "bg-rose-100 text-rose-700 border-rose-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    if (value === "" || value === undefined || value === null) {
        return <span className="text-slate-300">--</span>;
    }

    if (accessor === "from" || accessor === "to") return new Date(value).toLocaleDateString();

    if (accessor === "status") {
        return (
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyles(value)}`}>
                {value}
            </span>
        );
    }

    if (accessor === "action") {
        return (
            <NavLink to={`/take_action/${value}`}>
                <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border border-indigo-100">
                    Take Action
                </button>
            </NavLink>
        );
    }

    if (accessor === "id" || accessor === "employeeId") {
        return <span className="font-mono text-slate-400 text-xs">#{value}</span>;
    }

    return value;
};

export default CustomTable;