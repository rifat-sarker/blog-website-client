const BlogCard = ({ blog }) => {
  const { title, imageURL, sdesc, category } = blog;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 rounded-lg w-full"
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
        <div className="card-actions justify-end">
          <button className="btn">Add to wishlist</button>
          <button className="btn">Details</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
