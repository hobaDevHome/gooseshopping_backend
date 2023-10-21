// @ts-nocheck

import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",

  async () => {
    const response = await getDocs(collection(db, "purchaseHistory"));
    return {
      list: response.docs.map((data) => {
        return { ...data.data(), id: data.id };
      }),
    };
  }
);

const PurchaseHistorySlice = createSlice({
  name: "history",
  initialState: {
    historyList: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.historyList = action.payload.list;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default PurchaseHistorySlice.reducer;

// Selectors
export const selectHistoryList = (state) => state.history.historyList;
export const selectStatus = (state) => state.history.status;
export const selectError = (state) => state.history.error;
