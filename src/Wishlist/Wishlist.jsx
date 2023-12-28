import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Wishlist = () => {
    // const [wishlist, setWishlist] = useState([]);
    // const {user} = useContext(AuthContext)
  
    // const url = `http://localhost:5000/wishlist?email=${user?.email}`
    // useEffect(()=>{
    //     axios.get(url,)
    //     .then(res=>{
    //         setWishlist(res.data)
    //     })
    // },[url])

  const { data, isLoading } = useQuery({
    queryKey: ["userwishlist"],
    queryFn: () => {
      const url = `http://localhost:5000/wishlist`;
      const res = axios.get(url);
      return res;
    },
  });
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 h-screen">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }
console.log(data);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-12">
      {data.data.map((wishlist) => {
        const { _id, title, sdesc, imageURL, category } = wishlist;
        // console.log(Object.keys(wishlist).join(','));

        const handleDelete = (id) => {
          console.log(id)
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
              fetch(`http://localhost:5000/wishlist/${id}`, {
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
          <div key={wishlist._id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                className="h-64 rounded-lg w-full"
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
              <div className="card-actions my-4 gap-4 justify-start">
                <Link to={`/blog/${_id}`} className=" btn btn-outline btn-info">Details</Link>
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-error btn-outline"
                >
                  Remove Wishlist
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
