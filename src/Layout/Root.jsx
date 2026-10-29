import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import LiveNewsTicker from "../components/LiveNewsTicker";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 transition-colors selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Live 2026 Continuous News Ticker */}
      <LiveNewsTicker />
      {/* Navigation Header */}
      <Navbar />
      {/* Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Root;
