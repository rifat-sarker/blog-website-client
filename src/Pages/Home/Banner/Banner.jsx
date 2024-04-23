import bannerImg from "../../../assets/blog-banner.jpg"
const Banner = () => {
  return (
    <div className="hero min-h-screen "  style={{backgroundImage: `url(${bannerImg})`}}>
      <div className="hero-overlay bg-opacity-60 "></div>
      <div>
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl text-slate-100 font-bold">Blog with the best</h1>
          <p className="font-semibold text-slate-200 mb-5 ">
            More bloggers and independent creators choose WordPress than any other blogging tool. Tap into intuitive, flexible tools that put writers, bloggers, and creators first.
           </p>
          <button className="rounded-md bg-[#d1d1d1] hover:bg-[#8dcc78] px-6 py-2 font-semibold">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

