/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import StyledButton from "./StyledButton";
import { useNavigate } from "react-router-dom";

const ImageContainer = ({ imgLink, navigationLink }) => {
  const navigateTo = useNavigate();

  const onButtonClick = () => navigateTo(navigationLink);

  return (
    <Grid
      onClick={onButtonClick}
      container
      item
      width="330px"
      height="400px"
      sx={{
        "&:hover": { cursor: "pointer" },
        backgroundImage: `url("${imgLink}")`,
      }}
      borderRadius={2}
    >
      <Grid
        item
        sx={{
          position: "relative",
          top: "300px",
          left: "30px",
          height: "max-content",
        }}
      >
        <StyledButton
          onClick={onButtonClick}
          text="shop now"
          height="50px"
          color="white"
          backgroundColor="black"
          width="150px"
          hoverStyles={{
            color: "white",
            backgroundColor: "black",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ImageContainer;