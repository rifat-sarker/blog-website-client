import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { AuthContext } from "../providers/AuthProvider";

const FeaturedBlog = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  // console.log(blogs);

  const url = `${import.meta.env.VITE_MAIN_URL}/blog`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  // Ensure that ldesc is defined before splitting with double spaces
  const sortedBlogs = blogs.sort((a, b) => {
    const wordsA = (a.ldesc || "").split(" ").length;
    const wordsB = (b.ldesc || "").split(" ").length;
    return wordsB - wordsA;
  });

  // Map the data to the required format
  const data = sortedBlogs
    .slice(0, 10)
    .map((blog, index) => [
      index + 1,
      blog.title,
      user.email,
      <img
        key={blog._id}
        className="btn-circle"
        src={user.photoURL}
        alt="Profile"
        width="50"
        height="50"
      />,
    ]);

  // Define columns for the table
  const columns = [
    { name: "Serial Number", options: { filter: false } },
    { name: "Blog Title", options: { filter: false } },
    { name: "Owner", options: { filter: false } },
    { name: "Owner Profile Picture", options: { filter: false } },
  ];

  // Set up the MUIDataTable component
  const muiTableProps = {
    columns,
    data,
  };

  // Render the MUIDataTable
  return <MUIDataTable {...muiTableProps} />;
};
export default FeaturedBlog;
