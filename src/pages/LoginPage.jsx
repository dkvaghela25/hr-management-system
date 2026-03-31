import { useState } from "react";
import { departments, randomCharacters, randomFirstName, randomLastName, randomMiddleName, roles } from "../constants";
import { useUserContext } from "../contexts/userContext";
import GeneratedUserData from "../components/GeneratedUserData";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {

  const navigate = useNavigate();
  const { users, setUsers, setUser } = useUserContext();
  const [newUser, setNewUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username) return setError("Username is required field")
    if (!formData.password) return setError("Password is required field")

    const user = users.find(user => user.username === formData.username);

    if (user?.password !== formData.password) return setError("Invalid Credentials");

    setUser(user);
    navigate("/dashboard");

  }

  function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  const handleClick = () => {

    if (newUser) return setIsOpen(true);

    const id = Math.max(...(users.map(user => user.id))) + 1
    const username = Array.from({ length: 8 }, () => getRandomElement(randomCharacters)).join("")
    const password = Array.from({ length: 12 }, () => getRandomElement(randomCharacters)).join("")
    const name = `${getRandomElement(randomFirstName)} ${getRandomElement(randomMiddleName)} ${getRandomElement(randomLastName)}`
    const email = name.split(" ").map(n => n[0].toLowerCase()).join("") + "@company.com"
    const role = getRandomElement(roles)
    const department = role === "HR" ? 'Human Resources' : getRandomElement(departments);
    const managerId = role == "EMPLOYEE" ? users.find(user => user.department === department && user.role === "PROJECT_MANAGER").id : null
    const isActive = true
    const joiningDate = new Date()

    const newUserData = { id, username, password, name, email, role, department, managerId, isActive, joiningDate };
    setNewUser(newUserData)
    setUsers(prev => [...prev, newUserData])
    setIsOpen(true);
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-[50%] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Please enter your details to login</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1D293D] focus:border-transparent outline-none transition-all"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type={ showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1D293D] focus:border-transparent outline-none transition-all"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="absolute bottom-3 right-3 text-2xl text-gray-700" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {error && (<div className="text-red-600 text-sm">* {error}</div>)}

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-[#1D293D] hover:bg-[#2a3b57] text-white font-bold py-3 rounded-lg transition-colors shadow-md"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={handleClick}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2 rounded-lg border border-gray-200 transition-colors text-sm"
                >
                  {!newUser ? "Generate Random User" : "Show New User Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isOpen && <GeneratedUserData newUser={newUser} setIsOpen={setIsOpen} />}
    </>
  );
};

export default LoginPage;
