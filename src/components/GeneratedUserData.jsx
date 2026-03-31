import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

const GeneratedUserData = ({ newUser, setIsOpen, setFormData }) => {

    const [copiedValue, setCopiedValue] = useState(null);

    const handleClose = () => {
        setIsOpen(false)
        setFormData({
            username: newUser.username,
            password: newUser.password,
        })
    }

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value);
        setCopiedValue(value);
        setTimeout(() => setCopiedValue(null), 2000);
    }

    return (
        <div className="absolute w-full h-full top-0 left-0 bg-black/20 flex justify-center items-center">
            <div className="">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
                    <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-white font-semibold tracking-wide">New User Data</h2>
                        <IoClose onClick={handleClose} className="w-6 h-6 text-white font-semibold" />
                    </div>

                    <div className="px-6 py-3">
                        <div className="grid grid-cols-1">
                            {Object.entries(newUser).map(([key, value]) => (
                                <div key={key} className="grid grid-cols-[1fr_3fr] gap-20 border-b border-slate-300 py-2">
                                    <dt className="text-xs font-bold uppercase tracking-wider mb-1">
                                        {key}
                                    </dt>
                                    <dd className="text-sm text-slate-900 font-medium flex justify-between items-center">
                                        {renderFormattedValue(value)}
                                        {(key === "username" || key === "password") && (
                                            <div className="relative flex items-center">
                                                {copiedValue === value && (
                                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded">
                                                        Copied!
                                                    </span>
                                                )}
                                                <MdContentCopy
                                                    onClick={() => copyToClipboard(value)}
                                                    className="text-lg cursor-pointer text-slate-400 hover:text-slate-700 transition-colors"
                                                />
                                            </div>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to handle different data types in the display
const renderFormattedValue = (value) => {
    // if (value === null || value === undefined || value === "") return <span className="text-slate-300 italic">Not provided</span>;
    if (value instanceof Boolean) return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.join(", ");
    if (value instanceof Date) return new Date(value).toLocaleDateString();
    return String(value);
};

export default GeneratedUserData;