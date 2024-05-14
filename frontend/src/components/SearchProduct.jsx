/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";
import useGetPrice from "../hooks/useGetPrice";

const highlightSearchQuery = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ color: "black" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const SearchProduct = ({
  img,
  name,
  itemPrice,
  itemDiscount,
  searchText,
  onClick
}) => {
  const price = useGetPrice(itemPrice, itemDiscount);
  return (
    <Grid
      onClick={onClick}
      border={1}
      borderRadius={1}
      sx={{
        width: "363px",
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
          src={img}
          style={{ width: "100px", height: "100px" }}
          alt="error"
        />
      </Grid>
      <Grid item xs={8.5} alignItems="center">
        <Typography level="h4" sx={{ fontSize: "18px", color: "darkgray" }}>
          {highlightSearchQuery(name, searchText)}
        </Typography>
        <Typography level="h4" sx={{ fontSize: "18px" }}>
          {price}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SearchProduct;
