import Banner from "../Banner/Banner";
import NewsLetter from "../NewsLetter/NewsLetter";
import RecentBlog from "../RecentBlog/RecentBlog";
import Team from "../Team/Team";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlog></RecentBlog>
            <Team></Team>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;