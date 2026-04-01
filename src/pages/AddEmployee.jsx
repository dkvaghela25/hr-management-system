import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getRandomElement } from "../utils/getRandomElement";
import { randomCharacters } from "../constants";

const AddEmployee = () => {

    const { users, setUsers } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        role: "",
        department: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setErrors((prev) => ({ ...prev, [name]: "" }));

        if (name === "role") {
            setFormData((prev) => ({ ...prev, role: value, department: "" }));
            setErrors((prev) => ({ ...prev, department: "" }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addEmployee = (e) => {
        e.preventDefault();

        const { name, role, department } = formData;

        if (!name) return setErrors((prev) => ({ ...prev, name: "Employee name is required" }));
        if (!role) return setErrors((prev) => ({ ...prev, role: "Role is required" }));
        if (!department) return setErrors((prev) => ({ ...prev, department: "Department is required" }));

        const manager = users.find(
            (user) => user.department === department && user.role === "PROJECT_MANAGER"
        );

        const newUser = {
            id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
            username: Array.from({ length: 8 }, () => getRandomElement(randomCharacters)).join(""),
            password: Array.from({ length: 12 }, () => getRandomElement(randomCharacters)).join(""),
            name,
            role,
            department,
            email: formData.name.split(" ").map(n => n[0].toLowerCase()).join("") + "@company.com",
            managerId: role === "EMPLOYEE" ? manager?.id ?? null : null,
            isActive: true,
            joiningDate: new Date()
        };

        setUsers((prev) => [...prev, newUser]);
        navigate("/employees");
    };

    return (
        <>
            <div className="w-full h-full flex items-center justify-center p-4">
                <div className="w-[50%] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Add New Employee</h1>
                            <p className="text-gray-500 mt-2">Fill in employee details to create account</p>
                        </div>

                        <form className="space-y-6" onSubmit={addEmployee}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Employee Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="name"
                                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${errors.name ? "border-red-500" : ""}`}
                                    type="text"
                                    placeholder="Enter employee name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (<div className="text-red-500 text-sm mt-1">* {errors.name}</div>)}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="role"
                                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all ${formData.role === "" ? "text-slate-500" : ""} ${errors.role ? "border-red-500" : ""}`}
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Role</option>
                                    <option value="HR">HR</option>
                                    <option value="PROJECT_MANAGER">PROJECT MANAGER</option>
                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                </select>
                                {errors.role && (<div className="text-red-500 text-sm mt-1">* {errors.role}</div>)}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="department"
                                    disabled={!formData.role}
                                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all disabled:bg-gray-50 disabled:text-slate-400 ${formData.department === "" ? "text-slate-500" : ""} ${errors.department ? "border-red-500" : ""}`}
                                    value={formData.department}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>
                                    {formData?.role === "HR" && <option value="Human Resources">Human Resources</option>}
                                    {(formData?.role === "EMPLOYEE" || formData?.role === "PROJECT_MANAGER") && (
                                        <>
                                            <option value="JS">JS</option>
                                            <option value="PHP">PHP</option>
                                            <option value="AI">AI</option>
                                        </>
                                    )}
                                </select>
                                {!formData.role && (
                                    <p className="text-slate-500 text-sm mt-1">* Select role first to choose a department</p>
                                )}
                                {errors.department && (<div className="text-red-500 text-sm mt-1">* {errors.department}</div>)}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
                            >
                                <FaPlus /> <span>Add Employee</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEmployee;