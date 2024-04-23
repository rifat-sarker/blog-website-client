import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useParams } from "react-router-dom";
import ShareAndFeedback from "../ReUsable/Share&Feedback";

const WishlistDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["id"],
    queryFn: () => {
      const url = `https://blog-website-server-blond.vercel.app/wishlist/${id}`;
      const res = axios.get(url);
      return res;
    },
  });

  // console.log(data);

  
  //skeletion
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }
  //

  return (
    <div>
      <div className="card bg-base-100 shadow-xl w-full">
        <figure className="px-10 pt-10 ">
          <img
            src={data.data.imageURL}
            alt="Shoes"
            className="rounded-xl w-full"
          />
          w
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-3xl">{data.data.title}</h2>
          <div className="space-y-5">
            <p>{data.data.sdesc}</p>
            <p>{data.data.ldesc}</p>
            <ShareAndFeedback/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDetails;
