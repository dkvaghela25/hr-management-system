import React from 'react';
import { NavLink, useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    if (error.status === 404) {
        return (
            <div className="w-screen h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-6">
                <img
                    className="w-full max-w-md mb-8 mix-blend-multiply opacity-90"
                    src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
                    alt="404 Error"
                />

                <div className="text-center max-w-2xl">
                    <h1 className={`text-4xl font-bold mb-4 text-[#111827]`}>
                        Page Not Found
                    </h1>
                    <p className="text-lg mb-10 leading-relaxed text-[#4B5563]">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button onClick={handleGoBack} className="px-6 py-2.5 cursor-pointer text-sm font-medium border transition-all border-[#1D2636] rounded-md">
                        Go Back
                    </button>

                    <NavLink to="/" className="px-6 py-2.5 text-sm font-medium bg-[#1D2636] text-white transition-all hover:opacity-90 rounded-md shadow-sm">
                        Return Home
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-red-600">Something Went Wrong</h1>
        </div>
    );
};

export default ErrorPage;
