import { Grid, List } from "@mui/material";
import { Badge } from "@mui/joy";
import NavItem from "./NavItem";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import NavIconItem from "./NavIconItem";
import { toggle } from "../redux-store/AccountIconSlice";
import { Outlet } from "react-router-dom";
import AccountList from "./AccountList";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Footer from "../components/Footer";

const Navbar = () => {
  const navigateTo = useNavigate();
  const profileClickHandler = () => {
    document.getElementById("accountList").style.display = "block";
  };
  const cartClickHandler = () => {
    navigateTo("/cart");
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: "fixed",
          top: 0,
          height: "80px",
          backgroundColor: "black",
          zIndex: 1,
        }}
      >
        <Grid item xs={10} display="flex">
          <List sx={{ display: "flex", flexDirection: "row", p: 0 }}>
            <NavItem navItemText={"Logo"} to="/" />
            <NavItem navItemText={"New"} to="products/new" />
            <NavItem navItemText={"Men"} to="products/men" />
            <NavItem navItemText={"Women"} to="products/women" />
            <NavItem navItemText={"Kids"} to="products/kids" />
          </List>
        </Grid>
        <Grid container display="flex" alignItems="center" item xs>
          <NavIconItem>
            <Search />
          </NavIconItem>
          <NavIconItem>
            <Badge badgeContent={2} size="sm" invisible={false} color="danger">
              <FavoriteIcon onClick={() => navigateTo("/wishlist")} />
            </Badge>
          </NavIconItem>
          <NavIconItem>
            <Badge badgeContent={5} size="sm" invisible={false} color="danger">
              <ShoppingCartIcon onClick={cartClickHandler} />
            </Badge>
          </NavIconItem>
          <NavIconItem onClick={profileClickHandler}>
            <PersonIcon />
          </NavIconItem>
        </Grid>
      </Grid>
      <AccountList open={toggle} />
      <Grid sx={{ marginTop: "80px" }}>
        <Outlet />
      </Grid>
      {/* <Footer/> */}
    </>
  );
};

export default Navbar;
