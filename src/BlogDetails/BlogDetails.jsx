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
import { Box, Button, Rating, Typography } from "@mui/material";
import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";

import FeedbackIcon from "@mui/icons-material/Feedback";
import { FeedbackDialog } from "mui-feedback-dialog";

const BlogDetails = () => {
  const { id } = useParams();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [noScreenshot, setNoScreenshot] = useState(false);
  const [showList] = useState(false);
  const [useInitialEmail] = useState(false);
  const [useScreencapture, setUseScreencapture] = useState(false);
  const [errorOnSubmit] = useState(false);
  const [attachScreenshotOnOpen] = useState(false);

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

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  // feedback
  const onSubmit = (data) => {
    return new Promise((resolve, reject) => {
      if (errorOnSubmit) {
        setTimeout(() => reject({ message: "Some error occured!" }), 1500);
      } else {
        setTimeout(resolve, 1500);
      }
    }).then(() => console.log(data));
  };
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

            {/* share on media */}
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
            {/* rating */}
            <Box
              className="flex flex-col  items-center"
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography variant="h6" component="legend">
                Rate this Blog!
              </Typography>
              <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="large" />}
                emptyIcon={<FavoriteBorderIcon fontSize="large" />}
              />
            </Box>

            {/* feedback section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1 className="text-3xl">Share Your Thoughts!</h1>
              <h2>click the button for feedback</h2>
              <IconButton onClick={() => setDialogVisible(true)} size="medium">
                <FeedbackIcon sx={{ color: "slategray" }} fontSize="large" />
              </IconButton>
              <FeedbackDialog
                open={dialogVisible}
                initialEmail={useInitialEmail ? "some@mail.de" : undefined}
                onClose={() => setDialogVisible(false)}
                onSubmit={onSubmit}
                {...{ noScreenshot, useScreencapture, attachScreenshotOnOpen }}
              />
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={noScreenshot}
                      onChange={(e) => setNoScreenshot(e.target.checked)}
                      name="noScreenshot"
                      color="primary"
                    />
                  }
                  label={"noScreenshot"}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useScreencapture}
                      onChange={(e) => setUseScreencapture(e.target.checked)}
                      name="useScreencapture"
                      color="primary"
                    />
                  }
                  label={"useScreencapture"}
                />
              </div>
              {showList && (
                <div
                  style={{
                    height: 300,
                    overflow: "auto",
                    marginTop: 16,
                    minWidth: "50%",
                    textAlign: "center",
                  }}
                >
                  {Array(100)
                    .fill(0)
                    .map((_v, idx) => (
                      <div key={idx}>Testcontent for Scrolling {idx}</div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
