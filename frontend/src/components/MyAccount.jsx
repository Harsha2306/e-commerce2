import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Typography, Divider, Breadcrumbs } from "@mui/joy";
import { Link } from "react-router-dom";
import { useGetUserDetailsQuery } from "../api/UserApi";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import SessionExpiredAlert from "./SessionExpiredAlert";

const MyAccount = () => {
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const { data, error, isLoading, isError } = useGetUserDetailsQuery();
  console.log(data, error, isLoading, isError, show);

  useEffect(() => {
    if (error && error.status === 401) navigateTo("/login");
    else if (error && error.data.message === "jwt expired") {
      setShow(true);
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    }
  }, [error]);

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
      {!isLoading && !isError && (
        <Grid container mt={5} paddingX={6}>
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
              }}
            >
              <Typography level="title-md">CHANGE PASSWORD</Typography>
            </Link>
            <Link
              style={{
                textDecorationColor: "black",
                textDecorationThickness: "2px",
              }}
            >
              <Typography mt={2} level="title-md">
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
