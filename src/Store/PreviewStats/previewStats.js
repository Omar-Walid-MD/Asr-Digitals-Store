import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    previewStats: [],
    loading: false,
    loaded: false
}

export const getPreviewStats = createAsyncThunk(
  'previewStats/getPreviewStats',
  async () => {
    const res = await fetch('http://localhost:8899/previewStats').then(
    (data) => data.json()
  )
  return res;
});


export const previewStatsSlice = createSlice({
    name: "previewStats",
    initialState,
    reducers: {},
    extraReducers: {

        //getPreviewStats
        [getPreviewStats.pending]: (state) => {
            state.loading = true;
        },
        [getPreviewStats.fulfilled]: (state, { payload }) => {
            state.loading = false;
            console.log("pending");
            state.previewStats = payload;
            state.loaded = true;
        },
        [getPreviewStats.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },
        
      },
});

export default previewStatsSlice.reducer;