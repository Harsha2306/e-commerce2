import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Typography } from "@mui/joy";
import ProductCarousel from "../components/ProductCarousel";
import Panel from "../components/Panel";
import EnhancedEncryptionOutlinedIcon from "@mui/icons-material/EnhancedEncryptionOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ImageContainer from "../components/ImageContainer";
import Footer from "../components/Footer";
import { useGetRecommendedAndNewArrivalsQuery } from "../api/UserApi";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const location = useLocation();
  const { data, isLoading, isError, refetch } =
    useGetRecommendedAndNewArrivalsQuery();

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  return (
    <>
      {!isLoading && !isError && (
        <>
          <Grid
            borderTop={2}
            borderColor="white"
            sx={{ width: "100%", height: "100%" }}
          >
            <img
              alt="error"
              style={{ width: "100%", height: "100%" }}
              src="https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Grid>
          <Grid
            container
            columnGap={7}
            mt={5}
            display="flex"
            justifyContent="center"
            mb={5}
          >
            <ImageContainer
              navigationLink="/products/men"
              imgLink="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/625867/01/mod01/fnd/IND/fmt/png/PUMA-HOOPS-x-CHEETOS-Men's-Hoodie"
            />
            <ImageContainer
              navigationLink="/products/women"
              imgLink="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/677814/80/mod01/fnd/IND/fmt/png/Small-Logo-Women's-T-Shirt"
            />
            <ImageContainer
              navigationLink="/products/kids"
              imgLink="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/624196/02/mod01/fnd/IND/fmt/png/BMW-M-Motorsport-Youth-Tee"
            />
          </Grid>
          <Grid marginX={3} mt={3} mb={5}>
            <ProductCarousel
              heading="RECOMMENDED FOR YOU"
              products={data.products.recommended}
            />
          </Grid>
          <Grid>
            <Typography
              padding={3}
              level="h1"
              sx={{ fontSize: "50px", backgroundColor: "yellow" }}
              textAlign="center"
            >
              STYLE UP, STAND OUT
            </Typography>
          </Grid>
          <Grid marginX={3} mt={5}>
            <ProductCarousel
              heading="NEW ARRIVALS"
              products={data.products.newArrivals}
            />
          </Grid>
          <Grid
            mt={8}
            direction="row"
            columnGap={3}
            display="flex"
            justifyContent="center"
            container
          >
            <Panel
              icon={
                <EnhancedEncryptionOutlinedIcon sx={{ fontSize: "50px" }} />
              }
              heading="SECURE PAYMENTS"
              text="SSL ENCRYPTION ON ALL TRANSACTIONS"
            />
            <Panel
              icon={<LocalShippingOutlinedIcon sx={{ fontSize: "50px" }} />}
              heading="FREE & FAST RETURNS"
              text="FREE RETURN ON ALL QUALIFYING ORDERS"
            />
            <Panel
              icon={<MessageOutlinedIcon sx={{ fontSize: "50px" }} />}
              heading="ACTIVE SUPPORT"
              text="GET IN TOUCH IF YOU HAVE A PROBLEM"
            />
          </Grid>
          <Footer />
        </>
      )}
    </>
  );
};

export default LandingPage;
