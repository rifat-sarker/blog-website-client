import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeContext";
import defaultUserAvatar from "../../assets/user.png";
import {
  Compass,
  PenSquare,
  Bookmark,
  Sparkles,
  Vote,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Layers,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "All Blogs", to: "/allBlog", icon: Compass },
    { label: "Featured", to: "/featuredBlog", icon: Sparkles },
    { label: "Polls & Quiz", to: "/quizz_polls", icon: Vote },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-indigo-400 group-hover:text-pink-400 transition-colors" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                  Mix<span className="text-gradient">Hub</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block -mt-1">
                  Edition 2026
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`
                }
              >
                {link.icon && <link.icon className="w-4 h-4 opacity-70" />}
                {link.label}
              </NavLink>
            ))}

            {user && (
              <>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`
                  }
                >
                  <Bookmark className="w-4 h-4 opacity-70" />
                  Wishlist
                </NavLink>

                <NavLink
                  to="/addBlog"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`
                  }
                >
                  <PenSquare className="w-4 h-4 opacity-70" />
                  Write
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Controls: Theme + User / Login */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-800/60"
              aria-label="Toggle Theme"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* User Session Profile / Login */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer"
                >
                  <img
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/30"
                    src={user.photoURL || defaultUserAvatar}
                    alt={user.displayName || "User avatar"}
                  />
                  <span className="text-xs font-medium text-slate-200 max-w-[100px] truncate hidden sm:inline-block">
                    {user.displayName || user.email?.split("@")[0] || "Account"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-2 mt-2 shadow-2xl bg-slate-900 border border-slate-800 rounded-xl w-56 text-sm text-slate-200"
                >
                  <li className="px-3 py-2 border-b border-slate-800">
                    <p className="font-semibold text-white truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-slate-400 truncate -mt-1 font-mono">
                      {user.email}
                    </p>
                  </li>
                  <li className="mt-1">
                    <Link to="/addBlog" className="flex items-center gap-2">
                      <PenSquare className="w-4 h-4 text-indigo-400" /> Write New Story
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-pink-400" /> Saved Articles
                    </Link>
                  </li>
                  <div className="h-px bg-slate-800 my-1" />
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signUp"
                  className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-102"
                >
                  Join Free
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
              >
                Wishlist
              </Link>
              <Link
                to="/addBlog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
              >
                Write Story
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-rose-400 hover:bg-rose-500/10"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
