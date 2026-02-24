import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {

    const { users, setUsers } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: ""
    })
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => { return { ...prev, [name]: value } })
    }

    const addEmployee = (e) => {
        e.preventDefault();

        const { name, role, department } = formData;

        console.log(users.filter(user => user.department === formData.department && user.role === "PROJECT_MANAGER")[0].id);

        if (!name || !role || !department) {
            setError(true);
            return;
        }

        const newUser = {
            id: Math.max(...(users.map(user => user.id))) + 1,
            name,
            role,
            department,
            email: formData.name.split(" ").map(n => n[0].toLowerCase()).join("") + "@company.com",
            managerId: users.filter(user => user.department === formData.department && user.role === "PROJECT_MANAGER")[0].id,
            isActive: true,
            joiningDate: new Date()
        }

        setUsers(prev => [...prev, newUser])
        navigate("/employees")
    }

    return (
        <>
            {<div className="z-10 w-full flex justify-center ">
                <div className="w-[40%] bg-white opacity relative flex flex-col gap-5 p-5 items-center rounded">
                    <h1 className="font-extrabold text-2xl underline">Add New Employee</h1>
                    <form action="" className="flex flex-col gap-5 w-full">
                        <input
                            required
                            name="name"
                            className="border border-black p-2 rounded"
                            type="text"
                            placeholder="Employee Name *"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <select required name="role" className="border border-black p-2 rounded" value={formData.role} onChange={handleChange} >
                            <option value="">Select Role *</option>
                            <option value="HR">HR</option>
                            <option value="PROJECT_MANAGER">PROJECT MANAGER</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                        </select>
                        <select required name="department" disabled={!formData.role} className="border border-black p-2 rounded" value={formData.department} onChange={handleChange} >
                            <option value="">Select Department *</option>
                            {formData?.role === "HR" && <option value="Human Resources">Human Resources</option>}
                            {(formData?.role === "EMPLOYEE" || formData?.role === "PROJECT_MANAGER") && <>
                                <option value="JS">JS</option>
                                <option value="PHP">PHP</option>
                                <option value="AI">AI</option>
                            </>}
                        </select>
                        {!formData.role && <p className="relative -top-4 text-[12px]"> * First select role for selecting department</p>}
                        {error && <p className="relative -top-4 text-[12px] text-red-500"> Fill Every Details in form</p>}
                        <button onClick={addEmployee} className="bg-[#1D293D] m-auto text-white p-[10px_20px] flex gap-3 items-center rounded cursor-pointer w-fit"><FaPlus /> <span>Add Employee</span></button>
                    </form>
                </div>
            </div>}
        </>
    );
};

export default AddEmployee;