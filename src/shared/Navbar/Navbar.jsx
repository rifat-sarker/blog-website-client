import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../context/LanguageContext";
import { editorialService, getLocalized } from "../../services/api";
import {
  Search,
  SquarePen,
  Bookmark,
  ChevronDown,
  LogOut,
  X,
  Menu,
  Compass,
  TrendingUp,
  Radio,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { currentLang, setCurrentLang, LANGUAGES } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [liveResults, setLiveResults] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const userDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const navigate = useNavigate();

  // Instant Real-Time Search As You Type
  useEffect(() => {
    if (!searchQuery.trim()) {
      setLiveResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const articles = await editorialService.getArticles();
      const q = searchQuery.toLowerCase().trim();
      const matched = articles.filter((a) => {
        const title = getLocalized(a.title, currentLang).toLowerCase();
        const sdesc = getLocalized(a.sdesc, currentLang).toLowerCase();
        const cat = getLocalized(a.category, currentLang).toLowerCase();
        return title.includes(q) || sdesc.includes(q) || cat.includes(q);
      });
      setLiveResults(matched.slice(0, 5));
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery, currentLang]);

  // Click outside to dismiss dropdowns & mobile menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setLiveResults([]);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allBlog?q=${encodeURIComponent(searchQuery.trim())}`);
      setLiveResults([]);
      setSearchQuery("");
      setMobileSearchOpen(false);
    }
  };

  const toggleMobileSearch = () => {
    const nextState = !mobileSearchOpen;
    setMobileSearchOpen(nextState);
    if (nextState) {
      setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
    }
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#f2f2f2]" ref={mobileMenuRef}>
      <div className="max-w-[1336px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[57px] gap-2">
          {/* Left: MixHub Logo & Instant Live Search (Desktop) */}
          <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0" ref={searchContainerRef}>
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#242424] text-[#ffffff] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[#1a8917] transition-colors">
                M
              </div>
              <span className="font-serif text-[20px] sm:text-[22px] font-bold tracking-tight text-[#242424]">
                MixHub
              </span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden sm:block relative max-w-[280px] w-full">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                <Search className="w-4 h-4 text-[#6b6b6b] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search stories, ideas..."
                  className="w-full bg-[#f9f9f9] border border-transparent focus:border-[#e6e6e6] focus:bg-[#ffffff] text-sm text-[#242424] placeholder-[#6b6b6b] rounded-full py-2 pl-9 pr-8 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 text-[#6b6b6b] hover:text-[#242424]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Desktop Autocomplete Dropdown anchored directly below input */}
              {liveResults.length > 0 && (
                <div className="absolute top-[44px] left-0 w-80 sm:w-96 bg-[#ffffff] border border-[#f2f2f2] rounded-lg shadow-2xl z-50 overflow-hidden divide-y divide-[#f2f2f2]">
                  <div className="p-2.5 text-[11px] font-mono uppercase tracking-wider text-[#6b6b6b] bg-[#fafafa]">
                    Stories Found ({liveResults.length})
                  </div>
                  {liveResults.map((story) => (
                    <Link
                      key={story._id || story.id}
                      to={`/blog/${story._id || story.id}`}
                      onClick={() => {
                        setLiveResults([]);
                        setSearchQuery("");
                      }}
                      className="p-3 block hover:bg-[#f9f9f9] transition-colors"
                    >
                      <div className="text-xs font-semibold text-[#242424] truncate">
                        {getLocalized(story.title, currentLang)}
                      </div>
                      <div className="text-[11px] text-[#6b6b6b] truncate mt-0.5">
                        {getLocalized(story.sdesc, currentLang)}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions, Language, Profile & Mobile Toggles */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
            {/* Mobile Search Toggle Button (< 640px) */}
            <button
              onClick={toggleMobileSearch}
              className="sm:hidden p-2 text-[#6b6b6b] hover:text-[#242424] rounded-full hover:bg-[#f9f9f9] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Write Story Button */}
            <Link
              to="/addBlog"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors p-1.5 sm:p-0"
              title="Write a story"
            >
              <SquarePen className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              <span className="hidden sm:inline">Write</span>
            </Link>

            {/* The Live Wire (Tablet/Desktop) */}
            <Link
              to="/live-wire"
              className="hidden md:flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#242424] transition-colors"
              title="Continuous Live News Wire"
            >
              <span className="w-2 h-2 rounded-full bg-[#1a8917] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider">The Wire</span>
            </Link>

            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-xs text-[#6b6b6b] hover:text-[#242424] py-1 px-1.5 rounded transition-colors"
                title="Select language"
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

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user.avatar || user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={user.displayName || user.name || "User"}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#e6e6e6]"
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#ffffff] border border-[#f2f2f2] rounded-md shadow-xl z-50 p-2 divide-y divide-[#f2f2f2] text-sm text-[#242424]">
                    <div className="px-3 py-2">
                      <div className="font-medium truncate">{user.displayName || user.name || "MixHub Reader"}</div>
                      <div className="text-xs text-[#6b6b6b] truncate">{user.email}</div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f9f9f9] rounded transition-colors text-xs text-[#6b6b6b]"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Reading list</span>
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
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="hidden md:inline text-xs sm:text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full medium-btn-green whitespace-nowrap"
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle Button (< 768px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#6b6b6b] hover:text-[#242424] rounded-md hover:bg-[#f9f9f9] transition-colors"
              title="Navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Bar (< 640px) */}
        {mobileSearchOpen && (
          <div className="sm:hidden border-t border-[#f2f2f2] py-2.5">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <Search className="w-4 h-4 text-[#6b6b6b] absolute left-3 pointer-events-none" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, ideas..."
                className="w-full bg-[#f9f9f9] border border-[#e6e6e6] focus:border-[#242424] focus:bg-[#ffffff] text-xs text-[#242424] placeholder-[#6b6b6b] rounded-full py-2 pl-9 pr-8 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-[#6b6b6b] hover:text-[#242424]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Mobile Autocomplete Results */}
            {liveResults.length > 0 && (
              <div className="mt-2 bg-[#ffffff] border border-[#f2f2f2] rounded-lg shadow-xl overflow-hidden divide-y divide-[#f2f2f2]">
                <div className="p-2 text-[10px] font-mono uppercase tracking-wider text-[#6b6b6b] bg-[#fafafa]">
                  Stories Found ({liveResults.length})
                </div>
                {liveResults.map((story) => (
                  <Link
                    key={story._id || story.id}
                    to={`/blog/${story._id || story.id}`}
                    onClick={() => {
                      setLiveResults([]);
                      setSearchQuery("");
                      setMobileSearchOpen(false);
                    }}
                    className="p-2.5 block hover:bg-[#f9f9f9]"
                  >
                    <div className="text-xs font-semibold text-[#242424] truncate">
                      {getLocalized(story.title, currentLang)}
                    </div>
                    <div className="text-[11px] text-[#6b6b6b] truncate mt-0.5">
                      {getLocalized(story.sdesc, currentLang)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Dropdown Menu (< 768px) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#f2f2f2] py-3 space-y-2">
            <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9f9f9] text-[#242424]"
              >
                <Compass className="w-4 h-4 text-[#1a8917]" />
                <span>Front Page</span>
              </Link>
              <Link
                to="/allBlog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9f9f9] text-[#242424]"
              >
                <Search className="w-4 h-4 text-[#1a8917]" />
                <span>All Stories</span>
              </Link>
              <Link
                to="/featuredBlog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9f9f9] text-[#242424]"
              >
                <TrendingUp className="w-4 h-4 text-[#1a8917]" />
                <span>Featured</span>
              </Link>
              <Link
                to="/live-wire"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9f9f9] text-[#242424]"
              >
                <Radio className="w-4 h-4 text-[#1a8917]" />
                <span>The Wire</span>
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9f9f9] text-[#242424]"
              >
                <Bookmark className="w-4 h-4 text-[#1a8917]" />
                <span>Reading List</span>
              </Link>
              <Link
                to="/addBlog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f9f9f9] text-[#242424]"
              >
                <SquarePen className="w-4 h-4 text-[#1a8917]" />
                <span>Write Story</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
