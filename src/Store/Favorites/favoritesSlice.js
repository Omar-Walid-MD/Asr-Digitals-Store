import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    favorites: [],
    loading: false
}

export const getFavs = createAsyncThunk(
'favorites/getFavs',
async () => {
    let res;
    let currentUserId = localStorage.getItem("currentUser")
    if(currentUserId)
    {
        res = await fetch(`http://localhost:8899/users/${currentUserId}`).then(
        (data) => data.json());
        return res.favorites;
    }
    else
    {
        if(!JSON.parse(localStorage.getItem("userFavorites")))
        {
            localStorage.setItem("userFavorites",JSON.stringify([]))
        }
        res = JSON.parse(localStorage.getItem("userFavorites"));
        return res;
    }
});

export const addToFav = createAsyncThunk(
'favorites/addToFav',
async (productId, {getState}) => {
    let res;
    let currentUserId = localStorage.getItem("currentUser");
    if(currentUserId)
    {

        let updatedFavs = [...getState().favorites.favorites,productId];
        res = axios.patch(`http://localhost:8899/users/${currentUserId}`,{favorites: updatedFavs}).then(
        (data) => data);
        return updatedFavs;
    }
    else
    {
        let localFavs = JSON.parse(localStorage.getItem("userFavorites"))
        if(localFavs)
        {
            localFavs = [...localFavs,productId];
            localStorage.setItem("userFavorites",JSON.stringify(localFavs));
            return localFavs;
        }
    }
});


export const removeFromFav = createAsyncThunk(
'favorites/removeFromFav',
async (productId, {getState}) => {
    let res;
    let currentUserId = localStorage.getItem("currentUser");
    if(currentUserId)
    {
        let updatedFavs = getState().favorites.favorites.filter((fav) => fav !== productId);
        res = axios.patch(`http://localhost:8899/users/${currentUserId}`,{favorites: updatedFavs}).then(
        (data) => data);
        return updatedFavs;
    }
    else
    {
        let localFavs = JSON.parse(localStorage.getItem("userFavorites"));
        if(localFavs)
        {
            localFavs = localFavs.filter((fav) => fav !== productId);
            localStorage.setItem("userFavorites",JSON.stringify(localFavs));
            return localFavs;
        }
    }
});



export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: {

        //getFavs
        [getFavs.pending]: (state) => {
            state.loading = true
        },
        [getFavs.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.favorites = payload;
        },
        [getFavs.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },


        //addToFav 
        [addToFav.pending]: (state) => {
            state.loading = true
        },
        [addToFav.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.favorites = payload;
        },
        [addToFav.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //removeFromFav 
        [removeFromFav.pending]: (state) => {
            state.loading = true
        },
        [removeFromFav.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.favorites = payload;
        },
        [removeFromFav.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },
        
      },
});

export default favoritesSlice.reducer;