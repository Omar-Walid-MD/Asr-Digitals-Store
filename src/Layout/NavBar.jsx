import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillCartFill, BsFillPersonFill, BsSearch } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../Store/Auth/auth';


function NavBar({}) {

    const location = useLocation();
    const loggedIn = useSelector((store) => store.auth.loggedIn);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCurrentUser());
    },[]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary position-sticky top-0 shadow">
            <Container className=" d-flex align-items-center">
                <Navbar.Brand as={NavLink} to="/">Asr Digitals</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center mt-2 gap-2 w-100">
                        <div className="d-flex align-items-center justify-content-center w-100">
                            <div className="w-75 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden" style={{height:"2.5rem"}}>
                                <BsSearch className='bg-secondary fs-1 p-2 text-white h-100' />
                                <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' />
                            </div>
                        </div>
                        <div className="d-flex gap-3 flex-column flex-sm-row align-items-center">
                            <div className="d-flex gap-3">
                                <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
                                <Nav.Link as={NavLink} to="/cart"><BsFillCartFill className='fs-4 text-secondary' /></Nav.Link>
                                <Nav.Link href="#link">About</Nav.Link>
                                <Nav.Link href="#link">Contact</Nav.Link>
                            </div>
                            
                            {
                                !loggedIn ?
                                <div className='d-flex gap-3'>
                                    <Button as={Link} to="/login" state={{prevPath: location.pathname}} className='btn bg-primary'>Login</Button>
                                    <Button as={Link} to="/register" state={{prevPath: location.pathname}} className='btn bg-transparent text-primary border-3 fw-semibold'>Register</Button>
                                </div>
                                :
                                <div className='bg- p-1 d-flex fs-3 shadow-sm border rounded-circle'><BsFillPersonFill /></div>
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;