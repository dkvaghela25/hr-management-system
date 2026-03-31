import { useUserContext } from "../../contexts/userContext";
import StatCard from "../StatCard";

const HRDashboard = () => {

    const { users, user } = useUserContext();

    const departments = new Set(users.map(user => user.department));

    const stats = {
        totalEmployees: users.length,
        departments: departments.size,
        totalMonthlyPayroll: 3850000,
    };

    return (
        <>
            {user &&
                <div className="space-y-8">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Employees" value={stats.totalEmployees} />
                        <StatCard title="Total Departments" value={stats.departments} />
                        <StatCard title="Total Monthly Payroll (₹)" value={stats.totalMonthlyPayroll} />
                    </div>
                </div>
            }
        </>
    );
};

export default HRDashboard;