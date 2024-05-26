import { Grid } from "@mui/material";
import { Typography, Divider } from "@mui/joy";
import CartItem from "../components/CartItem";
import StyledButton from "../components/StyledButton";
import { useGetCartQuery } from "../api/UserApi";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import useFormattedPrice from "../hooks/useFormattedPrice";
import { useLocation } from "react-router-dom";
import SessionExpiredAlert from "../components/SessionExpiredAlert";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { data, error, isLoading, isError, refetch } = useGetCartQuery();
  const [cart, setCart] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const formattedPrice = useFormattedPrice(totalPrice);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (isError) {
      if (error.data.message === "jwt expired") {
        setShow(true);
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      } else if (error.data.message === "No cart found") setEmpty(true);
    }
    if (!isError && !isLoading && data) {
      data.cart.items.forEach((i) => console.log(i));
      setCart(data.cart.items);
      setTotalPrice(data.cart.totalPrice);
      setEmpty(data.cart.items.length === 0);
    }
  }, [data, error, isError, isLoading, navigateTo]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (isLoading) {
    return (
      <Grid paddingY={10} display="flex" justifyContent="center">
        <CircularProgress color="neutral" size="lg" />
      </Grid>
    );
  }

  return (
    <>
      {!isLoading && isError && (
        <Grid mt={5}>
          <SessionExpiredAlert show={show} />
        </Grid>
      )}
      <Grid mt={10} container paddingX={4}>
        {!isError && !isLoading && empty && (
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
        {!isError && !isLoading && !empty && (
          <>
            <Grid item my={3} xs={12}>
              <Typography level="h2" sx={{ fontWeight: "350" }}>
                MY SHOPPING CART
                <Typography
                  level="title-lg"
                  ml={1}
                  sx={{ color: "rgb(108 108 108)", fontSize: "30px" }}
                >
                  ({cart.length})
                </Typography>
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
                  />
                ))}
              </Grid>
              <Grid xs ml={5} container direction="column" item>
                <Grid item paddingY={2}>
                  <Typography level="h4">ORDER SUMMARY</Typography>
                </Grid>
                <Grid mb={1} item container>
                  <Grid xs={6} display="flex" justifyContent="flex-start" item>
                    <Typography
                      level="body-lg"
                      sx={{ color: "rgb(108 108 108)" }}
                    >
                      {cart.length} {cart.length === 1 ? "Item" : "Items"}
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
    </>
  );
};

export default CartPage;
