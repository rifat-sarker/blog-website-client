import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../context/LanguageContext";
import { Mail, ArrowRight, ShieldCheck, KeyRound, CheckCircle2 } from "lucide-react";

const Login = () => {
  const { sendOTP, verifyOTP, googleLogIn } = useContext(AuthContext);
  const { t, currentLang } = useLanguage();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/addBlog";

  // Step 1: Request OTP to Email via Backend Google SMTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await sendOTP(email);
      setStep("otp");
      setSuccessMsg(
        currentLang === "bn"
          ? `আপনার ${email} ঠিকানায় ৬ ডিজিটের ওটিপি পাঠানো হয়েছে!`
          : `A 6-digit verification code has been dispatched to ${email}`
      );
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.error ||
          (currentLang === "bn"
            ? "ওটিপি পাঠাতে সমস্যা হয়েছে। ইমেইল চেক করুন।"
            : "Failed to dispatch verification code.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await verifyOTP(email, otp);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.error ||
          (currentLang === "bn"
            ? "ভুল কোড দেওয়া হয়েছে অথবা মেয়াদ শেষ হয়েছে।"
            : "Invalid or expired verification code.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google 1-Click Login
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      await googleLogIn();
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg("Google Sign-In failed.");
    } finally {
      setIsSubmitting(false);
    }
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
            {currentLang === "bn" ? "লেখক পরিচয়পত্র ও প্রত্যয়ন ডেস্ক" : "Author Accreditation Desk"}
          </span>
          <h1 className="font-serif text-3xl font-normal text-[#141414]">
            {t("signIn")}
          </h1>
          <p className="font-serif italic text-xs text-[#5e5a54] max-w-sm mx-auto">
            {currentLang === "bn"
              ? "মঞ্চে পাণ্ডুলিপি প্রকাশ বা সংরক্ষণের জন্য জিমেইল বা ওটিপির মাধ্যমে পরিচয় নিশ্চিত করুন।"
              : "Verify your credentials via verified Google account or passwordless email access code."}
          </p>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3 bg-[#fef2f2] border border-[#b91c1c] text-[#b91c1c] text-xs font-mono">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-[#f0fdf4] border border-[#15803d] text-[#15803d] text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google 1-Click Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          type="button"
          className="w-full py-3 px-4 border border-[#141414] bg-[#ffffff] hover:bg-[#faf8f5] text-[#141414] text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-3 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{currentLang === "bn" ? "গুগল অ্যাকাউন্ট দিয়ে ১-ক্লিকে প্রবেশ" : "Continue with Verified Google"}</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#e8e4dc] w-full" />
          <span className="bg-[#ffffff] px-3 font-mono text-[10px] text-[#5e5a54] uppercase tracking-widest relative">
            {currentLang === "bn" ? "অথবা ইমেইল ওটিপি কোড" : "OR EMAIL ACCESS CODE"}
          </span>
        </div>

        {/* Step 1: Email Form */}
        {step === "email" ? (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold mb-1.5">
                {currentLang === "bn" ? "আপনার ইমেইল ঠিকানা" : "Author Email Address"}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@mixhub.press"
                  required
                  className="w-full bg-[#faf8f5] border border-[#141414] p-3 pl-10 text-sm font-mono text-[#141414] placeholder-[#8c867c] focus:outline-none"
                />
                <Mail className="w-4 h-4 text-[#8c867c] absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-[#141414] bg-[#141414] text-[#faf8f5] text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-[#141414] transition-all flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? "Dispatching..." : currentLang === "bn" ? "ওটিপি কোড পাঠান" : "Send Access Code"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification Form */
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block font-mono text-xs uppercase tracking-wider text-[#141414] font-bold">
                  {currentLang === "bn" ? "৬ ডিজিটের ওটিপি কোড" : "6-Digit Access Code"}
                </label>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="font-mono text-[11px] text-[#b91c1c] underline hover:text-[#141414]"
                >
                  {currentLang === "bn" ? "ইমেইল পরিবর্তন" : "Change Email"}
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  required
                  autoFocus
                  className="w-full bg-[#faf8f5] border border-[#141414] p-3 pl-10 text-xl font-mono tracking-[0.3em] text-center text-[#141414] placeholder-[#8c867c] focus:outline-none"
                />
                <KeyRound className="w-4 h-4 text-[#8c867c] absolute left-3 top-4" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-[#141414] bg-[#141414] text-[#faf8f5] text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-[#141414] transition-all flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? "Verifying..." : currentLang === "bn" ? "কোড যাচাই ও প্রবেশ" : "Verify & Enter"}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer Note */}
        <div className="pt-4 border-t border-[#e8e4dc] text-center">
          <p className="font-serif italic text-xs text-[#5e5a54]">
            {currentLang === "bn"
              ? "প্রবেশ সম্পন্ন হলে স্বয়ংক্রিয়ভাবে লেখক স্টুডিও ও ড্রাফটিং ডেস্ক উন্মুক্ত হবে।"
              : "Accredited contributors gain direct access to the editorial atelier and telemetry dispatches."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
