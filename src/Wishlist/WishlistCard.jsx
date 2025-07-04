
import { Link } from "react-router-dom";

const WishlistCard = ({ wishlist, mutate }) => {
  // const [removeWishlist, setRemoveWishList] = useState([])
  const { _id, title, sdesc, imageURL, category } = wishlist;
 
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 rounded-lg w-full" src={imageURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge bg-[#d1d1d1] py-3">{category}</div>
        </h2>
        <p>{sdesc}</p>
        <div className="card-actions mt-4">
          <button
            onClick={() => mutate(_id)}
            className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold"
          >
            Remove
          </button>
          <Link to={`/wishlist/${_id}`}>
            <button className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
