import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import LeaveRequests from "./pages/LeaveRequests";
import ApplyLeave from "./pages/ApplyLeave";
import TakeAction from "./pages/TakeAction";
import ErrorPage from "./pages/ErrorPage";
import UserList from "./pages/UserList";
import LoginPage from "./pages/LoginPage";
import PublicRoutes from "./routes/PublicRoutes";

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <PublicRoutes />,
          children: [
            {
              path: '/login',
              element: <LoginPage />
            },
            {
              path: '/user_list',
              element: <UserList />
            },
          ]
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: '/',
              element: <Dashboard />
            },
            {
              path: '/dashboard',
              element: <Dashboard />
            },
            {
              path: '/employees',
              element: <Employees />
            },
            {
              path: '/leave_requests',
              element: <LeaveRequests />
            },
          ]
        },
        {
          element: <ProtectedRoutes role="HR" />,
          children: [{
            path: '/add_employee',
            element: <AddEmployee />
          }]
        },
        {
          element: <ProtectedRoutes role="PROJECT_MANAGER" />,
          children: [
            {
              path: '/take_action/:requestId',
              element: <TakeAction />
            },
          ]
        },
        {
          element: <ProtectedRoutes role="EMPLOYEE" />,
          children: [{
            path: '/apply_leave',
            element: <ApplyLeave />
          }]
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;