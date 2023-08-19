import React from 'react';
import Footer from '../Layout/Footer';
import NavBar from '../Layout/NavBar';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function ErrorPage({}) {

    const navigate = useNavigate();

    return (
        <div>
            <div className='page-container error-page-bg d-flex flex-column align-items-center justify-content-center'>
                <Container className='p-5'>
                    <Row>
                        <Col className="col-12 col-md-6 order-1 order-md-0 text-center text-sm-start">
                            <h1>Uh oh! Looks like you're lost!</h1>
                            <hr />
                            <h5 className='text-muted mb-5'>This page does not exist. <br /> Either it has been removed or wasn't there at all.</h5>
                            <p className='text-muted fw-semibold'>....But If you feel that this page should not be missing, please <Link className='text-decoration-none'>Contact Us</Link>  so we can fix the issue.</p>

                            <div className="d-flex flex-column align-items-center align-items-md-start gap-4 w-100">
                                <form className='d-flex flex-column flex-sm-row gap-2 w-100'>
                                    <Form.Control className='shadow-none' type="text" placeholder="What's the issue?" />
                                    <Button className='w-xs-100 w-sm-50 w-md-25'>Send</Button>
                                </form>
                                <div className='w-100 d-flex flex-column align-items-center align-items-md-start mt-2 mt-sm-5'>
                                    <h6 className=''>Resume your journey to</h6>
                                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between w-100">
                                        <Link to={"/"} className='btn navbar-link position-relative d-flex justify-content-center'>Home</Link>
                                        <Link to={"/shop"} className='btn navbar-link position-relative d-flex justify-content-center'>Shop</Link>
                                        <Link to={"/offers"} className='btn navbar-link position-relative d-flex justify-content-center'>Offers</Link>
                                        <Link to={"/about"} className='btn navbar-link position-relative d-flex justify-content-center'>About</Link>
                                        <Link to={"/contact"} className='btn navbar-link position-relative d-flex justify-content-center'>Contact</Link>
                                        <Link to={"/cart"} className='btn navbar-link position-relative d-flex justify-content-center'>Cart</Link>
                                        <Link to={"/profile"} className='btn navbar-link position-relative d-flex justify-content-center'>Profile</Link>
                                    </div>
                                    <hr className='w-100 mt-2' />
                                    <h6 className=''>OR</h6>
                                    <Button className='btn main-button text-decoration-none mt-2 fs-5 border-0' onClick={()=>{navigate(-1)}}>Take Me Back</Button>
                                </div>
                            </div>

                        </Col>
                        <Col className="col-12 col-md-6">
                            <div className="d-flex justify-content-center w-100 error-page-img-container position-relative mb-5 mb-md-0">
                                <img className='' style={{width:"min(15rem,50vw)"}} src={require("../img/error-img.png")} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default ErrorPage;