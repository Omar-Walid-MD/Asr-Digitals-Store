import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { child, get, ref, set, update, remove } from 'firebase/database';
import {v4 as uuid4} from "uuid";
import { auth, database } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
  async (registerInfo) => {

    const userCred = await createUserWithEmailAndPassword(auth,registerInfo.email,registerInfo.password);
    console.log(userCred);

    set(ref(database, 'users/' + userCred.user.uid), registerInfo);
    return {id: userCred.user.uid,...registerInfo}


    // LATER
    // let localCart = JSON.parse(localStorage.getItem("userCart"));
    // let localFavs = JSON.parse(localStorage.getItem("userFavorites"));

    // let update = {};
    // if(localCart.length > 0) update.cart = localCart;
    // if(localCart.length > 0) update.favorites = localFavs;
  
    // if(Object.keys(update).length > 0)
    // {
    //     const res = axios.patch(`http://localhost:8899/users/${newUserRes.id}`,update).then(
    //     (data) => data)
    //     return (await res).data;
    // }
    // else
    // {
    //   return newUserRes;
    // }
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
    // localStorage.setItem("userCart",JSON.stringify([]));
    // localStorage.setItem("userFavorites",JSON.stringify([])); 
});


//LATER
export const editUser = createAsyncThunk(
  'auth/editUser',
  async (updatedUser) => {
    update(ref(database, 'users/' + updatedUser.id), updatedUser);
    return updatedUser;
});

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
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