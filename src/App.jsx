import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import LeaveRequests from "./pages/LeaveRequests";
import ApplyLeave from "./pages/ApplyLeave";
import TakeAction from "./pages/TakeAction";

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      element: <ProtectedRoutes />,
      children: [{
        path: '/',
        element: <AppLayout />,
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
                path: '/leave_requests',
                element: <LeaveRequests />
              },
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
      }]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;