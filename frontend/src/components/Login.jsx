/* eslint-disable react/prop-types */
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Typography } from "@mui/joy";
import StyledButton from "../components/StyledButton";
import { Link } from "react-router-dom";
import { usePostLoginMutation } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";
import { useDispatch } from "react-redux";
import { setToken, setLogin, setIsAdmin } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";

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

const Login = ({ isAdmin }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postLogin] = usePostLoginMutation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const isLoginButtonDisabled = !(
    !emailError &&
    !passwordError &&
    email.trim().length !== 0 &&
    password.trim().length !== 0
  );

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailErrorMessage(validateEmail(e.target.value, setEmailError));
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErrorMessage(validatePassword(e.target.value, setPasswordError));
  };

  const login = async () => {
    setIsLoading(true);
    const res = await postLogin({ email, password });
    if (res.error && res.error.data && res.error.data.errorFields) {
      res.error.data.errorFields.map((err) => {
        if (err.field === "email") {
          setEmailError(true);
          setEmailErrorMessage(err.errorMessage);
        }
        if (err.field === "password") {
          setPasswordError(true);
          setPasswordErrorMessage(err.errorMessage);
        }
      });
    }
    console.log(res.data)
    if (res.data && res.data.ok) {
      localStorage.setItem("token", res.data.token);
      dispatch(setToken(res.data.token));
      if (!res.data.isAdmin) {
        dispatch(setLogin(true));
        dispatch(setCartCount(res.data.cartCount));
        dispatch(setWishlistCount(res.data.wishlistCount));
        navigateTo("/");
      } else {
        console.log("Admin logged in")
        dispatch(setIsAdmin(true));
        navigateTo("/admin");
      }
    }
    setIsLoading(false);
  };

  return (
    <Grid container mt={15}>
      <Grid
        padding={1}
        item
        display="flex"
        justifyContent="center"
        xs={12}
        sx={{ borderBottom: "2px solid black", margin: "0px 350px 0px 350px" }}
      >
        <Typography level="h3">Login</Typography>
      </Grid>
      <Grid paddingY={2} sx={{ margin: "0px 350px 0px 350px" }} item xs={12}>
        <Typography level="body-md">
          Enter your email and password to log in
        </Typography>
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
      </Grid>
      <Grid sx={{ margin: "0px 350px 0px 350px" }} item xs={12}>
        <StyledButton
          endIcon={
            !isLoginButtonDisabled &&
            isLoading && (
              <CircularProgress size="sm" variant="solid" color="neutral" />
            )
          }
          onClick={login}
          disabled={isLoginButtonDisabled}
          text={!isLoading && "Login"}
          height="50px"
          color={isLoginButtonDisabled ? "rgb(59 64 71)" : "white"}
          backgroundColor={isLoginButtonDisabled ? "rgb(189 193 197)" : "black"}
          width="100%"
          hoverStyles={{
            color: isLoginButtonDisabled ? "rgb(59 64 71)" : "white",
            backgroundColor: isLoginButtonDisabled
              ? "rgb(189 193 197)"
              : "black",
          }}
        />
      </Grid>
      {!isAdmin && (
        <>
          <Grid
            item
            paddingY={2}
            xs={12}
            sx={{ margin: "0px 350px 0px 350px" }}
          >
            <Typography level="body-xs">
              By logging in, I confirm that I have read and accept the Terms and
              Conditions and the Privacy Policy.
            </Typography>
          </Grid>
          <Grid item sx={{ margin: "0px 350px 0px 350px" }} container>
            <Grid item xs={6}>
              <Typography
                sx={{
                  borderBottom: "2px solid rgb(189 193 197)",
                  width: "max-content",
                  "&:hover": {
                    cursor: "pointer",
                    borderBottomColor: "black",
                  },
                }}
                level="title-sm"
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/forgotPassword"
                >
                  FORGOTTEN YOUR PASSWORD ?
                </Link>
              </Typography>
            </Grid>
            <Grid item display="flex" justifyContent="flex-end" xs={6}>
              <Typography
                sx={{
                  borderBottom: "2px solid rgb(189 193 197)",
                  width: "max-content",
                  "&:hover": {
                    cursor: "pointer",
                    borderBottomColor: "black",
                  },
                }}
                level="title-sm"
              >
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  DON'T HAVE AN ACCOUNT ? SIGN UP
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Login;
