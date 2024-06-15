import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";
import { useGetOrdersQuery } from "../api/UserApi";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { styled, alpha } from "@mui/material/styles";
import SessionExpiredAlert from "../components/SessionExpiredAlert";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: "50%",
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.primary.main, 0.25)
        : theme.palette.primary.dark,
    color: theme.palette.mode === "dark" && theme.palette.primary.contrastText,
    padding: theme.spacing(0, 1.2),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const OrdersPage = () => {
  useIsLoggedIn();
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const { data, isLoading, isError, error, refetch } = useGetOrdersQuery();
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isError) {
      console.log(isError, error);
      if (error.data.message === "Not Authorized") navigateTo("/login");
      else if (error.data.message === "jwt expired") {
        setShow(true);
        setTimeout(() => navigateTo("/login"));
      }
    }
    if (data && data.ok) {
      setOrders(data.structuredOrders);
      console.log(data);
    }
  }, [isError, error, navigateTo, data]);

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
      {!isError && orders.length === 0 && (
        <Grid display="flex" alignItems="center" justifyContent="center">
          <Typography mt={10} level="h2">
            NO ORDERS YET
          </Typography>
        </Grid>
      )}
      {!isError && orders.length !== 0 && (
        <Grid container>
          <Grid mt={5} item xs={12}>
            <Typography display="flex" justifyContent="center" level="h2">
              YOUR ORDERS
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <RichTreeView
              defaultExpandedItems={["grid"]}
              slots={{ item: CustomTreeItem }}
              sx={{ width: "100%", marginTop: "30px" }}
              items={orders}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OrdersPage;
