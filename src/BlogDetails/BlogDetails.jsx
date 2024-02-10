import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Button } from "@mui/material";

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
          w
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-3xl">{data.data.title}</h2>
          <div className="space-y-5">
            <p>{data.data.sdesc}</p>
            <p>{data.data.ldesc}</p>

            <div className="flex gap-5">
              <Button variant="contained">
                {" "}
                <FacebookShareButton
                  url={window.location.href}
                  quote={data.data.title}
                >
                  <FacebookIcon className="mr-2"></FacebookIcon>
                  Share on Facebook
                </FacebookShareButton>
              </Button>

              <Button variant="contained" color="secondary">
                {" "}
                <TwitterShareButton
                  url={window.location.href}
                  title={data.data.title}
                >
                  {" "}
                  <TwitterIcon className="mr-2"></TwitterIcon>
                  Share on Twitter
                </TwitterShareButton>
              </Button>
              <Button variant="contained" color="success">
                <LinkedinShareButton
                  url={window.location.href}
                  title={data.data.title}
                >
                  <LinkedInIcon className="mr-2"></LinkedInIcon>
                  Share on LinkedIn
                </LinkedinShareButton>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
