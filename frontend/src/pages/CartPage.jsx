import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Typography, Divider, CircularProgress } from "@mui/joy";
import CartItem from "../components/CartItem";
import StyledButton from "../components/StyledButton";
import { useGetCartQuery, useCheckoutMutation } from "../api/UserApi";
import { useState, useEffect } from "react";
import useFormattedPrice from "../hooks/useFormattedPrice";
import SessionExpiredAlert from "../components/SessionExpiredAlert";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { setLogin, setToken } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

const CartPage = () => {
  useIsLoggedIn();
  const dispatch = useDispatch();
  const { data, error, isLoading, isError, refetch } = useGetCartQuery();
  const [cart, setCart] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const formattedPrice = useFormattedPrice(totalPrice);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const navigateTo = useNavigate();
  const [postCheckout] = useCheckoutMutation();
  const [stripeLoading, setStripeLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      if (error?.data?.message === "Not Authorized") {
        navigateTo("/login");
      }
      if (error?.data?.message === "jwt expired") {
        setShow(true);
        localStorage.removeItem("token");
        dispatch(setLogin(false));
        dispatch(setToken(null));
        dispatch(setCartCount(0));
        dispatch(setWishlistCount(0));
        navigateTo("/login");
        setTimeout(() => {}, 2000);
      } else if (error.data.message === "No cart found") setEmpty(true);
    }
    if (!isError && !isLoading && data) {
      setCart(data.cart.items);
      setTotalPrice(data.cart.totalPrice);
      setEmpty(data.cart.items.length === 0);
    }
  }, [data, dispatch, error, isError, isLoading, navigateTo]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const checkOut = async () => {
    setStripeLoading(true);
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    const res = await postCheckout().unwrap();
    if (res?.message === "Not Authorized") navigateTo("/login");
    else if (res?.message === "jwt expired") {
      setShow(true);
      localStorage.removeItem("token");
      dispatch(setLogin(false));
      dispatch(setToken(null));
      dispatch(setCartCount(0));
      dispatch(setWishlistCount(0));
      navigateTo("/login");
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    }
    const sessionId = res.sessionId;
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      navigateTo("/cart");
    }
  };

  const canPlaceOrder =
    data?.cart?.items?.reduce((accumulator, item) => {
      return item.available ? accumulator + 1 : accumulator;
    }, 0) || 0;

  if (isLoading) {
    return (
      <Grid paddingY={10} display="flex" justifyContent="center">
        <CircularProgress color="neutral" size="lg" />
      </Grid>
    );
  }

  if (isError && error?.data?.message === "jwt expired")
    return (
      <Grid mt={5}>
        <SessionExpiredAlert show={show} />
      </Grid>
    );

  return (
    <>
      <Grid mt={10} container paddingX={4}>
        {!isLoading && empty && (
          <Grid
            item
            display="flex"
            alignItems="center"
            height="386px"
            xs={12}
            justifyContent="center"
          >
            <Typography level="h2">YOUR CART IS EMPTY</Typography>
          </Grid>
        )}
        {!isError && !isLoading && !empty && data && (
          <>
            <Grid item my={3} xs={12}>
              <Typography level="h2" sx={{ fontWeight: "350" }}>
                MY SHOPPING CART
              </Typography>
            </Grid>
            <Grid xs={12} container item>
              <Grid xs={7} container item>
                {cart.map((item) => (
                  <CartItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    price={item.price}
                    color={item.color}
                    size={item.size}
                    quantity={item.quantity}
                    img={item.img}
                    refetch={refetch}
                    productId={item.productId}
                    available={item.available}
                  />
                ))}
              </Grid>
              <Grid xs ml={5} container direction="column" item>
                <Grid item paddingBottom={2}>
                  <Typography level="h4">ORDER SUMMARY</Typography>
                  <Typography level="body-md">
                    Only In stock products
                  </Typography>
                  <Typography level="body-sm">
                    You can use any email, the card number 4242 4242 4242 4242,
                    any MM/YY and CVC, and any cardholder name for the payment
                    in the next step.
                  </Typography>
                </Grid>
                <Grid mb={1} item container>
                  <Grid xs={6} display="flex" justifyContent="flex-start" item>
                    <Typography
                      level="body-lg"
                      sx={{ color: "rgb(108 108 108)" }}
                    >
                      {data?.inStock} {data?.inStock === 1 ? "Item" : "Items"}
                    </Typography>
                  </Grid>
                  <Grid xs={6} display="flex" justifyContent="flex-end" item>
                    <Typography
                      level="body-lg"
                      sx={{ color: "rgb(108 108 108)" }}
                    >
                      {formattedPrice}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item mb={1} container>
                  <Grid xs={6} display="flex" justifyContent="flex-start" item>
                    <Typography
                      level="body-lg"
                      sx={{ color: "rgb(108 108 108)" }}
                    >
                      Delivery
                    </Typography>
                  </Grid>
                  <Grid xs={6} display="flex" justifyContent="flex-end" item>
                    <Typography
                      level="body-lg"
                      sx={{ color: "rgb(108 108 108)" }}
                    >
                      Free
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item mt={1} mb={2} container>
                  <Grid xs={6} display="flex" justifyContent="flex-start" item>
                    <Typography level="h4">GRAND TOTAL</Typography>
                  </Grid>
                  <Grid xs={6} display="flex" justifyContent="flex-end" item>
                    <Typography level="h4">{formattedPrice}</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <StyledButton
                    onClick={() => setShowFinal(true)}
                    text="Check Out"
                    height="40px"
                    color="white"
                    backgroundColor="black"
                    width="100%"
                    hoverStyles={{
                      color: "white",
                      backgroundColor: "black",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <Dialog
        open={showFinal}
        onClose={() => setShowFinal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {canPlaceOrder > 0
            ? "Orders will only be placed for items currently in stock."
            : "All items in the cart are out of stock."}
        </DialogTitle>
        <DialogContent>
          <Grid container></Grid>
        </DialogContent>
        <DialogActions>
          {canPlaceOrder > 0 && (
            <StyledButton
              endIcon={
                stripeLoading && (
                  <CircularProgress size="sm" variant="solid" color="neutral" />
                )
              }
              variant="contained"
              width="50%"
              height="40px"
              color="white"
              backgroundColor="black"
              hoverStyles={{ color: "white", backgroundColor: "black" }}
              text={!stripeLoading && "Confirm"}
              onClick={checkOut}
            />
          )}
          <StyledButton
            variant="contained"
            width={canPlaceOrder > 0 ? "50%" : "100%"}
            height="40px"
            color="white"
            backgroundColor="black"
            hoverStyles={{ color: "white", backgroundColor: "black" }}
            text={canPlaceOrder > 0 ? "Cancel" : "Ok"}
            onClick={() => setShowFinal(false)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
