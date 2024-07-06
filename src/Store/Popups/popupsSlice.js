import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {v4 as uuid4} from "uuid";
import { addToCart, removeFromCart, setProductCount } from '../Cart/cartSlice';
import { addToFav, removeFromFav } from '../Favorites/favoritesSlice';

const initialState = {
    popups: [],
    loading: true
}

// export const addPopup = createAsyncThunk(
//   'popups/addPopup',
//   async (popupText) => {
    
//     return newPopup;
// });

export const removePopup = createAsyncThunk(
    'popups/removePopup',
    async (popupId) => {
      return popupId;
  });
  

export const popupsSlice = createSlice({
    name: "popups",
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
        builder

        //addPopup
        // .addCase(addPopup.pending,(state) => {
        //     state.loading = true
        // })
        // .addCase(addPopup.fulfilled,(state, { payload }) => {
        //     state.loading = false
        //     state.popups.push(payload);
        //     console.log("popup added")
        // })
        // .addCase(addPopup.rejected,(state) => {
        //     state.loading = false;
        // })


        //removePopup
        .addCase(removePopup.pending,(state) => {
            state.loading = true
        })
        .addCase(removePopup.fulfilled,(state, { payload }) => {
            state.loading = false
            state.popups = state.popups.filter((p) => p.id !== payload);
        })
        .addCase(removePopup.rejected,(state) => {
            state.loading = false;
        })



        //Popup trigger cases
        .addCase(addToCart.fulfilled,(state, { payload }) => {
            
            const newPopup = {
                id: uuid4(),
                text: `(${payload.product.title}) added to Cart.`
            }
            state.popups.push(newPopup);
        })

        .addCase(removeFromCart.fulfilled,(state, { payload }) => {
            
            const newPopup = {
                id: uuid4(),
                text: `(${payload.product.title}) removed from Cart.`
            }
            state.popups.push(newPopup);
        })

        .addCase(setProductCount.fulfilled,(state, { payload }) => {
            
            const newPopup = {
                id: uuid4(),
                text: `(${payload.product.title}) ×${payload.count} in Cart.`
            }
            state.popups.push(newPopup);
        })

        .addCase(addToFav.fulfilled,(state, { payload }) => {
            
            const newPopup = {
                id: uuid4(),
                text: `(${payload.product.title}) added to Favorites.`
            }
            state.popups.push(newPopup);
        })

        .addCase(removeFromFav.fulfilled,(state, { payload }) => {
            
            const newPopup = {
                id: uuid4(),
                text: `(${payload.product.title}) removed from Favorites.`
            }
            state.popups.push(newPopup);
        })
        
      }
});

export default popupsSlice.reducer;