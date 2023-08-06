import React from 'react';
import { Outlet } from 'react-router';

function Auth({}) {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Auth;