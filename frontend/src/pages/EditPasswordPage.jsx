import { Grid, TextField } from "@mui/material";
import { Typography, Breadcrumbs, CircularProgress, Alert } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import StyledButton from "../components/StyledButton";
import { useChangePasswordMutation } from "../api/UserApi";
import { useReducer, useState } from "react";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_CURRENT_PASSWORD_CHANGE": {
      const updatedState = { ...state, currentPassword: action.payload };
      updatedState.currentPassWordError = setErrorMessage(
        updatedState.currentPassword
      );
      updatedState.currentPasswordHasError =
        updatedState.currentPassWordError !== "";
      return updatedState;
    }
    case "ON_NEW_PASSWORD_CHANGE": {
      const updatedState = { ...state, newPassword: action.payload };
      updatedState.newPasswordError = setErrorMessage(updatedState.newPassword);
      updatedState.newPasswordHasError = updatedState.newPasswordError !== "";
      if (
        !updatedState.newPasswordHasError &&
        updatedState.confirmNewPassword.trim().length !== 0
      ) {
        if (updatedState.newPassword !== updatedState.confirmNewPassword) {
          updatedState.newPasswordHasError = true;
          updatedState.newPasswordError =
            "New password doesn't match with confirm new password";
          updatedState.confirmNewPasswordHasError = true;
          updatedState.confirmNewPasswordError =
            "New password doesn't match with confirm new password";
        } else {
          updatedState.newPasswordError = setErrorMessage(
            updatedState.newPassword
          );
          updatedState.newPasswordHasError =
            updatedState.newPasswordError !== "";
          updatedState.confirmNewPasswordError = setErrorMessage(
            updatedState.confirmNewPassword
          );
          updatedState.confirmNewPasswordHasError =
            updatedState.confirmNewPasswordError !== "";
        }
      }
      return updatedState;
    }
    case "ON_CONFIRM_PASSWORD_CHANGE": {
      const updatedState = { ...state, confirmNewPassword: action.payload };
      updatedState.confirmNewPasswordError = setErrorMessage(
        updatedState.confirmNewPassword
      );
      updatedState.confirmNewPasswordHasError =
        updatedState.confirmNewPasswordError !== "";
      if (
        !updatedState.confirmNewPasswordHasError &&
        updatedState.newPassword.trim().length !== 0
      ) {
        if (updatedState.newPassword !== updatedState.confirmNewPassword) {
          updatedState.newPasswordHasError = true;
          updatedState.newPasswordError =
            "New password doesn't match with confirm new password";
          updatedState.confirmNewPasswordHasError = true;
          updatedState.confirmNewPasswordError =
            "New password doesn't match with confirm new password";
        } else {
          updatedState.newPasswordError = setErrorMessage(
            updatedState.newPassword
          );
          updatedState.newPasswordHasError =
            updatedState.newPasswordError !== "";
          updatedState.confirmNewPasswordError = setErrorMessage(
            updatedState.confirmNewPassword
          );
          updatedState.confirmNewPasswordHasError =
            updatedState.confirmNewPasswordError !== "";
        }
      }
      return updatedState;
    }
    case "SET_CURRENT_PASSWORD_ERROR": {
      return {
        ...state,
        currentPasswordHasError: true,
        currentPassWordError: action.payload,
      };
    }
    case "SET_NEW_PASSWORD_ERROR": {
      return {
        ...state,
        newPasswordHasError: true,
        newPasswordError: action.payload,
      };
    }
    case "SET_CONFIRM_NEW_PASSWORD_ERROR": {
      return {
        ...state,
        confirmNewPasswordHasError: true,
        confirmNewPasswordError: action.payload,
      };
    }
    case "RESET": {
      return {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        currentPasswordHasError: false,
        newPasswordHasError: false,
        confirmNewPasswordHasError: false,
        currentPassWordError: "",
        newPasswordError: "",
        confirmNewPasswordError: "",
      };
    }
  }
};

const setErrorMessage = (password) => {
  if (password.trim().length === 0) return "Please fill out this field.";
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return pattern.test(password)
    ? ""
    : "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.";
};

