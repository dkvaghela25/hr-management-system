import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {

  const router = createBrowserRouter([
    {
      path : '/',
      element: <Home />
    }
  ]) 
  
  return (
    <RouterProvider router={router}>
       App
    </RouterProvider>
  );
};

export default App;