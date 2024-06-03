import { List, ListItem, ListItemText, Grid } from "@mui/material";
import { Typography } from "@mui/joy";
import StyledButton from "../components/StyledButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setToken, setLogin } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";

const AccountList = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.token.isLoggedIn);

  const loginClickHandler = () => {
    navigateTo("/login");
  };

  const logoutClickHandler = () => {
    localStorage.removeItem("token");
    dispatch(setToken(undefined));
    dispatch(setLogin(false));
    dispatch(setCartCount(0));
    dispatch(setWishlistCount(0));
    navigateTo("/");
  };

  const registerHereClickHandler = () => {
    navigateTo("/register");
  };

  return (
    <>
      {
        <Grid
          id="accountList"
          sx={{
            display: "none",
            margin: "0px",
            zIndex: 2,
            position: "fixed",
            top: 70,
            right: 10,
            borderRadius: "5px",
            border: "1px solid lightgrey",
            backgroundColor: "white",
          }}
        >
          <List
            sx={{
              width: "300px",
            }}
          >
            <ListItem
              sx={{
                padding: "0px",
              }}
            >
              <ListItemText
                sx={{
                  "&:hover": { cursor: "pointer" },
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "15px",
                }}
              >
                <Link style={{ textDecoration: "none" }} to="/account">
                  <Typography level="body-md">My Account</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <hr style={{ margin: "0px 15px 0px 15px" }}></hr>
            <ListItem
              sx={{
                padding: "0px",
              }}
            >
              <ListItemText
                sx={{
                  "&:hover": { cursor: "pointer" },
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "15px",
                }}
              >
                <Link style={{ textDecoration: "none" }} to="/wishlist">
                  <Typography level="body-md">Wishlist</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <hr style={{ margin: "0px 15px 0px 15px" }}></hr>
            <ListItem
              sx={{
                padding: "0px",
              }}
            >
              <ListItemText
                sx={{
                  "&:hover": { cursor: "pointer" },
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "15px",
                }}
              >
                <Link style={{ textDecoration: "none" }} to="/order-history">
                  <Typography level="body-md">Orders</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            {!loggedIn && (
              <>
                <ListItem>
                  <StyledButton
                    onClick={loginClickHandler}
                    variant="contained"
                    text="Login"
                    width="300px"
                    color="white"
                    backgroundColor="black"
                    hoverStyles={{ color: "white", backgroundColor: "black" }}
                  />
                </ListItem>
                <ListItem>
                  <StyledButton
                    onClick={registerHereClickHandler}
                    variant="contained"
                    text="Register here"
                    width="300px"
                    color="white"
                    backgroundColor="black"
                    hoverStyles={{ color: "white", backgroundColor: "black" }}
                  />
                </ListItem>
              </>
            )}
            {loggedIn && (
              <ListItem>
                <StyledButton
                  onClick={logoutClickHandler}
                  variant="contained"
                  text="logout"
                  width="300px"
                  color="white"
                  backgroundColor="black"
                  hoverStyles={{ color: "white", backgroundColor: "black" }}
                />
              </ListItem>
            )}
          </List>
        </Grid>
      }
    </>
  );
};

export default AccountList;
