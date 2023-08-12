import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsCaretLeft, BsCaretLeftFill, BsCaretRightFill, BsFillCartFill, BsFillPersonFill, BsSearch } from "react-icons/bs";
import { Button, Dropdown, DropdownButton, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logoutUser } from '../Store/Auth/auth';
import { getCartTotalCount } from '../helpers';

function NavBar({}) {

    const location = useLocation();
    const loggedIn = useSelector((store) => store.auth.loggedIn);
    const authLoading = useSelector((store) => store.auth.loading);
    const cart = useSelector((store) => store.cart.cart);
    // const productsInfo = useSelector((store) => store.products.productsInfo);

    const [searchModal,setSearchModal] = useState(false);
    const handleSearchModalShow = () => setSearchModal(true);
    const handleSearchModalClose = () => setSearchModal(false);


    const [searchValue,setSearchValue] = useState("");

    function handleSearch(e)
    {
        setSearchValue(e.target.value);
        if(e.target.value==="") {if(searchModal) setSearchModal(false);}
        else {if(!searchModal) setSearchModal(true);}
        e.target.focus();
        console.log(e.target.value);
    }

    const [cartTotal, setCartTotal]  = useState(0);

    const shoppingMenu = [
        {
            label: "Mobile",
            categories: ["smartphone","tablet"]
        },
        {
            label: "Computer",
            categories: ["desktop","laptop","keyboard","mouse"]
        },
        {
            label: "Audio",
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
        <Navbar expand="lg" className="bg-body-tertiary position-sticky top-0 shadow">
            <Container className="navbar-container d-flex align-items-center justify-content-between gap-0 gap-lg-4 w-100">
                <Navbar.Brand as={NavLink} to="/">Asr Digitals</Navbar.Brand>
                <div className="align-items-center justify-content-start d-none d-sm-flex search-container w-50">
                    <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                        <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                        <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' value={searchValue} onChange={handleSearch} />
                    </div>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="align-items-center flex-grow-0">
                    <Nav className="align-items-center gap-2 mt-3 m-lg-0">
                        <div className="d-flex d-sm-none align-items-center justify-content-center">
                            <div className="w-100 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.25rem"}}>
                                <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                                <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' />
                            </div>
                        </div>
                        <div className={`d-flex gap-3 ${!loggedIn ? "flex-column" : ""} flex-sm-row align-items-center`}>
                            <div className="d-flex gap-3">
                                {/* <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("shop")}`} as={NavLink} to="/shop">Shop</Nav.Link> */}
                                <div className='d-flex justify-content-start justify-content-xl-center navbar-dropdown-menu'>
                                    <div className='navbar-dropdown-button'>
                                        <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("shop")}`} as={NavLink} to="/shop">Shop</Nav.Link>
                                    </div>
                                    <div className="position-absolute navbar-dropdown-container">
                                        <div className="bg-light shadow navbar-dropdown">
                                            <Link to={"/shop"} className='px-4 py-2 border-bottom d-flex justify-content-center text-decoration-none text-capitalize fw-semibold'>Explore!</Link>
                                            {
                                                shoppingMenu.map((menuItem) => 
                                                

                                                <div className='d-flex justify-content-end justify-content-sm-start position-relative navbar-dropdown-menu'>
                                                    <div className='navbar-dropdown-button'>
                                                        <div className='px-3 py-2 gap-2 border-bottom d-flex align-items-center justify-content-end text-decoration-none text-capitalize fw-semibold'>
                                                            <BsCaretLeftFill className='d-none d-sm-block' />  
                                                            {menuItem.label} 
                                                            <BsCaretRightFill className='d-block d-sm-none' /> 
                                                        </div>
                                                    </div>
                                                    <div className="position-absolute navbar-dropdown-container left">
                                                        <div className="bg-light shadow navbar-dropdown overflow-hidden">
                                                        {
                                                            menuItem.categories.map((category) =>
                                                                <div className='px-3 py-2 border-bottom d-flex align-items-center gap-2 justify-content-center text-decoration-none text-capitalize fw-semibold'> {category} </div>
                                                            )
                                                        }
                                                                                        
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
                                <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("about")}`} href="#link">About</Nav.Link>
                                <Nav.Link className={`navbar-link position-relative d-flex justify-content-center ${linkActive("contact")}`} href="#link">Contact</Nav.Link>

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


            <Modal show={searchModal} autoFocus={false} enforceFocus={false} onHide={handleSearchModalClose} centered={true} className={`bg-transparent search-modal`}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSearchModalClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
}

export default NavBar;