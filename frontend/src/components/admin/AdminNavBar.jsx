import { Grid, List } from "@mui/material";
import NavItem from "../NavItem";
import { Outlet } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <Grid
      container
      sx={{
        position: "fixed",
        top: 0,
        height: "80px",
        backgroundColor: "black",
        zIndex: 5,
      }}
    >
      <Grid item xs={12} display="flex">
        <List sx={{ display: "flex", flexDirection: "row", p: 0 }}>
          <NavItem navItemText={"Products"} to="/admin" />
          <NavItem navItemText={"Add Product"} to="/admin/add-product" />
        </List>
      </Grid>
      <Outlet />
    </Grid>
  );
};

export default AdminNavBar;
