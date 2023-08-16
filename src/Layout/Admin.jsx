import React from 'react';
import { Outlet } from 'react-router';
import NavBarAdmin from './NavBarAdmin';

function Admin({}) {
    return (
        <div className='bg-light bg-img-dashboard page-container'>
            <NavBarAdmin />
            <Outlet />
        </div>
    );
}

export default Admin;