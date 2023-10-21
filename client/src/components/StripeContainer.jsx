import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51O3EspGo665D2ksCXXEa85m1VSu6d8cG82vn2Wf3aMR2WUFNjOQPSyjcZHGk2YMKcN3s8SLnB7B0RNIK1rh6b93D000EEi3U4d";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
