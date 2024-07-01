import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from "axios";
import { child, get, ref, set } from 'firebase/database';
import { database } from '../../Firebase/firebase';
import {v4 as uuid4} from "uuid";

const initialState = {
    reviews: [],
    loading: true
}


export function getReviewsArray(reviewsObject){return Object.keys(reviewsObject).map((key)=>({id:key,...reviewsObject[key]}));}
function getReviewsObject(reviewsArray)
{
    let reviewsObject = {};
    reviewsArray.forEach((review)=>{

        let tempReview = {...review}
        let id = tempReview.id;
        delete tempReview.id;
        reviewsObject[id] = tempReview;
    });
    return reviewsObject;
}

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async () => {
    return [];
//     const res = await fetch('http://localhost:8899/reviews').then(
//     (data) => data.json()
//   )
//   return res;
});

export const getProductReviews = createAsyncThunk(
    'reviews/getProductReviews',
    async (productId) => {
        
  });


export const addReview = createAsyncThunk(
    'reviews/addReview',
    async ({productId,newReview}) => {
        const newReviewId = uuid4();
        set(ref(database, `reviews/${productId}/${newReviewId}`), newReview);
        return {id:newReviewId,...newReview};
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
            console.log(current(state).reviews)
        })
        .addCase(addReview.rejected,(state) => {
            state.loading = false;
        })
        
      }
});

export default reviewsSlice.reducer;