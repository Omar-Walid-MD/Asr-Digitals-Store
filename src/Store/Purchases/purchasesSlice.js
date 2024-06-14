import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    purchases: [],
    loading: true,
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

export const setPurchaseStatus = createAsyncThunk(
  'purchases/setPurchaseStatus',
  async ({purchase,status}) => {
    const res = axios.patch(`http://localhost:8899/purchases/${purchase.id}`,{status: status});
    return (await res).data;
});

export const resetPurchaseLoading = createAsyncThunk(
  'purchases/resetPurchaseLoading',
   async()=>{return;}
);

export const purchasesSlice = createSlice({
    name: "purchases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getPurchases
        .addCase(getPurchases.pending,(state) => {
            state.loading = true
        })
        .addCase(getPurchases.fulfilled,(state, { payload }) => {
            state.loading = false
            state.purchases = payload;
        })
        .addCase(getPurchases.rejected,(state) => {
            state.loading = false;
        })
       

        //addPurchase
        .addCase(addPurchase.pending,(state) => {
            state.loading = true;
            state.purchaseSuccess = false;
        })
        .addCase(addPurchase.fulfilled,(state, { payload }) => {
            state.loading = false
            state.purchases = [...state.purchases,payload];
            state.purchaseSuccess = true;
        })
		.addCase(addPurchase.rejected,(state) => {
            state.loading = false;
        })


        //setPurchaseStatus
		.addCase(setPurchaseStatus.pending,(state) => {
			state.loading = true;
		})
        .addCase(setPurchaseStatus.fulfilled,(state, { payload }) => {
            state.loading = false
            state.purchases = state.purchases.map((purchase) => purchase.id===payload.id ? {...purchase,status:payload.status} : purchase);
        })
        .addCase(setPurchaseStatus.rejected,(state) => {
            state.loading = false;
        })

		
        //resetPurchaseLoading
		.addCase(resetPurchaseLoading.pending,(state) => {
			state.loading = true;
			state.purchaseSuccess = false;
		})
        .addCase(resetPurchaseLoading.fulfilled,(state) => {
            state.loading = false
        })
        .addCase(resetPurchaseLoading.rejected,(state) => {
            state.loading = false;
        })
        
      }
});




export default purchasesSlice.reducer;