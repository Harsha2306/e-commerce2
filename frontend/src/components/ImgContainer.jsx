/* eslint-disable react/prop-types */
import { Grid, Skeleton } from "@mui/material";

const ImgContainer = ({ left, right, isLoading }) => {
  return (
    <Grid
      item
      display="flex"
      padding={1}
      justifyContent="center"
      container
    >
      <Grid item sx={{ height: "330px", width: "360px" }} mr={3}>
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
      <Grid item sx={{ height: "330px", width: "360px" }} ml={2}>
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
