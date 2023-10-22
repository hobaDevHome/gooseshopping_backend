// @ts-nocheck
import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { Link } from "react-router-dom";
import { colors } from "../constants";
import goose from "../images/goose-loog.jpg";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase-config";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import Logo from "../images/goos_logo.png";

import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  image: {
    width: "40%",
    height: "auto",
    objectFit: "contain",
  },
  logo: {
    width: "40%",
    height: "auto",
    objectFit: "contain",
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    margin: 0,
    marginTop: 20,
  },
  blueButton: {
    color: colors.white,
    height: 50,
    width: "100%",

    backgroundColor: colors.darkerBlue,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    borderRadius: 3,
    cursor: "pointer",
  },
});

export function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/email-already-exists":
      return "Email already exists";

    case "auth/user-not-found":
      return "User not ound";

    case "auth/email-already-in-use":
      return "Email already exists";

    case "auth/weak-password":
      return "Password should be at least 6 characters";

    case "auth/wrong-password":
      return "Wrong password";

    // Many more authCode mapping here...

    default:
      return "";
  }
}

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loadaing, setLoadaing] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const singin = async (e) => {
    e.preventDefault();
    setLoadaing(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setLoadaing(false);
      navigate("/");
      toast.success("Welcome back");
    } catch (error) {
      toast.error(mapAuthCodeToMessage(error.code));
      console.log(error);
      setLoadaing(false);
    }
  };

  return (
    <Grid container className={classes.rightContainer}>
      <Grid item xs={12} md={6} sx={{ margin: "10px auto" }} padding={3}>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <img src={goose} alt="logo" className={classes.image} />
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <img src={Logo} alt="logo" className={classes.logo} />
        </Grid>

        <Grid item xs={12} justifyContent="center" alignItems="center">
          <p style={{ color: colors.greyText, fontSize: 20 }}>
            Log to your account
          </p>
        </Grid>
        <Grid item xs={12}>
          {loadaing && <CircularProgress />}
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <TextField
            fullWidth
            onKeyDown={(event) => {
              if (event.key === "Enter") singin(event);
            }}
            id="email"
            placeholder="emial"
            sx={{ marginBottom: 3 }}
            value={email}
            onChange={(e) => setemail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="password"
            onKeyDown={(event) => {
              if (event.key === "Enter") singin(event);
            }}
            type="password"
            placeholder="password"
            sx={{ marginBottom: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} justifyContent="center" alignItems="center">
          <div onClick={singin} className={classes.blueButton}>
            Sign In
          </div>
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <p style={{ color: colors.greyText }}>
            new user?
            <Link to={`/singup`}>
              <span
                style={{
                  fontWeight: "bold",
                  color: colors.buttonBlue,
                  cursor: "pointer",
                  marginLeft: 10,
                }}
              >
                Sing up
              </span>
            </Link>
          </p>
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <span
              style={{
                fontWeight: "bold",
                color: "green",
                cursor: "pointer",
                marginLeft: 10,
                fontSize: 20,
              }}
            >
              Login as a guest
            </span>
          </Link>
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center"></Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
