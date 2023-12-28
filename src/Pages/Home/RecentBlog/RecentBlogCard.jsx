import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RecentBlogCard = ({ blog }) => {
  const { _id, title, imageURL, sdesc, category, date } = blog;

  //send data to the server side
  const handleAddToWishlist =(blog)=>{
    // console.log(blog);
  
    axios.post('http://localhost:5000/wishlist', blog)
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
