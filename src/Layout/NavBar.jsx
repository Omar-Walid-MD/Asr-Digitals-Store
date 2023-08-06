import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillCartFill, BsFillPersonFill, BsSearch } from "react-icons/bs";
import { Button, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logoutUser } from '../Store/Auth/auth';
import { getCartTotalCount } from '../helpers';

function NavBar({}) {

    const location = useLocation();
    const loggedIn = useSelector((store) => store.auth.loggedIn);
    const authLoading = useSelector((store) => store.auth.loading);

    const cart = useSelector((store) => store.cart.cart);

    const [cartTotal, setCartTotal]  = useState(0);

    function linkActive(pathname)
    {
        return `/${pathname}`===location.pathname ? "active" : "";
    }

    const dispatch = useDispatch();


    useEffect(()=>{
        if(cart) setCartTotal(getCartTotalCount(cart));
    },[cart]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary position-sticky top-0 shadow">
            <Container className=" d-flex align-items-center justify-content-between">
                <Navbar.Brand as={NavLink} to="/">Asr Digitals</Navbar.Brand>
                <div className="align-items-center justify-content-start d-none d-sm-flex w-50">
                    <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                        <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                        <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' />
                    </div>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="align-items-center flex-grow-0">
                    <Nav className="align-items-center gap-3 mt-3 m-lg-0">
                        <div className="d-flex d-sm-none align-items-center justify-content-center">
                            <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                                <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                                <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' />
                            </div>
                        </div>
                        <div className={`d-flex gap-3 ${!loggedIn ? "flex-column" : ""} flex-sm-row align-items-center`}>
                            <div className="d-flex gap-3">
                                <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("shop")}`} as={NavLink} to="/shop">Shop</Nav.Link>
                                <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("about")}`} href="#link">About</Nav.Link>
                                <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("contact")}`} href="#link">Contact</Nav.Link>

                                <Nav.Link className={`cart-link position-relative d-flex justify-content-center ${linkActive("cart")}`} as={NavLink} to="/cart">
                                    <BsFillCartFill className='fs-4 text-secondary' />
                                    {cartTotal ? <span className='badge bg-danger position-absolute top-0 left-0 rounded-pill d-flex justify-content-center align-items-center text-white' style={{transform: "translate(-50%,-25%)"}}>{cartTotal}</span> : ""}
                                </Nav.Link>
                            </div>
                            <div>
                            {
                                !authLoading ?
                                !loggedIn ?
                                <div className='d-flex gap-3 mt-2 m-sm-0'>
                                    <Button variant='secondary' as={Link} to="/login" state={{prevPath: location.pathname}} className=''>Login</Button>
                                    <Button variant='secondary' as={Link} to="/register" state={{prevPath: location.pathname}} className='btn bg-transparent text-secondary border-3 fw-semibold'>Register</Button>
                                </div>
                                :
                                <div className='d-flex justify-content-end justify-content-xl-center position-relative navbar-profile-menu'>

                                    <div className='bg-light p-1 d-flex fs-3 border rounded-circle navbar-profile-button'><BsFillPersonFill /></div>
                                    <div className="position-absolute navbar-profile-dropdown-container">
                                        <div className="bg-light shadow navbar-profile-dropdown w-100 shadow">
                                            <Link className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none'>Profile</Link>
                                            <Link className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none'>Purchases</Link>
                                            <Link to={"/favorites"} className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none'>Favorites</Link>
                                            <div className='px-4 py-2 border-bottom d-flex justify-content-center'>
                                                <Button variant='danger' onClick={()=>{dispatch(logoutUser());}}>Log out</Button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                :
                                <Spinner />
                            }
                            </div>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;