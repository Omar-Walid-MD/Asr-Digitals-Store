import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Layout/NavBar';
import Footer from '../Layout/Footer';
import CartSideBar from '../Layout/CartSideBar';
import PopupContainer from '../Components/PopupContainer';

function Main({}) {
    return (
        <>
            <NavBar />
            <Outlet />
            <CartSideBar />
            <PopupContainer />
            <Footer />
        </>
    );
}

export default Main;