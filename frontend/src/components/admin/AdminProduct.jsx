/* eslint-disable react/prop-types */
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminProduct = ({ children, _id }) => {
  const navigateTo = useNavigate();

  return (
    <Grid
      item
      margin={2}
      sx={{ width: "270px", "&:hover": { cursor: "pointer" } }}
      container
    >
      <Grid item>{children}</Grid>
      <Grid item mt={2} xs={12}>
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          color="primary"
          onClick={() => {
            navigateTo(`/admin/add-product?edit=true&productId=${_id}`);
          }}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdminProduct;
