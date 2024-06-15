import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";
import Product from "./Product";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductCarousel = ({ heading, products, isLoading }) => {
  return (
    <>
      <Typography level="h4" marginBottom={2}>
        {heading}
      </Typography>
      <div
        style={{
          overflowX: "auto",
          display: "grid",
          scrollSnapType: "x",
          gridTemplateColumns: "repeat(10, calc(25% - 5rem))",
          gap: "1.5rem",
          paddingBottom: "1rem",
          marginBottom: "1rem",
        }}
      >
        {isLoading &&
          Array.from({ length: 10 }, (_, index) => (
            <ProductSkeleton key={index} />
          ))}
        {!isLoading &&
          products &&
          products.map((product) => <Product key={product._id} {...product} />)}
      </div>
    </>
  );
};

export default ProductCarousel;
