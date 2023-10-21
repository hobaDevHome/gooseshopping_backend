// @ts-nocheck

import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async () => {
    const response = await getDocs(collection(db, "products"));
    return {
      list: response.docs.map((data) => {
        return { ...data.data(), id: data.id };
      }),
    };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.list;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;
