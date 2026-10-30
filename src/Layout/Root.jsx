import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#141414] selection:text-[#faf8f5]">
      {/* Newspaper Masthead & Navigation (Single Unified Header) */}
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
