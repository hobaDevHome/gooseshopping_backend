// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const storedCartItems = JSON.parse(localStorage.getItem("items") || "[]");
let storedTotalAmount = 0;
let storedTotalQuantit = 0;
if (storedCartItems.length > 0) {
  storedTotalAmount = storedCartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );
  storedTotalQuantit = storedCartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );
}

const initialState = {
  cartItems: storedCartItems ? storedCartItems : [],
  totalAmount: storedTotalAmount,
  totalQuantity: storedTotalQuantit,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          imageSrc: newItem.imageSrc,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    decreaseItemQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((e) => e.id === item.id);

      if (item.quantity > 1) {
        state.totalQuantity--;
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(item.price);
      } else {
        state.cartItems = state.cartItems.filter((e) => e.id !== item.id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
