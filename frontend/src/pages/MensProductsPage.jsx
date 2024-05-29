import { useEffect, useState } from "react";
import FilterAndSort from "../components/FilterAndSort";
import { Grid, Typography } from "@mui/material";
import { Breadcrumbs, Divider } from "@mui/joy";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import { useGetProductsQuery } from "../api/UserApi";
import ProductSkeleton from "../components/ProductSkeleton";
import Pagination from "../components/Pagination";
import {useNavigate} from "react-router-dom"

const MensProductsPage = () => {
  const navigateTo = useNavigate()
  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    gender: "Men",
    page: "1",
  });
  const { data, isLoading, isError, error } =
    useGetProductsQuery(filterOptions);

  const getDataFromFilter = (filterOptionsFromFilter) => {
    const updatedFilterOptions = {
      ...filterOptionsFromFilter,
      gender: "Men",
      page: "1",
    };
    setFilterOptions(updatedFilterOptions);
  };

  const getDataFromPagination = (pageFromPagination) => {
    setFilterOptions({ ...filterOptions, page: pageFromPagination });
  };

  useEffect(() => {
    if (
      isError &&
      error &&
      error.data &&
      error.data.message === "jwt expired"
    ) {
      navigateTo("/login");
    }
    if (data && data.ok) {
      setProducts(data.products);
    }
  }, [error, isError, data, filterOptions, navigateTo]);
  return (
    <Grid marginX={3} marginTop={15}>
      <Breadcrumbs>
        <Link style={{ color: "blue" }} to="/">
          <Typography sx={{ color: "blue" }} variant="body1">
            Home
          </Typography>
        </Link>
        <Typography variant="body1">Men</Typography>
      </Breadcrumbs>
      <Divider />
      <FilterAndSort sendFilterOptions={getDataFromFilter} />
      <Typography 
        sx={{ fontSize: "30px", fontWeight: "600", marginBottom: "1rem" }}
      >
        {!isLoading &&
          products.length !== 0 &&
          `SHOWING PAGE ${data.pagination.page} OF ${data.pagination.last}`}
      </Typography>
      <Grid display="flex" columnSpacing={3} rowSpacing={2} container>
        {!isLoading && products.length === 0 && (
          <>
            <Grid
              height="300px"
              container
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                NO PRODUCTS FOUND WITH SPECIFIED FILTERS
              </Typography>
            </Grid>
          </>
        )}
        {!isLoading &&
          products.length !== 0 &&
          products.map((product) => (
            <Grid key={product._id} item>
              <Product {...product} />
            </Grid>
          ))}
        {isLoading &&
          Array.from({ length: 12 }, (_, index) => (
            <Grid item key={index}>
              <ProductSkeleton />
            </Grid>
          ))}
      </Grid>
      <Grid mt={4} container>
        <Grid item mx="auto">
          {!isLoading && products.length !== 0 && (
            <Pagination
              pagination={data.pagination}
              sendPage={getDataFromPagination}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MensProductsPage;
