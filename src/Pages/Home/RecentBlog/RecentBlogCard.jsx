import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const RecentBlogCard = ({ blog }) => {
  const { _id, title, imageURL, sdesc, category, date } = blog;
  const {user} = useContext(AuthContext)

  //send data to the server side
  const handleAddToWishlist =(blog)=>{
    // console.log(blog);
    const wishlist = {
      title,
      imageURL,
      sdesc,
      category,
      email:user.email
    }
  
    axios.post('https://blog-website-server-blond.vercel.app/wishlist', wishlist)
    .then(data =>{
      console.log(data.data);
      if(data.data.insertedId){
        Swal.fire({
          title: 'Success!',
          text: 'Added to the wishlist successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        })
      }
    })
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 rounded-lg w-full" src={imageURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{category}</div>
        </h2>
        <p>{sdesc}</p>
        <div className="card-actions mt-4">
          <button onClick={()=>handleAddToWishlist(blog)} className="btn">Add to wishlist</button>
          <Link to={`/blog/${_id}`}>
            <button className="btn">Details</button>
          </Link>
        </div>
        <button className="btn my-4  text-center btn-outline btn-info">
          Publish date: {date}
        </button>

      </div>
    </div>
  );
};

export default RecentBlogCard;
