import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../context/LanguageContext";
import { Mail, ArrowRight, ShieldCheck, KeyRound, CheckCircle2 } from "lucide-react";

// Safe JWT Payload decoder without external dependency
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const Login = () => {
  const { sendOTP, verifyOTP, googleLogIn } = useContext(AuthContext);
  const { t, currentLang } = useLanguage();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const googleBtnRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/addBlog";

  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "109689675909-bepd3418g0ha64lon7rkag5kfppb91dn.apps.googleusercontent.com";

  // Initialize Official Google Identity Services 1-Tap & Button
  useEffect(() => {
    const handleCredentialResponse = async (response) => {
      setIsSubmitting(true);
      setErrorMsg("");
      try {
        const payload = parseJwt(response.credential);
        if (!payload || !payload.email) {
          throw new Error("Unable to parse Google token.");
        }

        await googleLogIn({
          email: payload.email,
          name: payload.name || payload.given_name || payload.email.split("@")[0],
          avatar: payload.picture,
          googleId: payload.sub,
          credentialToken: response.credential,
        });

        navigate(from, { replace: true });
      } catch (err) {
        console.error("Google login failed:", err);
        setErrorMsg("Google Sign-In verification failed.");
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderGoogleBtn = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleCredentialResponse,
            auto_select: false,
          });

          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 380,
          });
        } catch (e) {
          console.warn("Google button init deferred:", e);
        }
      }
    };

    if (window.google?.accounts?.id) {
      renderGoogleBtn();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          renderGoogleBtn();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [googleClientId, from]);

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
              : "Verify your credentials via official Google authentication or single-use email access code."}
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

        {/* Official Google 1-Click Identity Button Mount */}
        <div className="flex flex-col items-center justify-center min-h-[44px]">
          <div ref={googleBtnRef} className="w-full flex justify-center" />
        </div>

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
