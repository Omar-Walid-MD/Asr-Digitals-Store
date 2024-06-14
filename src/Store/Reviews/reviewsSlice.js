import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    reviews: [],
    loading: true
}

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async () => {
    const res = await fetch('http://localhost:8899/reviews').then(
    (data) => data.json()
  )
  return res;
});


export const addReview = createAsyncThunk(
    'reviews/addReview',
    async (newReview) => {
      const res = axios.post('http://localhost:8899/reviews',newReview);
      return (await res).data;
  });

export const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getReviews
        .addCase(getReviews.pending,(state) => {
            state.loading = true
        })
        .addCase(getReviews.fulfilled,(state, { payload }) => {
            state.loading = false
            state.reviews = payload;
        })
        .addCase(getReviews.rejected,(state) => {
            state.loading = false;
        })
        

        //addReview
        .addCase(addReview.pending,(state) => {
            state.loading = true
        })
        .addCase(addReview.fulfilled,(state, { payload }) => {
            state.loading = false
            state.reviews = [...state.reviews,payload];
        })
        .addCase(addReview.rejected,(state) => {
            state.loading = false;
        })
        
      }
});

export default reviewsSlice.reducer;