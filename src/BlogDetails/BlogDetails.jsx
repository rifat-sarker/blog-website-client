import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: () => {
      const url = `http://localhost:5000/blog/${id}`;
      const res = axios.get(url);
      return res;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }
  console.log(data.data);
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
          </div>
        </div>
      </div>

      {/* comment section */}
      <div className="mt-12">
        <textarea className="rounded-lg" name="comment" id="" cols="50" rows="5"></textarea><br />
        <button className="btn btn-outline"><input type="submit" value="Comment" /></button>
      </div>
    </div>
  );
};

export default BlogDetails;
