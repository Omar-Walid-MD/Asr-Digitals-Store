import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { child, get, ref, set, update } from 'firebase/database';
import { database } from '../../Firebase/firebase';

const initialState = {
    offers: [],
    loading: true
}

export const getOffers = createAsyncThunk(
  'offers/getOffers',
  async () => {
    return await get(child(ref(database), "offers")).then((snapshot) => {
        if(snapshot.exists())
        {
            return snapshot.val();
        }
    });
});


export const addOffer = createAsyncThunk(
  'offers/addOffer',
  async (newOffer) => {
    set(ref(database, 'offers/' + newOffer.id), newOffer);
    return newOffer
});

export const editOffer = createAsyncThunk(
  'offers/editOffer',
  async ({offerId,editedOffer}) => {
    update(ref(database, 'offers/' + offerId), editedOffer);
    return editedOffer;

});

export const deleteOffer = createAsyncThunk(
  'offers/deleteOffer',
  async ({offerId}) => {
    ref(database, 'offers/' + offerId).remove();
    return offerId;
});

export const setOfferStatus = createAsyncThunk(
  'offers/setOfferStatus',
  async ({offer,status}) => {
    update(ref(database, 'offers/' + offer.id), {status:status});
    return {...offer,status};
});



export const offersSlice = createSlice({
    name: "offers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
        //getOffers
        .addCase(getOffers.pending,(state) => {
            state.loading = true
        })
        .addCase(getOffers.fulfilled,(state, { payload }) => {
            state.loading = false
            state.offers = payload;
        })
        .addCase(getOffers.rejected,(state) => {
            state.loading = false;
        })
        

        //addOffer
        .addCase(addOffer.pending,(state) => {
          state.loading = true
        })
        .addCase(addOffer.fulfilled,(state, { payload }) => {
            state.loading = false
            state.offers = [...state.offers,payload];
        })
        .addCase(addOffer.rejected,(state) => {
            state.loading = false;
        })
        

        //editOffer
        .addCase(editOffer.pending,(state) => {
          state.loading = true;
        })
        .addCase(editOffer.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.offers = state.offers.map((offer) => offer.id===payload.id ? payload : offer);
        })
        .addCase(editOffer.rejected,(state) => {
            state.loading = false;
        })
        

        //deleteOffer
        .addCase(deleteOffer.pending,(state) => {
          state.loading = true
        })
        .addCase(deleteOffer.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.offers = state.offers.filter((offer) => offer.id!==payload);
        })
        .addCase(deleteOffer.rejected,(state) => {
            state.loading = false;
        })
        

        //setOfferStatus
        .addCase(setOfferStatus.pending,(state) => {
          state.loading = true;
        })
        .addCase(setOfferStatus.fulfilled,(state, { payload }) => {
            state.loading = false
            state.offers = state.offers.map((offer) => offer.id===payload.id ? {...offer,status:payload.status} : offer);
        })
        .addCase(setOfferStatus.rejected,(state) => {
            state.loading = false;
        })

      }
});

export default offersSlice.reducer;