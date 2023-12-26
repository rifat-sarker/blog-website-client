import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard/BlogCard";


const AllBlog = () => {
    const [blogs, setBlogs] =useState([])
    const url ='http://localhost:5000/blog'
    useEffect(()=>{
        axios.get(url)
        .then(res=> {
            setBlogs(res.data)
            console.log(setBlogs);
        })
    }, [])
    return (
        <div>
            <h1 className="text-4xl text-center my-5 font-semibold">All Blogs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-6xl gap-16 justify-items-center">
                {
                    blogs.map(blog=> <BlogCard
                     key={blog._id}
                     blog={blog}
                     ></BlogCard>)
                }
            </div>
        </div>
    );
};

export default AllBlog;