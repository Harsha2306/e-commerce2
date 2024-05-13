import React from "react";
import { Grid, Typography } from "@mui/material";
import ListItem from "@mui/joy/ListItem";
import Button from "@mui/joy/Button";

const PaginationItem = ({ to, onClick, isActive, isDisabled }) => {
  return (
    <ListItem sx={{ padding: 0, margin: 0 }}>
      <Button
        onClick={onClick}
        sx={{
          borderRadius: 0,
        }}
        size="lg"
        disabled={isDisabled}
        variant={isActive ? "solid" : "outlined"}
      >
        <Typography variant="body1">{to}</Typography>
      </Button>
    </ListItem>
  );
};

export default PaginationItem;
