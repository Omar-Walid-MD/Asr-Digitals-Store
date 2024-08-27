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
import { getCartTotalCount, throttle } from '../helpers';
import ProductCard from '../Components/ProductCard';
import { MdDashboard } from "react-icons/md";
import { RiFontSize } from 'react-icons/ri';

import i18next from "i18next";
import { setFontSize } from '../Store/Settings/settingsSlice';

function NavBar({}) {

    const location = useLocation();
    const loggedInState = useSelector((store) => store.auth.loggedInState);
    const currentUser = useSelector((store) => store.auth.currentUser);
    const authLoading = useSelector((store) => store.auth.loading);
    const products = useSelector((store) => store.products.products);
    const cart = useSelector((store) => store.cart.cart);
    const productsInfo = useSelector((store) => store.products.productsInfo);
    const fontSize = useSelector((store) => store.settings.fontSize);

    const [searchModal,setSearchModal] = useState(false);
    const handleSearchModalShow = () => setSearchModal(true);
    const handleSearchModalClose = () => {setSearchModal(false); setSearchValue("");};

    const [searchValue,setSearchValue] = useState("");
    const dispatch = useDispatch();


    function handleSearch(e)
    {
        console.log(e.target.value)
        setSearchValue(e.target.value);
        if(e.target.value.length < 3) {if(searchModal) setSearchModal(false);}
        else {if(!searchModal) setSearchModal(true);}
        e.target.focus();
    }

    function getSearchResults()
    {
        if(searchValue.length<3) return [];
        let results = products.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase())).slice(0,4);
        return results;
    }

    const [cartTotal, setCartTotal]  = useState(0);

    function linkActive(pathname)
    {
        return `/${pathname}`===location.pathname ? "active" : "";
    }

    function toggleFontSize()
    {
        if(fontSize===""||fontSize==="small")
        {
            dispatch(setFontSize("medium"));
        }
        else if(fontSize==="medium")
        {
            dispatch(setFontSize("large"));
        }
        else if(fontSize==="large")
        {
            dispatch(setFontSize("small"));
        }
    }



    useEffect(()=>{
        if(cart) setCartTotal(getCartTotalCount(cart));
    },[cart]);

    useEffect(()=>{
        setSearchModal(false);
    },[location.pathname])

    return (
        <Navbar expand={loggedInState==="no" ? "lg" : "md"} className="bg-body-tertiary position-sticky top-0 shadow py-0">
            <Container className="navbar-container d-flex align-items-stretch justify-content-between gap-0 gap-md-2 gap-lg-3 px-2 px-sm-4 px-md-3 px-lg-5 w-md-100">
                <Navbar.Brand className='navbar-logo' as={NavLink} to={"/"}>
                    <div className='d-flex align-items-start gap-1 m-0' style={{width:"min(11.4rem,60vw)"}}>
                        <img style={{width:"30.75%"}} src={require("../img/logo.png")} alt="" />
                        <img style={{width:"69.25%"}} src={require("../img/logo-text.png")} alt="" />
                    </div>
                </Navbar.Brand>
                <div className="w-0 w-lg-50 align-items-center justify-content-start d-none d-sm-flex search-container pe-sm-4 pe-md-0">
                    <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                        <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                        <input type='search' placeholder='Look for products...' className='w-100 border-0 p-1 ps-2' value={searchValue} onChange={(e)=>throttle(handleSearch(e),100)} />
                    </div>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 shadow-none' />
                <Navbar.Collapse id="basic-navbar-nav" className="align-items-stretch flex-grow-0">
                    <Nav className="align-items-center align-items-lg-stretch justify-content-center gap-2 gap-lg-3 mt-2 mt-sm-1 m-md-0">
                        <div className="d-flex w-100 d-sm-none align-items-stretch justify-content-center ">
                            <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                                <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                                <input type='search' placeholder='Look for products' className='w-100 border-0 p-1 ps-2' value={searchValue} onChange={(e)=>throttle(handleSearch(e),100)} />
                            </div>
                        </div>
                        <div className={`d-flex align-items-stretch gap-md-2 gap-lg-3 ${loggedInState==="no" ? "flex-column-reverse gap-sm-3" : "navbar-small-gap  gap-sm-4"} flex-sm-row`}>
                            <div className="d-flex align-items-stretch justify-content-center navbar-small-gap gap-sm-4 gap-md-2">
                                <div className='d-flex align-items-stretch justify-content-center navbar-dropdown-menu'>
                                    <div className={`position-relative navbar-dropdown-button d-flex align-items-center navbar-link ${linkActive("shop")}`}>
                                        <Nav.Link className={`  `}>Shop</Nav.Link>
                                    </div>
                                    <div className="position-absolute navbar-dropdown-container">
                                        <div className="bg-white shadow navbar-dropdown ">
                                            <Link to={"/shop"} className='px-4 py-2  border-bottom d-flex justify-content-center text-decoration-none text-capitalize fw-semibold'>Explore!</Link>
                                            {
                                                productsInfo.categoryGroups && Object.keys(productsInfo.categoryGroups).map((menuItem,index) => 
                                                

                                                <div className='d-flex justify-content-start justify-content-md-start position-relative navbar-dropdown-menu' key={`shop-group-link-${index}`}>
                                                    <div className='navbar-dropdown-button'>
                                                        <div className='px-3 py-2 gap-2 border-bottom d-flex align-items-center justify-content-end text-decoration-none text-capitalize fw-semibold'>
                                                            <BsCaretLeftFill className='d-none d-md-block' />  
                                                            {menuItem} 
                                                            <BsCaretRightFill className='d-block d-md-none' /> 
                                                        </div>
                                                    </div>
                                                    <div className="position-absolute navbar-dropdown-container left" style={{width:"min(8rem,40vw)"}}>
                                                        <div className="bg-white shadow navbar-dropdown overflow-hidden">

                                                        {
                                                            productsInfo.categoryGroups[menuItem].map((category,index) =>
                                                            <Link to={`/shop?cat=${category}`} onClick={()=>{handleSearchModalClose();}} className='py-2 border-bottom d-flex align-items-center gap-2 justify-content-center text-decoration-none text-capitalize fw-semibold' key={`shop-category-link-${index}`}> {category}s </Link>
                                                            )
                                                        }
                                                        <Link to={`/shop?gr=${menuItem}`} onClick={()=>{handleSearchModalClose();}} className='py-2 border-bottom d-flex align-items-center gap-2 justify-content-center text-decoration-none text-capitalize fw-semibold'> All </Link>
                                                                                        
                                                        </div>
                                                    </div>
                                                    
                                                </div>


                                                )
                                            }
                                            
                                         
                                        </div>
                                    </div>
                                    
                                </div>
                                <Nav.Link as={Link} to={"/about"} className={`navbar-link position-relative d-flex align-items-center justify-content-center ${linkActive("about")}`}>About</Nav.Link>
                                <Nav.Link as={Link} to={"/contact"} className={`navbar-link position-relative d-flex align-items-center justify-content-center ${linkActive("contact")}`}>Contact</Nav.Link>

                                <Nav.Link className={`cart-link d-flex align-items-center justify-content-center ${linkActive("cart")}`} as={NavLink} to="/cart">
                                    <div className='position-relative'>
                                        <BsFillCartFill className='fs-4 text-secondary cart-icon' />
                                        {cartTotal ? <span className='badge bg-danger fw-bold position-absolute top-0 left-0 rounded-pill d-flex justify-content-center align-items-center text-white' style={{transform: "translate(-65%,-55%)", fontSize: "0.6rem",boxShadow:"-0.1em 0.1em 0.2em rgb(0,0,0,0.3)"}}>{cartTotal}</span> : ""}
                                    </div>
                                </Nav.Link>
                            </div>
                            <div className='d-flex align-self-stretch mt-2 mt-sm-0 justify-content-center gap-2'>
                            {
                                !authLoading ?
                                loggedInState==="no" ?
                                <div className={`d-flex gap-3 align-self-center py-2 py-${loggedInState==="no" ? "lg" : "md"}-0 ms-2 ms-${loggedInState==="no" ? "lg" : "md"}-0`}>
                                    <Button variant='secondary' as={Link} to="/login" state={{prevPath: location.pathname}} className='btn bg-secondary main-button border-0 d-flex align-items-center'>Login</Button>
                                    <Button variant='secondary' as={Link} to="/register" state={{prevPath: location.pathname}} className='btn bg-transparent border-secondary text-secondary border-3 fw-semibold'>Register</Button>
                                </div>
                                :
                                <div className='d-flex align-items-center justify-content-end navbar-dropdown-menu mb-2 mb-sm-0'>
                                    <div className='navbar-dropdown-button '>
                                        <div className='bg-white p-1 d-flex fs-3 border rounded-circle shadow-sm'>
                                            <BsFillPersonFill />
                                        </div>
                                    </div>
                                    <div className="position-absolute navbar-dropdown-container">
                                        <div className="bg-white shadow navbar-dropdown overflow-hidden">
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
                                <div className="h-100 d-flex align-items-center">
                                    <Spinner />
                                </div>
                            }
                                {/* <Button variant='transparent p-0' onClick={()=>{toggleFontSize();}}>
                                    <RiFontSize fontSize={"1.25rem"} />
                                </Button> */}
                            </div>
                            
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {
                (currentUser && currentUser.role)==="admin" ? 
                <Link to={"/admin"} className='text-dark text-decoration-none position-absolute top-100 bg-body-tertiary px-2 py-2 rounded-1 rounded-top-0 ms-2 shadow d-flex align-items-center gap-1' style={{zIndex:"-1",transform: "translateY(0.1em)"}}>To Dashboard <MdDashboard/> </Link>
                : ""
            }
            

            <div className={`navbar-search-results-overlay top-100 w-100 position-absolute d-flex align-items-start justify-content-center pt-3 p-0 p-sm-3 ${searchModal ? "active" : ""}`}>
                <div className="navbar-search-results-container bg-light rounded-sm-3 shadow overflow-hidden">
                    <Modal.Header className='border-2 p-3'>
                        <Modal.Title className='text-capitalize'>Search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='p-0 p-sm-3 body overflow-y-scroll overflow-x-hidden scrollbar white'>
                        <div className='h-100'>
                            {
                                getSearchResults().length > 0 ?
                                <Row className='g-1 g-sm-2'>
                                {
                                    
                                    getSearchResults().map((product) => 
                                    <Col className='col-sm-4 col-md-3 p-1 px-sm-2' key={`product-result-${product.id}`}>
                                        <ProductCard productObject={product} />
                                    </Col>
                                    )
                                }
                                </Row>
                                :
                                <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
                                    <h5>No results for "{searchValue}"</h5>
                                </div>
                            }
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='p-2 position-sticky bottom-0 border-2'>
                        <div className="d-flex align-items-stretch w-100 gap-2 justify-content-end">
                        {
                            getSearchResults().length > 3 ?
                            <Link to={`/shop?q=${searchValue}`} onClick={()=>{setSearchModal(false);}} className='btn btn-dark w-100 fs-5 border-0 main-button'>More results</Link>
                            : ""
                        }
                            <Button variant="secondary" className='fs-2 d-flex p-1 align-items-center px-2' onClick={handleSearchModalClose}><BsX /></Button>
                        </div>
                        
                    </Modal.Footer>
                </div>
            </div>
        </Navbar>
    );
}

export default NavBar;