import { Grid, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <>
      <Grid width={272} container>
        <Grid item>
          <Skeleton
            xs={12}
            animation="wave"
            variant="rectangular"
            width={272}
            height={262}
          />
        </Grid>
        <Grid
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={272}
          height={70}
          container
          item
        >
          <Grid item xs={7}>
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
          </Grid>
          <Grid item xs={4}>
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductSkeleton;
