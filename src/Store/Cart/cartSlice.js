import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    cart: [],
    loading: false
}

export const getCart = createAsyncThunk(
  'cart/getCart',
  async () => {
    let res;
    let currentUserId = localStorage.getItem("currentUser")
    if(currentUserId)
    {
        res = await fetch(`http://localhost:8899/users/${currentUserId}`).then(
        (data) => data.json());
        return res.cart;
    }
    else
    {
        if(localStorage.getItem(JSON.parse("userCart")))
        {
            localStorage.setItem("userCart",JSON.stringify([]))
        }
        res = localStorage.getItem(JSON.parse("userCart"));
        return res;
    }
});

export const addToCart = createAsyncThunk(
'cart/addToCart',
async (productId, {getState}) => {
    let res;
    let currentUserId = localStorage.getItem("currentUser");
    if(currentUserId)
    {

        let updatedCart = [...getState().cart.cart,{productId: productId, count: 1}];
        res = axios.patch(`http://localhost:8899/users/${currentUserId}`,{cart: updatedCart}).then(
        (data) => data);
        return updatedCart;
    }
    else
    {
        let localCart = localStorage.getItem(JSON.parse("userCart"))
        if(localCart)
        {
            localCart = [...localCart,{productId: productId, count: 1}];
            localStorage.setItem("userCart",JSON.stringify(localCart));
            return localCart;
        }
    }
});


export const removeFromCart = createAsyncThunk(
'cart/removeFromCart',
async (productId, {getState}) => {
    let res;
    let currentUserId = localStorage.getItem("currentUser");
    if(currentUserId)
    {
        let updatedCart = getState().cart.cart.filter((product) => product.productId !== productId);
        res = axios.patch(`http://localhost:8899/users/${currentUserId}`,{cart: updatedCart}).then(
        (data) => data);
        console.log(res);
        return updatedCart;
    }
    else
    {
        let localCart = localStorage.getItem(JSON.parse("userCart"))
        if(localCart)
        {
            localCart = localCart.filter((product) => product.productId !== productId);
            localStorage.setItem("userCart",JSON.stringify(localCart));
            return localCart;
        }
    }
});

export const setProductCount = createAsyncThunk(
    'cart/setProductCount',
    async ({productId, count}, {getState}) => {
        let res;
        let currentUserId = localStorage.getItem("currentUser");
        if(currentUserId)
        {
            let updatedCart = getState().cart.cart.map((product) => product.productId === productId ? {productId: productId, count: count} : product);
            res = axios.patch(`http://localhost:8899/users/${currentUserId}`,{cart: updatedCart}).then(
            (data) => data);
            return updatedCart;
        }
        else
        {
            let localCart = localStorage.getItem(JSON.parse("userCart"))
            if(localCart)
            {
                localCart = localCart.map((product) => product.productId === productId ? {productId: productId, count: count} : product);
                localStorage.setItem("userCart",JSON.stringify(localCart));
                return localCart;
            }
        }
    });

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: {

        //getCart
        [getCart.pending]: (state) => {
            state.loading = true
        },
        [getCart.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.cart = payload;
        },
        [getCart.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },


        //addToCart 
        [addToCart.pending]: (state) => {
            state.loading = true
        },
        [addToCart.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.cart = payload;
            console.log("added item");
        },
        [addToCart.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //removeFromCart 
        [removeFromCart.pending]: (state) => {
            state.loading = true
            console.log("removing item");
        },
        [removeFromCart.fulfilled]: (state, { payload }) => {
            state.loading = false;
            console.log("removed item");
            state.cart = payload;
        },
        [removeFromCart.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //setProductCount 
        [setProductCount.pending]: (state) => {
            state.loading = true;
            console.log("setting product count");
        },
        [setProductCount.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.cart = payload;
            console.log("set product count");
        },
        [setProductCount.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },
        
      },
});

export default cartSlice.reducer;