import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#141414] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 border-2 border-[#141414] p-10 bg-[#ffffff] shadow-xl">
        <span className="font-sans text-xs uppercase tracking-wider text-[#b91c1c] font-semibold block">
          Dispatch Notice • 404
        </span>

        <h1 className="font-serif text-7xl font-normal text-[#141414] tracking-tight">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-[#141414]">Edition Not Found</h2>
          <p className="font-serif italic text-sm text-[#5e5a54]">
            The manuscript or dispatch you requested cannot be located in the current volume index.
          </p>
        </div>

        <div className="pt-4 border-t border-[#e8e4dc]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#141414] bg-[#141414] text-[#faf8f5] font-sans text-xs uppercase tracking-wider font-semibold hover:bg-transparent hover:text-[#141414] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Front Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
