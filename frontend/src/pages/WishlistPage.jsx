import React from "react";
import { Grid } from "@mui/material";
import { Typography, Divider } from "@mui/joy";
import WishlistItem from "../components/WishListItem";

const WishlistPage = ({ wishlist = [1] }) => {
  return (
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
      {wishlist.length === 0 && (
        <Typography
          level="title-lg"
          sx={{ fontSize: "30px", textAlign: "center" }}
        >
          Your Wishlist is Empty
        </Typography>
      )}
      {wishlist.length !== 0 && (
        <Grid rowSpacing={2} container>
          <WishlistItem />
          <WishlistItem />
          <WishlistItem />
        </Grid>
      )}
    </Grid>
  );
};

export default WishlistPage;
