import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowUpRight, Check } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  return (
    <footer className="mt-20 border-t-2 border-[#141414] bg-[#faf8f5] text-[#141414]">
      {/* Upper Broadsheet Colophon Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Masthead Colophon */}
          <div className="lg:col-span-5 space-y-4 lg:pr-8 lg:border-r border-[#e8e4dc]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 border border-[#b91c1c] text-[#b91c1c] font-serif font-bold flex items-center justify-center text-xs">
                M
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#141414]">
                MixHub Dispatch
              </span>
            </div>

            <p className="font-serif italic text-sm text-[#5e5a54] leading-relaxed max-w-md">
              {t("tagline")}. Designed in homage to classical broadsheets, handcrafted bookbinding, and the quiet dignity of sustained contemplation.
            </p>

            <div className="font-mono text-[11px] text-[#8c867c] uppercase tracking-wider space-y-1">
              <div>Typefaces: Newsreader & Plus Jakarta Sans</div>
              <div>Palette: Warm Ivory Paper (#FAF8F5) & Sumi Ink (#141414)</div>
            </div>
          </div>

          {/* Sections */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider">
            <h4 className="font-bold text-[#141414] border-b border-[#141414] pb-1">
              Departments
            </h4>
            <ul className="space-y-2 text-[#5e5a54]">
              <li>
                <Link to="/" className="hover:text-[#141414] transition-colors">
                  {t("frontPage")}
                </Link>
              </li>
              <li>
                <Link to="/live-wire" className="hover:text-[#141414] transition-colors">
                  {t("theWire")}
                </Link>
              </li>
              <li>
                <Link to="/allBlog" className="hover:text-[#141414] transition-colors">
                  {t("archive")}
                </Link>
              </li>
              <li>
                <Link to="/featuredBlog" className="hover:text-[#141414] transition-colors">
                  {t("theCanon")}
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#141414] transition-colors">
                  {t("readingShelf")}
                </Link>
              </li>
              <li>
                <Link to="/addBlog" className="hover:text-[#141414] transition-colors">
                  {t("authorStudio")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Weekly Sunday Dispatch Subscription */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#141414] border-b border-[#141414] pb-1">
              The Sunday Dispatch
            </h4>
            <p className="font-serif text-xs text-[#5e5a54] leading-relaxed">
              Receive a quiet, unadorned summary of the week's published monographs directly via email. Zero advertising, zero clickbait.
            </p>

            {subscribed ? (
              <div className="border border-[#141414] p-3 text-xs font-mono uppercase tracking-wider text-[#141414] flex items-center gap-2 bg-[#ffffff]">
                <Check className="w-4 h-4 text-[#b91c1c]" />
                <span>You have been inscribed into the circulation roll.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex border border-[#141414] bg-[#ffffff]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    required
                    className="flex-1 bg-transparent px-3 py-2 text-xs font-serif text-[#141414] placeholder-[#8c867c] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#141414] text-[#faf8f5] text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#2e2e2e] transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Folio & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#e8e4dc] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5e5a54] uppercase tracking-wider">
          <div>
            Published by Rifat Sarker • Autumn 2026 Edition
          </div>
          <div className="flex items-center gap-6">
            <span>{t("vol")}</span>
            <span>•</span>
            <span>Uninterrupted Reading Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
