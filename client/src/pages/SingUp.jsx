import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { auth, storage, db } from "../firebase-config";

import { Link } from "react-router-dom";
import { colors } from "../constants";

import goose from "../images/goose-loog.jpg";

import Logo from "../images/goos_logo.png";

import { mapAuthCodeToMessage } from "./SignIn";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import { makeStyles } from "@mui/styles";

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

const SignUp = () => {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [loadaing, setLoadaing] = useState(false);

  const navigate = useNavigate();

  const singup = async (e) => {
    e.preventDefault();
    setLoadaing(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (file) {
        const storageRef = ref(
          storage,
          `avatars/${Date.now() + "_" + username}`
        );

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("Upload is in progress");
          },
          (error) => {
            console.log("uploadtasek error", error);
          },
          () => {
            console.log("success");

            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(user, {
                  displayName: username,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName: username,
                  email,
                  photoURL: downloadURL || "",
                });
              }
            );
          }
        );
      } else {
        await updateProfile(user, {
          displayName: username,
        });
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: username,
          email,
        });
      }
      toast.success("New account created");
      setLoadaing(false);
      navigate("/singin");
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
            Create an new account
          </p>
        </Grid>
        <Grid item xs={12}>
          {loadaing && <CircularProgress />}
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <TextField
            fullWidth
            id="username"
            onKeyDown={(event) => {
              if (event.key === "Enter") singup(event);
            }}
            sx={{ marginBottom: 3 }}
            placeholder="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            id="email"
            onKeyDown={(event) => {
              if (event.key === "Enter") singup(event);
            }}
            placeholder="emial"
            sx={{ marginBottom: 3 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="password"
            onKeyDown={(event) => {
              if (event.key === "Enter") singup(event);
            }}
            type="password"
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
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          <label>Avatar file: </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ backgroundColor: colors.white }}
          />
        </Grid>

        <Grid item xs={12} justifyContent="center" alignItems="center">
          <div className={classes.blueButton} onClick={singup}>
            Sign Up
          </div>
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <p style={{ color: colors.greyText }}>
            have a account?
            <Link to={`/singin`}>
              <span
                style={{
                  fontWeight: "bold",
                  color: colors.buttonBlue,
                  cursor: "pointer",
                  marginLeft: 10,
                }}
              >
                Sing in
              </span>
            </Link>
          </p>
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center"></Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
