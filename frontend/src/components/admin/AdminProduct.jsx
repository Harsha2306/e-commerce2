/* eslint-disable react/prop-types */
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

const AdminProduct = ({ children, _id, itemName }) => {
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const onDelete = () => {
    setShow(true);
  };

  return (
    <Grid
      item
      margin={2}
      sx={{ width: "272px", "&:hover": { cursor: "pointer" } }}
      container
    >
      <Grid item>{children}</Grid>
      <Grid item mt={2} container>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigateTo(`/admin/add-product?edit=true&productId=${_id}`);
            }}
          >
            Edit
          </Button>
        </Grid>
        <Grid item display="flex" justifyContent="flex-end" xs={6}>
          <Button onClick={onDelete} color="warning" variant="contained">
            Delete
          </Button>
        </Grid>
      </Grid>
      <DeleteDialog open={show} handleClose={handleClose} itemName={itemName} />
    </Grid>
  );
};

export default AdminProduct;
