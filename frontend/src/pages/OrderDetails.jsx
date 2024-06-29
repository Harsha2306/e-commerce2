import { useGetOrderDetailsQuery } from "../api/UserApi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { Grid } from "@mui/material";
import { Breadcrumbs, Typography, Divider } from "@mui/joy";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";
import useFormattedPrice from "../hooks/useFormattedPrice";
import SessionExpiredAlert from "../components/SessionExpiredAlert";
import { useState, useEffect } from "react";
import OrderDetailsItem from "../components/OrderDetailsItem";
import { setLogin, setToken } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

const OrderDetails = () => {
  useIsLoggedIn();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const { orderId } = useParams();
  const { data, isLoading, isError, error, refetch } = useGetOrderDetailsQuery({
    orderId,
  });
  const formattedTotal = useFormattedPrice(data?.total);

  useEffect(() => {
    if (isError) {
      if (error?.data?.message === "jwt expired") {
        setShow(true);
        localStorage.removeItem("token");
        dispatch(setLogin(false));
        dispatch(setToken(null));
        dispatch(setCartCount(0));
        dispatch(setWishlistCount(0));
        navigateTo("/login");
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
      if (error?.data?.message === "Not Authorized") {
        navigateTo("/login");
      }
    }
  }, [isError, error, navigateTo, dispatch]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (isLoading) {
    return (
      <Grid paddingY={10} display="flex" justifyContent="center">
        <CircularProgress color="neutral" size="lg" />
      </Grid>
    );
  }

  if (isError && error?.data?.message === "jwt expired")
    return (
      <Grid mt={5}>
        <SessionExpiredAlert show={show} />
      </Grid>
    );

  return (
    <>
      {data && (
        <Grid mt={13} paddingX={6} container>
          <Breadcrumbs sx={{ paddingX: "0px" }}>
            <Link style={{ color: "blue" }} to="/">
              <Typography variant="body1" sx={{ color: "blue" }}>
                Home
              </Typography>
            </Link>
            <Link style={{ color: "blue" }} to="/order-history">
              <Typography variant="body1" sx={{ color: "blue" }}>
                Orders
              </Typography>
            </Link>
            <Typography variant="body1">Order ID: {orderId}</Typography>
          </Breadcrumbs>
          <Grid
            item
            xs={12}
            border={1}
            borderRadius={3}
            sx={{ border: "1px solid lightgrey" }}
            container
            p={3}
            mx={25}
            mt={5}
          >
            <Grid container item xs={12}>
              <Grid item xs={6}>
                <Typography level="body-lg">
                  Ordered At:
                  <Typography level="title-lg"> {data?.createdAt}</Typography>
                </Typography>
              </Grid>
              <Grid display="flex" justifyContent="flex-end" item xs={6}>
                <Typography level="body-lg">
                  Status:
                  <Typography level="title-lg" color="success">
                    Delivered
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Grid item my={1} xs={12}>
              <Divider />
            </Grid>
            {data?.productsWithPrices.map((item, idx) => (
              <OrderDetailsItem
                key={idx}
                name={item.name}
                size={item.size}
                color={item.color}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
            <Grid item container ml={60} xs={12}>
              <Grid item paddingY={1} xs={12}>
                <Typography level="title-lg">Order Summary</Typography>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Typography level="body-md">Subtotal</Typography>
                </Grid>
                <Grid item display="flex" justifyContent="flex-end" xs={6}>
                  <Typography level="title-md">{formattedTotal}</Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Typography level="body-md">Delivery</Typography>
                </Grid>
                <Grid item display="flex" justifyContent="flex-end" xs={6}>
                  <Typography level="title-md">0</Typography>
                </Grid>
              </Grid>
              <Grid my={1} item xs={12}>
                <Divider />
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Typography level="body-md">Total</Typography>
                </Grid>
                <Grid item display="flex" justifyContent="flex-end" xs={6}>
                  <Typography level="title-md">{formattedTotal}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={5}></Grid>
        </Grid>
      )}
    </>
  );
};

export default OrderDetails;
