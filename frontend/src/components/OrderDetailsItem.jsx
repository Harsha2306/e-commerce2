/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { Typography, Divider } from "@mui/joy";
import useFormattedPrice from "../hooks/useFormattedPrice";

const OrderDetailsItem = ({name, size, color, quantity, price}) => {
  const formattedPrice = useFormattedPrice(price);
  return (
    <>
      <Grid container item xs={12}>
        <Grid item container xs>
          <Grid paddingY={1} item xs={12}>
            <Typography level="title-md">{name}</Typography>
          </Grid>
          <Grid item xs={12} container>
            <Grid item mr={1}>
              <Typography level="body-sm">Color: {color}</Typography>
            </Grid>
            {size && (
              <>
                <Divider orientation="vertical" />
                <Grid item ml={1} xs>
                  <Typography level="body-sm">Size : {size}</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item container xs={6}>
          <Grid
            display="flex"
            justifyContent="flex-end"
            paddingY={1}
            item
            xs={12}
          >
            <Typography level="title-md">{formattedPrice}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Typography level="body-sm">Qty: {quantity}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item my={1} xs={12}>
        <Divider />
      </Grid>
    </>
  );
};

export default OrderDetailsItem;
