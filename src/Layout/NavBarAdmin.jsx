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
    const loggedInState = useSelector((store) => store.auth.loggedInState);
    const authLoading = useSelector((store) => store.auth.loading);
    const currentUser = useSelector((store) => store.auth.currentUser);
  
    function linkActive(pathname)
    {
        return `/${pathname}`===location.pathname ? "active" : "";
    }

    const dispatch = useDispatch();

    return (
        <Navbar expand="lg" className="bg-body-tertiary position-sticky top-0 shadow py-0">
            <Container className="navbar-container d-flex align-items-stretch justify-content-between gap-0 gap-md-4 w-100">
                <div className="d-flex gap-3">
                    <Navbar.Brand className='' as={NavLink} to={"/"}>
                        <div className='d-flex align-items-start gap-1 m-0' style={{width:"min(11.4rem,65vw)"}}>
                            <img style={{width:"30.75%"}} src={require("../img/logo.png")} alt="" />
                            <img style={{width:"69.25%"}} src={require("../img/logo-text.png")} alt="" />
                        </div>
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 shadow-none p-0' />
                <Navbar.Collapse id="basic-navbar-nav" className="align-items-stretch w-100 flex-grow-0">
                    <Nav className="align-items-stretch gap-2 mt-3 m-md-0 w-100">
                        <Row className='w-100 h-100 m-0 p-0'>
                            <Col>
                                <Nav.Link as={Link} to={"/admin"} className={`navbar-link h-100 m-0 position-relative d-flex align-items-center justify-content-center ${linkActive("admin")}`}>Dashboard</Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link as={Link} to={"/admin/clients"} className={`navbar-link h-100 position-relative d-flex align-items-center justify-content-center ${linkActive("admin/clients")}`}>Clients</Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link as={Link} to={"/admin/purchases"} className={`navbar-link h-100 position-relative d-flex align-items-center justify-content-center ${linkActive("admin/purchases")}`}>Purchases</Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link as={Link} to={"/admin/products"} className={`navbar-link h-100 position-relative d-flex align-items-center justify-content-center ${linkActive("admin/products")}`}>Products</Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link as={Link} to={"/admin/offers"} className={`navbar-link h-100 position-relative d-flex align-items-center justify-content-center ${linkActive("admin/offers")}`}>Offers</Nav.Link>
                            </Col>
                            <Col className='col-12 col-md-1 d-flex justify-content-center mt-2 mb-2 my-lg-0'>
                                {
                                    !authLoading ?
                                    loggedInState==="no" ?
                                    <div className='d-flex gap-3 mt-2 m-sm-0'>
                                        <Button variant='secondary' as={Link} to="/login" state={{prevPath: location.pathname}} className=''>Login</Button>
                                        <Button variant='secondary' as={Link} to="/register" state={{prevPath: location.pathname}} className='btn bg-transparent text-secondary border-3 fw-semibold'>Register</Button>
                                    </div>
                                    :
                                    <div className='d-flex d-flex align-items-center h-100 justify-content-end navbar-dropdown-menu'>
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
                            </Col>
                        </Row>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {
                (currentUser && currentUser.role)==="admin" ? 
                <Link to={"/"} className='text-dark text-decoration-none position-absolute top-100 bg-body-tertiary px-2 py-2 rounded-1 rounded-top-0 ms-2 shadow d-flex align-items-center gap-1' style={{zIndex:"-1",transform: "translateY(0.1em)"}}>To App <RiShoppingBag3Fill /> </Link>
                : ""
            }
        </Navbar>
    );
}

export default NavBarAdmin;