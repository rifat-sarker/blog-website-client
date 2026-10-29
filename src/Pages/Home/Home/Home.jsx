import Banner from "../Banner/Banner";
import RecentBlog from "../RecentBlog/RecentBlog";
import Team from "../Team/Team";
import AboutUs from "../AboutUs/AboutUs";
import NewsLetter from "../NewsLetter/NewsLetter";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Banner />
      <RecentBlog />
      <AboutUs />
      <Team />
      <NewsLetter />
    </motion.div>
  );
};

export default Home;
