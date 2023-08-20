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
    extraReducers: {

        //getReviews
        [getReviews.pending]: (state) => {
            state.loading = true
        },
        [getReviews.fulfilled]: (state, { payload }) => {
            state.loading = false
            console.log("pending");
            state.reviews = payload;
        },
        [getReviews.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //addReview
        [addReview.pending]: (state) => {
            state.loading = true
        },
        [addReview.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.reviews = [...state.reviews,payload];
        },
        [addReview.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },
        
      },
});

export default reviewsSlice.reducer;