import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";

const Footer = () => {
  return (
    <Grid
      mt={5}
      container
      sx={{
        height: "100px",
        backgroundColor: "black",
        width: "100%",
        position: "relative",
      }}
    >
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Typography sx={{ color: "white" }} level="title-lg">
          Get in touch
        </Typography>
      </Grid>
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Typography sx={{ color: "white" }} level="title-lg">
          ©2024 Website name
        </Typography>
      </Grid>
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Typography sx={{ color: "white" }} level="title-lg">
          Made with ❤ by HARSHA
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
