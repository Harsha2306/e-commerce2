import { useGetCheckoutSuccessQuery } from "../api/UserApi";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { useDispatch } from "react-redux";
import { setCartCount } from "../redux-store/userSlice";
import { Typography } from "@mui/joy";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SessionExpiredAlert from "../components/SessionExpiredAlert";
import { setLogin, setToken } from "../redux-store/TokenSlice";
import {  setWishlistCount } from "../redux-store/userSlice";

const PaymentSuccess = () => {
  useIsLoggedIn();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { data, isLoading, isError, error } = useGetCheckoutSuccessQuery();
  if (isError) {
    if (error.data.message === "Not Authorized") {
      navigateTo("/login");
    }
    if (error.data.message === "jwt expired") {
      setShow(true);
      localStorage.removeItem("token");
      dispatch(setLogin(false));
      dispatch(setToken(null));
      dispatch(setCartCount(0));
      dispatch(setWishlistCount(0));
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    }
  }
  if (!isError && !isLoading) {
    dispatch(setCartCount(data?.cartLength));
    setTimeout(() => {
      navigateTo("/order-history");
    }, 2000);
  }

  if (isError && error?.data?.message === "jwt expired")
    return (
      <Grid mt={5}>
        <SessionExpiredAlert show={show} />
      </Grid>
    );

  return (
    <Grid mt={15} container>
      <Grid item display="flex" xs={12} justifyContent="center">
        <Typography level="h1" color="success">
          Payment Success
        </Typography>
      </Grid>
      <Grid item mt={1} display="flex" justifyContent="center" xs={12}>
        <Typography level="body-sm">Redirecting to your Orders...</Typography>
      </Grid>
    </Grid>
  );
};

export default PaymentSuccess;
