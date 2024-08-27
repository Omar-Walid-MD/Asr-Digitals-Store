import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { child, get, ref, remove, set, update } from 'firebase/database';
import { database } from '../../Firebase/firebase';
import {v4 as uuid4} from "uuid";

const initialState = {
    offers: [],
    loading: true
}

function getOffersArray(offersObject){return Object.keys(offersObject).map((key)=>({id:key,...offersObject[key]}));}
function getOffersObject(offersArray)
{
    let offersObject = {};
    offersArray.forEach((offer)=>{offersObject[offer.id] = offer;});
    return offersObject;
}


export const getOffers = createAsyncThunk(
  'offers/getOffers',
  async () => {
    return await get(child(ref(database), "offers")).then((snapshot) => {
        return snapshot.exists() ? getOffersArray(snapshot.val()) : [];
    });
});


export const addOffer = createAsyncThunk(
  'offers/addOffer',
  async (newOffer) => {
    const offerId = uuid4();
    set(ref(database, 'offers/' + offerId), newOffer);
    return {...newOffer,offerId}
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
    remove(ref(database, 'offers/' + offerId));
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