/* eslint-disable react/prop-types */
import { Typography } from "@mui/joy";
import Product from "./Product";
import ProductSkeleton from "../components/ProductSkeleton";
import { useMediaQuery } from "@mui/material";

const ProductCarousel = ({ heading, products, isLoading }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 960px)");

  const getGridTemplateColumns = () => {
    if (isSmallScreen) return "repeat(2, calc(50% - 1rem))";
    if (isMediumScreen) return "repeat(4, calc(25% - 1rem))";
    return "repeat(10, calc(25% - 5rem))";
  };

  const getGap = () => {
    if (isSmallScreen) return "0.5rem";
    if (isMediumScreen) return "1rem";
    return "1.5rem";
  };

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
          gridTemplateColumns: getGridTemplateColumns(),
          gap: getGap(),
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
