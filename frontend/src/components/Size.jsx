/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { SizeContext } from "./ProductDetails";

const Size = ({ productSize }) => {
  const { selectedSize = undefined, setSelectedSize = undefined } = useContext(SizeContext);
  const onSizeClick = () => setSelectedSize(productSize);

  return (
    <>
      <Grid
        mb={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        border={1}
        borderColor="lightgray"
        height="60.22px"
        width="60.22px"
        marginRight={1}
        item
        sx={{
          backgroundColor: selectedSize === productSize ? "black" : "white",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={onSizeClick}
      >
        <Typography
          sx={{
            fontSize: "15px",
            color: selectedSize === productSize ? "white" : "black",
          }}
        >
          {productSize}
        </Typography>
      </Grid>
    </>
  );
};

export default Size;
