// @ts-nocheck
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";

import { colors } from "../constants";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@mui/styles";

import StripeContainer from "../components/StripeContainer";

const useStyles = makeStyles({
  searchInputContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 3,
    borderColor: colors.divider,
    borderWidth: 2,
    borderStyle: "solid",
  },
  blueButton: {
    color: colors.white,
    height: "100%",
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
  checkoutRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: colors.divider,
    marginBottom: 10,
  },
  searchButtonContianer: {
    width: 120,
    margin: 0,
    padding: 0,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.ligthPink,
    color: colors.darkPink,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  itemImage: {
    width: 80,
    height: "auto",
    borderRadius: 3,
    objectFit: "contain",
  },
  quantityContiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.divider,
    borderRadius: 4,
    width: "50%",
    fontSize: 16,
    fontWeight: "bold",
    padding: "10px 15px",
  },
  addremoveButtonBox: {
    color: colors.mainBlue,
    fontSize: 22,
    cursor: "pointer",
    width: 30,
    height: 30,
  },
});

const PaymentCompleted = () => {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const [showItem, setShowItem] = useState(false);

  return (
    <div>
      <Navbar />

      <Grid container marginTop={5}>
        <p>Payment Completed ✨✨</p>
      </Grid>

      <Footer />
    </div>
  );
};

export default PaymentCompleted;
