import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from '../layout/MainLayout';
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import CollectionDetails from '../pages/collections/CollectionDetails';
import CategoryBrandPage from "../pages/CategoryBrandPage";

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
      },
      {
        path: 'products/:id',
        element: <CollectionDetails></CollectionDetails>
      },
      {
        path: 'category/:categoryName', // ক্যাটাগরি লোড করার জন্য
        element: <CategoryBrandPage></CategoryBrandPage>
      },
    ]
  },
]);

export default router;