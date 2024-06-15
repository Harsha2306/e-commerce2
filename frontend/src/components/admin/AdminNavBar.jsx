import { Grid, List } from "@mui/material";
import NavItem from "../NavItem";
import { Outlet } from "react-router-dom";
import StyledButton from "../StyledButton";
import { useSelector, useDispatch } from "react-redux";
import { setIsAdmin, setToken } from "../../redux-store/TokenSlice";
import { useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.token.isAdmin);
  const logout = () => {
    dispatch(setIsAdmin(false));
    localStorage.removeItem("token");
    dispatch(setToken(undefined));
    navigateTo("/admin/login");
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
          zIndex: 5,
        }}
      >
        <Grid item xs display="flex">
          <List sx={{ display: "flex", flexDirection: "row", p: 0 }}>
            <NavItem navItemText={"Products"} to="/admin" />
          </List>
        </Grid>
        {isAdmin && (
          <Grid item display="flex" alignItems="center">
            <StyledButton
              margin="0px 20px 0px 0px"
              onClick={logout}
              text="Logout"
              height="45px"
              color="black"
              backgroundColor="white"
              width="100%"
              hoverStyles={{
                cursor: "pointer",
                color: "black",
                backgroundColor: "white",
              }}
            />
          </Grid>
        )}
      </Grid>
      <Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default AdminNavBar;
