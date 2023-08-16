import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer';
import CartSideBar from './Layout/CartSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getUsers } from './Store/Auth/auth';
import { useEffect, useState } from 'react';
import { getProducts, getProductsInfo } from './Store/Products/productsSlice';
import { getCart } from './Store/Cart/cartSlice';
import { getFavs } from './Store/Favorites/favoritesSlice';
import { getReviews } from './Store/Reviews/reviewsSlice';
import { getPurchases, setPurchaseState } from './Store/Purchases/purchasesSlice';
import { getOffers } from './Store/Offers/offers';
import ScrollToTop from './Layout/ScrollToTop';
import { refreshPurchases } from './helpers';

function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.auth.currentUser);
  const purchases = useSelector((store) => store.purchases.purchases);

  const [refreshInterval,setRefreshInterval] = useState();

  useEffect(()=>{
    console.log("fetching all data");
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getProductsInfo());
    dispatch(getCurrentUser());
    dispatch(getReviews());
    dispatch(getPurchases());
    dispatch(getOffers());
  },[]);
  
  useEffect(()=>{
    dispatch(getCart());
    dispatch(getFavs());
  },[currentUser]);

  // useEffect(()=>{
  //   if(purchases.length && !refreshInterval)
  //   {

  //     console.log(purchases);
  //     setRefreshInterval(
  
  //       setInterval(() => {
  //       console.log("refresh");
  //       refreshPurchases(purchases,(purchase)=>{
  //         dispatch(setPurchaseState({purchase,status:"success"}))})
  //     }, 5000));
  //   }
  // },[purchases])

  return (
    <div className="App">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default App;
