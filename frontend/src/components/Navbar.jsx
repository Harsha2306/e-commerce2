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
import { useSelector } from "react-redux";
import Search from "./Search";
import IconButton from "@mui/material/IconButton";
import Footer from "../components/Footer";

const Navbar = () => {
  const navigateTo = useNavigate();
  const cartCount = useSelector((state) => state.user.cartCount);
  const wishlistCount = useSelector((state) => state.user.wishlistCount);

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
            <IconButton
              onClick={() => navigateTo("/wishlist")}
              sx={{ padding: 0, color: "white" }}
            >
              <Badge
                badgeContent={wishlistCount}
                size="sm"
                invisible={false}
                color="danger"
              >
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </NavIconItem>
          <NavIconItem>
            <IconButton
              onClick={cartClickHandler}
              sx={{ padding: 0, color: "white" }}
            >
              <Badge
                badgeContent={cartCount}
                size="sm"
                invisible={false}
                color="danger"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </NavIconItem>
          <NavIconItem>
            <IconButton
              onClick={profileClickHandler}
              sx={{ padding: 0, color: "white" }}
            >
              <PersonIcon />
            </IconButton>
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
