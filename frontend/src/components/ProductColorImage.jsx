import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { ColorContext } from "./ProductDetails";

const ProductColorImage = ({ src, colorValue }) => {
  const { selectedColor, setSelectedColor } = useContext(ColorContext);
  const updateColorValueAndImages = () => {
    setSelectedColor(colorValue);
  };
  return (
    <Grid
      mb={1}
      item
      border={1}
      borderColor={selectedColor === colorValue ? "black" : "lightgray"}
      width="60.22px"
      height="60.22px"
      marginRight={1}
      onClick={updateColorValueAndImages}
      sx={{ "&:hover": { cursor: "pointer" } }}
    >
      <img src={src} alt="error" width="100%" height="100%" />
    </Grid>
  );
};

export default ProductColorImage;
