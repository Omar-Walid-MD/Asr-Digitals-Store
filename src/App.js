import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer';
import CartSideBar from './Layout/CartSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './Store/Auth/auth';
import { useEffect } from 'react';
import { getProducts } from './Store/Products/productsSlice';
import { getCart } from './Store/Cart/cartSlice';
import { getFavs } from './Store/Favorites/favoritesSlice';
import { getReviews } from './Store/Reviews/reviewsSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getCart());
    dispatch(getFavs());
    dispatch(getReviews());
  },[]);

  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <CartSideBar />
      <Footer />
    </div>
  );
}

export default App;
