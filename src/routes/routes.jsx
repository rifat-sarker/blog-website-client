
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
import FeaturedBlog from "../FeaturedBlog/FeaturedBlog";
import WishlistDetails from "../Wishlist/WishlistDetails";
import QuizzPolls from "../QuizzPolls/QuizzPolls";

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
            path: '/blog',
            element: <RecentBlog></RecentBlog>,
        },
        {
            path: '/wishlist',
            element:<PrivateRoute><Wishlist></Wishlist></PrivateRoute>,
        },
        {
            path: '/wishlist/:id',
            element:<PrivateRoute><WishlistDetails></WishlistDetails></PrivateRoute>,
        },
        {
            path: '/featuredBlog',
            element: <FeaturedBlog></FeaturedBlog>,
        },
        {
            path: '/quizz_polls',
            element: <QuizzPolls></QuizzPolls>
        },
    ]
  },
]);

export default router;
