import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";

const OrderItem = () => {
  return (
    <Grid
      borderRadius={2}
      border={1.5}
      borderColor="darkgray"
      height="130px"
      container
      xs={12}
      item
    >
      <Grid item padding={1} sx={{ width: "120px", height: "120px" }}>
        <img
          src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/394371/01/sv01/fnd/IND/fmt/png/Smashic-Unisex-Sneakers"
          alt="error"
          width="100%"
          height="100%"
        />
      </Grid>
      <Grid item container xs>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Typography level="h4">ORDER PLACED</Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography level="body-lg">2 March 2024</Typography>
        </Grid>
      </Grid>
      <Grid item container xs>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Typography level="h4">TOTAL</Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography level="body-lg">430.00</Typography>
        </Grid>
      </Grid>
      <Grid item container xs>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Typography level="h4">ORDER ID</Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography level="body-lg">#</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
