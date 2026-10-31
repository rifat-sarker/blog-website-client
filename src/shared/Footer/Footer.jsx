import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { Check } from "lucide-react";

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
    <footer className="mt-12 sm:mt-16 border-t border-[#f2f2f2] bg-[#ffffff] text-[#242424]">
      <div className="max-w-[1336px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Masthead */}
          <div className="lg:col-span-5 space-y-3 lg:pr-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-[#242424] text-[#ffffff] flex items-center justify-center font-serif text-sm font-bold group-hover:bg-[#1a8917] transition-colors">
                M
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#242424]">
                MixHub
              </span>
            </Link>

            <p className="font-serif text-sm text-[#6b6b6b] leading-relaxed max-w-md">
              A quiet space for reading, writing, and understanding complex ideas. Free of clickbait and cognitive noise.
            </p>

            <div className="text-xs text-[#8c867c] space-y-0.5">
              <div>Designed with minimal typography & focus</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-2 text-sm">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6b6b6b]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#6b6b6b]">
              <li>
                <Link to="/" className="hover:text-[#242424] transition-colors">
                  {t("frontPage")}
                </Link>
              </li>
              <li>
                <Link to="/live-wire" className="hover:text-[#242424] transition-colors">
                  The Wire
                </Link>
              </li>
              <li>
                <Link to="/allBlog" className="hover:text-[#242424] transition-colors">
                  All Stories
                </Link>
              </li>
              <li>
                <Link to="/featuredBlog" className="hover:text-[#242424] transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#242424] transition-colors">
                  Reading List
                </Link>
              </li>
              <li>
                <Link to="/addBlog" className="hover:text-[#242424] transition-colors">
                  Write a Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#6b6b6b]">
              Weekly Digest
            </h4>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Receive the week's best stories and ideas directly in your inbox. No spam, ever.
            </p>

            {subscribed ? (
              <div className="border border-[#1a8917] bg-[#f0fdf4] p-3 text-xs text-[#1a8917] flex items-center gap-2 rounded-lg">
                <Check className="w-4 h-4 text-[#1a8917]" />
                <span>You have been subscribed to the MixHub digest.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="flex-1 bg-[#f9f9f9] border border-[#e6e6e6] rounded-full px-4 py-2 text-xs text-[#242424] placeholder-[#8c867c] focus:outline-none focus:border-[#242424] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#242424] text-[#ffffff] text-xs font-medium rounded-full hover:bg-[#1a8917] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Folio & Copyright */}
        <div className="mt-10 pt-6 border-t border-[#f2f2f2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b6b6b]">
          <div>
            © 2026 MixHub Press. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[#242424]">Privacy</Link>
            <Link to="/" className="hover:text-[#242424]">Terms</Link>
            <Link to="/" className="hover:text-[#242424]">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
