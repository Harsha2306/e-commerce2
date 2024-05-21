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
  useGetCheckIfProductPresentInWishlistQuery,
} from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import CircularProgressJ from "@mui/joy/CircularProgress";
import SessionExpiredAlert from "./SessionExpiredAlert";
import { useLocation } from "react-router-dom";
import { setCartCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

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
  const [imgIndex, setImgIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [openMiniDialog, setOpenMiniDialog] = useState(false);
  const [heading, setHeading] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(sizes[imgIndex]);
  const { data, isError, isLoading, error } = useGetProductByIdQuery(productId);
  const checkIfProductPresentInWishlist =
    useGetCheckIfProductPresentInWishlistQuery({
      productId,
      selectedSize,
      selectedColor,
    });
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingToWihlist, setIsAddingToWishlist] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigateTo = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  let hasDiscount = undefined;
  let discountedPrice;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (data && data.ok) {
      setSizes(data.product.itemAvailableSizes);
      setSelectedSize(sizes[0]);
      setColors(data.colorsWithImages);
      setSelectedColor(data.colorsWithImages[0].color);
    }
  }, [data, sizes]);

  useEffect(() => {
    colors &&
      colors.map((clr, idx) => {
        if (clr.color === selectedColor) {
          setImgIndex(idx);
          return;
        }
      });
  }, [selectedColor]);

  if (data && data.product) {
    hasDiscount = data.product.itemDiscount === 0 ? false : true;
    if (hasDiscount) {
      discountedPrice = Math.round(
        data.product.itemPrice -
          data.product.itemPrice * (data.product.itemDiscount / 100)
      );
    }
  }

  const handleClose = () => setOpenMiniDialog(false);
  const handleOpenCart = async () => {
    // TODO check jwt expired case for every api call
    setIsAdding(true);
    const res = await addToCart({
      productId,
      size: selectedSize,
      color: selectedColor,
    });
    console.log(res)
    setIsAdding(false);
    if (res.error) {
      if (res.error.status === 401) navigateTo("/login");
      else if (res.error.data.message === "jwt expired") {
        setShowAlert(true);
        setTimeout(() => {
          navigateTo("/login");
        }, 3000);
      }
    } else {
      setHeading("Added to Cart");
      setButtonText("view cart & checkout");
      setOpenMiniDialog(true);
      dispatch(setCartCount(res.data.cartLength))
    }
  };

  const handleOpenWishlist = async () => {
    setIsAddingToWishlist(true);
    const res = await addToWishlist({
      productId,
      size: selectedSize,
      color: selectedColor,
    });
    setIsAddingToWishlist(false);
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
      checkIfProductPresentInWishlist.refetch();
    }
  };

  return (
    <>
      {isLoading && (
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
      {!isLoading && <SessionExpiredAlert show={showAlert} />}
      {!isLoading && !isError && (
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
              <Typography variant="body1">{data.product.itemName}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid marginX={3}>
            <Grid height="100%" width="100%" container sx={{ marginX: 0 }}>
              <Grid item direction="row" container xs={8}>
                <>
                  <ImgContainer
                    left={
                      colors && colors[imgIndex] && colors[imgIndex].imgs[0]
                    }
                    right={
                      colors && colors[imgIndex] && colors[imgIndex].imgs[1]
                    }
                    isLoading={isLoading}
                  />
                  <ImgContainer
                    left={
                      colors && colors[imgIndex] && colors[imgIndex].imgs[2]
                    }
                    right={
                      colors && colors[imgIndex] && colors[imgIndex].imgs[3]
                    }
                    isLoading={isLoading}
                  />
                  <ImgContainer
                    left={
                      colors && colors[imgIndex] && colors[imgIndex].imgs[4]
                    }
                    right={
                      colors && colors[imgIndex] && colors[imgIndex].imgs[5]
                    }
                    isLoading={isLoading}
                  />
                </>
              </Grid>
              <Grid item direction="column" container marginX={2} xs>
                <Grid item>
                  <Typography padding={1} variant="h4">
                    {data.product.itemName}
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
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                      }).format(discountedPrice)}
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
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                    }).format(data.product.itemPrice)}
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
                      {colors &&
                        colors.map((clr) => (
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
                  <SizeContext.Provider
                    value={{ selectedSize, setSelectedSize }}
                  >
                    {data.product.itemAvailableSizes &&
                      data.product.itemAvailableSizes.map((size) => (
                        <Size productSize={size} key={size} />
                      ))}
                  </SizeContext.Provider>
                </Grid>
                <Grid mb={2} item padding={1} container>
                  <Grid xs item>
                    <StyledButton
                      margin="0px 0px 15px 0px"
                      variant="contained"
                      text={!isAdding && "add to cart"}
                      width="100%"
                      height="40px"
                      color="white"
                      backgroundColor="black"
                      hoverStyles={{
                        color: "white",
                        backgroundColor: "black",
                      }}
                      startIcon={
                        isAdding && (
                          <CircularProgressJ size="sm" color="neutral" />
                        )
                      }
                      onClick={handleOpenCart}
                    />
                    <StyledButton
                      onClick={handleOpenWishlist}
                      variant="contained"
                      text={
                        !isAddingToWihlist && checkIfProductPresentInWishlist &&
                        !checkIfProductPresentInWishlist.isLoading &&
                        !checkIfProductPresentInWishlist.isError && checkIfProductPresentInWishlist.data &&
                        checkIfProductPresentInWishlist.data.addedToWishList
                          ? "added to wishlist"
                          : "add to wishlist"
                      }
                      width="100%"
                      height="40px"
                      color={"white"}
                      startIcon={
                        isAddingToWihlist ? (
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
                    {data.product.itemDescription}
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
                imgSrc={data.colorsWithImages}
                itemName={data.product.itemName}
                color={selectedColor}
                size={selectedSize}
                price={hasDiscount ? discountedPrice : data.product.itemPrice}
                heading={heading}
                buttonText={buttonText}
                open={openMiniDialog}
                handleClose={handleClose}
              />
            </Grid>
            <Grid mt={5} item>
              {!isLoading && !isError && (
                <ProductCarousel
                  isLoading={isLoading}
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
