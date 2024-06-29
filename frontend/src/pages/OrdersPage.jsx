import { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Typography, Breadcrumbs, CircularProgress } from "@mui/joy";
import { useGetOrdersQuery } from "../api/UserApi";
import { useNavigate, useLocation } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import SessionExpiredAlert from "../components/SessionExpiredAlert";
import { Link } from "react-router-dom";
import { setLogin, setToken } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

const OrdersPage = () => {
  useIsLoggedIn();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const { data, isLoading, isError, error, refetch } = useGetOrdersQuery();
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isError) {
      if (error.data.message === "Not Authorized") navigateTo("/login");
      else if (error.data.message === "jwt expired") {
        setShow(true);
        localStorage.removeItem("token");
        dispatch(setLogin(false));
        dispatch(setToken(null));
        dispatch(setCartCount(0));
        dispatch(setWishlistCount(0));
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
    }
    if (data && data.ok) {
      setOrders(data.orders);
    }
  }, [isError, error, navigateTo, data, dispatch]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (isLoading)
    return (
      <Grid paddingY={10} display="flex" justifyContent="center">
        <CircularProgress color="neutral" size="lg" />
      </Grid>
    );

  if (isError && error?.data?.message === "jwt expired")
    return (
      <Grid mt={5}>
        <SessionExpiredAlert show={show} />
      </Grid>
    );

  return (
    <>
      {!isError && orders && orders.length === 0 && (
        <Grid display="flex" alignItems="center" justifyContent="center">
          <Typography mt={10} level="h2">
            NO ORDERS YET
          </Typography>
        </Grid>
      )}
      {!isError && orders && orders.length !== 0 && (
        <Grid mt={13} paddingX={6} container>
          <Breadcrumbs sx={{ paddingX: "0px" }}>
            <Link style={{ color: "blue" }} to="/">
              <Typography variant="body1" sx={{ color: "blue" }}>
                Home
              </Typography>
            </Link>
            <Typography variant="body1">Orders</Typography>
          </Breadcrumbs>
          <Grid item xs={12}>
            <Typography display="flex" justifyContent="center" level="h2">
              YOUR ORDERS
            </Typography>
          </Grid>
          <Grid display="flex" justifyContent="center" item xs={12}>
            <Table sx={{ width: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell align="center">Ordered At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <TableRow
                    key={row.orderId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        "&:hover": { cursor: "pointer" },
                      }}
                      component="th"
                      scope="row"
                    >
                      <Link to={"/orderDetails/" + row.orderId}>
                        {row.orderId}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.orderedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OrdersPage;
