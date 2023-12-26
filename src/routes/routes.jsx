
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../Pages/Home/Home/Home";
import AddBlog from "../Blogs/AddBlog/AddBlog";
import ErrorPage from "../ErrorPage/ErrorPage";
import AllBlog from "../Blogs/AllBlog/AllBlog";
import BlogDetails from "../BlogDetails/BlogDetails";

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
            element: <AddBlog></AddBlog>
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
            element: <BlogDetails></BlogDetails>,
        },
    ]
  },
]);

export default router;
