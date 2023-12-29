import { Icon } from "@mui/material";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import NewsLetter from "../NewsLetter/NewsLetter";
import RecentBlog from "../RecentBlog/RecentBlog";
import Team from "../Team/Team";
import { motion,} from "framer-motion";

const Home = () => {
  return (
    <motion.div   initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}  >
      <div>
        <Banner></Banner>
        <RecentBlog></RecentBlog>
        <Team></Team>
        <AboutUs></AboutUs>
        <NewsLetter></NewsLetter>
      </div>
    </motion.div>
  );
};

export default Home;
