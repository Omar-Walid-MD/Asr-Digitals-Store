import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    users: [],
    loggedIn: false,
    loading: true,
    currentUser: null
}

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async () => {
    const res = await fetch('http://localhost:8899/users').then(
    (data) => data.json()
  )
  return res
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUser) => {
      const res = axios.post("http://localhost:8899/users",newUser);
      const newUserRes = (await res).data;
      localStorage.setItem("currentUser",newUserRes.id);
      let localCart = JSON.parse(localStorage.getItem("userCart"));
      let localFavs = JSON.parse(localStorage.getItem("userFavorites"));

      let update = {};
      if(localCart.length > 0) update.cart = localCart;
      if(localCart.length > 0) update.favorites = localFavs;
  
      if(Object.keys(update).length > 0)
      {
          const res = axios.patch(`http://localhost:8899/users/${newUserRes.id}`,update).then(
          (data) => data)
          return (await res).data;
      }
      else
      {
        return newUserRes;
      }
});


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user) => {
    localStorage.setItem("currentUser",user.id);
    let localCart = JSON.parse(localStorage.getItem("userCart"));
    let localFavs = JSON.parse(localStorage.getItem("userFavorites"));

    let update = {};
    if(user.cart.length===0 && localCart.length > 0) update.cart = localCart;
    if(user.favorites.length===0 && localCart.length > 0) update.favorites = localFavs;

    if(Object.keys(update).length > 0)
    {
        const res = axios.patch(`http://localhost:8899/users/${user.id}`,update).then(
        (data) => data)
        return (await res).data;
    }
    else
    {
      return user;
    }

});


export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    let userId = localStorage.getItem("currentUser");
    if(userId)
    {
        const res = await fetch(`http://localhost:8899/users/${userId}`).then(
        (data) => data.json()
      )
      return res;
    }
});

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    localStorage.setItem("currentUser","");
    localStorage.setItem("userCart",JSON.stringify([]));
    localStorage.setItem("userFavorites",JSON.stringify([]));

    
});
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {

        //getUsers
        [getUsers.pending]: (state) => {
          state.loading = true
        },
        [getUsers.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.users = payload;
          // console.log(state.users);
        },
        [getUsers.rejected]: (state) => {
          state.loading = false;
          console.log("rejected");
        },


        //registerUser
        [registerUser.pending]: (state) => {
            state.loading = true
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.users = [...state.users,payload];
            state.currentUser = payload;
            state.loggedIn = true;
        },
        [registerUser.rejected]: (state) => {
            state.loading = false
            console.log("rejected");
        },


        //loginUser
        [loginUser.pending]: (state) => {
          state.loading = true
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            console.log("logged in");
            state.loading = false
            state.currentUser = payload;
            state.loggedIn = true;
          },
        [loginUser.rejected]: (state) => {
            state.loading = false
            console.log("rejected");
        },

        //getCurrentUser
        [getCurrentUser.pending]: (state) => {
          state.loading = true
        },
        [getCurrentUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentUser = payload;
            if(payload) state.loggedIn = true;
          },
        [getCurrentUser.rejected]: (state) => {
            state.loading = false
            console.log("rejected");
        },


        //logoutUser
        [logoutUser.pending]: (state) => {
          state.loading = true
        },
        [logoutUser.fulfilled]: (state) => {
            state.loading = false
            state.currentUser = null;
            state.loggedIn = false;
          },
        [logoutUser.rejected]: (state) => {
            state.loading = false
            console.log("rejected");
        },
      },
});

export default authSlice.reducer;