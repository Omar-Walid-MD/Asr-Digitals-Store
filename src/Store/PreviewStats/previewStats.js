import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    extraReducers: (builder) => {
        builder
        //getPreviewStats
        .addCase(getPreviewStats.pending,(state) => {
            state.loading = true;
        })
        .addCase(getPreviewStats.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.previewStats = payload;
            state.loaded = true;
        })
        .addCase(getPreviewStats.rejected,(state) => {
            state.loading = false;
        })
        
      }
});

export default previewStatsSlice.reducer;