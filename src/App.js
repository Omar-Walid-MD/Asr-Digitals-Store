import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer';
import CartSideBar from './Layout/CartSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getUsers } from './Store/Auth/auth';
import { useEffect } from 'react';
import { getProducts, getProductsInfo } from './Store/Products/productsSlice';
import { getCart } from './Store/Cart/cartSlice';
import { getFavs } from './Store/Favorites/favoritesSlice';
import { getReviews } from './Store/Reviews/reviewsSlice';
import { getPurchases } from './Store/Purchases/purchasesSlice';

function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.auth.currentUser);

  useEffect(()=>{
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getProductsInfo());
    dispatch(getCurrentUser());
    dispatch(getReviews());
    dispatch(getPurchases());
  },[]);
  
  useEffect(()=>{
    dispatch(getCart());
    dispatch(getFavs());
  },[currentUser])

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
