/* eslint-disable react/prop-types */
import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const grid1 = {
  width: "272px",
  height: "362px",
  "&:hover": { cursor: "pointer" },
};
const grid11 = { width: "100%", height: "262px" };
const grid12 = { width: "100%", height: "70px" };
const imgStyles = { width: "100%", height: "100%" };

const Product = ({
  itemName,
  itemAvailableImages,
  itemDiscount,
  itemPrice,
  itemTag,
  _id,
}) => {
  const navigateTo = useNavigate();
  const hasDiscount = itemDiscount === 0 ? false : true;

  let discountedPrice;
  if (itemDiscount) {
    discountedPrice = Math.round(
      itemPrice - itemPrice * (itemDiscount / 100)
    ).toLocaleString();
  }

  let itemTagColor = undefined;
  if (itemTag === "Limited Edition") {
    itemTagColor = "red";
  } else if (itemTag === "Exclusive") {
    itemTagColor = "rgb(103 109 117)";
  } else if (itemTag === "Recycled") {
    itemTagColor = "rgb(77 125 4)";
  }

  return (
    <>
      <Grid
        onClick={() => {
          navigateTo(`/products/${_id}`);
        }}
        container
        sx={grid1}
        direction="column"
      >
        <Grid item sx={grid11}>
          <img style={imgStyles} alt="error" src={itemAvailableImages[0]} />
        </Grid>
        <Grid container item sx={grid12}>
          <Grid xs={8.5} display="flex" alignItems="center" item>
            <Typography
              level="title-md"
            >
              {itemName}
            </Typography>
          </Grid>
          <Grid xs container direction="column" item>
            {hasDiscount && (
              <Grid
                item
                xs
                display="flex"
                justifyContent="center"
                alignItems={hasDiscount ? "flex-end" : "flex-start"}
                marginTop={!hasDiscount && "5px"}
              >
                <Typography
                  level="title-lg"
                  sx={{
                    color: hasDiscount ? "rgb(186 43 32)" : "black",
                    fontWeight: "600",
                    fontSize: "21px",
                  }}
                >
                  {discountedPrice}
                </Typography>
              </Grid>
            )}
            <Grid item xs display="flex" justifyContent="center">
              <Typography
                level="body-md"
                sx={{
                  color: hasDiscount ? "grey" : "black",
                  textDecoration: hasDiscount && "line-through",
                  fontSize: hasDiscount ? "17px" : "21px",
                  fontWeight: !hasDiscount && "600",
                  marginTop: !hasDiscount && "9px",
                }}
              >
                {itemPrice.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {itemTag && (
          <Grid item display="flex" alignItems="center" xs>
            <Typography
              level="title-sm"
              borderRadius={3}
              sx={{
                padding: "4px",
                color: "white",
                backgroundColor: itemTagColor,
                width: "max-content",
                fontSize: "12px",
              }}
            >
              {itemTag}
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Product;
