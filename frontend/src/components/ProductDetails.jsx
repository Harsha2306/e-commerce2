import { createContext, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Size from "./Size";
import StyledButton from "./StyledButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProductColorImage from "./ProductColorImage";
import ImgContainer from "./ImgContainer";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import MiniDialog from "./MiniDialog";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useAddToCartMutation,
  useGetProductByIdQuery,
  useAddToWishlistMutation,
  useGetCheckIfProductPresentInWishlistAndCartQuery,
} from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import CircularProgressJ from "@mui/joy/CircularProgress";
import SessionExpiredAlert from "./SessionExpiredAlert";
import { useLocation } from "react-router-dom";
import { setCartCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";
import useGetPrice from "../hooks/useGetPrice";
import useFormattedPrice from "../hooks/useFormattedPrice";
import { setWishlistCount } from "../redux-store/userSlice";

export const SizeContext = createContext();
export const ColorContext = createContext();
const colorStyles = {
  fontSize: "20px",
  fontWeight: "700",
  margin: "0px",
  fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  color: "rgb(25 25 25)",
};
const colorValueStyles = {
  fontWeight: "200",
  fontSize: "17px",
  margin: "0px",
  marginTop: "5px",
  fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const ProductDetails = () => {
  const { productId } = useParams();
  const navigateTo = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [openMiniDialog, setOpenMiniDialog] = useState(false);
  const [heading, setHeading] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [goTo, setGoTo] = useState("");

  const {
    data,
    isError: getProductError,
    isLoading: getProductLoading,
    error,
  } = useGetProductByIdQuery({ productId });
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isAddingToWishlist }] =
    useAddToWishlistMutation();
  const checkIfProductPresentInWishlistAndCart =
    useGetCheckIfProductPresentInWishlistAndCartQuery({
      productId,
      selectedSize,
      selectedColor,
    });

  useEffect(() => {
    if (data && !getProductLoading) {
      if (!getProductError) {
        setProduct(data.product);
        setSelectedSize(data.product.itemAvailableSizes?.[0] || "");
        setSelectedColor(data.product.itemAvailableColors?.[0] || "");
      }
    }
  }, [getProductLoading, data, getProductError, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const imgIndex = data?.colorsWithImages?.findIndex(
    (clr) => clr.color === selectedColor
  );
  const hasDiscount = product.itemDiscount === 0 ? false : true;
  const formattedDiscountPrice = useGetPrice(
    product.itemPrice,
    product.itemDiscount
  );
  const formattedItemPrice = useFormattedPrice(product.itemPrice);

  const handleClose = () => setOpenMiniDialog(false);
  const handleOpenCart = async () => {
    // TODO check jwt expired case for every api call
    const res = await addToCart({
      productId,
      size: selectedSize,
      color: selectedColor,
    });
    if (res.error) {
      if (res.error.status === 401) navigateTo("/login");
      else if (res.error.data.message === "jwt expired") {
        setShowAlert(true);
        setTimeout(() => {
          navigateTo("/login");
        }, 3000);
      }
    } else {
      if (
        checkIfProductPresentInWishlistAndCart &&
        !checkIfProductPresentInWishlistAndCart.isLoading &&
        !checkIfProductPresentInWishlistAndCart.isError &&
        checkIfProductPresentInWishlistAndCart.data.addedToCart
      ) {
        setHeading("Quantity Increased");
        setButtonText("view cart & checkout");
        setOpenMiniDialog(true);
      } else {
        setHeading("Added to Cart");
        setButtonText("view cart & checkout");
        setOpenMiniDialog(true);
        dispatch(setCartCount(res.data.cartLength));
      }
      checkIfProductPresentInWishlistAndCart.refetch();
      setGoTo("/cart");
    }
  };

  const handleOpenWishlist = async () => {
    const res = await addToWishlist({
      productId,
      size: selectedSize,
      color: selectedColor,
    });
    if (res.error) {
      if (res.error.status === 401) navigateTo("/login");
      else if (res.error.data.message === "jwt expired") setShowAlert(true);
      setTimeout(() => {
        navigateTo("/login");
      }, 2000);
    } else {
      setHeading("Added to Wishlist");
      setButtonText("view wishlist");
      setOpenMiniDialog(true);
      dispatch(setWishlistCount(res.data.wishlistLength));
      checkIfProductPresentInWishlistAndCart.refetch();
      setGoTo("/wishlist");
    }
  };

  return (
    <>
      {getProductLoading && (
        <Grid
          height="600px"
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="inherit" />
        </Grid>
      )}
      {!getProductLoading && <SessionExpiredAlert show={showAlert} />}
      {!getProductLoading && !getProductError && (
        <>
          <Grid mt={showAlert ? 3 : 15} marginLeft={4}>
            <Breadcrumbs>
              <Link style={{ color: "blue" }} to="/">
                <Typography variant="body1">Home</Typography>
              </Link>
              <Link
                style={{ color: "blue" }}
                color="primary"
                to="/products/men"
              >
                <Typography variant="body1">Men</Typography>
              </Link>
              <Typography variant="body1">{product.itemName}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid marginX={3}>
            <Grid height="100%" width="100%" container sx={{ marginX: 0 }}>
              <Grid item direction="row" container xs={8}>
                {data && data.colorsWithImages && imgIndex >= 0 && (
                  <>
                    <ImgContainer
                      left={data.colorsWithImages[imgIndex].imgs[0]}
                      right={data.colorsWithImages[imgIndex].imgs[1]}
                      isLoading={getProductLoading}
                    />
                    <ImgContainer
                      left={data.colorsWithImages[imgIndex].imgs[2]}
                      right={data.colorsWithImages[imgIndex].imgs[3]}
                      isLoading={getProductLoading}
                    />
                    <ImgContainer
                      left={data.colorsWithImages[imgIndex].imgs[4]}
                      right={data.colorsWithImages[imgIndex].imgs[5]}
                      isLoading={getProductLoading}
                    />
                  </>
                )}
              </Grid>
              <Grid item direction="column" container marginX={2} xs>
                <Grid item>
                  <Typography padding={1} variant="h4">
                    {product.itemName}
                  </Typography>
                </Grid>
                {hasDiscount && (
                  <Grid padding={1} item>
                    <p
                      style={{
                        color: hasDiscount && "rgb(186 43 32)",
                        margin: "0px",
                        fontSize: "24px",
                        fontWeight: "700",
                        fontFamily:
                          'FFDINforPuma, Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      }}
                    >
                      {formattedDiscountPrice}
                    </p>
                  </Grid>
                )}
                <Grid paddingX={1} item>
                  <p
                    style={{
                      textDecoration: hasDiscount && "line-through",
                      margin: "0px",
                      fontSize: hasDiscount ? "16px" : "24px",
                      fontWeight: "700",
                      fontFamily:
                        'FFDINforPuma, Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {formattedItemPrice}
                  </p>
                </Grid>
                <Grid paddingTop={2} paddingX={1} item>
                  <p style={colorStyles}>Color</p>
                </Grid>
                <ColorContext.Provider
                  value={{ selectedColor, setSelectedColor }}
                >
                  <Grid
                    item
                    direction="row"
                    container
                    paddingBottom={3}
                    paddingX={1}
                  >
                    <Grid paddingBottom={3} xs={12} item>
                      <p style={colorValueStyles}>{selectedColor}</p>
                    </Grid>
                    <Grid container xs={12} item>
                      {data &&
                        data.colorsWithImages &&
                        data.colorsWithImages.map((clr) => (
                          <ProductColorImage
                            key={clr.color}
                            colorValue={clr.color}
                            src={clr.imgs[0]}
                          />
                        ))}
                    </Grid>
                  </Grid>
                </ColorContext.Provider>
                <hr style={{ margin: "0px 0px 0px 8px" }} />
                <Grid item direction="row" container paddingX={1} paddingY={3}>
                  {selectedSize !== "" && (
                    <SizeContext.Provider
                      value={{ selectedSize, setSelectedSize }}
                    >
                      {data.product.itemAvailableSizes &&
                        data.product.itemAvailableSizes.map((size) => (
                          <Size productSize={size} key={size} />
                        ))}
                    </SizeContext.Provider>
                  )}
                </Grid>
                <Grid mb={2} item padding={1} container>
                  <Grid xs item>
                    <StyledButton
                      margin="0px 0px 15px 0px"
                      variant="contained"
                      text={
                        !isAddingToCart &&
                        checkIfProductPresentInWishlistAndCart &&
                        !checkIfProductPresentInWishlistAndCart.isLoading &&
                        !checkIfProductPresentInWishlistAndCart.isError &&
                        checkIfProductPresentInWishlistAndCart.data &&
                        checkIfProductPresentInWishlistAndCart.data.addedToCart
                          ? "added to Cart"
                          : "add to Cart"
                      }
                      width="100%"
                      height="40px"
                      color="white"
                      backgroundColor="black"
                      hoverStyles={{
                        color: "white",
                        backgroundColor: "black",
                      }}
                      startIcon={
                        isAddingToCart && (
                          <CircularProgressJ size="sm" color="neutral" />
                        )
                      }
                      onClick={handleOpenCart}
                    />
                    <StyledButton
                      onClick={handleOpenWishlist}
                      variant="contained"
                      text={
                        !isAddingToWishlist &&
                        checkIfProductPresentInWishlistAndCart &&
                        !checkIfProductPresentInWishlistAndCart.isLoading &&
                        !checkIfProductPresentInWishlistAndCart.isError &&
                        checkIfProductPresentInWishlistAndCart.data &&
                        checkIfProductPresentInWishlistAndCart.data
                          .addedToWishList
                          ? "added to wishlist"
                          : "add to wishlist"
                      }
                      width="100%"
                      height="40px"
                      color={"white"}
                      startIcon={
                        isAddingToWishlist ? (
                          <CircularProgressJ size="sm" color="neutral" />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
                      backgroundColor={"black"}
                      hoverStyles={{
                        color: "white",
                        backgroundColor: "black",
                      }}
                    />
                  </Grid>
                </Grid>
                <hr style={{ margin: "0px 0px 0px 8px" }} />
                <Grid padding={1} item>
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    Description
                  </Typography>
                  <Typography mt={1} variant="body1">
                    {product.itemDescription}
                  </Typography>
                </Grid>
                <Grid padding={1} item>
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    Shipping and Returns
                  </Typography>
                  <Typography mt={1} variant="body1">
                    Free return for all qualifying orders within
                    <b>14 days of your order delivery date.</b> Visit our Return
                    Policy for more information.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <MiniDialog
                goTo={goTo}
                imgSrc={data.colorsWithImages}
                itemName={data.product.itemName}
                color={selectedColor}
                size={selectedSize}
                price={
                  hasDiscount ? formattedDiscountPrice : formattedItemPrice
                }
                heading={heading}
                buttonText={buttonText}
                open={openMiniDialog}
                handleClose={handleClose}
              />
            </Grid>
            <Grid mt={5} item>
              {!getProductLoading && !getProductError && (
                <ProductCarousel
                  isLoading={getProductLoading}
                  heading="YOU MAY ALSO LIKE"
                  products={data.relatedProducts}
                />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductDetails;
