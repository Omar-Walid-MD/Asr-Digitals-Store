import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    users: [],
    loading: true,
    currentUser: null,
    loggedInState: "loading"
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
  async ({user,remember}) => {

    if(remember) localStorage.setItem("currentUser",user.id);
    else sessionStorage.setItem("currentUser",user.id);
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
    else
    {
      localStorage.setItem("currentUser","");
      return null;
    }
});

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    localStorage.setItem("currentUser","");
    sessionStorage.setItem("currentUser","");
    localStorage.setItem("userCart",JSON.stringify([]));
    localStorage.setItem("userFavorites",JSON.stringify([])); 
});

export const editUser = createAsyncThunk(
  'auth/editUser',
  async (updatedUser) => {
    const res = axios.patch(`http://localhost:8899/users/${updatedUser.id}`,updatedUser);
    return (await res).data;
});

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId) => {
    const res = axios.delete(`http://localhost:8899/users/${userId}`);
    return userId;
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
        },
        [getUsers.rejected]: (state) => {
          state.loading = false;
          
        },


        //registerUser
        [registerUser.pending]: (state) => {
            state.loading = true
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.users = [...state.users,payload];
            state.currentUser = payload;
            state.loggedInState = "yes";
        },
        [registerUser.rejected]: (state) => {
            state.loading = false
            
        },


        //loginUser
        [loginUser.pending]: (state) => {
          state.loading = true
          state.loggedInState = "pending"
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentUser = payload;
            state.loggedInState = "yes";
          },
        [loginUser.rejected]: (state) => {
            state.loading = false
            
        },

        //getCurrentUser
        [getCurrentUser.pending]: (state) => {
          state.loading = true
          state.loggedInState = "pending"
        },
        [getCurrentUser.fulfilled]: (state, { payload }) => {
          if(payload)
          {
            state.loggedInState = "yes";
          }
          else
          {
            state.loggedInState = "no"
          }

          state.currentUser = payload;
          state.loading = false;
          },
        [getCurrentUser.rejected]: (state) => {
            state.loading = false
            
        },


        //logoutUser
        [logoutUser.pending]: (state) => {
          state.loading = true
          state.loggedInState = "pending";
        },
        [logoutUser.fulfilled]: (state) => {
            state.loading = false
            state.currentUser = null;
            state.loggedInState = "no";
          },
        [logoutUser.rejected]: (state) => {
            state.loading = false
            
        },

        //editUser
        [editUser.pending]: (state) => {
          // state.loading = true
        },
        [editUser.fulfilled]: (state, { payload }) => {
            // state.loading = false
            state.currentUser = payload;
            state.users = state.users.map((user) => user.id===payload.id ? payload : user);
          },
        [editUser.rejected]: (state) => {
            // state.loading = false
            
        },

        //deleteUser
        [deleteUser.pending]: (state) => {
          state.loading = true
        },
        [deleteUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentUser = null;
            state.users = state.users.filter((user) => user.id !== payload);
            localStorage.setItem("currentUser","");
            state.loggedInState = "no";
          },
        [deleteUser.rejected]: (state) => {
            state.loading = false
            
        },
      },
});

export default authSlice.reducer;