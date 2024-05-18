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
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const CartItem = (name, price, size, color, quantity) => {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState("1");

  const onRemoveButtonClick = () => {};
  const handleChange = (e) => {
    setQty(e.target.textContent);
  };

  return (
    <Grid border={1.5} borderColor="lightgray" mb={3} container item xs={12}>
      <Grid padding={2} xs={3} item>
        <img
          src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/393771/06/sv01/fnd/IND/fmt/png/RS-X-Efekt-Lux-Women's-Sneakers"
          alt="error"
          style={{ width: "100%", height: "100%" }}
        />
      </Grid>
      <Grid xs ml={2} padding={2} item>
        <Typography level="title-lg" sx={{ fontSize: "20px" }}>
          RS-X Efekt Lux Women's Sneakers
        </Typography>
        <Typography mb={2} level="body-lg" sx={{ color: "rgb(108 108 108)" }}>
          Vapor Gray-PUMA White
        </Typography>
        <Typography level="body-md" mb={1} sx={{ color: "rgb(108 108 108)" }}>
          SIZE:
          <Typography level="body-md" sx={{ color: "rgb(108 108 108)" }}>
            UK 6.5
          </Typography>
        </Typography>
        <Typography mb={1} level="body-md" sx={{ color: "rgb(108 108 108)" }}>
          PRICE:
          <Typography level="body-md" sx={{ color: "rgb(108 108 108)" }}>
            ₹11,999
          </Typography>
        </Typography>
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
                <DialogContentText id="alert-dialog-description">
                  <Grid container>
                    <Grid xs={3} item>
                      <img
                        src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/393771/06/sv01/fnd/IND/fmt/png/RS-X-Efekt-Lux-Women's-Sneakers"
                        alt="error"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Grid>
                    <Grid ml={2} xs padding={2} item>
                      <Typography level="title-lg" sx={{ fontSize: "20px" }}>
                        RS-X Efekt Lux Women's Sneakers
                      </Typography>
                      <Typography mb={2} level="body-sm">
                        Vapor Gray-PUMA White
                      </Typography>
                      <Typography
                        level="body-md"
                        mb={1}
                        sx={{ color: "black" }}
                      >
                        SIZE: <Typography level="body-sm">UK 6.5</Typography>
                      </Typography>
                      <Typography
                        mb={1}
                        level="body-md"
                        sx={{ color: "black" }}
                      >
                        PRICE: <Typography level="body-sm">₹11,999</Typography>
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
          <Grid display="flex" alignItems="center" item>
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
          <Grid display="flex" alignItems="center" item>
            <Select
              sx={{ border: "1px solid darkgray" }}
              value={qty}
              onChange={handleChange}
              variant="plain"
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
