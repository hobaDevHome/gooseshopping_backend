// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "../src/redux/store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
        theme="dark"
        position="top-left"
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
      />
      <App />
    </Provider>
  </BrowserRouter>
);
