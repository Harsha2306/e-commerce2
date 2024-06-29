/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";

const Panel = ({ icon, heading, text }) => {
  return (
    <Grid
      sx={{ width: "350px" }}
      border={1}
      borderRadius={3}
      borderColor="darkgray"
      container
      padding={3}
      item
    >
      <Grid item display="flex" justifyContent="center" xs={12}>
        {icon}
      </Grid>
      <Grid item container display="flex" justifyContent="center" xs={12}>
        <Grid mb={1} item>
          <Typography level="h3">{heading}</Typography>
        </Grid>
        <Grid item>
          <Typography level="body-md" sx={{ fontWeight: "300", textAlign:'center' }}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Panel;
