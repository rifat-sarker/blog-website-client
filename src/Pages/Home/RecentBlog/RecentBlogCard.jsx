import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const RecentBlogCard = ({ blog }) => {
  const { _id, title, ldesc, imageURL, sdesc, category,date } = blog;
  const { user } = useContext(AuthContext);

  //send data to the server side
  const handleAddToWishlist = () => {
    // console.log(blog);
    const wishlist = {
      title,
      imageURL,
      sdesc,
      ldesc,
      category,
      date,
      email: user.email,
    };
    axios
      .post(`${import.meta.env.VITE_MAIN_URL}/wishlist`, wishlist)
      .then((data) => {
        console.log(data.data);
        if (data.data._id) {
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
            className="rounded-md hover:bg-[#8dcc78] bg-[#d1d1d1] font-semibold px-6 py-2"
          >
            Add to wishlist
          </button>
          <Link to={`/blog/${_id}`}>
            <button className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold">
              Details
            </button>
          </Link>
        </div>
        <a className="  p-2 mt-2">Publish date: {date}</a>
      </div>
    </div>
  );
};

export default RecentBlogCard;
