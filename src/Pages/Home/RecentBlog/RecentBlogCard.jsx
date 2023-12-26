import { Link } from "react-router-dom";

const RecentBlogCard = ({ blog }) => {
  const { _id, title, imageURL, sdesc, category, date } = blog;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 rounded-lg w-full" src={imageURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{category}</div>
        </h2>
        <p>{sdesc}</p>
        <div className="card-actions mt-4">
          <button className="btn">Add to wishlist</button>
          <Link to={`/blog/${_id}`}>
            <button className="btn">Details</button>
          </Link>
        </div>
        <button className="btn my-4  text-center btn-outline btn-info">
          Publish date: {date}
        </button>

      </div>
    </div>
  );
};

export default RecentBlogCard;
