// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productsSlice";
import cartSlice from "./slice/cartSlice";
import PurchaseHistorySlice from "./slice/PurchaseHistorySlice";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartSlice,
    history: PurchaseHistorySlice,
  },
  middleware: [thunkMiddleware],
});

export default store;
