import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { child, get, ref } from 'firebase/database';
import { database } from '../../Firebase/firebase';

const initialState = {
    previewStats: [],
    loading: false,
    loaded: false
}

export const getPreviewStats = createAsyncThunk(
  'previewStats/getPreviewStats',
  async () => {
    return await get(child(ref(database), "previewStats")).then((snapshot) => {
      if(snapshot.exists())
      {
          return snapshot.val();
      }
  });
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