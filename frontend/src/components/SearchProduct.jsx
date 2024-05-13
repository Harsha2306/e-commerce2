import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";

const SearchProduct = () => {
  return (
    <Grid
      border={1}
      borderRadius={1}
      sx={{
        width: "380px",
        "&:hover": { cursor: "pointer", borderColor: "black" },
      }}
      borderColor="lightgrey"
      container
      padding={0.3}
      item
      marginX={1}
      marginBottom={3}
    >
      <Grid item xs>
        <img
          src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/106934/05/sv01/fnd/IND/fmt/png/Pressing-III-Unisex-Indoor-Court-Shoes"
          style={{ width: "100px", height: "100px" }}
          alt="error"
        />
      </Grid>
      <Grid item xs={8.5} alignItems="center">
        <Typography level="h4" sx={{ fontSize: "18px" }}>
          Pressing III Unisex Indoor Court Shoes
        </Typography>
        <Typography level="h4" sx={{ fontSize: "18px" }}>
          ₹3,799
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SearchProduct;

