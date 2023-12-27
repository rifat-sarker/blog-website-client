import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Wishlist = () => {
  const { data,  isLoading } = useQuery({
    queryKey: ["wishlist"],
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
  console.log(data.data);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-12">
      {data.data.map((wishlist) => {
        const {title,sdesc,imageURL,category} =wishlist
        // console.log(Object.keys(wishlist).join(','));
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
                <div className=" btn btn-outline btn-info">Details</div>
                <div className="btn btn-error btn-outline">Remove Wishlist</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
