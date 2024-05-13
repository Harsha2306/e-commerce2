import { Grid, TextField } from "@mui/material";
import { Typography, Breadcrumbs } from "@mui/joy";
import { Link } from "react-router-dom";
import StyledButton from "../components/StyledButton";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../api/UserApi";
import { useReducer, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";

const reducer = (state, action) => {
  switch (action.type) {
    case "changeCurrentPassword": {
      const updatedState = { ...state, currentPassword: action.payload };
      updatedState.cpHasError = hasError(updatedState.currentPassword);
      updatedState.cpErrorMessage = setErrorMessage(
        updatedState.currentPassword
      );
      return updatedState;
    }
    case "changeNewPassword": {
      const updatedState = { ...state, newPassword: action.payload };
      updatedState.npHasError = hasError(updatedState.newPassword);
      updatedState.npErrorMessage = setErrorMessage(updatedState.newPassword);
      return updatedState;
    }
    case "changeConfirmNewPassword": {
      const updatedState = { ...state, confirmNewPassword: action.payload };
      updatedState.cnpHasError = hasError(updatedState.confirmNewPassword);
      updatedState.cnpErrorMessage = setErrorMessage(
        updatedState.confirmNewPassword
      );
      return updatedState;
    }
    case "setErrorAndMessageCP": {
      return { ...state, ...action.payload };
    }
    case "setErrorAndMessageNP": {
      return { ...state, ...action.payload };
    }
    case "setErrorAndMessageCNP": {
      return { ...state, ...action.payload };
    }
    case "reset": {
      return {
        ...state,
        cpHasError: false,
        npHasError: false,
        cnpHasError: false,
        cpErrorMessage: "",
        npErrorMessage: "",
        cnpErrorMessage: "",
      };
    }
  }
  throw Error("Unknown action: " + action.type);
};

const hasError = (password) => {
  if (password.trim().length === 0) return true;
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return pattern.test(password) ? false : true;
};

const setErrorMessage = (password) => {
  if (password.trim().length === 0) return "Please fill out this field.";
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return pattern.test(password)
    ? ""
    : "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.";
};

const EditPasswordPage = () => {
  const navigateTo = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    currentPassword: "",
    cpHasError: false,
    cpErrorMessage: "",
    newPassword: "",
    npErrorMessage: "",
    npHasError: false,
    confirmNewPassword: "",
    cnpErrorMessage: "",
    cnpHasError: false,
  });
  console.log(state.newPassword, state.confirmNewPassword);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [show, setShow] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const onSave = async () => {
    console.log(state);
    setIsUpdating(true);
    dispatch({ type: "reset" });
    const res = await changePassword(state);
    if (res.error && res.error.data && res.error.data.errorFields) {
      res.error.data.errorFields.map((err) => {
        if (err.field === "currentPassword")
          dispatch({
            type: "setErrorAndMessageCP",
            payload: { cpHasError: true, cpErrorMessage: err.errorMessage },
          });
        if (err.field === "newPassword")
          dispatch({
            type: "setErrorAndMessageNP",
            payload: { npHasError: true, npErrorMessage: err.errorMessage },
          });
        if (err.field === "confirmNewPassword")
          dispatch({
            type: "setErrorAndMessageCNP",
            payload: { cnpHasError: true, cnpErrorMessage: err.errorMessage },
          });
      });
    }
    if (res.data && res.data.ok) {
      setShow(true);
      setTimeout(() => {
        navigateTo("/account");
        setShow(false);
      }, 2000);
    }
    setIsUpdating(false);
  };
  return (
    <>
      {isLoading && (
        <Grid paddingY={10} display="flex" justifyContent="center">
          <CircularProgress color="neutral" size="lg" />
        </Grid>
      )}
      {!isLoading && show && (
        <Alert color="success">
          Password updated successfully. Redirecting to Account Page
        </Alert>
      )}
      {!isLoading && (
        <Grid paddingX={6}>
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
                    type: "changeCurrentPassword",
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
              {state.cpHasError && (
                <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
                  {state.cpErrorMessage}
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
                    type: "changeNewPassword",
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
              {state.npHasError && (
                <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
                  {state.npErrorMessage}
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
                    type: "changeConfirmNewPassword",
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
              {state.cnpHasError && (
                <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
                  {state.cnpErrorMessage}
                </Typography>
              )}
            </Grid>
            <Grid container>
              <Grid xs={6} item>
                <StyledButton
                  onClick={onSave}
                  margin="0px 0px 15px 0px"
                  variant="contained"
                  text="save"
                  width="95%"
                  height="40px"
                  color="white"
                  backgroundColor="black"
                  hoverStyles={{
                    color: "white",
                    backgroundColor: "black",
                  }}
                  startIcon={
                    isUpdating && <CircularProgress size="sm" color="neutral" />
                  }
                  disabled={isUpdating}
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
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default EditPasswordPage;
