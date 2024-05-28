import { Grid } from "@mui/material";
import { Typography, Divider } from "@mui/joy";
import WishlistItem from "../components/WishListItem";
import { useGetWishlistQuery } from "../api/UserApi";
import CircularProgress from "@mui/joy/CircularProgress";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SessionExpiredAlert from "../components/SessionExpiredAlert";

const WishlistPage = () => {
  let { data, isLoading, error, isError, refetch } = useGetWishlistQuery();
  const [wishlist, setWishlist] = useState([]);
  const [empty, setEmpty] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isError && !isLoading && data) {
      console.log(data.wishlist);
      setWishlist(data.wishlist);
      setEmpty(data.wishlist.length === 0);
    }
    if (isError) {
      if (error.data.message === "Not Authorized") {
        navigateTo("/login");
      } else if (error.data.message === "No wishlist found") setEmpty(true);
      else if (error.data.message === "jwt expired") {
        setShow(true);
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
    }
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

  return (
    <>
      {!isLoading && isError && (
        <Grid mt={5}>
          <SessionExpiredAlert show={show} />
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
