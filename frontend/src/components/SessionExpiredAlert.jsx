import React from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import Alert from "@mui/joy/Alert";
import { Typography } from "@mui/material";

const SessionExpiredAlert = ({ show }) => {
  return (
    <>
      {show && (
        <Alert
          size="lg"
          color="danger"
          variant="solid"
          invertedColors
          sx={{
            alignItems: "flex-start",
            overflow: "hidden",
            borderRadius: "0px",
          }}
        >
          <div>
            <Typography level="title-lg">Alert</Typography>
            <Typography level="body-sm">
              Previous session has been expired. Redirecting you to Login page
            </Typography>
          </div>
          <LinearProgress
            variant="solid"
            color="success"
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

export default SessionExpiredAlert;
