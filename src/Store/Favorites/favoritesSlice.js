import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { ref, set } from 'firebase/database';
import { auth, database } from '../../Firebase/firebase';

const initialState = {
    favorites: [],
    loading: true
}

function getFavsArray(favsObject){return Object.keys(favsObject).map((key)=>key);}
function getFavsObject(favsArray)
{
    let favsObject = {};
    favsArray.forEach((favItem)=>{favsObject[favItem] = true;});
    return favsObject;
}

export const getFavs = createAsyncThunk(
'favorites/getFavs',
async (args,{getState}) => {

    let localFavs = JSON.parse(localStorage.getItem("userFavorites"));

    if(auth.currentUser)
    {
        const userFavsObject = getState().auth.currentUser.favorites || [];
        const userFavs = getFavsArray(userFavsObject);

        return userFavs;

        // if(userFavs.length===0 && localFavs.length > 0)
        // {
        //     set(ref(database, `users/${auth.currentUser.uid}/favorites`), localFavs);
        //     return localFavs;
        // }
        // else
        // {
        //     return userFavs;
        // }
    }
    else
    {
        if(localFavs)
        {
            return localFavs;
        }
        else
        {
            localStorage.setItem("userFavorites",JSON.stringify([]))
            return [];
        }
    }
});

export const addToFav = createAsyncThunk(
'favorites/addToFav',
async (productId, {getState}) => {

    const product = getState().products.products.find((p)=>p.id === productId);

    if(auth.currentUser)
    {
        let updatedFavs = [...getState().favorites.favorites,productId];

        set(ref(database, `users/${auth.currentUser.uid}/favorites`), getFavsObject(updatedFavs));
        return {product,favs:updatedFavs};
    }
    else
    {
        let localFavs = JSON.parse(localStorage.getItem("userFavorites"))
        if(localFavs)
        {
            localFavs = [...localFavs,productId];
            localStorage.setItem("userFavorites",JSON.stringify(localFavs));
            return {product,favs:localFavs};
        }
    }
});


export const removeFromFav = createAsyncThunk(
'favorites/removeFromFav',
async (productId, {getState}) => {

    const product = getState().products.products.find((p)=>p.id === productId);

    if(auth.currentUser)
    {
        let updatedFavs = getState().favorites.favorites.filter((favorite) => favorite !== productId);

        set(ref(database, `users/${auth.currentUser.uid}/favorites`), getFavsObject(updatedFavs));
        return {product,favs:updatedFavs};
    }
    else
    {
        let localFavs = JSON.parse(localStorage.getItem("userFavorites"))
        if(localFavs)
        {
            localFavs = localFavs.filter((favorite) => favorite !== productId);
            localStorage.setItem("userFavorites",JSON.stringify(localFavs));
            return {product,favs:localFavs};
        }
    }
});



export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
        //getFavs
        .addCase(getFavs.pending,(state) => {
            state.loading = true
        })
        .addCase(getFavs.fulfilled,(state, { payload }) => {
            state.loading = false
            state.favorites = payload;
        })
        .addCase(getFavs.rejected,(state) => {
            state.loading = false;
        })
        


        //addToFav
        .addCase(addToFav.pending,(state) => {
            state.loading = true
        })
        .addCase(addToFav.fulfilled,(state, { payload }) => {
            state.loading = false
            state.favorites = payload.favs;
        })
        .addCase(addToFav.rejected,(state) => {
            state.loading = false;
        })
        

        //removeFromFav
        .addCase(removeFromFav.pending,(state) => {
            state.loading = true
        })
       .addCase(removeFromFav.fulfilled,(state, { payload }) => {
            state.loading = false
            state.favorites = payload.favs;
        })
        .addCase(removeFromFav.rejected,(state) => {
            state.loading = false;
        }) 
      }
});

export default favoritesSlice.reducer;