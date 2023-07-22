import React from 'react';
import { Link, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillCartFill, BsSearch } from "react-icons/bs";
import { Button } from 'react-bootstrap';


function NavBar({}) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary position-sticky top-0 shadow z-1">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Asr Digitals</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <div className="d-flex align-items-center justify-content-center w-100 mx-5">
                        <div className="w-75 d-flex align-items-center border border-2 border-secondary rounded-2 overflow-hidden">
                            <BsSearch className='bg-secondary fs-1 p-2 text-white' />
                            <input type='search' className='w-100  border-0 p-1 ps-2 fs-5' />
                        </div>
                    </div>
                    <Nav >
                        <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={NavLink} to="/cart"><BsFillCartFill className='fs-4 text-secondary' /></Nav.Link>
                        <Nav.Link href="#link">About</Nav.Link>
                        <Nav.Link href="#link">Contact</Nav.Link>
                        
                        <div className='d-flex gap-3 ms-4'>
                            <Button as={Link} to="/login" className='btn bg-primary'>Login</Button>
                            <Button as={Link} to="/register" className='btn bg-transparent text-primary border-3 fw-semibold'>Register</Button>
                        </div>

                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;