import { Grid } from "@mui/material";
import { Typography, Divider } from "@mui/joy";
import WishlistItem from "../components/WishListItem";
import { useGetWishlistQuery } from "../api/UserApi";
import CircularProgress from "@mui/joy/CircularProgress";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  let { data, isLoading, error, isError, refetch } = useGetWishlistQuery();
  const navigateTo = useNavigate();

  console.log(isError, error);

  useEffect(() => {
    if (
      isError &&
      (error.data.message === "Not Authorized" ||
        error.data.message === "jwt expired")
    ) {
      navigateTo("/login");
    }
    if (data && data.ok) {
      refetch();
    }
  }),
    [isError, error, navigateTo, data];

  return (
    <>
      {isLoading && (
        <Grid paddingY={10} display="flex" justifyContent="center">
          <CircularProgress color="neutral" size="lg" />
        </Grid>
      )}
      {!isLoading && (
        <Grid
          item
          mt={15}
          padding={3}
          borderRadius={3}
          sx={{ border: "1px solid lightgrey", marginX: "5rem" }}
        >
          <Typography level="h2" sx={{ fontWeight: "350" }}>
            MY WISHLIST
          </Typography>
          <Divider sx={{ marginY: "1rem" }} />
          {isError &&
            !error.data.ok &&
            error.data.message === "No wishlist found" && (
              <Typography
                level="title-lg"
                sx={{ fontSize: "30px", textAlign: "center" }}
              >
                Your Wishlist is Empty
              </Typography>
            )}
          {!isError && data && data.wishlist.length !== 0 && (
            <Grid rowSpacing={2} container>
              {data.wishlist.map((product) => (
                <WishlistItem
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  size={product.size}
                  color={product.color}
                  img={product.img}
                />
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default WishlistPage;
