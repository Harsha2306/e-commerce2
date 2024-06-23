import { Grid } from "@mui/material";
import { Typography, Divider, CircularProgress } from "@mui/joy";
import WishlistItem from "../components/WishListItem";
import { useGetWishlistQuery, useGetUserPropertiesQuery } from "../api/UserApi";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SessionExpiredAlert from "../components/SessionExpiredAlert";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const WishlistPage = () => {
  useIsLoggedIn()
  let { data, isLoading, error, isError, refetch } = useGetWishlistQuery();
  const [wishlist, setWishlist] = useState([]);
  const [empty, setEmpty] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  console.log(data);

  useEffect(() => {
    if (!isError && !isLoading && data) {
      console.log(data.wishlist);
      setWishlist(data.wishlist);
      setEmpty(data.wishlist.length === 0);
    }
    if (isError) {
      if (error.data.message === "Not Authorized") {
        navigateTo("/login");
      } else if (error.data.message === "jwt expired") {
        setShow(true);
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
    }
    setEmpty(data?.wishlist?.length === 0);
  }, [isError, isLoading, error, navigateTo, data]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (isLoading)
    return (
      <Grid paddingY={10} display="flex" justifyContent="center">
        <CircularProgress color="neutral" size="lg" />
      </Grid>
    );

  if (isError && error?.data?.message === "jwt expired")
    return (
      <Grid mt={5}>
        <SessionExpiredAlert show={show} />
      </Grid>
    );

  return (
    <>
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
          {empty && (
            <Typography
              level="title-lg"
              sx={{ fontSize: "30px", textAlign: "center" }}
            >
              Your Wishlist is Empty
            </Typography>
          )}
          {!empty && (
            <Grid rowSpacing={2} container>
              {wishlist.map((product) => (
                <WishlistItem
                  _id={product._id}
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  size={product.size}
                  color={product.color}
                  img={product.img}
                  productId={product.productId}
                  refetch={refetch}
                  length={wishlist.length}
                  available={product.available}
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
