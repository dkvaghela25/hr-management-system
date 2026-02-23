import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import ProtectedRoutes from "./utils/ProtectedRoutes";

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
            element: <ProtectedRoutes role="HR"/>,
            children: [{
              path: '/add_employee',
              element: <AddEmployee />
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