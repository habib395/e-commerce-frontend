import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from '../layout/MainLayout';
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h2>route not found.</h2>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'register',
            element: <Register></Register>
        },
        {
          path: 'login',
          element: <Login></Login>
        }
      ]
    },
  ]);

  export default router;