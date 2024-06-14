import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    cart: [],
    loading: true
}

export const getCart = createAsyncThunk(
  'cart/getCart',
  async () => {
    let res;
    let currentUserId = localStorage.getItem("currentUser");
    let localCart = JSON.parse(localStorage.getItem("userCart"));
    if(currentUserId)
    {
        res = await fetch(`http://localhost:8899/users/${currentUserId}`).then(
        (data) => data.json());

        // if(res.cart.length===0 && localCart.length > 0)
        // {
        //     axios.patch(`http://localhost:8899/users/${currentUserId}`,{cart: localCart});
        //     return localCart;
        // }

        return res.cart;

    }
    else
    {
        if(!localCart)
        {
            localStorage.setItem("userCart",JSON.stringify([]))
        }
        res = localCart;
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
        let localCart = JSON.parse(localStorage.getItem("userCart"))
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
        return updatedCart;
    }
    else
    {
        let localCart = JSON.parse(localStorage.getItem("userCart"))
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
            let localCart = JSON.parse(localStorage.getItem("userCart"))
            if(localCart)
            {
                localCart = localCart.map((product) => product.productId === productId ? {productId: productId, count: count} : product);
                localStorage.setItem("userCart",JSON.stringify(localCart));
                return localCart;
            }
        }
});

export const emptyCart = createAsyncThunk(
    'cart/emptyCart',
    async (productId, {getState}) => {
        let res;
        let currentUserId = localStorage.getItem("currentUser");
        if(currentUserId)
        {
            res = axios.patch(`http://localhost:8899/users/${currentUserId}`,{cart: []}).then(
            (data) => data);
            return;
        }
        else
        {
            let localCart = JSON.parse(localStorage.getItem("userCart"))
            if(localCart)
            {
                localCart = [];
                localStorage.setItem("userCart",JSON.stringify(localCart));
                return;
            }
        }
}); 

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getCart
        .addCase(getCart.pending,(state) => {
            state.loading = true
        })
        .addCase(getCart.fulfilled,(state, { payload }) => {
            state.loading = false
            state.cart = payload;
        })
        .addCase(getCart.rejected,(state) => {
            state.loading = false;
        })


        //addToCart
        .addCase(addToCart.pending,(state) => {
            state.loading = true
        })
        .addCase(addToCart.fulfilled,(state, { payload }) => {
            state.loading = false
            state.cart = payload;
        })
        .addCase(addToCart.rejected,(state) => {
            state.loading = false;
        })
        

        //removeFromCart
        .addCase(removeFromCart.pending,(state) => {
            state.loading = true
        })
        .addCase(removeFromCart.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.cart = payload;
        })
        .addCase(removeFromCart.rejected,(state) => {
            state.loading = false;
        })
        

        //emptyCart
        .addCase(emptyCart.pending,(state) => {
            state.loading = true
        })
        .addCase(emptyCart.fulfilled,(state) => {
            state.loading = false;
            state.cart = [];
        })
        .addCase(emptyCart.rejected,(state) => {
            state.loading = false;
        })
        

        //setProductCount
        .addCase(setProductCount.pending,(state) => {
            state.loading = true;
        })
        .addCase(setProductCount.fulfilled,(state, { payload }) => {
            state.loading = false
            state.cart = payload;
        })
        .addCase(setProductCount.rejected,(state) => {
            state.loading = false;
        }) 
        
      },
});

export default cartSlice.reducer;