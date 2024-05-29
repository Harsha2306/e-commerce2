/* eslint-disable react/prop-types */
import ListItem from "@mui/joy/ListItem";
import IconButton from "@mui/joy/IconButton";

const PaginationItem = ({ onClick, isDisabled, startIcon }) => {
  return (
    <ListItem sx={{ padding: 0, margin: 0 }}>
      <IconButton
        onClick={onClick}
        sx={{
          borderRadius: 0,
          color: "white",
          backgroundColor: "black",
          "&:hover": {
            color: "white",
            backgroundColor: "black",
            cursor: isDisabled ? "not-allowed" : "pointer",
          },
        }}
        size="lg"
        disabled={isDisabled}
      >
        {startIcon}
      </IconButton>
    </ListItem>
  );
};

export default PaginationItem;
