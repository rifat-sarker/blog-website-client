import axios from "axios";
import { Link } from "react-router-dom";


const BlogCard = ({ blog }) => {
  const {_id, title, imageURL, sdesc, category } = blog;


//send data to the server side
  const handleAddToWishlist =(blog)=>{
    console.log(blog);
  
    axios.post('http://localhost:5000/wishlist', blog)
    .then(data =>{
      console.log(data.data);
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
