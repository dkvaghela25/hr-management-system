import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const UserList = () => {

    const { users, handleLogin } = useUserContext();
    const navigate = useNavigate();

    return (
        <div className="p-6 flex items-center justify-center w-full relative">
            <div className="flex flex-col items-center gap-5 w-[50%]">
                <h1 className="font-extrabold text-3xl underline">Welcome to HR Management System</h1>
                <h1 className="font-extrabold text-3xl underline">Log in as</h1>
                <ul className="flex flex-col gap-3 w-full" >
                    {users.map(user => {
                        return <li
                            key={user.id}
                            className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full cursor-pointer p-2 rounded border-indigo-600 bg-white border-l-2"
                            onClick={() => {
                                handleLogin(user.id);
                                navigate("/dashboard")
                            }}
                        >
                            {user.id} : {user.name} ({user.role})
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default UserList;