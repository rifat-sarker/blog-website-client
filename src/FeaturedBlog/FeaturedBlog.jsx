import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const FeaturedBlog = () => {
    const {user} = useContext(AuthContext)
    console.log(user);
  const [blogs, setBlogs] = useState([]);
  console.log(blogs);

  const url = "http://localhost:5000/blog";
  useEffect(() => {
    axios.get(url).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  //sort blog by length of long description
  const sortedBlogs = blogs.sort((a, b) => {
    const A = a.ldesc.split(" ").length;
    const B = b.ldesc.split(" ").length;
    return B - A;
  });

  return (
    <div className="mt-12">
      <table className="w-full">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Blog Title</th>
            <th>Owner</th>
            <th>Owner Picture</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {sortedBlogs.slice(0, 10).map((blog, index) => (
            <tr  key={blog.id}>
              <td>{index + 1}</td>
              <td><p>{blog.title}</p></td>
              <td>{user.email}</td>
              <td>
                <img
                    className="rounded-lg mx-auto my-4"
                  src={user.photoURL}
                  alt="Profile"
                  width="50"
                  height="50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedBlog;
