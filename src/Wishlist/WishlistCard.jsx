import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const WishlistCard = ({wishlist, mutate}) => {
  // const [removeWishlist, setRemoveWishList] = useState([])
    const { _id, title, sdesc, imageURL, category } = wishlist;
    // console.log(wishlist);

    // const handleDelete = (_id) => {
    //     console.log(_id)
    //     Swal.fire({
    //       title: "Are you sure?",
    //       text: "You won't be able to revert this!",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: "Yes, delete it!",
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         console.log("deleted");
    //         fetch(`https://blog-website-server-blond.vercel.app/wishlist/${_id}`, {
    //           method: "DELETE",
    //         })
    //           .then((res) => res.json())
    //           .then((data) => {
    //             console.log(data);
    //             if (data.deletedCount > 0) {
    //               // const remaining = bookings.filter(booking => booking._id !== id);
    //               // const remaining = removeWishlist.filter(wishlist => wishlist._id !== _id)
    //               // setRemoveWishList(remaining)

    //               Swal.fire({
    //                 title: "Deleted!",
    //                 text: "Your file has been deleted.",
    //                 icon: "success",
    //               });
    //             }
    //           });
    //       }
    //     });
    //   };

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
        <div className="badge bg-[#d1d1d1] py-3">{category}</div>
      </h2>
      <p>{sdesc}</p>
      <div className="card-actions mt-4">
        <button onClick={()=>mutate(_id)} className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold">Remove</button>
        <Link to={`/wishlist/${_id}`}><button className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold">Details</button></Link>
      </div>
    </div>
  </div>
  );
};

export default WishlistCard;
