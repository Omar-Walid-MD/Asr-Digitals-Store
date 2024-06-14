import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    offers: [],
    loading: true
}

export const getOffers = createAsyncThunk(
  'offers/getOffers',
  async () => {
    const res = await fetch('http://localhost:8899/offers').then(
    (data) => data.json()
  )
  return res;
});


export const addOffer = createAsyncThunk(
  'offers/addOffer',
  async (newOffer) => {
    const res = axios.post('http://localhost:8899/offers',newOffer);
    return (await res).data;
});

export const editOffer = createAsyncThunk(
  'offers/editOffer',
  async ({offerId,editedOffer}) => {
    const res = axios.patch(`http://localhost:8899/offers/${offerId}`,editedOffer);
    return (await res).data;
});

export const deleteOffer = createAsyncThunk(
  'offers/deleteOffer',
  async ({offerId}) => {
    const res = axios.delete(`http://localhost:8899/offers/${offerId}`);
    return offerId;
});

export const setOfferStatus = createAsyncThunk(
  'offers/setOfferStatus',
  async ({offer,status}) => {
    const res = axios.  patch(`http://localhost:8899/offers/${offer.id}`,{status: status});
    return (await res).data;
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