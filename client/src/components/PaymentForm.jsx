// @ts-nocheck
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      "iconColor": "#04222c",
      "color": "#e01111",
      "fontWeight": 500,
      "fontFamily": "Roboto, Open Sans, Segoe UI, sans-serif",
      "fontSize": "16px",
      "fontSmoothing": "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
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
    } catch (error) {
      console.log("firebase error", error);
    }
    dispatch(cartActions.resetCart());
    localStorage.setItem("items", "[]");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          setSuccess(true);
          navigate("/paymentcompleted");
          addPurshaseToFirebase();
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup" style={{ color: "black" }}>
            <div className="FormRow" style={{ color: "black" }}>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>
            You just bought a sweet spatula congrats this is the best decision
            of you're life
          </h2>
        </div>
      )}
    </>
  );
}
