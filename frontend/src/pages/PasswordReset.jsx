import { Grid, TextField } from "@mui/material";
import { Typography } from "@mui/joy";
import { useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import StyledButton from "../components/StyledButton";
import { useParams, useNavigate } from "react-router-dom";
import { useResetForgottenPasswordMutation } from "../api/UserApi";
import SuccessfullPasswordResetAlert from "../components/SuccessfullPasswordResetAlert";

const validatePassword = (password, cb) => {
  if (password.trim().length === 0) {
    cb(true);
    return "Please fill out this field.";
  }
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (pattern.test(password)) {
    cb(false);
    return "";
  } else {
    cb(true);
    return "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.";
  }
};

const PasswordReset = () => {
  const { token } = useParams();
  const navigateTo = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [reset, { isLoading, isError }] = useResetForgottenPasswordMutation();
  const [show, setShow] = useState(false);
  const [msgText, setMsgText] = useState("");

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErrorMessage(validatePassword(e.target.value, setPasswordError));
  };

  console.log(isError);

  const onReset = async () => {
    const res = await reset({ password, token });
    console.log(res);

    if (res?.error?.data?.errorFields) {
      res.error.data.errorFields.map((err) => {
        if (err.field === "password") {
          setPasswordError(true);
          setPasswordErrorMessage(err.errorMessage);
        }
      });
    } else if (res?.error?.data?.message === "jwt expired") {
      setMsgText("Token Expired. Redirecting to login page");
      setPassword("");
      setShow(true);
      setTimeout(() => navigateTo("/login"), 2000);
    } else if (res?.error?.data?.message) {
      setMsgText(
        "An error occured, Please contact your administrator. Redirecting to login page"
      );
      setPassword("");
      setShow(true);
      setTimeout(() => navigateTo("/login"), 2000);
    } else {
      setMsgText("Password changed successfully. Redirecting to login page");
      setPassword("");
      setShow(true);
      setTimeout(() => navigateTo("/login"), 2000);
    }
  };

  const disabled = password.trim().length === 0 || passwordError;

  return (
    <>
      <SuccessfullPasswordResetAlert
        show={show}
        isError={isError}
        msgText={msgText}
      />
      <Grid mt={15} mx="450px">
        <Grid item xs={12}>
          <Typography paddingY={1} level="title-md">
            Enter new password <Typography color="danger">*</Typography>
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            value={password}
            onChange={passwordChangeHandler}
            type="password"
            placeholder="Enter your Password here"
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: "50px",
              borderColor: passwordError ? "rgb(182 41 6)" : "black",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: passwordError ? "rgb(182 41 6)" : "black",
                },
            }}
          />
        </Grid>
        {passwordError && (
          <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
            {passwordErrorMessage}
          </Typography>
        )}
        <Grid mt={2}>
          <StyledButton
            endIcon={
              isLoading && (
                <CircularProgress size="sm" variant="solid" color="neutral" />
              )
            }
            onClick={onReset}
            disabled={disabled}
            text={!isLoading && "Reset"}
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
      </Grid>
    </>
  );
};

export default PasswordReset;
