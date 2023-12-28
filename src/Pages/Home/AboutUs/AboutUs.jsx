const AboutUs = () => {
  return (
    <div className=" rounded-lg justify-center items-center bg-base-100 lg:flex-row-reverse w-full shadow-xl my-24">
      <div className="md:flex items-center justify-center gap-16 p-12 ">
        <div className="lg:w-1/2 flex items-center justify-center">
          <img
            className="w-auto rounded-lg"
            src="https://i.ibb.co/6vcJdhk/blog-492184.jpg"
            alt="Shoes"
          />
        </div>
        <div className="lg:w-3/4 space-y-6">
          <small className="font-semibold">ABOUT US</small>
          <h2 className="text-5xl font-bold">
            We inform, help and support the creative community
          </h2>
          <p className="font-semibold">
            The Creative80 Room is the U.K. based Creative Blog website,
            launched in 2016,
          </p>
          <br />
          <p className="font-semibold">
            Welcome to our creative haven, where imagination takes flight and
            inspiration finds its home. At [Your Blog Name], we believe in the
            transformative power of creativity and its ability to elevate the
            human spirit. This is more than a blog; it's a celebration of the
            artistic journey, a sanctuary for those who dare to dream and
            create. Our digital canvas is adorned with stories that inspire,
            insights that ignite passion, and a tapestry of creative works that
            resonate with the heartbeat of innovation.Our content is curated
            with care, each post crafted to spark your imagination, fuel your
            ambitions, and connect you with a community that shares your
            creative spirit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
