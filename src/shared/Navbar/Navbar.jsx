import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../context/LanguageContext";
import {
  Search,
  Bookmark,
  PenLine,
  Globe,
  Radio,
  Menu,
  X,
  LogOut,
  User,
  Info,
  ChevronDown,
  BookOpen,
  Compass,
  Trophy,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { currentLang, setCurrentLang, t, LANGUAGES } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [liveReaders, setLiveReaders] = useState(1428);
  const navigate = useNavigate();

  // Subtle live reader count jitter to feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveReaders((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allBlog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navItems = [
    {
      to: "/",
      label: t("frontPage"),
      desc: t("frontPageDesc"),
      icon: BookOpen,
    },
    {
      to: "/live-wire",
      label: t("theWire"),
      desc: t("theWireDesc"),
      isWire: true,
      icon: Radio,
    },
    {
      to: "/allBlog",
      label: t("archive"),
      desc: t("archiveDesc"),
      icon: Compass,
    },
    {
      to: "/featuredBlog",
      label: t("theCanon"),
      desc: t("theCanonDesc"),
      icon: Trophy,
    },
    {
      to: "/wishlist",
      label: t("readingShelf"),
      desc: t("readingShelfDesc"),
      icon: Bookmark,
    },
    {
      to: "/addBlog",
      label: t("authorStudio"),
      desc: t("authorStudioDesc"),
      icon: PenLine,
      isAuthProtected: true,
    },
  ];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="w-full bg-[#faf8f5] border-b border-[#e8e4dc]">
      {/* Top Folio Bar: Volume, Global Time, Live Readers & Language Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-[#e8e4dc] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#5e5a54] uppercase tracking-wider gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#141414]">{t("vol")}</span>
          <span className="text-[#8c867c] hidden sm:inline">•</span>
          <span className="hidden sm:inline">{t("cities")}</span>
          <span className="text-[#8c867c] hidden md:inline">•</span>
          <span className="font-serif italic font-normal normal-case text-xs text-[#141414] hidden md:inline">
            {t("edition")}
          </span>
        </div>

        {/* Live Reader Pulse & Language & Auth */}
        <div className="flex items-center gap-4">
          {/* Live Reader Telemetry */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-[#141414]">
            <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse inline-block" />
            <span className="font-bold">{liveReaders.toLocaleString()}</span>
            <span className="text-[#5e5a54]">{t("readersNow")}</span>
          </div>

          {/* Guide / Info Pill explaining options */}
          <button
            onClick={() => setGuideModalOpen(true)}
            className="flex items-center gap-1 text-[#5e5a54] hover:text-[#141414] transition-colors"
            title="Overview of Sections (কোন অপশনের কি কাজ)"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Language Selector Dropdown (Top 10 Languages including Bangla) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2 py-0.5 border border-[#141414] bg-[#ffffff] hover:bg-[#f4f1ea] text-[#141414] transition-colors"
            >
              <span>{currentLangObj.flag}</span>
              <span className="font-bold">{currentLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-[#5e5a54]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-[#faf8f5] border-2 border-[#141414] shadow-2xl z-50 p-1 divide-y divide-[#e8e4dc]">
                <div className="p-2 text-[10px] font-mono uppercase tracking-widest text-[#5e5a54]">
                  Select Language (১০টি ভাষা)
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#141414] hover:text-[#faf8f5] transition-colors ${
                        currentLang === lang.code ? "bg-[#f4f1ea] font-bold" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="font-mono text-[10px] opacity-60 uppercase">
                        {lang.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author Authentication State */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#e8e4dc]">
              <span className="text-[11px] font-mono text-[#141414] font-bold hidden sm:inline">
                {user.displayName}
              </span>
              <button
                onClick={logOut}
                className="text-[#8c867c] hover:text-[#b91c1c] text-xs font-mono uppercase flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("signOut")}</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[#141414] hover:text-[#b91c1c] font-bold text-xs font-mono uppercase pl-2 border-l border-[#e8e4dc]"
            >
              {t("signIn")}
            </Link>
          )}
        </div>
      </div>

      {/* Main Newspaper Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center">
        <div className="inline-block">
          <Link to="/" className="group inline-block">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#141414] transition-colors group-hover:text-[#2e2e2e]">
              MixHub Dispatch
            </h1>
          </Link>
          <div className="mt-2 text-xs sm:text-sm font-serif italic text-[#5e5a54] tracking-wide">
            {t("tagline")}
          </div>
        </div>
      </div>

      {/* Primary Newspaper Navigation Strip with Double Border & Clarity */}
      <div className="border-t border-b border-[#141414] bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation Links with Clear Tooltip Subtext */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono uppercase tracking-widest text-[#141414]">
              {navItems.map((item) => (
                <div key={item.to} className="relative group/nav">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `py-4 transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? "font-bold text-[#141414] border-b-2 border-[#141414]"
                          : "text-[#5e5a54] hover:text-[#141414]"
                      }`
                    }
                  >
                    {item.isWire && (
                      <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse inline-block" />
                    )}
                    <span>{item.label}</span>
                  </NavLink>

                  {/* Clarifying Hover Card (কোন অপশনের কি কাজ) */}
                  <div className="absolute left-0 top-full mt-1 hidden group-hover/nav:block w-56 bg-[#ffffff] border border-[#141414] shadow-xl p-3 z-50 pointer-events-none">
                    <p className="font-mono text-[10px] uppercase font-bold text-[#b91c1c] mb-1">
                      {item.label}
                    </p>
                    <p className="font-serif normal-case text-xs text-[#5e5a54] leading-relaxed">
                      {item.desc}
                    </p>
                    {item.isAuthProtected && (
                      <span className="block mt-1 font-mono text-[9px] uppercase tracking-wider text-[#b91c1c]">
                        * Author login required to publish
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </nav>

            {/* Right Controls: Search + Write / Atelier CTA */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
              {/* Search Toggle */}
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2 border-b border-[#141414] pb-0.5"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, keyword..."
                    autoFocus
                    className="bg-transparent text-xs text-[#141414] placeholder-[#8c867c] focus:outline-none w-48 sm:w-64 font-serif italic"
                  />
                  <button
                    type="submit"
                    className="text-xs uppercase font-mono tracking-wider font-bold text-[#141414]"
                  >
                    Go
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-[#8c867c] hover:text-[#141414]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5e5a54] hover:text-[#141414] transition-colors py-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t("search")}</span>
                </button>
              )}

              {/* Author Atelier CTA (Login Protected) */}
              <Link
                to="/addBlog"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border border-[#141414] bg-[#141414] text-[#faf8f5] hover:bg-transparent hover:text-[#141414] transition-all font-bold"
                title={user ? "Open Atelier" : "Sign in to publish"}
              >
                <PenLine className="w-3 h-3" />
                <span>{t("authorStudio")}</span>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1 text-[#141414]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Clear Descriptions */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#141414] bg-[#f4f1ea] px-6 py-6 space-y-4 font-mono text-xs uppercase tracking-wider">
          <div className="text-[10px] text-[#8c867c] border-b border-[#e8e4dc] pb-2">
            Navigation Index
          </div>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#e8e4dc] text-[#141414] hover:text-[#b91c1c]"
            >
              <div className="font-bold flex items-center justify-between">
                <span>{item.label}</span>
                {item.isWire && (
                  <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse" />
                )}
              </div>
              <p className="font-serif normal-case text-xs text-[#5e5a54] mt-0.5">
                {item.desc}
              </p>
            </Link>
          ))}

          {/* User Auth on Mobile */}
          <div className="pt-2">
            {user ? (
              <div className="flex items-center justify-between text-xs">
                <span>Author: {user.displayName}</span>
                <button
                  onClick={() => {
                    logOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-[#b91c1c] font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 border border-[#141414] bg-[#141414] text-[#faf8f5] font-bold"
              >
                Sign In as Author
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Guide Modal: Explaining Every Option (কোন অপশনের কি কাজ) */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414]/60 backdrop-blur-sm">
          <div className="bg-[#faf8f5] border-2 border-[#141414] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-[#141414] flex items-center justify-between bg-[#f4f1ea]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold block mb-1">
                  Newspaper Index & Guide
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#141414]">
                  ন্যাভিগেশন নির্দেশিকা (কোন অপশনের কি কাজ)
                </h3>
              </div>
              <button
                onClick={() => setGuideModalOpen(false)}
                className="p-1.5 border border-[#141414] hover:bg-[#141414] hover:text-[#faf8f5] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-[#e8e4dc]">
              {navItems.map((item, idx) => (
                <div key={item.to} className="pt-3 first:pt-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#b91c1c]">
                      ০{idx + 1}. {item.label}
                    </span>
                    <span className="font-mono text-[10px] text-[#8c867c]">
                      [{item.to}]
                    </span>
                  </div>
                  <p className="font-serif text-sm text-[#141414] leading-relaxed">
                    {item.desc}
                  </p>
                  {item.isAuthProtected && (
                    <p className="font-mono text-[11px] text-[#b91c1c]">
                      * দ্রষ্টব্য: অপ্রমাণিত বা স্প্যাম রোধে পাণ্ডুলিপি লেখার জন্য অথর লগইন বাধ্যতামূলক।
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#f4f1ea] border-t border-[#141414] flex justify-end">
              <button
                onClick={() => setGuideModalOpen(false)}
                className="px-5 py-2 border border-[#141414] bg-[#141414] text-[#faf8f5] font-mono text-xs uppercase tracking-wider font-bold"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
