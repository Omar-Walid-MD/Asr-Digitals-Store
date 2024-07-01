import './App.css';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateCurrentUser, editUser, getCurrentUser, getUsers } from './Store/Auth/auth';
import { useEffect, useState } from 'react';
import { getProducts, getProductsInfo, setProductRating } from './Store/Products/productsSlice';
import { getCart } from './Store/Cart/cartSlice';
import { getFavs } from './Store/Favorites/favoritesSlice';
import { getReviews } from './Store/Reviews/reviewsSlice';
import { getPurchases, setPurchaseStatus } from './Store/Purchases/purchasesSlice';
import { editOffer, getOffers, setOfferStatus } from './Store/Offers/offers';
import ScrollToTop from './Layout/ScrollToTop';
import { generateRandomOffers, generateRandomPurchases, generateRandomReviews, getRating, makeIdWithChars, makeUniqueId, refreshOffers, refreshPurchases } from './helpers';
import { getPreviewStats } from './Store/PreviewStats/previewStats';
import { getFontSize } from './Store/Settings/settingsSlice';
import { auth, database } from './Firebase/firebase';
import { ref, set } from 'firebase/database';
//ykl5VLeGYBaxWfiQ
function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.auth.currentUser);

  // const purchases = useSelector((store) => store.purchases.purchases);
  // const offers = useSelector((store) => store.offers.offers);

  // const users = useSelector((store) => store.auth.users);
  const products = useSelector((store) => store.products.products);
  // const reviews = useSelector((store) => store.reviews.reviews);

  // const [reviewsCheck,setReviewsCheck] = useState(false);

  // const [refreshInterval,setRefreshInterval] = useState();

  useEffect(()=>{
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getProductsInfo());
    // dispatch(getCurrentUser());
    dispatch(getReviews());
    dispatch(getPurchases());
    dispatch(getOffers());
    dispatch(getPreviewStats());
    dispatch(getFontSize());


    auth.onAuthStateChanged(function(user) {
      if(user)
      {
        (async()=>{
          dispatch(authenticateCurrentUser(user))
        })();
      }
      else dispatch(authenticateCurrentUser(null));
    });
  },[]);
  
  useEffect(()=>{
    dispatch(getCart());
    dispatch(getFavs());
  },[currentUser]);


  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //     refreshPurchases(purchases,(purchase,status)=>{dispatch(setPurchaseStatus({purchase,status}))})
  //     refreshOffers(offers,(offer,status)=>{dispatch(setOfferStatus({offer,status}))})

  //   }, 1000 * 60 * 5);
  //   return ()=> clearInterval(interval);  
  // },[purchases,offers]);


  return (
    <div className="App">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default App;
