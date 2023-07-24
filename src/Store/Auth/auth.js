import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    users: [],
    loggedIn: false,
    loading: false
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
        return (await res).data;
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
          state.users = payload
          console.log(state.users)
        },
        [getUsers.rejected]: (state) => {
          state.loading = false
        },


        //registerUser
        [registerUser.pending]: (state) => {
            state.loading = true
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.users = [...state.users,payload];
            console.log("added new user");
            console.log(state.users);
        },
        [registerUser.rejected]: (state) => {
            state.loading = false
            console.log("rejected");
        },
      },
});

export default authSlice.reducer;