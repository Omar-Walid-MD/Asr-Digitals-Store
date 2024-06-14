import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    users: [],
    loading: true,
    currentUser: null,
    loggedInState: "loading"
}


//done
export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async () => {
    const res = await fetch('http://localhost:8899/users').then(
    (data) => data.json()
  )
  return res
});


//done not tested
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

//done
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
    extraReducers: (builder) => {

        //getUsers
        builder
        .addCase(getUsers.pending,(state) => {
          state.loading = true;
        })
        .addCase(getUsers.fulfilled,(state, { payload }) => {
          state.loading = false;
          state.users = payload;
        })
        .addCase(getUsers.rejected,(state) => {
          state.loading = false;
          
        })


        //registerUser
        .addCase(registerUser.pending,(state) => {
          state.loading = true;
        })
        .addCase(registerUser.fulfilled,(state, { payload }) => {
          state.loading = false;
          state.users = [...state.users,payload];
          state.currentUser = payload;
          state.loggedInState = "yes";
        })
        .addCase(registerUser.rejected,(state) => {
          state.loading = false;
          
        })


        //loginUser
        .addCase(loginUser.pending,(state) => {
          state.loading = true;
          state.loggedInState = "pending";
        })
        .addCase(loginUser.fulfilled,(state, { payload }) => {
          state.loading = false;
          state.currentUser = payload;
          state.loggedInState = "yes";
        })
        .addCase(loginUser.rejected,(state) => {
          state.loading = false;
        })
        

        //getCurrentUser
        .addCase(getCurrentUser.pending,(state) => {
          state.loading = true;
          state.loggedInState = "pending";
        })
        .addCase(getCurrentUser.fulfilled,(state, { payload }) => {
          if(payload)
          {
            state.loggedInState = "yes";
          }
          else
          {
            state.loggedInState = "no";
          }

          state.currentUser = payload;
          state.loading = false;
        })
        .addCase(getCurrentUser.rejected,(state) => {
          state.loading = false;
        })


        //logoutUser
        .addCase(logoutUser.pending,(state) => {
          state.loading = true;
          state.loggedInState = "pending";
        })
        .addCase(logoutUser.fulfilled,(state) => {
          state.loading = false;
          state.currentUser = null;
          state.loggedInState = "no";
        })
        .addCase(logoutUser.rejected,(state) => {
          state.loading = false;  
        })
        

        //editUser
        .addCase(editUser.pending,(state) => {
          // state.loading = true
        })
        .addCase(editUser.fulfilled,(state, { payload }) => {
          // state.loading = false
          state.currentUser = payload;
          state.users = state.users.map((user) => user.id===payload.id ? payload : user);
        })
        .addCase(editUser.rejected,(state) => {
          // state.loading = false
        })

        //deleteUser
        .addCase(deleteUser.pending,(state) => {
          state.loading = true
        })
        .addCase(deleteUser.fulfilled,(state, { payload }) => {
          state.loading = false
          state.currentUser = null;
          state.users = state.users.filter((user) => user.id !== payload);
          localStorage.setItem("currentUser","");
          state.loggedInState = "no";
        })
        .addCase(deleteUser.rejected,(state) => {
          state.loading = false
          
      })
        
      }
});

export default authSlice.reducer;