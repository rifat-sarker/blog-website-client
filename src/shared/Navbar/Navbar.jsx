import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../context/LanguageContext";
import {
  Search,
  Bell,
  SquarePen,
  Bookmark,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Compass,
  Radio,
  BookOpen,
  Trophy,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { currentLang, setCurrentLang, t, LANGUAGES } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allBlog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#f2f2f2]">
      <div className="max-w-[1336px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[57px]">
          {/* Left: Medium Official Logo + Search Box */}
          <div className="flex items-center gap-4 flex-1">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              {/* Exact Medium 3-Circles Logo Mark */}
              <svg className="w-[120px] h-[25px]" viewBox="0 0 1043.63 592.71">
                <g>
                  <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" fill="#242424"/>
                </g>
              </svg>
            </Link>

            {/* Medium Pill Search Input */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative max-w-[240px] w-full">
              <Search className="w-4 h-4 text-[#6b6b6b] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-[#f9f9f9] border border-transparent focus:border-[#e6e6e6] focus:bg-[#ffffff] text-sm text-[#242424] placeholder-[#6b6b6b] rounded-full py-2 pl-9 pr-4 outline-none transition-all"
              />
            </form>
          </div>

          {/* Right: Write Button, Live Wire, Language, Profile */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Medium "Write" Button */}
            <Link
              to="/addBlog"
              className="flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors"
            >
              <SquarePen className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden sm:inline">Write</span>
            </Link>

            {/* Live Wire Real-Time Telemetry Link */}
            <Link
              to="/live-wire"
              className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#242424] transition-colors"
              title="Continuous Live News Wire"
            >
              <span className="w-2 h-2 rounded-full bg-[#1a8917] animate-pulse" />
              <span className="hidden md:inline font-mono text-[11px] uppercase tracking-wider">The Wire</span>
            </Link>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#242424] py-1 px-1.5 rounded transition-colors"
              >
                <span>{currentLangObj.flag}</span>
                <span className="hidden sm:inline text-xs uppercase font-mono">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-[#6b6b6b]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#ffffff] border border-[#f2f2f2] rounded-md shadow-xl z-50 p-1 divide-y divide-[#f2f2f2]">
                  <div className="max-h-60 overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#f9f9f9] rounded transition-colors ${
                          currentLang === lang.code ? "font-semibold text-[#1a8917]" : "text-[#6b6b6b]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Medium Green Sign In Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover border border-[#e6e6e6]"
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#ffffff] border border-[#f2f2f2] rounded-md shadow-xl z-50 p-2 divide-y divide-[#f2f2f2] text-sm text-[#242424]">
                    <div className="px-3 py-2">
                      <div className="font-medium truncate">{user.displayName}</div>
                      <div className="text-xs text-[#6b6b6b] truncate">{user.email}</div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f9f9f9] rounded transition-colors text-xs text-[#6b6b6b]"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Reading list (Shelf)</span>
                      </Link>
                      <Link
                        to="/addBlog"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f9f9f9] rounded transition-colors text-xs text-[#6b6b6b]"
                      >
                        <SquarePen className="w-4 h-4" />
                        <span>Write a story</span>
                      </Link>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          logOut();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs text-[#b91c1c] hover:bg-[#fef2f2] rounded transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="hidden sm:inline text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium px-4 py-2 rounded-full medium-btn-green"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
