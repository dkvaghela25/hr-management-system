import { useState, useEffect } from "react";
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";
import { MdFilterList, MdRotateLeft } from "react-icons/md";
import { departments, escapeRegExp } from "../../constants";
import { useUserContext } from "../../contexts/userContext";

const EmployeesFilterInputs = ({ setFilteredUsers }) => {
    const { user, users } = useUserContext();

    const [filters, setFilters] = useState({
        department: [user.department],
        name: ""
    });

    const handleChange = (e) => {
        const { name, value, options } = e.target;
        if (name === "name") {
            setFilters(prev => ({ ...prev, name: value }));
        } else {
            const refinedOptions = Array.from(options).filter(({ selected, value }) => selected && value !== "");
            const newSelectedDepartments = refinedOptions.map(({ value }) => value);
            setFilters(prev => ({ ...prev, department: newSelectedDepartments }));
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            const { department, name } = filters;
            if (department.length === 0 && !name) {
                setFilteredUsers(users);
                return;
            }
            const regex = new RegExp(escapeRegExp(name), "i");
            const filteredData = users.filter((currUser) => {
                const matchesName = regex.test(String(currUser.name ?? ""));
                const matchesDepartment = department.length === 0 || department.includes(currUser.department);
                return matchesName && matchesDepartment;
            });
            setFilteredUsers(filteredData);
        }, 300);

        return () => clearTimeout(handler);
    }, [filters, users, setFilteredUsers]);

    const clearFilters = () => {
        setFilters({
            department: [user.department],
            name: ""
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl shadow-sm w-full max-w-4xl">
            <div className="flex items-center gap-2 px-2 border-r border-slate-200 md:flex">
                <MdFilterList className="text-slate-500 text-lg" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Filters</span>
            </div>

            <div className="flex flex-1 items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                
                <div className="relative w-1/2 border-r border-slate-200">
                    <select
                        id="department"
                        className="w-full bg-transparent py-2.5 pl-3 pr-8 text-sm font-medium text-slate-700 appearance-none focus:outline-none cursor-pointer"
                        name="department"
                        value={filters.department}
                        onChange={handleChange}
                    >
                        <option value="">All Departments</option>
                        <option value="Human Resources">Human Resources</option>
                        {departments.map(rows => (
                            <option key={rows} value={rows}>{rows}</option>
                        ))}
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>

                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <IoIosSearch className={`${filters.name ? "text-indigo-600" : "text-slate-400"} text-xl transition-colors`} />
                    </div>

                    <input
                        name="name"
                        value={filters.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Search employees..."
                        className="w-full bg-transparent pl-10 pr-10 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    />

                    {filters.name && (
                        <button
                            onClick={() => setFilters(prev => ({ ...prev, name: "" }))}
                            className="absolute inset-y-0 right-2 flex items-center text-slate-300 hover:text-rose-500 transition-colors"
                        >
                            <IoMdCloseCircle className="text-lg" />
                        </button>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all"
            >
                <MdRotateLeft className="text-lg" />
                <span>Reset</span>
            </button>
        </div>
    );
};

export default EmployeesFilterInputs;