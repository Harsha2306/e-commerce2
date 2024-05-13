import React from "react";
import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const ImgContainer = ({ left, right, isLoading }) => {
  return (
    <Grid
      item
      display="flex"
      padding={1}
      justifyContent="space-around"
      container
    >
      <Grid item sx={{ height: "330px", width: "360px" }}>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <img
            src={left}
            alt="error"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Grid>
      <Grid item sx={{ height: "330px", width: "360px" }}>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <img
            src={right}
            alt="error"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ImgContainer;