const EditPasswordPage = () => {
  useIsLoggedIn();
  const navigateTo = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    currentPasswordHasError: false,
    newPasswordHasError: false,
    confirmNewPasswordHasError: false,
    currentPassWordError: "",
    newPasswordError: "",
    confirmNewPasswordError: "",
  });
  const [show, setShow] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const onSave = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = state;
    const res = await changePassword({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    if (res.error && res.error.data && res.error.data.errorFields) {
      res.error.data.errorFields.map((err) => {
        if (err.field === "currentPassword") {
          dispatch({
            type: "SET_CURRENT_PASSWORD_ERROR",
            payload: err.errorMessage,
          });
        }
        if (err.field === "newPassword") {
          dispatch({
            type: "SET_NEW_PASSWORD_ERROR",
            payload: err.errorMessage,
          });
        }
        if (err.field === "confirmNewPassword") {
          dispatch({
            type: "SET_CONFIRM_NEW_PASSWORD_ERROR",
            payload: err.errorMessage,
          });
        }
      });
    } else {
      dispatch({ type: "RESET" });
      setShow(true);
      setTimeout(() => {
        onBackToMyAccount();
      }, 2000);
    }
  };
  const onBackToMyAccount = () => navigateTo("/account");
  const disabled =
    state.currentPasswordHasError ||
    state.newPasswordHasError ||
    state.confirmNewPasswordHasError ||
    state.currentPassword.trim().length === 0 ||
    state.newPassword.trim().length === 0 ||
    state.confirmNewPassword.trim().length === 0;

  return (
    <>
      {show && (
        <Alert color="success">
          Password updated successfully. Redirecting to Account Page
        </Alert>
      )}
      {
        <Grid paddingX={6} mt={!show ? 12 : 0}>
          <Breadcrumbs sx={{ paddingX: "0px" }}>
            <Link style={{ color: "blue" }} to="/">
              <Typography variant="body1" sx={{ color: "blue" }}>
                Home
              </Typography>
            </Link>
            <Link style={{ color: "blue" }} to="/account">
              <Typography variant="body1" sx={{ color: "blue" }}>
                My account
              </Typography>
            </Link>
            <Typography variant="body1">Password</Typography>
          </Breadcrumbs>
          <Grid
            paddingY={2}
            container
            direction="column"
            item
            paddingX={35}
            xs={12}
          >
            <Grid item mb={2} xs={12}>
              <Typography level="h3">Change password</Typography>
            </Grid>
            <Grid item>
              <Typography paddingY={0.5} level="title-sm">
                CURRENT PASSWORD <Typography color="danger">*</Typography>
              </Typography>
            </Grid>
            <Grid mb={2} item>
              <TextField
                onChange={(e) =>
                  dispatch({
                    type: "ON_CURRENT_PASSWORD_CHANGE",
                    payload: e.target.value,
                  })
                }
                value={state.currentPassword}
                type="password"
                placeholder="Enter your Password here"
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  borderColor: "black",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black",
                    },
                }}
              />
              {state.currentPasswordHasError && (
                <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
                  {state.currentPassWordError}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography paddingY={0.5} level="title-sm">
                NEW PASSWORD <Typography color="danger">*</Typography>
              </Typography>
            </Grid>
            <Grid mb={2} item>
              <TextField
                onChange={(e) =>
                  dispatch({
                    type: "ON_NEW_PASSWORD_CHANGE",
                    payload: e.target.value,
                  })
                }
                value={state.newPassword}
                type="password"
                placeholder="Enter your Password here"
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  borderColor: "black",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black",
                    },
                }}
              />
              {state.newPasswordHasError && (
                <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
                  {state.newPasswordError}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography paddingY={0.5} level="title-sm">
                CONFIRM NEW PASSWORD <Typography color="danger">*</Typography>
              </Typography>
            </Grid>
            <Grid mb={2} item>
              <TextField
                value={state.confirmNewPassword}
                onChange={(e) =>
                  dispatch({
                    type: "ON_CONFIRM_PASSWORD_CHANGE",
                    payload: e.target.value,
                  })
                }
                type="password"
                placeholder="Enter your Password here"
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  borderColor: "black",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "black",
                    },
                }}
              />
              {state.confirmNewPasswordHasError && (
                <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
                  {state.confirmNewPasswordError}
                </Typography>
              )}
            </Grid>
            <Grid container>
              <Grid xs={6} item>
                <StyledButton
                  onClick={onSave}
                  margin="0px 0px 15px 0px"
                  variant="contained"
                  text={!isLoading && "save"}
                  width="95%"
                  height="40px"
                  color="white"
                  backgroundColor="black"
                  hoverStyles={{
                    color: "white",
                    backgroundColor: "black",
                  }}
                  startIcon={
                    isLoading && <CircularProgress size="sm" color="neutral" />
                  }
                  disabled={isLoading || disabled}
                />
              </Grid>
              <Grid xs display="flex" justifyContent="flex-end" item>
                <StyledButton
                  margin="0px 0px 15px 0px"
                  variant="contained"
                  text="back to my account"
                  width="95%"
                  height="40px"
                  color="white"
                  backgroundColor="black"
                  hoverStyles={{ color: "white", backgroundColor: "black" }}
                  onClick={onBackToMyAccount}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </>
  );
};

export default EditPasswordPage;
