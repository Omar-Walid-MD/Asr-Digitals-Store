import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsCaretLeft, BsCaretLeftFill, BsCaretRightFill, BsFillCartFill, BsFillPersonFill, BsSearch, BsX } from "react-icons/bs";
import { Button, Col, Dropdown, DropdownButton, Modal, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logoutUser } from '../Store/Auth/auth';
import { getCartTotalCount } from '../helpers';
import { RiShoppingBag3Fill } from "react-icons/ri";

function NavBarAdmin({}) {

    const location = useLocation();
    const loggedIn = useSelector((store) => store.auth.loggedIn);
    const authLoading = useSelector((store) => store.auth.loading);
    const currentUser = useSelector((store) => store.auth.currentUser);
  
    function linkActive(pathname)
    {
        return `/${pathname}`===location.pathname ? "active" : "";
    }

    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(cart) setCartTotal(getCartTotalCount(cart));
    // },[cart]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary position-sticky top-0 shadow py-1 py-md-2">
            <Container className="navbar-container d-flex align-items-center justify-content-between gap-0 gap-md-4 w-100">
                <div className="d-flex gap-3 w-75">
                    <Navbar.Brand as={NavLink} to={"/"}>Asr Digitals</Navbar.Brand>
                    {/* <div className="w-100 align-items-center justify-content-start d-none d-sm-flex search-container">
                        <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                            <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                            <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' value={searchValue} onChange={handleSearch} />
                        </div>
                    </div> */}
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 shadow-none p-0' />
                <Navbar.Collapse id="basic-navbar-nav" className="align-items-center flex-grow-0">
                    <Nav className="align-items-center gap-2 mt-3 m-md-0">
                        {/* <div className="d-flex d-sm-none align-items-center justify-content-center">
                            <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                                <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                                <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' value={searchValue} onChange={handleSearch} />
                            </div>
                        </div> */}
                        <div className={`d-flex gap-3 ${!loggedIn ? "flex-column" : ""} flex-sm-row align-items-center`}>
                            <div className="d-flex gap-3">
                                {/* <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("shop")}`} as={NavLink} to="/shop">Shop</Nav.Link> */}
                                <Nav.Link as={Link} to={"/admin"} className={`navbar-link m-0 position-relative d-flex justify-content-center ${linkActive("admin")}`}>Dashboard</Nav.Link>
                                <Nav.Link as={Link} to={"/admin/clients"} className={`navbar-link position-relative d-flex justify-content-center ${linkActive("admin/clients")}`}>Clients</Nav.Link>
                                <Nav.Link as={Link} to={"/admin/purchases"} className={`navbar-link position-relative d-flex justify-content-center ${linkActive("admin/purchases")}`}>Purchases</Nav.Link>
                                <Nav.Link as={Link} to={"/admin/products"} className={`navbar-link position-relative d-flex justify-content-center ${linkActive("admin/products")}`}>Products</Nav.Link>
                                <Nav.Link as={Link} to={"/admin/offers"} className={`navbar-link position-relative d-flex justify-content-center ${linkActive("admin/offers")}`}>Offers</Nav.Link>
                               
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
                                <div className='d-flex justify-content-end justify-content-xl-center navbar-dropdown-menu'>
                                    <div className='bg-light p-1 d-flex fs-3 border rounded-circle navbar-dropdown-button'><BsFillPersonFill /></div>
                                    <div className="position-absolute navbar-dropdown-container">
                                        <div className="bg-light shadow navbar-dropdown overflow-hidden">
                                            <Link to={"/profile"} className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none'>Profile</Link>
                                            <Link to={"/purchases"} className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none'>Purchases</Link>
                                            <Link to={"/favorites"} className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none'>Favorites</Link>
                                            <div className='px-4 py-2 d-flex justify-content-center'>
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
            {
                (currentUser && currentUser.role)==="admin" ? 
                <Link to={"/"} className='text-dark text-decoration-none position-absolute top-100 bg-light px-2 py-2 rounded-1 rounded-top-0 ms-2 shadow d-flex align-items-center gap-1'>To App <RiShoppingBag3Fill /> </Link>
                : ""
            }
        </Navbar>
    );
}

export default NavBarAdmin;