import { NavLink } from "react-router-dom";

const CustomTable = ({ rows, columns }) => {
    return (
        <>
            <table className="min-w-245 w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        {columns.map(col => (
                            <th className="py-3 px-2" key={col.accessor}>{col.Header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ?
                        <tr className="text-center"><td className="p-5 text-gray-600" colSpan={7}>There are no leave requests.</td></tr> :
                        rows.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-gray-50">
                                {columns.map(col => (
                                    <td key={col.accessor} className="py-3 px-2 whitespace-nowrap wrap-break-word">{formattedValue(row[col.accessor], col.accessor)}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default CustomTable;

const formattedValue = (value, accessor) => {

    const getBgColor = (status) => {
        switch (status) {
            case "APPROVED": return "bg-green-500";
            case "PENDING": return "bg-yellow-500";
            case "REJECTED": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    if (value === "" || value === undefined || value === null) return "--"
    if (accessor === "status") return <span className={`text-white rounded-full p-[5px_20px] text-center border border-black ${getBgColor(value)}`}>{value}</span>
    if (accessor === "action") return <>{value && <NavLink to={`/take_action/${value}`}><button className="text-black cursor-pointer rounded-full px-6 py-1 text-center border border-black hover:bg-gray-100 whitespace-nowrap"> Take Action</button></NavLink>}</>

    return value;

}