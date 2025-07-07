import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import ShareAndFeedback from "../ReUsable/Share&Feedback";

const BlogDetails = () => {
  const { id } = useParams();
  // console.log(id);

  const { data, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: () => {
      const url = `${import.meta.env.VITE_MAIN_URL}/blogs/${id}`;
      const res = axios.get(url);
      return res;
    },
  });

  // console.log(window.location.href);
  //

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
  //   <span className="loading loading-spinner text-primary"></span>;

  return (
    <div>
      <div className="card bg-base-100 shadow-xl w-full">
        <figure className="px-10 pt-10 ">
          <img
            src={data.data.imageURL}
            alt="Shoes"
            className="rounded-xl w-full"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-3xl">{data.data.title}</h2>
          <div className="space-y-5">
            <p>{data.data.sdesc}</p>
            <p>{data.data.ldesc}</p>

            {/* share on media and feedback sections */}
            <ShareAndFeedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
