import { Grid } from "@mui/material";
import { Typography } from "@mui/joy";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Grid
      mt={5}
      container
      sx={{
        backgroundColor: "black",
        width: "100%",
        position: "relative",
      }}
    >
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={4}
        container
      >
        <Grid
          xs={8}
          container
          item
          display="flex"
          justifyContent="space-around"
          p={3}
        >
          <Grid display="flex" justifyContent="space-around" item xs>
            <LinkedInIcon
              sx={{ color: "white", "&:hover": { cursor: "pointer" } }}
              fontSize="large"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/harsha-revanth-manchikanti/",
                  "_blank"
                )
              }
            />
          </Grid>
          <Grid display="flex" justifyContent="space-around" item xs>
            <GitHubIcon
              onClick={() =>
                window.open("https://github.com/Harsha2306", "_blank")
              }
              sx={{ color: "white" }}
              fontSize="large"
            />
          </Grid>
          <Grid
            display="flex"
            justifyContent="space-around"
            item
            onClick={() =>
              (window.location.href = "mailto:harsharevanth5@gmail.com")
            }
            xs
          >
            <EmailIcon sx={{ color: "white" }} fontSize="large" />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Typography sx={{ color: "white" }} level="title-lg">
          ©2024 STORE
        </Typography>
      </Grid>
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={4}
      >
        <Typography sx={{ color: "white" }} level="title-lg">
          Made with ❤ by HARSHA
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
