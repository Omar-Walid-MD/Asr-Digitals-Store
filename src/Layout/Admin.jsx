import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import NavBarAdmin from './NavBarAdmin';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

function Admin({}) {

    const currentUser = useSelector((store) => store.auth.currentUser);
    const loading = useSelector((store) => store.auth.loading);
    const loggedInState = useSelector((store) => store.auth.loggedInState);
    const navigate = useNavigate();

    return (
        <div >
        {
            (loading || (loggedInState==="pending")) ?
            <div className='page-container bg-light d-flex flex-column py-5 px-0 px-md-3 align-items-center align-items-md-start gap-2'>
                <div className="loading-bg rounded-3 mb-2" style={{height:"5rem",width:"15rem",marginTop:"6rem"}}></div>
                <div className="loading-bg rounded-sm-3 w-100 mb-1" style={{height:"2.75rem"}}></div>
                <div className="loading-bg rounded-sm-3 w-100" style={{height:"8rem"}}></div>
                <div className="loading-bg rounded-sm-3 w-100" style={{height:"8rem"}}></div>
                <div className="loading-bg rounded-sm-3 w-100" style={{height:"8rem"}}></div>


            </div>
            :
            (loggedInState==="yes" ) ?
            <div className='bg-light bg-img-dashboard page-container'>
                <NavBarAdmin />
                <Outlet />
            </div>
            :
            <div className='page-container error-page-bg d-flex align-items-center justify-content-center'>
                <div className='text-center'>
                    <h2>You do not have access to this page.</h2>
                    <img className='my-3' src={require("../img/access-error-img.png")} style={{width:"min(30rem,70vw)",filter:"drop-shadow(0.5em 0.3em 0.2em rgba(0,0,0,0.4))"}} alt="" />
                    <p className='fw-semibold'>If you think you should have access to this page, please make sure you're logged in to your account.</p>
                    <div className="d-flex gap-2 w-100 mb-2">
                        <Link to={"/"} className='btn w-100 text-white text-decoration-none main-button border-0 bg-primary'>Home</Link>
                        <Link to={"/login"} className='btn bg-secondary w-100 text-white text-decoration-none main-button border-0 bg-primary'>Log in</Link>
                    </div>
                </div>
            </div>
            
        }
        </div>
    );
}

export default Admin;