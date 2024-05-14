/* eslint-disable react/prop-types */
import { useState } from "react";
import { Grid, Chip } from "@mui/material";
import StyledButton from "./StyledButton";
import { Typography } from "@mui/joy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//if out of stock dont enable button
const WishListItem = ({ name, price, color, size, img }) => {
  const [open, setOpen] = useState(false);

  const onRemoveButtonClick = () => {};
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
        <Typography level="body-md" mb={1} sx={{ color: "rgb(108 108 108)" }}>
          SIZE:
          <Typography level="body-md" sx={{ color: "rgb(108 108 108)" }}>
            {size}
          </Typography>
        </Typography>
        <Typography mb={1} level="body-md" sx={{ color: "rgb(108 108 108)" }}>
          PRICE:
          <Typography level="body-md" sx={{ color: "rgb(108 108 108)" }}>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            }).format(price)}
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
                <DialogContentText id="alert-dialog-description">
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
                      <Typography
                        level="body-md"
                        mb={1}
                        sx={{ color: "black" }}
                      >
                        SIZE: <Typography level="body-sm">{size}</Typography>
                      </Typography>
                      <Typography
                        mb={1}
                        level="body-md"
                        sx={{ color: "black" }}
                      >
                        PRICE:
                        <Typography level="body-sm">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 0,
                          }).format(price)}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <StyledButton
                  variant="contained"
                  width="50%"
                  height="40px"
                  color="white"
                  backgroundColor="black"
                  hoverStyles={{ color: "white", backgroundColor: "black" }}
                  text="remove"
                  onClick={onRemoveButtonClick}
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
          text="add to cart"
        />
      </Grid>
    </Grid>
  );
};

export default WishListItem;
