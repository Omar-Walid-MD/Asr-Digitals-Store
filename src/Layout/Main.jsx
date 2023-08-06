import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Layout/NavBar';
import Footer from '../Layout/Footer';
import CartSideBar from '../Layout/CartSideBar';

function Main({}) {
    return (
        <>
            <NavBar />
            <Outlet />
            <CartSideBar />
            <Footer />
        </>
    );
}

export default Main;