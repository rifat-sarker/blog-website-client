import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";


const BlogCard = ({ blog }) => {
  const {_id, title, ldesc,  imageURL, sdesc, category } = blog;
  const {user} = useContext(AuthContext)
  // console.log(blog.ldesc);

//send data to the server side
  const handleAddToWishlist =()=>{
  
  const wishlist = {
    title,
    imageURL,
    sdesc,
    ldesc:blog.ldesc,
    category,
    email:user.email
  }
  console.log(wishlist);
    axios.post('http://localhost:5000/wishlist', wishlist)
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
        <img className="h-64 rounded-lg w-full"
          src={imageURL}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{category}</div>
        </h2>
        <p>{sdesc}</p>
        <div className="card-actions justify-end">
          <button onClick={()=>handleAddToWishlist(blog)} className="btn">Add to wishlist</button>
          <Link to={`/blog/${_id}`}><button className="btn">Details</button></Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
