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
import ProductCard from '../Components/ProductCard';

function NavBar({}) {

    const location = useLocation();
    const loggedIn = useSelector((store) => store.auth.loggedIn);
    const authLoading = useSelector((store) => store.auth.loading);
    const products = useSelector((store) => store.products.products);
    const cart = useSelector((store) => store.cart.cart);
    // const productsInfo = useSelector((store) => store.products.productsInfo);

    const [searchModal,setSearchModal] = useState(false);
    const handleSearchModalShow = () => setSearchModal(true);
    const handleSearchModalClose = () => {setSearchModal(false); setSearchValue("");};


    const [searchValue,setSearchValue] = useState("");

    function handleSearch(e)
    {
        setSearchValue(e.target.value);
        if(e.target.value.length < 3) {if(searchModal) setSearchModal(false);}
        else {if(!searchModal) setSearchModal(true);}
        e.target.focus();
        console.log(e.target.value);
    }

    function getSearchResults()
    {
        if(searchValue.length<3) return [];
        return products.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase())).slice(0,4);
    }

    const [cartTotal, setCartTotal]  = useState(0);

    const shoppingMenu = [
        {
            label: "mobile",
            categories: ["smartphone","tablet"]
        },
        {
            label: "computer",
            categories: ["desktop","laptop","keyboard","mouse"]
        },
        {
            label: "audio",
            categories: ["earphone","headphone","speaker","microphone"]
        }
    ]

    function linkActive(pathname)
    {
        return `/${pathname}`===location.pathname ? "active" : "";
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        if(cart) setCartTotal(getCartTotalCount(cart));
    },[cart]);

    return (
        <Navbar expand="md" className="bg-body-tertiary position-sticky top-0 shadow py-1 py-md-2">
            <Container className="navbar-container d-flex align-items-center justify-content-between gap-0 gap-md-4 w-100">
                <div className="d-flex gap-3 w-75">
                    <Navbar.Brand as={NavLink} to={"/"}>Asr Digitals</Navbar.Brand>
                    <div className="w-100 align-items-center justify-content-start d-none d-sm-flex search-container">
                        <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                            <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                            <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' value={searchValue} onChange={handleSearch} />
                        </div>
                    </div>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 shadow-none p-0' />
                <Navbar.Collapse id="basic-navbar-nav" className="align-items-center flex-grow-0">
                    <Nav className="align-items-center gap-2 mt-3 m-md-0">
                        <div className="d-flex d-sm-none align-items-center justify-content-center">
                            <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                                <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                                <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' value={searchValue} onChange={handleSearch} />
                            </div>
                        </div>
                        <div className={`d-flex gap-3 ${!loggedIn ? "flex-column" : ""} flex-sm-row align-items-center`}>
                            <div className="d-flex gap-3">
                                {/* <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("shop")}`} as={NavLink} to="/shop">Shop</Nav.Link> */}
                                <div className='d-flex justify-content-start justify-content-xl-center navbar-dropdown-menu'>
                                    <div className='navbar-dropdown-button'>
                                        <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("shop")}`}>Shop</Nav.Link>
                                    </div>
                                    <div className="position-absolute navbar-dropdown-container">
                                        <div className="bg-light shadow navbar-dropdown">
                                            <Link to={"/shop"} className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none text-capitalize fw-semibold'>Explore!</Link>
                                            {
                                                shoppingMenu.map((menuItem) => 
                                                

                                                <div className='d-flex justify-content-end justify-content-md-start position-relative navbar-dropdown-menu'>
                                                    <div className='navbar-dropdown-button'>
                                                        <div className='px-3 py-2 gap-2 border-bottom d-flex align-items-center justify-content-end text-decoration-none text-capitalize fw-semibold'>
                                                            <BsCaretLeftFill className='d-none d-md-block' />  
                                                            {menuItem.label} 
                                                            <BsCaretRightFill className='d-block d-md-none' /> 
                                                        </div>
                                                    </div>
                                                    <div className="position-absolute navbar-dropdown-container left">
                                                        <div className="bg-light shadow navbar-dropdown overflow-hidden">

                                                        {
                                                            menuItem.categories.map((category) =>
                                                            <Link to={`/shop/q?cat=${category}`} onClick={()=>{handleSearchModalClose();}} className='px-3 py-2 border-bottom d-flex align-items-center gap-2 justify-content-center text-decoration-none text-capitalize fw-semibold'> {category}s </Link>
                                                            )
                                                        }
                                                        <Link to={`/shop/q?gr=${menuItem.label}`} onClick={()=>{handleSearchModalClose();}} className='px-3 py-2 border-bottom d-flex align-items-center gap-2 justify-content-center text-decoration-none text-capitalize fw-semibold'> All </Link>
                                                                                        
                                                        </div>
                                                    </div>
                                                    
                                                </div>


                                                )
                                            }
                                            
                                            {/* <div className='px-3 py-2 border-bottom d-flex align-items-center gap-2 justify-content-center text-decoration-none text-capitalize fw-semibold'>Memory</div>
                                            <div className='px-3 py-2 border-bottom d-flex align-items-center gap-2 justify-content-center text-decoration-none text-capitalize fw-semibold'>Audio</div> */}


                                            {/* {
                                                productsInfo.categories.map((category) => 
                                                    <Link to={"/shop"} state={{category: category}} className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none text-capitalize'>{category.name}</Link>
                                                )
                                            } */}
                                        </div>
                                    </div>
                                    
                                </div>
                                <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("about")}`} href="">About</Nav.Link>
                                <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("contact")}`} href="">Contact</Nav.Link>

                                <Nav.Link className={`cart-link position-relative d-flex justify-content-center ${linkActive("cart")}`} as={NavLink} to="/cart">
                                    <BsFillCartFill className='fs-4 text-secondary' />
                                    {cartTotal ? <span className='badge bg-danger fw-bold position-absolute top-0 left-0 rounded-pill d-flex justify-content-center align-items-center text-white' style={{transform: "translate(-50%,-15%)", fontSize: "0.6rem"}}>{cartTotal}</span> : ""}
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
            

            <div className={`navbar-search-results-overlay top-100 w-100 position-absolute d-flex align-items-start justify-content-center pt-3 p-0 p-sm-3 ${searchModal ? "active" : ""}`}>
                <div className="navbar-search-results-container bg-light rounded-sm-3 shadow overflow-hidden">
                    <Modal.Header className='border-bottom border-2 p-3'>
                        <Modal.Title className='text-capitalize'>Search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='p-0 p-sm-3 body overflow-y-scroll overflow-x-hidden scrollbar white'>
                        <div className='h-100'>
                            {
                                getSearchResults().length > 0 ?
                                <Row className='g-1 g-sm-2'>
                                {
                                    
                                    getSearchResults().map((product) => 
                                    <Col className='col-sm-4 col-md-3 p-1 px-sm-2'>
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
                    <Modal.Footer className='p-2 position-sticky bottom-0 bg-light border-top border-2'>
                        <div className="d-flex align-items-center w-100 gap-2 justify-content-end">
                        {
                            getSearchResults().length > 3 ?
                            <Link to={`/shop/q?search=${searchValue}`} onClick={()=>{setSearchModal(false);}} className='btn main-button w-100 border-0 fs-5'>More results</Link>
                            : ""
                        }
                            <Button variant="secondary" className='fs-2 d-flex p-2 border-0' onClick={handleSearchModalClose}><BsX /></Button>
                        </div>
                        
                    </Modal.Footer>
                </div>
            </div>
        </Navbar>
    );
}

export default NavBar;