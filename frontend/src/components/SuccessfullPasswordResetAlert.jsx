/* eslint-disable react/prop-types */
import LinearProgress from "@mui/joy/LinearProgress";
import Alert from "@mui/joy/Alert";
import { Typography } from "@mui/material";

const SuccessfullPasswordResetAlert = ({ show, isError, msgText }) => {
  return (
    <>
      {show && (
        <Alert
          size="lg"
          color={isError ? "danger" : "success"}
          variant="solid"
          invertedColors
          sx={{
            alignItems: "flex-start",
            overflow: "hidden",
            borderRadius: "0px",
          }}
        >
          <div>
            <Typography level="title-lg">ALERT</Typography>
            <Typography level="body-sm">{msgText}</Typography>
          </div>
          <LinearProgress
            variant="solid"
            color={isError ? "danger" : "success"}
            value={40}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
            }}
          />
        </Alert>
      )}
    </>
  );
};

export default SuccessfullPasswordResetAlert;
