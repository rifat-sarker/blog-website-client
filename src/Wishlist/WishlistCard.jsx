import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const WishlistCard = ({wishlist}) => {
    const { _id, title, sdesc, imageURL, category } = wishlist;
    console.log(wishlist);

    const handleDelete = (_id) => {
        console.log(_id)
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("deleted");
            fetch(`http://localhost:5000/wishlist/${_id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              });
          }
        });
      };
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
        <button onClick={()=>handleDelete(_id)} className="btn">Remove</button>
        <Link to={`/blog/${_id}`}><button className="btn">Details</button></Link>
      </div>
    </div>
  </div>
  );
};

export default WishlistCard;
