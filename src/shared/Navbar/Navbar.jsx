import { Link } from "react-router-dom";
const Navbar = () => {
  const navItems = (
    <>
      <Link to="/">
        <li>
          <a>Home</a>
        </li>
      </Link>
      <Link to='/addBlog'>
        <li>
          <a>Add Blog</a>
        </li>
      </Link>
      <Link to="/allBlog">
        <li>
          <a>All Blogs</a>
        </li>
      </Link>
      <Link to="/featuredBlog">
        <li>
          <a>Featured Blogs</a>
        </li>
      </Link>
      <Link to="/wishlist">
        <li>
          <a>Wishlist</a>
        </li>
      </Link>
    </>
  );
  return (
    <div className="navbar text-slate-300 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <div className="flex">
          <img
            className="w-12"
            src="https://i.ibb.co/4McbnBM/cropped-ico.png"
            alt=""
          />
          <a  className="text-orange-500 btn btn-ghost text-xl">MixHub</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className=" navbar-end">
        <Link className="btn  btn-ghost" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
