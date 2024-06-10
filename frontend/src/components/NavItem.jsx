/* eslint-disable react/prop-types */
import { ListItem, ListItemText } from "@mui/material";
import { Typography } from "@mui/joy";
import { NavLink } from "react-router-dom";

const hoverStyles = {
  textDecoration: "underline",
  cursor: "pointer",
  textDecorationColor: "white",
  textDecorationThickness: "2px",
};

const listItemStyles = {
  marginRight: "30px",
  marginLeft: "15px",
  "&:hover": hoverStyles,
};

const NavItem = ({ navItemText, to }) => {
  return (
    <ListItem sx={listItemStyles}>
      <ListItemText>
        <NavLink
          end
          to={to}
          style={({ isActive }) => {
            return {
              textDecoration: isActive ? "underline" : "none",
              textDecorationColor: isActive && "white",
              textDecorationThickness: isActive && "2px",
            };
          }}
        >
          <Typography sx={{ color: "white" }} level="title-lg">
            {navItemText}
          </Typography>
        </NavLink>
      </ListItemText>
    </ListItem>
  );
};

export default NavItem;
