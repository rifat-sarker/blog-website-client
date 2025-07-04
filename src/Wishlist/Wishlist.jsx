import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import WishlistCard from "./WishlistCard";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["userwishlist"],
    queryFn: () => {
      const url = `${import.meta.env.VITE_MAIN_URL}/wishlist?email=${
        user?.email
      }`;
      const res = axios.get(url);
      return res;
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_MAIN_URL}/wishlist/${id}`
      );
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      queryClient.invalidateQueries({ mutationKey: "delete" });
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
  // console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl my-20 mx-auto gap-20 justify-items-center">
      {data?.data.map((wishlist) => (
        <WishlistCard
          key={wishlist._id}
          wishlist={wishlist}
          mutate={mutate}
        ></WishlistCard>
      ))}
    </div>
  );
};

export default Wishlist;
