import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/auth'
import productsReducer from './Products/productsSlice';
import cartReducer from './Cart/cartSlice';
import favoritesReducer from './Favorites/favoritesSlice';
import reviewsReducer from './Reviews/reviewsSlice';
import purchasesReducer from './Purchases/purchasesSlice';
import offersReducer from './Offers/offers';
import previewStatsReducer from './PreviewStats/previewStats';
import settingsReducer from './Settings/settingsSlice';
import popupsReducer from './Popups/popupsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    reviews: reviewsReducer,
    purchases: purchasesReducer,
    offers: offersReducer,
    previewStats: previewStatsReducer,
    settings: settingsReducer,
    popups: popupsReducer
  },
})