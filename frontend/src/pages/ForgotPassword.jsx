import { Grid, TextField } from "@mui/material";
import { Typography, CircularProgress } from "@mui/joy";
import { useState } from "react";
import StyledButton from "../components/StyledButton";
import { useForgotPasswordMutation } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const validateEmail = (email, cb) => {
  if (email.trim().length === 0) {
    cb(true);
    return "Please fill out this field.";
  }
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (pattern.test(email)) {
    cb(false);
    return "";
  } else {
    cb(true);
    return "You need to have a valid email.";
  }
};

const ForgotPassword = () => {
  useIsLoggedIn()
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailErrorMessage(validateEmail(e.target.value, setEmailError));
  };

  const onContinue = async () => {
    const res = await forgotPassword({ email });
    if (res.error && res.error.data && res.error.data.errorFields) {
      res.error.data.errorFields.map((err) => {
        if (err.field === "email") {
          setEmailError(true);
          setEmailErrorMessage(err.errorMessage);
        }
      });
    } else if (res?.error) {
      navigateTo("/login");
    } else {
      setShow(true);
    }
  };

  const disabled = email.trim().length === 0 || emailError;

  return (
    <>
      <Grid mx="450px" mt={15}>
        {show && (
          <Grid container>
            <Grid display="flex" justifyContent="center" item xs={12}>
              <Typography color="success" level="h4">
                {`We have sent an email to ${email}.`}
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography>
                Wait a few minutes. Sometimes emails can take some time to come
                through.
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography>
                Check your spam/junk inbox. If it is there, mark it as not spam!
              </Typography>
            </Grid>
          </Grid>
        )}
        {!show && (
          <>
            <Grid paddingY={2} item xs={12}>
              <Typography level="body-md">
                Enter the email address associated with your account.
              </Typography>
            </Grid>
            <Grid paddingBottom={3} container direction="column" item xs={12}>
              <Grid item>
                <Typography paddingY={0.5} level="title-sm">
                  EMAIL <Typography color="danger">*</Typography>
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  value={email}
                  onChange={emailChangeHandler}
                  placeholder="Enter your Email here"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "50px",
                    borderColor: emailError ? "rgb(182 41 6)" : "black",
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: emailError ? "rgb(182 41 6)" : "black",
                      },
                  }}
                />
              </Grid>
              {emailError && (
                <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
                  {emailErrorMessage}
                </Typography>
              )}
            </Grid>
            <Grid>
              <StyledButton
                endIcon={
                  isLoading && (
                    <CircularProgress
                      size="sm"
                      variant="solid"
                      color="neutral"
                    />
                  )
                }
                onClick={onContinue}
                disabled={disabled}
                text={!isLoading && "Continue"}
                height="50px"
                color={disabled ? "rgb(59 64 71)" : "white"}
                backgroundColor={disabled ? "rgb(189 193 197)" : "black"}
                width="100%"
                hoverStyles={{
                  color: disabled ? "rgb(59 64 71)" : "white",
                  backgroundColor: disabled ? "rgb(189 193 197)" : "black",
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default ForgotPassword;
