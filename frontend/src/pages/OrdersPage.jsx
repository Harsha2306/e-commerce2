import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Typography, Divider } from "@mui/joy";
import OrderItem from "../components/OrderItem";
import { useGetOrdersQuery } from "../api/UserApi";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const OrdersPage = ({ isEmpty = !true }) => {
  useIsLoggedIn();
  const { data, isLoading, isError, error } = useGetOrdersQuery();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (
      isError &&
      (error.data.message === "Not Authorized" ||
        error.data.message === "jwt expired")
    ) {
      navigateTo("/login");
    }
    if (data && data.ok) {
      console.log(data);
    }
  }, [isError, error, navigateTo, data]);

  return (
    <>
      {isLoading && (
        <Grid paddingY={10} display="flex" justifyContent="center">
          <CircularProgress color="neutral" size="lg" />
        </Grid>
      )}
      {!isLoading && (
        <Grid mx={5}>
          {isEmpty && (
            <Grid
              display="flex"
              alignItems="center"
              xs={12}
              justifyContent="center"
            >
              <Typography level="h2">NO ORDERS</Typography>
            </Grid>
          )}
          {!isEmpty && (
            <Grid container>
              <Grid item my={3} xs={12}>
                <Typography level="h2" sx={{ fontWeight: "350" }}>
                  YOUR ORDERS
                </Typography>
              </Grid>
              <Divider />
              <Grid item rowGap={3} container>
                <OrderItem />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default OrdersPage;
