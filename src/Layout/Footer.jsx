import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsFillEnvelopeAtFill, BsPhoneFill, BsPostcardFill, BsSquare, BsTelephoneFill } from 'react-icons/bs';
import { FaLinkedin, FaSquareFacebook, FaSquareInstagram, FaSquareTwitter, FaSquareWhatsapp, FaSquareYoutube } from "react-icons/fa6"
import { Link } from 'react-router-dom';

function Footer({}) {
    return (
        <div className='bg-dark text-white text-center w-100'>
            <Container className="py-5 p-2">
                <Row>
                    <Col className="col-4">
                        <div className='text-start'>
                            <h3>Asr Digitals</h3>
                            <h5 className='text-secondary'>Always here to provide.</h5>
                            <hr />
                            <h5 className='mt-5 mb-3'>Quick Access</h5>
                            <ul className='list-unstyled d-flex flex-column gap-2 align-items-start'>
                                <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Home</Link></li>
                                <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Shop</Link></li>
                                <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>About</Link></li>
                                <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Contact</Link></li>
                                <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Offers</Link></li>
                                <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Cart</Link></li>
                            </ul>
                        </div>
                    </Col>
                    <Col className="col-8">
                        <Row>
                            <Col className='col-8'>
                                <div className="d-flex flex-column text-start gap-3">
                                    <h5>Want to hear about our latest arrivals?</h5>
                                    <form action="" className='d-flex gap-3'>
                                        <input type="text" className='form-control w-50' placeholder='Your Name'/>
                                        <input type="email" className='form-control' placeholder='Your Email'/>
                                        <Button type="submit" className='btn-dark border-white'>Subscribe</Button>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-6'>
                                <div className="text-start">
                                    <h5 className='mt-5 mb-3'>Extra pages</h5>
                                    <ul className='list-unstyled d-flex flex-column gap-2 align-items-start'>
                                        <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Terms & Conditions</Link></li>
                                        <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Privacy Policies</Link></li>
                                        <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Refund Policies</Link></li>
                                        <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Frequently Asked Questions</Link></li>
                                        <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Customer Service</Link></li>
                                        <li className='footer-link position-relative'><Link className='d-inline-block text-decoration-none text-white'>Looking for a job?</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col className='col-6'>
                                <div className="text-start mt-5">
                                    <p className='m-0 mb-2'><BsPostcardFill className='fs-5 me-2' /> Street Name, Alexandria, Egypt 12345</p>
                                    <p className='m-0 mb-2'><BsTelephoneFill className='fs-5 me-2'/> +201028549449</p>
                                    <p className='m-0 mb-2'><BsFillEnvelopeAtFill className='fs-5 me-2' /> asr-digitals@gmail.com</p>
                                </div>
                                <hr />
                                <h6 className='text-start fw-bold'>Follow Us On Social Media</h6>
                                <div className="d-flex mt-4 gap-2 social-media-row">
                                    <Link className="d-flex p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{background: 'rgb(13,110,253)'}}><FaSquareFacebook /> </Link>
                                    <Link className="d-flex p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{background: '#dc3545'}}><FaSquareYoutube /> </Link>
                                    <Link className="d-flex p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{backgroundColor: 'limegreen'}}><FaSquareWhatsapp /> </Link>
                                    <Link className="d-flex p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{backgroundColor: 'deepskyblue'}}><FaSquareTwitter /> </Link>
                                    <Link className="d-flex p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{background: 'linear-gradient(45deg, yellow, orange 20%, magenta)'}}><FaSquareInstagram /> </Link>
                                    <Link className="d-flex p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{backgroundColor: 'darkslateblue'}}><FaLinkedin /> </Link>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    {/* <Col className="col-4"></Col> */}
                </Row>
            </Container>
            <div className='w-100 p-1 bg-secondary text-center'>
                OWMD © 2023 - EraaSoft
            </div>
        </div>
    );
}

export default Footer;