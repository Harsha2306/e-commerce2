/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, Divider } from "@mui/joy";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledButton from "./StyledButton";
import { useNavigate } from "react-router-dom";

const MiniDialog = ({
  heading,
  buttonText,
  open,
  handleClose,
  imgSrc,
  itemName,
  color,
  size,
  price,
  goTo,
}) => {
  const navigateTo = useNavigate();
  const onButtonClick = () => navigateTo(goTo);
  const idx = imgSrc && imgSrc.findIndex((img) => img.color === color);

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            width: "500px",
            height: "395px",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container>
            <Grid xs item>
              <Typography level="h3">{heading}</Typography>
            </Grid>
            <Grid xs item display="flex" justifyContent="flex-end">
              <CloseIcon
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={handleClose}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container mb={1}>
            <Grid xs={5} item>
              <img
                src={idx === -1 ? `` : imgSrc[idx].imgs[0]}
                alt="error"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
            <Grid ml={2} xs padding={2} item>
              <Typography level="title-lg" sx={{ fontSize: "20px" }}>
                {itemName}
              </Typography>
              <Typography mb={2} level="body-sm">
                {color}
              </Typography>
              <Typography level="body-md" mb={1} sx={{ color: "black" }}>
                SIZE: <Typography level="body-sm">{size}</Typography>
              </Typography>
              <Typography mb={1} level="body-md" sx={{ color: "black" }}>
                PRICE: <Typography level="body-sm">{price}</Typography>
              </Typography>
            </Grid>
          </Grid>
          <StyledButton
            onClick={onButtonClick}
            text={buttonText}
            height="40px"
            color={"white"}
            backgroundColor={"black"}
            width="100%"
            hoverStyles={{
              color: "white",
              backgroundColor: "black",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MiniDialog;
