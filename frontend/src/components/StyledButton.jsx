import React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/joy";

const StyledButton = ({
  margin,
  display,
  variant,
  startIcon,
  endIcon,
  disabled,
  text,
  width,
  height,
  color,
  backgroundColor,
  justifyContent,
  alignItems,
  hoverStyles,
  onClick,
}) => {
  return (
    <Button
      disabled={disabled}
      sx={{
        "&:hover": { ...hoverStyles },
        height: height,
        width: width,
        margin: margin,
        display: display,
        justifyContent: justifyContent,
        alignItems: alignItems,
        backgroundColor: backgroundColor,
      }}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      <Typography sx={{ color: color }} level="title-sm">
        {text}
      </Typography>
    </Button>
  );
};

export default StyledButton;
