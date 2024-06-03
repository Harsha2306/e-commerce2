import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Typography } from "@mui/joy";
import StyledButton from "../components/StyledButton";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { usePostRegisterMutation } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameErr, setLastNameErr] = useState(false);
  const [lastNameErrMsg, setLastNameErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [postRegister, {isLoading: loading}] = usePostRegisterMutation();
  const navigateTo = useNavigate();

  const isRegisterButtonDisabled = !(
    !emailError &&
    !passwordError &&
    !firstNameErr &&
    !lastNameErr &&
    email.trim().length !== 0 &&
    password.trim().length !== 0 &&
    firstName.trim().length !== 0 &&
    lastName.trim().length !== 0
  );

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailErrorMessage(validateEmail(e.target.value));
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErrorMessage(validatePassword(e.target.value));
  };

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
    setFirstNameErrMsg(validateFirstName(e.target.value));
  };

  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
    setLastNameErrMsg(validateLastName(e.target.value));
  };

  const validateLastName = (lastName) => {
    if (lastName.trim().length === 0) {
      setLastNameErr(true);
      return "Please fill out this field.";
    }
    const pattern = /^[a-zA-Z]{3,}$/;
    if (pattern.test(lastName)) {
      setLastNameErr(false);
      return "";
    } else {
      setLastNameErr(true);
      return "Last name should contain at least 3 characters (no numbers, spaces, or special characters).";
    }
  };

  const validatePassword = (password) => {
    if (password.trim().length === 0) {
      setPasswordError(true);
      return "Please fill out this field.";
    }
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (pattern.test(password)) {
      setPasswordError(false);
      return "";
    } else {
      setPasswordError(true);
      return "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.";
    }
  };

  const validateEmail = (email) => {
    if (email.trim().length === 0) {
      setEmailError(true);
      return "Please fill out this field.";
    }
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(email)) {
      setEmailError(false);
      return "";
    } else {
      setEmailError(true);
      return "You need to have a valid email.";
    }
  };

  const validateFirstName = (firstName) => {
    if (firstName.trim().length === 0) {
      setFirstNameErr(true);
      return "Please fill out this field.";
    }
    const pattern = /^[a-zA-Z]{3,}$/;
    if (pattern.test(firstName)) {
      setFirstNameErr(false);
      return "";
    } else {
      setFirstNameErr(true);
      return "First name should contain at least 3 characters (no numbers, spaces, or special characters).";
    }
  };

  const registerUser = async () => {
    const res = await postRegister({
      firstName,
      lastName,
      email,
      password,
    });
    if (res.error && res.error.data && res.error.data.errorFields) {
      res.error.data.errorFields.map((err) => {
        if (err.field === "email") {
          setEmailError(true);
          setEmailErrorMessage(err.errorMessage);
        }
        if (err.field === "firstName") {
          setFirstNameErr(true);
          setFirstNameErrMsg(err.errorMessage);
        }
        if (err.field === "lastName") {
          setLastNameErr(true);
          setLastNameErrMsg(err.errorMessage);
        }
        if (err.field === "password") {
          setPasswordError(true);
          setPasswordErrorMessage(err.errorMessage);
        }
      });
    }
    if (res.data && res.data.ok) {
      navigateTo("/login");
    }
  };

  return (
    <>
      <Grid container mt={15}>
        <Grid
          padding={1}
          item
          display="flex"
          justifyContent="center"
          xs={12}
          sx={{
            borderBottom: "2px solid black",
            margin: "0px 350px 0px 350px",
          }}
        >
          <Typography level="h3">Register</Typography>
        </Grid>
        <Grid
          paddingY={3}
          container
          direction="column"
          item
          sx={{ margin: "0px 350px 0px 350px" }}
          xs={12}
        >
          <Grid item>
            <Typography paddingY={0.5} level="title-sm">
              FIRST NAME <Typography color="danger">*</Typography>
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              value={firstName}
              onChange={firstNameChangeHandler}
              placeholder="Enter your First name here"
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
          </Grid>
          {firstNameErr && (
            <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
              {firstNameErrMsg}
            </Typography>
          )}
        </Grid>
        <Grid
          paddingBottom={3}
          container
          direction="column"
          item
          sx={{ margin: "0px 350px 0px 350px" }}
          xs={12}
        >
          <Grid item>
            <Typography paddingY={0.5} level="title-sm">
              LAST NAME <Typography color="danger">*</Typography>
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              value={lastName}
              onChange={lastNameChangeHandler}
              placeholder="Enter your Last name here"
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
          </Grid>
          {lastNameErr && (
            <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
              {lastNameErrMsg}
            </Typography>
          )}
        </Grid>
        <Grid
          paddingBottom={3}
          container
          direction="column"
          item
          sx={{ margin: "0px 350px 0px 350px" }}
          xs={12}
        >
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
                borderColor: "black",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "black",
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
        <Grid
          paddingBottom={3}
          container
          direction="column"
          item
          sx={{ margin: "0px 350px 0px 350px" }}
          xs={12}
        >
          <Grid item>
            <Typography paddingY={0.5} level="title-sm">
              PASSWORD <Typography color="danger">*</Typography>
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
                borderColor: "black",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "black",
                  },
              }}
            />
          </Grid>
          {passwordError && (
            <Typography sx={{ color: "rgb(182 41 6)" }} level="body-sm">
              {passwordErrorMessage}
            </Typography>
          )}
        </Grid>
        <Grid sx={{ margin: "0px 350px 0px 350px" }} item xs={12}>
          <StyledButton
            endIcon={
              !isRegisterButtonDisabled &&
              loading && (
                <CircularProgress size="sm" variant="solid" color="neutral" />
              )
            }
            onClick={registerUser}
            disabled={isRegisterButtonDisabled}
            text={!loading && "Sign up"}
            height="50px"
            color={isRegisterButtonDisabled ? "rgb(59 64 71)" : "white"}
            backgroundColor={
              isRegisterButtonDisabled ? "rgb(189 193 197)" : "black"
            }
            width="100%"
            hoverStyles={{
              color: isRegisterButtonDisabled ? "rgb(59 64 71)" : "white",
              backgroundColor: isRegisterButtonDisabled
                ? "rgb(189 193 197)"
                : "black",
            }}
          />
        </Grid>
        <Grid
          item
          justifyContent="flex-end"
          display="flex"
          sx={{ margin: "0px 350px 0px 350px" }}
          xs={12}
        >
          <Typography
            mt={2}
            sx={{
              borderBottom: "2px solid rgb(189 193 197)",
              width: "max-content",
              "&:hover": { cursor: "pointer", borderBottomColor: "black" },
            }}
            level="title-sm"
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              ALREADY HAVE AN ACCOUNT ? SIGN IN
            </Link>
          </Typography>
        </Grid>
        <Footer />
      </Grid>
    </>
  );
};

export default RegisterPage;
