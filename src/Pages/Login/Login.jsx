import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../context/LanguageContext";
import { Lock, Mail, ArrowRight, ShieldCheck, PenLine } from "lucide-react";

const Login = () => {
  const { signInUser, user } = useContext(AuthContext);
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/addBlog";

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    await signInUser(email, password || "editorial_pass");
    setIsSubmitting(false);
    navigate(from, { replace: true });
  };

  const handleQuickAccredit = async () => {
    setIsSubmitting(true);
    await signInUser("rifat.sarker@mixhub.dev", "editorial_pass");
    setIsSubmitting(false);
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 sm:py-24">
      <div className="border-2 border-[#141414] bg-[#ffffff] p-8 sm:p-12 shadow-xl space-y-8">
        {/* Masthead Header */}
        <div className="text-center space-y-2 border-b border-[#141414] pb-6">
          <div className="w-8 h-8 mx-auto border border-[#b91c1c] text-[#b91c1c] font-serif font-bold flex items-center justify-center text-sm mb-2">
            M
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#b91c1c] font-bold block">
            Author Accreditation Desk
          </span>
          <h1 className="font-serif text-3xl font-normal text-[#141414]">
            Sign In to Publish
          </h1>
          <p className="font-serif italic text-xs text-[#5e5a54] max-w-sm mx-auto">
            To preserve editorial integrity and verify article authorship, only accredited writers may draft and publish manuscripts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
              Author Email Address
            </label>
            <div className="flex border border-[#141414] bg-[#faf8f5] p-2.5">
              <Mail className="w-4 h-4 text-[#8c867c] mr-2 flex-shrink-0 mt-0.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="author@mixhub.dev"
                className="w-full bg-transparent font-serif text-sm text-[#141414] placeholder-[#8c867c] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
                Passphrase
              </label>
              <span className="font-mono text-[10px] text-[#8c867c]">
                Any key for local session
              </span>
            </div>
            <div className="flex border border-[#141414] bg-[#faf8f5] p-2.5">
              <Lock className="w-4 h-4 text-[#8c867c] mr-2 flex-shrink-0 mt-0.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent font-serif text-sm text-[#141414] placeholder-[#8c867c] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 border border-[#141414] bg-[#141414] text-[#faf8f5] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#2e2e2e] transition-colors flex items-center justify-center gap-2"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Verifying Credentials..." : "Authenticate as Author"}</span>
          </button>
        </form>

        {/* 1-Click Author Access Button */}
        <div className="pt-4 border-t border-[#e8e4dc] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#5e5a54]">
            <span>Fast Review Accreditation:</span>
          </div>

          <button
            type="button"
            onClick={handleQuickAccredit}
            disabled={isSubmitting}
            className="w-full py-2.5 border border-[#141414] bg-[#f4f1ea] hover:bg-[#e8e4dc] text-[#141414] font-mono text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#b91c1c]" />
            <span>1-Click Sign In as Rifat Sarker (Lead Editor)</span>
          </button>
        </div>

        {/* Return Link */}
        <div className="text-center pt-2">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-wider text-[#5e5a54] hover:text-[#141414] underline"
          >
            ← Return to Front Page Without Signing In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
