
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../Pages/Home/Home/Home";
import AddBlog from "../Blogs/AddBlog/AddBlog";
import ErrorPage from "../ErrorPage/ErrorPage";
import AllBlog from "../Blogs/AllBlog/AllBlog";
import BlogDetails from "../BlogDetails/BlogDetails";
import RecentBlog from "../Pages/Home/RecentBlog/RecentBlog";
import PrivateRoute from "./PrivateRoute";
import Wishlist from "../Wishlist/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'addBlog',
            element:<PrivateRoute><AddBlog></AddBlog></PrivateRoute>
        },
        {
            path: 'allBlog',
            element: <AllBlog></AllBlog>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'signUp',
            element: <SignUp></SignUp>
        },
        {
            path: '/blog/:id',
            element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
        },
        {
            path: '/blog/:id',
            element: <RecentBlog></RecentBlog>,
        },
        {
            path: '/wishlist',
            element: <Wishlist></Wishlist>,
        },
    ]
  },
]);

export default router;
