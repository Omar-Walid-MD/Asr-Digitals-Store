import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    products: [],
    productsInfo: {},
    loading: false
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const res = await fetch('http://localhost:8899/products').then(
    (data) => data.json()
  )
  return res;
});

export const getProductsInfo = createAsyncThunk(
  'products/getProductsInfo',
  async () => {
    const res = await fetch('http://localhost:8899/productsInfo').then(
    (data) => data.json()
  )
  return res;
});

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct) => {
    const res = axios.post('http://localhost:8899/products',newProduct);
    return (await res).data;
});

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({productId,editedProduct}) => {
    const res = axios.patch(`http://localhost:8899/products/${productId}`,editedProduct);
    return (await res).data;
});

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({productId}) => {
    const res = axios.delete(`http://localhost:8899/products/${productId}`);
    return productId;
});

export const setProductRating = createAsyncThunk(
  'products/setProductRating',
  async ({productId,rating}) => {
    const res = axios.patch(`http://localhost:8899/products/${productId}`,{rating: rating}).then(
    (data) => data)
  return (await res).data;
});

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {

        //getProducts
        [getProducts.pending]: (state) => {
            state.loading = true
        },
        [getProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            console.log("pending");
            state.products = payload;
        },
        [getProducts.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //getProductsInfo
        [getProductsInfo.pending]: (state) => {
          state.loading = true
        },
        [getProductsInfo.fulfilled]: (state, { payload }) => {
            state.loading = false
            console.log("pending");
            state.productsInfo = payload;
        },
        [getProductsInfo.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //addProduct
        [addProduct.pending]: (state) => {
          state.loading = true
        },
        [addProduct.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.products = [...state.products,payload];
        },
        [addProduct.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //editProduct
        [editProduct.pending]: (state) => {
          state.loading = true;
          console.log("pending edit")
        },
        [editProduct.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.products = state.products.map((product) => product.id===payload.id ? payload : product);
        },
        [editProduct.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //deleteProduct
        [deleteProduct.pending]: (state) => {
          state.loading = true
        },
        [deleteProduct.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.products = state.products.filter((product) => product.id!==payload);
        },
        [deleteProduct.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },

        //setProductRating
        [setProductRating.pending]: (state) => {
          state.loading = true
        },
        [setProductRating.fulfilled]: (state, { payload }) => {
            state.loading = false
            console.log(payload);
            state.products = state.products.map((product) => product.id===payload.id ? payload : product);
        },
        [setProductRating.rejected]: (state) => {
            state.loading = false;
            console.log("rejected");
        },
        
      },
});

export default productsSlice.reducer;