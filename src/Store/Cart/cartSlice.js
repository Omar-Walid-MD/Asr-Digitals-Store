import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { auth } from '../../Firebase/firebase';
import { database } from '../../Firebase/firebase';
import { ref, set } from 'firebase/database';

const initialState = {
    cart: [],
    loading: true
}


function getCartArray(cartObject){return Object.keys(cartObject).map((key)=>({productId:key,count:cartObject[key]}));}
function getCartObject(cartArray)
{
    let cartObject = {};
    cartArray.forEach((cartItem)=>{cartObject[cartItem.productId] = cartItem.count;});
    return cartObject;
}

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (args,{getState}) => {
    
    let localCart = JSON.parse(localStorage.getItem("userCart"));

    if(auth.currentUser)
    {
        const userCartObject = getState().auth.currentUser.cart || {};
        const userCart = getCartArray(userCartObject);

        if(userCart.length===0 && localCart.length > 0)
        {
            set(ref(database, `users/${auth.currentUser.uid}/cart`), localCart);
            return localCart;
        }
        else
        {
            return userCart;
        }
    }
    else
    {
        if(localCart)
        {
            return localCart;
        }
        else
        {
            localStorage.setItem("userCart",JSON.stringify([]))
            return [];
        }
    }
});

export const addToCart = createAsyncThunk(
'cart/addToCart',
async (productId, {getState}) => {

    const product = getState().products.products.find((p)=>p.id === productId);

    if(auth.currentUser)
    {
        let updatedCart = [...getState().cart.cart,{productId: productId, count: 1}];

        set(ref(database, `users/${auth.currentUser.uid}/cart`), getCartObject(updatedCart));
        return {product,cart:updatedCart};
    }
    else
    {
        let localCart = JSON.parse(localStorage.getItem("userCart"))
        if(localCart)
        {
            localCart = [...localCart,{productId: productId, count: 1}];
            localStorage.setItem("userCart",JSON.stringify(localCart));
            return {product,cart:localCart};
        }
    }
});

export const removeFromCart = createAsyncThunk(
'cart/removeFromCart',
async (productId, {getState}) => {

    const product = getState().products.products.find((p)=>p.id === productId);

    if(auth.currentUser)
    {
        let updatedCart = getState().cart.cart.filter((product) => product.productId !== productId);

        set(ref(database, `users/${auth.currentUser.uid}/cart`), getCartObject(updatedCart));
        return {product,cart:updatedCart};
    }
    else
    {
        let localCart = JSON.parse(localStorage.getItem("userCart"))
        if(localCart)
        {
            localCart = localCart.filter((product) => product.productId !== productId);
            localStorage.setItem("userCart",JSON.stringify(localCart));
            return {product,cart:localCart};
        }
    }
});

export const setProductCount = createAsyncThunk(
'cart/setProductCount',
async ({productId, count}, {getState}) => {

    const product = getState().products.products.find((p)=>p.id === productId);

    if(auth.currentUser)
    {
        let updatedCart = getState().cart.cart.map((product) => product.productId === productId ? {productId: productId, count: count} : product);

        set(ref(database, `users/${auth.currentUser.uid}/cart/${productId}`), count);
        return {product,count,cart:updatedCart};
    }
    else
    {
        let localCart = JSON.parse(localStorage.getItem("userCart"))
        if(localCart)
        {
            localCart = localCart.map((product) => product.productId === productId ? {productId: productId, count: count} : product);
            localStorage.setItem("userCart",JSON.stringify(localCart));
            return {product,count,cart:localCart};
        }
    }
});

export const emptyCart = createAsyncThunk(
    'cart/emptyCart',
async () => {

    if(auth.currentUser)
    {

        set(ref(database, `users/${auth.currentUser.uid}/cart`), {});
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
            state.cart = payload.cart;
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
            state.cart = payload.cart;
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
            state.cart = payload.cart;
        })
        .addCase(setProductCount.rejected,(state) => {
            state.loading = false;
        }) 
        
      },
});

export default cartSlice.reducer;