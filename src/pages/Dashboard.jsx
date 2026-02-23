import { useUserContext } from "../contexts/userContext";

const Dashboard = () => {
    const {user} = useUserContext();
  return (
    <>
       {JSON.stringify(user)}
    </>
  );
};

export default Dashboard;