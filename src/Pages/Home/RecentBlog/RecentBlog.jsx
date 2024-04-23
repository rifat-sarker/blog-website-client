import axios from "axios";
import { useEffect, useState } from "react";
import RecentBlogCard from "./RecentBlogCard";

const RecentBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const url = "https://blog-website-server-blond.vercel.app/blog";
  useEffect(() => {
    axios.get(url).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  //show latest 6 blogs sort by date
  const sorted = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="mt-12">
      <h1 className="font-bold text-4xl text-center mb-12">Recent Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-20 mx-auto justify-items-center">
        {sorted.map((blog) => (
          <RecentBlogCard key={blog._id} blog={blog}></RecentBlogCard>
        ))}
      </div>
    </div>
  );
};

export default RecentBlog;
