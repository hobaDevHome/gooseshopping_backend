// @ts-nocheck
import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { colors } from "../constants";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import callpic from "../images/products/thankyou.png";

import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  itemImage: {
    width: 80,
    height: "auto",
    borderRadius: 3,
    objectFit: "contain",
  },
});

const PaymentCompleted = () => {
  return (
    <div>
      <Navbar />

      <Grid container marginTop={5}></Grid>

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
