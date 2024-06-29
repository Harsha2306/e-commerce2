import { Grid } from "@mui/material";
import { Typography, Divider, CircularProgress } from "@mui/joy";
import WishlistItem from "../components/WishListItem";
import { useGetWishlistQuery } from "../api/UserApi";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SessionExpiredAlert from "../components/SessionExpiredAlert";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { setLogin, setToken } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

const WishlistPage = () => {
  const dispatch = useDispatch();
  useIsLoggedIn();
  let { data, isLoading, error, isError, refetch } = useGetWishlistQuery();
  const [wishlist, setWishlist] = useState([]);
  const [empty, setEmpty] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isError && !isLoading && data) {
      setWishlist(data.wishlist);
      setEmpty(data.wishlist.length === 0);
    }
    if (isError) {
      if (error.data.message === "Not Authorized") {
        navigateTo("/login");
      } else if (error.data.message === "jwt expired") {
        setShow(true);
        localStorage.removeItem("token");
        dispatch(setLogin(false));
        dispatch(setToken(null));
        dispatch(setCartCount(0));
        dispatch(setWishlistCount(0));
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      } else if (error.data.message === "No wishlist found") {
        setEmpty(true);
      }
    }
  }, [isError, isLoading, error, navigateTo, data, dispatch]);

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
              YOUR WISHLIST IS EMPTY
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
