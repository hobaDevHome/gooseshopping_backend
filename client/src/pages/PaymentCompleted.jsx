import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import callpic from "../images/thankyou.png";

import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  thankyouImage: {
    width: "70%",
    height: "auto",
    borderRadius: 3,
    objectFit: "contain",
    margin: "0 auto",
  },
});

const PaymentCompleted = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />

      <Grid container marginTop={5}>
        <img src={callpic} alt="thank you" className={classes.thankyouImage} />
      </Grid>

      <div>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<HomeOutlinedIcon />}>
            Back to Home
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentCompleted;
