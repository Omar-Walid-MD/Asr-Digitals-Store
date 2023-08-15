import React from 'react';
import { Outlet } from 'react-router';
import NavBarAdmin from './NavBarAdmin';

function Admin({}) {
    return (
        <div>
            <NavBarAdmin />
            <Outlet />
        </div>
    );
}

export default Admin;