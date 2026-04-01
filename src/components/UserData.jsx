import { useState } from "react";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

const UserData = ({ userData, setIsOpen, setFormData, userId }) => {
    const [copiedValue, setCopiedValue] = useState(null);
    const displayData = (setFormData || userId)
        ? userData
        // eslint-disable-next-line no-unused-vars
        : Object.fromEntries(Object.entries(userData).filter(([key, value]) => key !== "username" && key !== "password"))

    const handleClose = () => {
        setIsOpen(false);
        if (!setFormData) return;

        setFormData({
            username: userData.username,
            password: userData.password,
        });
    };

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value);
        setCopiedValue(value);
        setTimeout(() => setCopiedValue(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">

                <div className="bg-[#1D293D] px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <IoCheckmarkCircle className="text-green-400 text-xl" />
                        <h2 className="text-white font-semibold tracking-tight">New User Created Successfully</h2>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="p-0">
                    <dl className="divide-y divide-slate-100">
                        {Object.entries(displayData).map(([key, value]) => {
                            const isSensitive = key === "username" || key === "password";

                            return (
                                <div key={key} className="grid grid-cols-[140px_1fr] hover:bg-slate-50 transition-colors">
                                    <dt className="bg-slate-50/50 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </dt>
                                    <dd className="px-6 py-3 text-sm text-slate-800 flex justify-between items-center font-medium">
                                        <span className={`${isSensitive ? 'font-mono bg-slate-100 px-2 py-0.5 rounded text-indigo-700' : ''}`}>
                                            {renderFormattedValue(value)}
                                        </span>

                                        {isSensitive && (
                                            <div className="relative">
                                                {copiedValue === value && (
                                                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                                        Copied!
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => copyToClipboard(value)}
                                                    className="p-1.5 hover:bg-indigo-50 rounded-md text-slate-400 hover:text-indigo-600 transition-all"
                                                    title="Copy"
                                                >
                                                    <MdContentCopy size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </dd>
                                </div>
                            );
                        })}
                    </dl>
                </div>
            </div>
        </div>
    );
};

const renderFormattedValue = (value) => {
    if (value === null || value === undefined || value === "null") return <span className="text-slate-300 italic font-normal">N/A</span>;
    if (typeof value === 'boolean') return value ? "Yes" : "No";
    return String(value);
};

export default UserData;