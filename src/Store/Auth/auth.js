import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { child, get, ref, set, update, remove } from 'firebase/database';
import {v4 as uuid4} from "uuid";
import { auth, database } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const initialState = {
    currentUser: null,
    loading: true,
    loggedInState: "loading"
}


export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async () => {
    return await get(child(ref(database), "users")).then((snapshot) => {
      if(snapshot.exists())
      {
        return Object.values(snapshot.val());
      }
  });
});



export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registerInfo) => {

    const userCred = await createUserWithEmailAndPassword(auth,registerInfo.email,registerInfo.password);

    set(ref(database, 'users/' + userCred.user.uid), registerInfo);

    let localCart = JSON.parse(localStorage.getItem("userCart"));
    let localFavs = JSON.parse(localStorage.getItem("userFavorites"));


    // if local cart/favorites is not empty, move them to account
    let userUpdate = {};
    if(localCart.length > 0) userUpdate.cart = localCart;
    if(localCart.length > 0) userUpdate.favorites = localFavs;
  
    if(Object.keys(userUpdate).length > 0)
    {
        update(ref(database, 'users/' + userCred.user.uid), userUpdate);
    }

    return {id: userCred.user.uid,...registerInfo, ...userUpdate};

});


export const authenticateCurrentUser = createAsyncThunk(
  'auth/authenticateCurrentUser',
  async (user) => {

    if(user)
    {
      const userInfo = await get(child(ref(database), `users/${user.uid}`)).then((snapshot) => {
          return snapshot.exists() ? snapshot.val() : {};
      });
      return {id: user.uid,...userInfo}
    }
    else return null;
});

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    auth.signOut()
});


export const editUser = createAsyncThunk(
  'auth/editUser',
  async ({id,updatedUser}) => {
    update(ref(database, `users/${id}`), updatedUser);
    return updatedUser;
});

export const removeUser = createAsyncThunk(
  'auth/removeUser',
  async (userId) => {
    remove(ref(database, 'users/' + userId));
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

        
        //authenticateCurrentUser
        .addCase(authenticateCurrentUser.pending,(state) => {
          state.loading = true;
          state.loggedInState = "pending";
        })
        .addCase(authenticateCurrentUser.fulfilled,(state, { payload }) => {
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
        .addCase(authenticateCurrentUser.rejected,(state) => {
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

        //removeUser
        .addCase(removeUser.pending,(state) => {
          state.loading = true
        })
        .addCase(removeUser.fulfilled,(state, { payload }) => {
          state.loading = false
          state.currentUser = null;
          state.users = state.users.filter((user) => user.id !== payload);
          localStorage.setItem("currentUser","");
          state.loggedInState = "no";
        })
        .addCase(removeUser.rejected,(state) => {
          state.loading = false
          
      })
        
      }
});

export default authSlice.reducer;