// @ts-nocheck
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { colors } from "../constants";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import "./Stripe.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#04475e",
      color: "#070707",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#81b2f1" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const useStyles = makeStyles({
  blueButton: {
    color: colors.white,
    height: "100%",
    width: "70%",
    padding: 10,
    border: "none",

    backgroundColor: colors.darkerBlue,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    borderRadius: 3,
    cursor: "pointer",
    margin: "0 auto",
    marginTop: 10,
  },

  searchInputContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 3,
    borderColor: colors.divider,
    borderWidth: 2,
    borderStyle: "solid",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    paddingLeft: 10,
    color: colors.white,
    width: "80%",
  },
});

export default function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const addPurshaseToFirebase = async () => {
    try {
      const colRef = collection(db, "purchaseHistory");
      await addDoc(colRef, {
        userid: currentUser.uid,
        date: Date.now(),
        username: currentUser.displayName,
        items: cartItems,
      });
      dispatch(cartActions.resetCart());
      navigate("/paymentcompleted");
    } catch (error) {
      console.log("firebase error", error);
      toast.error(error.message);
    }

    localStorage.setItem("items", "[]");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");

          addPurshaseToFirebase();
        }
      } catch (error) {
        console.log("Error", error);
        toast.error(error.message);
      }
    } else {
      console.log(error.message);
      toast.error(error.message);
    }
    setIsProcessing(false);
  };

  const clearForm = () => {
    elements.getElement(CardElement).clear();
  };

  return (
    <Paper elevation={3} padding={0}>
      <form onSubmit={handleSubmit}>
        <Grid container padding={3} marginTop={3}>
          <Grid item xs={12}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ textAlign: "left" }}
            >
              Full name
            </Typography>
            <TextField
              fullWidth
              label="Fullname"
              id="Fullname"
              sx={{ marginBottom: 3 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ textAlign: "left" }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              label="Email"
              id="Email"
              sx={{ marginBottom: 3 }}
            />
          </Grid>
          <Grid item xs={12}>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
          </Grid>
          <Grid item xs={6}>
            <button
              type="button"
              onClick={clearForm}
              disabled={isProcessing || !stripe || !elements}
              className={classes.blueButton}
              style={{ backgroundColor: colors.darkPink }}
            >
              Reset
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              disabled={isProcessing || !stripe || !elements}
              id="submit"
              className={classes.blueButton}
              style={{ backgroundColor: colors.green }}
            >
              <span id="button-text">
                {isProcessing ? "Processing ... " : "Pay now"}
              </span>
            </button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
