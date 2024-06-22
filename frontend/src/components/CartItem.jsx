/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Grid,
  IconButton,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import StyledButton from "./StyledButton";
import { CircularProgress, Typography } from "@mui/joy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useFormattedPrice from "../hooks/useFormattedPrice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useRemoveEntireItemFromCartMutation,
} from "../api/UserApi";
import { setCartCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

const CartItem = ({
  name,
  price,
  size,
  color,
  quantity,
  img,
  refetch,
  productId,
  available,
}) => {
  console.log(available);
  const [open, setOpen] = useState(false);
  const formattedPrice = useFormattedPrice(price);
  const navigateTo = useNavigate();
  const [increaseQty, { isLoading: isAdding }] = useAddToCartMutation();
  const [decreaseQty, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const [removeEntireItem, { isLoading: isRemovingEntireItem }] =
    useRemoveEntireItemFromCartMutation();
  const dispatch = useDispatch();

  const onCartItemClick = () => {
    if (size.trim().length === 0)
      navigateTo(`/products/${productId}?color=${color}`);
    else if (size.includes("UK")) {
      navigateTo(
        `/products/${productId}?color=${color}&size=${size
          .split(" ")
          .join("_")}`
      );
    } else {
      navigateTo(`/products/${productId}?color=${color}&size=${size}`);
    }
  };

  const onRemoveButtonClick = async () => {
    const res = await removeEntireItem({
      productId,
      size,
      color,
    });
    dispatch(setCartCount(res.data.cartLength));
    if (!isRemovingEntireItem) setOpen(false);
    refetch();
  };

  const handleIncrement = async () => {
    const res = await increaseQty({
      productId,
      size,
      color,
    });
    dispatch(setCartCount(res.data.cartLength));
    refetch();
  };

  const handleDecrement = async () => {
    const res = await decreaseQty({
      productId,
      size,
      color,
    });
    dispatch(setCartCount(res.data.cartLength));
    refetch();
  };

  return (
    <Grid border={1.5} borderColor="lightgray" mb={3} container item xs={12}>
      <Grid
        padding={2}
        xs={3}
        item
        onClick={onCartItemClick}
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <img src={img} alt="error" style={{ width: "100%", height: "100%" }} />
      </Grid>
      <Grid xs ml={2} padding={2} item>
        <Typography
          level="title-lg"
          sx={{ fontSize: "20px", "&:hover": { cursor: "pointer" } }}
          onClick={onCartItemClick}
        >
          {name}
        </Typography>
        <Typography mb={2} level="body-lg" sx={{ color: "rgb(108 108 108)" }}>
          {color}
        </Typography>
        {size !== "" && (
          <Typography level="body-md" mb={1} sx={{ color: "rgb(108 108 108)" }}>
            SIZE:
            <Typography level="body-md" sx={{ color: "rgb(108 108 108)" }}>
              {size}
            </Typography>
          </Typography>
        )}
        <Typography mb={1} level="body-md" sx={{ color: "rgb(108 108 108)" }}>
          PRICE:
          <Typography level="body-md" sx={{ color: "rgb(108 108 108)" }}>
            {formattedPrice}
          </Typography>
        </Typography>
        <Grid item>
          {available && (
            <Chip
              sx={{
                fontWeight: "700",
              }}
              label="IN STOCK"
              color="success"
              variant="outlined"
            />
          )}
          {!available && (
            <Chip
              sx={{
                fontWeight: "700",
              }}
              label="OUT OF STOCK"
              color="error"
              variant="outlined"
            />
          )}
        </Grid>
        <Grid mb={1} columnSpacing={1} container>
          <Grid display="flex" alignItems="center" item>
            <DeleteOutlineIcon
              onClick={() => setOpen(true)}
              sx={{
                padding: "5px",
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "1rem",
                  backgroundColor: "rgb(229, 231, 235)",
                },
              }}
            />
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
                Are you sure you want to remove this item?
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid xs={3} item>
                    <img
                      src={img}
                      alt="error"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Grid>
                  <Grid ml={2} xs padding={2} item>
                    <Typography level="title-lg" sx={{ fontSize: "20px" }}>
                      {name}
                    </Typography>
                    <Typography mb={2} level="body-sm">
                      {color}
                    </Typography>
                    {size && (
                      <Typography
                        level="body-md"
                        mb={1}
                        sx={{ color: "black" }}
                      >
                        SIZE: <Typography level="body-sm">{size}</Typography>
                      </Typography>
                    )}
                    <Typography mb={1} level="body-md" sx={{ color: "black" }}>
                      PRICE:
                      <Typography level="body-sm">{formattedPrice}</Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <StyledButton
                  variant="contained"
                  width="50%"
                  height="40px"
                  color="white"
                  backgroundColor="black"
                  hoverStyles={{ color: "white", backgroundColor: "black" }}
                  text={!isRemovingEntireItem && "remove"}
                  onClick={onRemoveButtonClick}
                  startIcon={
                    isRemovingEntireItem && (
                      <CircularProgress size="sm" color="neutral" />
                    )
                  }
                />
                <StyledButton
                  variant="contained"
                  width="50%"
                  height="40px"
                  color="white"
                  backgroundColor="black"
                  hoverStyles={{ color: "white", backgroundColor: "black" }}
                  text="cancel"
                  onClick={() => setOpen(false)}
                />
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              {isRemoving ? (
                <CircularProgress color="neutral" size="sm" />
              ) : (
                <IconButton
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  style={{ color: quantity <= 1 ? "darkgray" : "black" }}
                >
                  <RemoveIcon />
                </IconButton>
              )}
              <Typography
                variant="h6"
                style={{
                  minWidth: "30px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </Typography>
              {isAdding ? (
                <CircularProgress color="neutral" size="sm" />
              ) : (
                <IconButton
                  onClick={handleIncrement}
                  style={{ color: "black" }}
                >
                  <AddIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
