/* eslint-disable react/prop-types */
import { Typography, Divider } from "@mui/joy";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeleteDialog = ({ itemName, handleClose, open, available }) => {
  const onButtonClick = () => {};
  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            width: "500px",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container>
            <Grid xs={10} item>
              <Typography level="h3">
                Are you sure you want to make
                {available ? " Unavailable" : " Available"}
              </Typography>
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
            <Grid xs={12} item>
              <Grid
                display="flex"
                justifyContent="center"
                xs={12}
                padding={2}
                item
              >
                <Typography level="title-lg" sx={{ fontSize: "20px" }}>
                  {itemName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item display="flex" justifyContent="center" xs={12}>
              <Button
                sx={{ width: "450px" }}
                onClick={onButtonClick}
                color="error"
                variant="contained"
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
