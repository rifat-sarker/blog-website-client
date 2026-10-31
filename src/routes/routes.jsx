import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import AddBlog from "../Blogs/AddBlog/AddBlog";
import ErrorPage from "../ErrorPage/ErrorPage";
import AllBlog from "../Blogs/AllBlog/AllBlog";
import BlogDetails from "../BlogDetails/BlogDetails";
import Wishlist from "../Wishlist/Wishlist";
import FeaturedBlog from "../FeaturedBlog/FeaturedBlog";
import LiveWire from "../Pages/LiveWire/LiveWire";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "allBlog",
        element: <AllBlog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "featuredBlog",
        element: <FeaturedBlog />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "addBlog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "live-wire",
        element: <LiveWire />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "write",
        element: <Navigate to="/addBlog" replace />,
      },
    ],
  },
]);

export default router;
