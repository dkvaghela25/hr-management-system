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
                const matchesDepartment = department.includes(currUser.department)
                return matchesName && matchesDepartment;
            });
            console.log(filteredData)
            setFilteredUsers(filteredData);
        }, 400);

        return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const clearFilters = () => {
        setFilters({
            department: [user.department],
            name: ""
        });
    };

    return (
        <div className="mr-auto w-[50vw] flex flex-wrap items-center gap-4 p-4 bg-white shadow-sm rounded-sm border border-gray-100">
            <div className="flex items-center gap-2 text-slate-900 mr-2">
                <MdFilterList className="text-xl" />
                <span className="text-sm font-medium uppercase tracking-wider">Filters</span>
            </div>

            <div className="flex flex-1 items-center max-w-2xl gap-0 border border-slate-300 rounded-sm overflow-hidden transition-all">

                <label htmlFor="department" className="w-1/2 border-r border-slate-300">
                    <select
                        id="department"
                        className="w-full p-1 rounded-sm focus:outline-none"
                        name="department"
                        value={filters.department}
                        onChange={handleChange}
                        multiple
                        size={1}
                    >
                        <option value="Human Resources">Human Resources</option>
                        {departments.map(rows => (
                            <option key={rows} value={rows}>{rows}</option>
                        ))}
                    </select>
                </label>

                <div className="relative flex-1 bg-white">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <IoIosSearch className={`${filters.name ? "text-slate-900" : "text-slate-300"} w-5 h-5 transition-colors`} />
                        </div>

                        <input
                            name="name"
                            value={filters.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Employee Name"
                            className="w-full border pl-10 pr-10 h-9 border-none focus:ring-0 text-(--primary-text) disabled:cursor-not-allowed disabled:text-gray-400 placeholder:text-gray-400 focus:outline-none"
                        />

                        {filters.name && (
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, name: "" }))}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                            >
                                <IoMdCloseCircle className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={clearFilters}
                className={`flex items-center gap-1 px-4 py-2 h-full rounded-md text-sm font-medium transition-all duration-200 bg-[#111827] text-white hover:shadow-md active:scale-95`}
            >
                <MdRotateLeft className="text-[17px]" />
                <span>Reset</span>
            </button>

        </div>
    );
};

export default EmployeesFilterInputs;