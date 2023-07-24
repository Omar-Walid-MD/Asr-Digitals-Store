import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer';
import CartSideBar from './Layout/CartSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './Store/Auth/auth';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUsers());
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
