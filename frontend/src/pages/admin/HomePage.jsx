import { Grid } from "@mui/material";
import AdminNavBar from "../../components/admin/AdminNavBar";
import { useGetProductsQuery } from "../../api/AdminApi";
import { useNavigate, useLocation } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
import { useState, useEffect } from "react";
import AdminProduct from "../../components/admin/AdminProduct";
import Product from "../../components/Product";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = () => {
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery();
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();
  const location = useLocation();

  console.log(data, error);

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        if (error.data.message === "Not Authorized") {
          navigateTo("/login");
        }
      } else {
        setProducts(data.products);
      }
    }
  }, [data, error, isError, isLoading, navigateTo]);

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  return (
    <>
      <AdminNavBar />
      {isLoading && (
        <Grid
          height="600px"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="inherit" />
        </Grid>
      )}
      {!isLoading && (
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
          <Grid container>
            {products.map((product) => (
              <AdminProduct
                key={product._id}
                _id={product._id}
                itemName={product.itemName}
              >
                <Product
                  itemName={product.itemName}
                  itemPrice={product.itemPrice}
                  itemDiscount={product.itemDiscount}
                  itemAvailableImages={product.itemAvailableImages}
                  _id={product._id}
                  itemTag={product.itemTag}
                  isAdmin={true}
                />
              </AdminProduct>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HomePage;
