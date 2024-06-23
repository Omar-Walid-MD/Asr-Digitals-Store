import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { child, get, ref, set, update, remove } from 'firebase/database';
import { database } from '../../Firebase/firebase';

const initialState = {
    products: [],
    productsInfo: {},
    loading: true
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    // return [];
    return await get(child(ref(database), "products")).then((snapshot) => {
      if(snapshot.exists())
      {
        const productsObject = snapshot.val()
        const productsList = Object.keys(productsObject).map((productId)=>({
          ...productsObject[productId],
          id: productId
        }));
        return productsList;
      }
  });
});

export const getProductsInfo = createAsyncThunk(
  'products/getProductsInfo',
  async () => {
    return await get(child(ref(database), "productsInfo")).then((snapshot) => {
      if(snapshot.exists())
      {
        let productsInfoObject = snapshot.val();
        productsInfoObject.categories = Object.keys(productsInfoObject.categories).map((categoryName)=>{

          let specs = productsInfoObject.categories[categoryName].specs;
          specs = Object.keys(specs).map((s)=>({
            code: s,
            name: specs[s]
          }));

          return {
            ...productsInfoObject.categories[categoryName],
            name: categoryName,
            specs
          }
        });

        Object.keys(productsInfoObject.categoryGroups).forEach((categoryGroup)=>{
          productsInfoObject.categoryGroups[categoryGroup] = Object.keys(productsInfoObject.categoryGroups[categoryGroup]);
        })
        
        return productsInfoObject;
      }
  });
});

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (newProduct) => {
    set(ref(database, 'products/' + newProduct.id), newProduct);
    return newProduct;
});

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({productId,editedProduct}) => {
    update(ref(database, 'products/' + productId), editedProduct);
    return editedProduct;
});

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({productId}) => {
    remove(ref(database, 'products/' + productId))
    return productId;
});

export const setProductRating = createAsyncThunk(
  'products/setProductRating',
  async ({productId,rating}) => {
    update(ref(database, 'products/' + productId), {rating: rating});
    return {id:productId,rating};
});

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //getProducts
        .addCase(getProducts.pending,(state) => {
            state.loading = true
        })
        .addCase(getProducts.fulfilled,(state, { payload }) => {
            state.loading = false
            state.products = payload;
        })
        .addCase(getProducts.rejected,(state) => {
            state.loading = false;
        })
        

        //getProductsInfo
        .addCase(getProductsInfo.pending,(state) => {
          state.loading = true
        })
        .addCase(getProductsInfo.fulfilled,(state, { payload }) => {
            state.loading = false
            state.productsInfo = payload;
        })
        .addCase(getProductsInfo.rejected,(state) => {
            state.loading = false;
        })
        

        //addProduct
        .addCase(addProduct.pending,(state) => {
          state.loading = true
        })
        .addCase(addProduct.fulfilled,(state, { payload }) => {
            state.loading = false
            state.products = [...state.products,payload];
        })
        .addCase(addProduct.rejected,(state) => {
            state.loading = false;
        })
        

        //editProduct
        .addCase(editProduct.pending,(state) => {
          state.loading = true;
        })
        .addCase(editProduct.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.products = state.products.map((product) => product.id===payload.id ? payload : product);
        })
        .addCase(editProduct.rejected,(state) => {
            state.loading = false;
        })
        

        //deleteProduct
        .addCase(deleteProduct.pending,(state) => {
          state.loading = true
        })
        .addCase(deleteProduct.fulfilled,(state, { payload }) => {
            state.loading = false;
            state.products = state.products.filter((product) => product.id!==payload);
        })
        .addCase(deleteProduct.rejected,(state) => {
            state.loading = false;
        })
        

        //setProductRating
        .addCase(setProductRating.pending,(state) => {
          state.loading = true
        })
        .addCase(setProductRating.fulfilled,(state, { payload }) => {
            state.loading = false
            state.products = state.products.map((product) => product.id===payload.id ? ({...product,rating:payload.rating}) : product);
        })
        .addCase(setProductRating.rejected,(state) => {
            state.loading = false;
        })
        
      }
});

export default productsSlice.reducer;