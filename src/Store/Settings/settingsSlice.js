import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    fontSize: "small",
    loading: true
}

export const getFontSize = createAsyncThunk(
  'settings/getFontSize',
  async () => {
    const res = localStorage.getItem("fontSize");
    return res;
});


export const setFontSize = createAsyncThunk(
    'settings/setFontSize',
    async (newFontSize) => {
      localStorage.setItem("fontSize",newFontSize);
      return newFontSize;
  });

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
        builder

        //getFontSize
        .addCase(getFontSize.pending,(state) => {
            state.loading = true
        })
        .addCase(getFontSize.fulfilled,(state, { payload }) => {
            state.loading = false
            if(payload) state.fontSize = payload;
            document.documentElement.setAttribute("font",payload);
        })
        .addCase(getFontSize.rejected,(state) => {
            state.loading = false;
        })
        

        //setFontSize
        .addCase(setFontSize.pending,(state) => {
            state.loading = true
        })
        .addCase(setFontSize.fulfilled,(state, { payload }) => {
            state.loading = false
            state.fontSize = payload;
            document.documentElement.setAttribute("font",payload);
        })
        .addCase(setFontSize.rejected,(state) => {
            state.loading = false;
        })
        
      }
});

export default settingsSlice.reducer;