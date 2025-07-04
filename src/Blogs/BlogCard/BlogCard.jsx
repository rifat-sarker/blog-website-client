import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const BlogCard = ({ blog }) => {
  const { _id, title, ldesc, imageURL, sdesc, category } = blog;
  const { user } = useContext(AuthContext);
  console.log(blog);

  //send data to the server side
  const handleAddToWishlist = () => {
    const wishlist = {
      title,
      imageURL,
      sdesc,
      ldesc: blog.ldesc,
      category,
      email: user.email,
    };
    console.log(wishlist);
    axios.post(`${import.meta.env.VITE_MAIN_URL}/wishlist`, wishlist).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Added to the wishlist successfully",
          icon: "success",
          confirmButtonText: "ok",
        });
      }
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 rounded-lg w-full" src={imageURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge bg-[#d1d1d1] py-3">{category}</div>
        </h2>
        <p>{sdesc}</p>
        <div className="card-actions mt-4">
          <button
            onClick={() => handleAddToWishlist(blog)}
            className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold"
          >
            Add to wishlist
          </button>
          <Link to={`/blog/${_id}`}>
            <button className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
