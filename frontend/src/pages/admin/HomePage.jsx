import { Grid, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import AdminNavBar from "../../components/admin/AdminNavBar";
import { useGetProductsQuery } from "../../api/AdminApi";
import { useNavigate, useLocation } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery();
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!isError) {
        setProducts(data.products);
      }
    }
  }, [data, isError, isLoading]);

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  return (
    <>
      <AdminNavBar />
      <Grid container mt="100px">
        <Grid item display="flex" mr={5} justifyContent="flex-end" xs={12}>
          <StyledButton
            text="ADD NEW PRODUCT"
            color="white"
            backgroundColor="black"
            hoverStyles={{ color: "white", backgroundColor: "black" }}
            onClick={() => navigateTo("/admin/add-product?edit=false")}
          />
        </Grid>
        {products.map((product) => (
          <Grid item key={product._id} xs={12}>
            <Typography>{product.itemName}</Typography>
            <Button
              onClick={() => {
                navigateTo(
                  `/admin/add-product?edit=true&productId=${product._id}`
                );
              }}
            >
              Edit
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
