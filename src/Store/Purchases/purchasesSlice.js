import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    purchases: [],
    loading: false,
    purchaseSuccess: false
}

export const getPurchases = createAsyncThunk(
  'purchases/getPurchases',
  async () => {
    const res = await fetch('http://localhost:8899/purchases').then(
    (data) => data.json()
  )
  return res;
});

export const addPurchase = createAsyncThunk(
  'purchases/addPurchase',
  async (newPurchase) => {
    const res = axios.post('http://localhost:8899/purchases',newPurchase);
    return (await res).data;
});



export const purchasesSlice = createSlice({
    name: "purchases",
    initialState,
    reducers: {},
    extraReducers: {

        //getPurchases
        [getPurchases.pending]: (state) => {
            state.loading = true
        },
        [getPurchases.fulfilled]: (state, { payload }) => {
            state.loading = false
            console.log("pending");
            state.purchases = payload;
        },
        [getPurchases.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //addPurchase
        [addPurchase.pending]: (state) => {
          state.loading = true;
          state.purchaseSuccess = false;
        },
        [addPurchase.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.purchases = [...state.purchases,payload];
            state.purchaseSuccess = true;
        },
        [addPurchase.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },
        
      },
});

export default purchasesSlice.reducer;