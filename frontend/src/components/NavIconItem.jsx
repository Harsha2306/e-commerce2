/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";

const NavIconItem = ({ children }) => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        alignItems: "center",
        color: "white",
        marginRight: "10px",
        borderRadius: "50px",
        padding: "8px",
        "&:hover": {
          cursor: "pointer",
          borderRadius: "50px",
          backgroundColor: "#555555",
        },
      }}
    >
      {children}
    </Grid>
  );
};

export default NavIconItem;