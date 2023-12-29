import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WishlistCard from "./WishlistCard";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Wishlist = () => {
    // const [wishlist, setWishlist] = useState([]);
    // const {user} = useContext(AuthContext)

  
    // // console.log(user.email);
  
    // // const url = `http://localhost:5000/wishlist?email={user?.email}`
    // // useEffect(()=>{
    // //     axios.get(url, {withCredentials : true})
    // //     .then(res=>{
    // //         setWishlist(res.data)
    // //     })
    // // },[url])


const {user} = useContext(AuthContext)
  const { data, isLoading } = useQuery({
    queryKey: ["userwishlist"],
    queryFn: () => {
      const url = `http://localhost:5000/wishlist?email=${user?.email}`;
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
