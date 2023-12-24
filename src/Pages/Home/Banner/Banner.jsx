const Banner = () => {
  return (
    <div className="rounded-lg w-full">
      <div className="relative w-full ">
        <img src="https://i.ibb.co/KygNdPw/business-g65a8e6d87-1920.jpg" className="w-full" />
        <div className="absolute flex items-center h-full top-0 left-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
          <div className="text-white pl-12 space-y-7 w-1/2 ">
            <h2 className="lg:text-6xl font-bold ">
            Blog with the best
            </h2>
            <p>
            More bloggers and independent creators choose WordPress than any other blogging tool. Tap into intuitive, flexible tools that put writers, bloggers, and creators first.
            </p>
            <div>
              <button className="btn btn-primary my-4">Start a blog</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
