import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import NavBarAdmin from './NavBarAdmin';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Admin({}) {

    const currentUser = useSelector((store) => store.auth.currentUser);
    const navigate = useNavigate();

    return (
        <div >
        {
            currentUser &&
            currentUser.role==="admin" ?
            <div className='bg-light bg-img-dashboard page-container'>
                <NavBarAdmin />
                <Outlet />
            </div>
            :
            <div className='page-container bg-light d-flex align-items-center justify-content-center'>
                <div className='text-center'>
                    <h2>You do not have access to this page.</h2>
                    <img className='my-3' src={require("../img/access-error-img.png")} style={{width:"min(30rem,70vw)",filter:"drop-shadow(0.5em 0.3em 0.2em rgba(0,0,0,0.4))"}} alt="" />
                    <p className='fw-semibold'>If you think you should have access to this page, please make sure you're logged in to your account.</p>
                    <div className="d-flex gap-2 w-100">
                        <Button className='btn w-100 text-white text-decoration-none main-button bg-secondary' onClick={()=>{navigate(-1)}}>Take Me Back</Button>
                        <Link to={"/"} className='btn w-100 text-white text-decoration-none main-button bg-primary'>Home</Link>
                    </div>
                </div>
            </div>
        }
        </div>
    );
}

export default Admin;