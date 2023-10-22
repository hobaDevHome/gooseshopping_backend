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
import "./Stripe.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#04222c",
      color: "#070707",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
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

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <div className="FormRow">
          <CardElement options={CARD_OPTIONS} />
        </div>
      </fieldset>
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className={classes.blueButton}
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
    </form>
  );
}
