import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";

const App = () => {

  const router = createBrowserRouter([
    {
      path : '/',
      element: <AppLayout />,
      children : [
        {
          path: '/',
          element: <LoginPage />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
      ]
    }
  ]) 
  
  return (
    <RouterProvider router={router} />
  );
};

export default App;