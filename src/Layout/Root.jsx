import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import LiveNewsTicker from "../components/LiveNewsTicker";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#faf8f5]">
      {/* Live Continuous News Wire Ticker */}
      <LiveNewsTicker />
      {/* Newspaper Masthead & Navigation */}
      <Navbar />
      {/* Broadsheet Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Colophon & Footer */}
      <Footer />
    </div>
  );
};

export default Root;
