import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Grid, TextField, Dialog, Divider } from "@mui/material";
import SearchProduct from "./SearchProduct";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useGetSearchedProductsQuery } from "../api/UserApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const { data, error, isLoading, refetch } = useGetSearchedProductsQuery({
    search,
  });

  console.log(search, data);

  useEffect(() => {
    const getProducts = setTimeout(() => {
      refetch();
    }, 5000);
    return () => clearTimeout(getProducts);
  }, [search, refetch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SearchIcon onClick={handleClickOpen} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Grid container padding={3}>
          <Grid item xs={11}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="password"
              placeholder="Search here"
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "50px",
                borderColor: "black",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "black",
                  },
              }}
            />
          </Grid>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            item
            xs
          >
            <CloseIcon
              fontSize="large"
              sx={{ "&:hover": { cursor: "pointer" } }}
              onClick={handleClose}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container paddingY={3}>
          <SearchProduct />
          <SearchProduct />
          <SearchProduct />
          <SearchProduct />
          <SearchProduct />
        </Grid>
      </Dialog>
    </>
  );
};

export default Search;
