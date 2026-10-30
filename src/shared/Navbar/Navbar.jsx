import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../context/LanguageContext";
import { Search, PenLine, Radio, Menu, X, LogOut, Info, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { currentLang, setCurrentLang, t, LANGUAGES } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allBlog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navItems = [
    { name: t("frontPage"), path: "/" },
    { name: t("theLiveWire"), path: "/live-wire", dot: true },
    { name: t("allManuscripts"), path: "/allBlog" },
    { name: t("theCanon"), path: "/featuredBlog" },
    { name: t("readingShelf"), path: "/wishlist" },
  ];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#ece6dc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo: Clean, Elegant Serif like Medium / Substack */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-[26px] font-normal tracking-tight text-[#1a1917] hover:opacity-80 transition-opacity">
                MixHub
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-[#9c9489] uppercase tracking-widest">
                Dispatch
              </span>
            </Link>

            {/* Navigation Links: Medium Style Clean Sans */}
            <nav className="hidden md:flex items-center space-x-6 text-[13px] text-[#696359]">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `transition-colors hover:text-[#1a1917] flex items-center gap-1.5 ${
                      isActive ? "text-[#1a1917] font-medium" : ""
                    }`
                  }
                >
                  {item.dot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c] animate-pulse inline-block" />
                  )}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Action Icons: Search, Language, Write & Profile */}
          <div className="flex items-center gap-4">
            {/* Minimal Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-[#696359] hover:text-[#1a1917] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Minimal Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-[13px] text-[#696359] hover:text-[#1a1917] transition-colors py-1 px-1.5"
              >
                <span>{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#faf8f5] border border-[#e2dbce] rounded-md shadow-lg z-50 p-1 divide-y divide-[#ece6dc]">
                  <div className="max-h-56 overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#f0ebe1] rounded transition-colors ${
                          currentLang === lang.code ? "font-semibold text-[#1a1917]" : "text-[#696359]"
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

            {/* Substack/Medium Style "Write" Button */}
            <Link
              to="/addBlog"
              className="hidden sm:flex items-center gap-1.5 text-[13px] text-[#696359] hover:text-[#1a1917] transition-colors px-2 py-1"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Write</span>
            </Link>

            {/* User Profile or Sign In */}
            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-[#ece6dc]">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={user.displayName}
                  className="w-7 h-7 rounded-full object-cover border border-[#d8d0c2]"
                />
                <button
                  onClick={logOut}
                  className="text-[#9c9489] hover:text-[#b91c1c] text-xs transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[13px] font-medium text-[#ffffff] bg-[#1a1917] hover:bg-[#33312e] px-3.5 py-1.5 rounded-full transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#1a1917]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Inline Search Bar (Substack style) */}
      {isSearchOpen && (
        <div className="border-t border-[#ece6dc] bg-[#faf8f5] px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#9c9489]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, ideas, architecture..."
              autoFocus
              className="w-full text-sm font-sans bg-transparent border-none outline-none text-[#1a1917] placeholder-[#9c9489]"
            />
            <button type="submit" className="text-xs font-medium text-[#1a1917] hover:underline">
              Search
            </button>
            <button type="button" onClick={() => setIsSearchOpen(false)} className="text-[#9c9489]">
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ece6dc] bg-[#faf8f5] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-sm text-[#696359] hover:text-[#1a1917]"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/addBlog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-[#1a1917]"
          >
            Write Story
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
