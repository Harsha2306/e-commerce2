import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Grid, TextField, Dialog, Divider } from "@mui/material";
import { Typography } from "@mui/joy";
import SearchProduct from "./SearchProduct";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useGetSearchedProductsQuery } from "../api/UserApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const { data, isLoading, refetch, isError } = useGetSearchedProductsQuery({
    search,
  });
  const [wait, setWait] = useState(false);
  const navigateTo = useNavigate();
  
  //debouncing the search with some delay
  useEffect(() => {
    setWait(true);
    const getProducts = setTimeout(() => {
      refetch();
      setWait(false);
    }, 2000);
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
        {search.trim().length === 0 ? (
          <></>
        ) : (
          <>
            {isLoading | wait ? (
              <Grid
                height="600px"
                container
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress color="inherit" />
              </Grid>
            ) : (
              !isError && (
                <Grid container paddingY={3}>
                  <Grid item mx={1} mb={2} xs={12}>
                    <Typography>
                      {data && data.products.length === 0
                        ? "No results found"
                        : "Related products"}
                    </Typography>
                  </Grid>
                  {data &&
                    data.products &&
                    data.products.map((product) => (
                      <SearchProduct
                        onClick={() => {
                          setWait(true);
                          navigateTo(`/products/${product._id}`);
                          setTimeout(() => {
                            setOpen(false);
                            setWait(false);
                          }, 2000);
                        }}
                        key={product._id}
                        img={product.itemAvailableImages[0]}
                        name={product.itemName}
                        itemDiscount={product.itemDiscount}
                        itemPrice={product.itemPrice}
                        searchText={search}
                      />
                    ))}
                </Grid>
              )
            )}
          </>
        )}
      </Dialog>
    </>
  );
};

export default Search;
