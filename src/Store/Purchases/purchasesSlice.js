import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { child, get, ref, set, update } from 'firebase/database';
import { database } from '../../Firebase/firebase';
import {v4 as uuid4} from "uuid";

const initialState = {
    purchases: [],
    loading: true,
    purchaseSuccess: false
}

export const getPurchases = createAsyncThunk(
  'purchases/getPurchases',
  async () => {
    return await get(child(ref(database), "purchases")).then((snapshot) => {
        const purchasesList = [];
        const purchasesObject = snapshot.val();
        for (const userId in purchasesObject)
        {
            for (const purchaseId in purchasesObject[userId])
            {    
                const purchase = purchasesObject[userId][purchaseId];
                purchasesList.push({...purchase,id:purchaseId,userId})
            }
        }
        return purchasesList;
    });
});

export const addPurchase = createAsyncThunk(
  'purchases/addPurchase',
  async (newPurchase) => {
    set(ref(database, `purchases/${newPurchase.userId}/${uuid4()}`), newPurchase);
    return newPurchase;
});

export const setPurchaseStatus = createAsyncThunk(
  'purchases/setPurchaseStatus',
  async ({purchase,status}) => {
    update(ref(database, `purchases/${purchase.userId}/${purchase.id}`), {status:status});
    return {...purchase,status};
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