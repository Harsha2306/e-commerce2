import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Typography, Divider, Breadcrumbs } from "@mui/joy";
import { Link } from "react-router-dom";
import { useGetUserDetailsQuery } from "../api/UserApi";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";
import SessionExpiredAlert from "./SessionExpiredAlert";
import { useDispatch } from "react-redux";
import { setToken, setLogin } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const MyAccount = () => {
  useIsLoggedIn()
  const navigateTo = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { data, error, isLoading, isError, refetch } = useGetUserDetailsQuery();

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(undefined));
    dispatch(setLogin(false));
    dispatch(setCartCount(0));
    dispatch(setWishlistCount(0));
    navigateTo("/");
  };

  console.log(data);

  useEffect(() => {
    if (isError && error.status === 401) navigateTo("/login");
    else if (isError && error.data.message === "jwt expired") {
      setShow(true);
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    }
  }, [error, navigateTo, isError]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  return (
    <>
      {isLoading && (
        <Grid paddingY={10} display="flex" justifyContent="center">
          <CircularProgress color="neutral" size="lg" />
        </Grid>
      )}
      {!isLoading && (
        <Grid mt={5}>
          <SessionExpiredAlert show={show} />
        </Grid>
      )}
      {!isLoading && !isError && data && data.user && (
        <Grid container mt={13} paddingX={6}>
          <Breadcrumbs sx={{ paddingX: "0px" }}>
            <Link style={{ color: "blue" }} to="/">
              <Typography variant="body1" sx={{ color: "blue" }}>
                Home
              </Typography>
            </Link>
            <Typography variant="body1">My account</Typography>
          </Breadcrumbs>
          <Grid item xs={12}>
            <Typography level="h1" mb={3} sx={{ fontSize: "50px" }}>
              My account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography mb={1} level="h3">
              Profile
            </Typography>
            <Divider />
            <Typography mt={3} level="body-lg">
              Name:
              <Typography level="body-lg">
                {" " + data.user.firstName + " " + data.user.lastName}
              </Typography>
            </Typography>
            <Typography mt={2} mb={2} level="body-lg">
              Email:
              <Typography level="body-lg">{" " + data.user.email}</Typography>
            </Typography>
            <Link
              to="/account/edit-password"
              style={{
                textDecorationColor: "black",
                textDecorationThickness: "2px",
                display: "inline-block",
              }}
            >
              <Typography level="title-md">CHANGE PASSWORD</Typography>
            </Link>
            <br />
            <Link
              onClick={onLogout}
              style={{
                textDecorationColor: "black",
                textDecorationThickness: "2px",
                display: "inline-block",
              }}
            >
              <Typography width={"max-content"} mt={2} level="title-md">
                LOGOUT
              </Typography>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MyAccount;
