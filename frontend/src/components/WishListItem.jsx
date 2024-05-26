/* eslint-disable react/prop-types */
import { useState } from "react";
import { Grid, Chip } from "@mui/material";
import StyledButton from "./StyledButton";
import { Typography, CircularProgress } from "@mui/joy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRemoveFromWishlistMutation } from "../api/UserApi";
import useFormattedPrice from "../hooks/useFormattedPrice";
import { useDispatch } from "react-redux";
import { setWishlistCount } from "../redux-store/userSlice";
import { useAddToCartMutation } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { setCartCount } from "../redux-store/userSlice";

//if out of stock dont enable button
const WishListItem = ({
  name,
  price,
  color,
  size,
  img,
  refetch,
  _id,
  productId,
}) => {
  const [open, setOpen] = useState(false);
  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const formattedPrice = useFormattedPrice(price);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const onRemoveButtonClick = async () => {
    const res = await removeFromWishlist({
      productId: _id,
      size,
      color,
    });
    dispatch(setWishlistCount(res.data.wishlistLength));
    setOpen(false);
    refetch();
  };

  const onAddToCartButtonClick = async () => {
    const res = await addToCart({
      productId,
      size,
      color,
    });
    dispatch(setCartCount(res.data.cartLength));
    navigateTo("/cart");
  };

  return (
    <Grid item xs={12} container>
      <Grid xs={3} item>
        <img src={img} alt="error" style={{ width: "100%", height: "100%" }} />
      </Grid>
      <Grid padding={2} xs item>
        <Typography level="title-lg" sx={{ fontSize: "25px" }}>
          {name}
        </Typography>
        <Typography mb={2} sx={{ color: "rgb(108 108 108)" }} level="body-lg">
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
        <Grid mb={1} columnSpacing={1} container>
          <Grid item>
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
                    <Typography level="body-md" mb={1} sx={{ color: "black" }}>
                      SIZE: <Typography level="body-sm">{size}</Typography>
                    </Typography>
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
                  text={!isRemoving && "remove"}
                  onClick={onRemoveButtonClick}
                  startIcon={
                    isRemoving && <CircularProgress size="sm" color="neutral" />
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
            <Chip
              sx={{
                fontWeight: "700",
              }}
              label="IN STOCK"
              color="success"
              variant="outlined"
            />
            <Chip
              sx={{
                fontWeight: "700",
              }}
              label="OUT OF STOCK"
              color="error"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <StyledButton
          variant="contained"
          width="100%"
          height="40px"
          color="white"
          backgroundColor="black"
          hoverStyles={{ color: "white", backgroundColor: "black" }}
          text={!isAdding && "add to cart"}
          startIcon={isAdding && <CircularProgress size="sm" color="neutral" />}
          onClick={onAddToCartButtonClick}
        />
      </Grid>
    </Grid>
  );
};

export default WishListItem;
