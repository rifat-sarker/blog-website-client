import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard/BlogCard";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("all")
  const [searchTitle, setSearchTitle] = useState("");

  const url = "http://localhost:5000/blog";
  useEffect(() => { 
    axios.get(url).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const filteredBlogs = blogs
  .filter((blog) => category === "all" || blog.category === category )
  .filter((blog) =>
    blog.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-5xl text-center my-5 font-semibold">All Blogs</h1>

      <div className="flex justify-center space-x-4 mb-8 mt-8">
        <select
          className="p-4 font-semibold rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="travel">Travel</option>
          <option value="parenting">parenting Tips</option>
          <option value="recipes">Recipes</option>
          <option value="fashion">Fashion </option>
          <option value="motivation">Motivation</option>
        </select>

        <input 
          className="p-4 rounded-lg font-semibold"
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl gap-14 justify-items-center">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default AllBlog;
