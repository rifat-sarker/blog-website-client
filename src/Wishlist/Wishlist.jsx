import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import WishlistCard from "./WishlistCard";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl gap-14 justify-items-center">
      {
        data.data.map(wishlist => <WishlistCard
        key={wishlist._id}
        wishlist = {wishlist}
        ></WishlistCard>)
      }
      
    </div>
  );
};

export default Wishlist;
