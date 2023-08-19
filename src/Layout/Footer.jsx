import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsFillEnvelopeAtFill, BsPhoneFill, BsPostcardFill, BsSquare, BsTelephoneFill } from 'react-icons/bs';
import { FaLinkedin, FaSquareFacebook, FaSquareInstagram, FaSquareTwitter, FaSquareWhatsapp, FaSquareYoutube } from "react-icons/fa6"
import { useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

function Footer({}) {

    const location = useLocation();

    const [searchParams] = useSearchParams();
    const productsInfo = useSelector((store) => store.products.productsInfo);

    function linkActive(pathname)
    {
        return `/${pathname}`===location.pathname ? "active" : "";
    }

    function shopExploreLinkActive()
    {
        if(productsInfo.categories && location.pathname==="/shop")
        {
            if(searchParams.size && (searchParams.get("q")
               || productsInfo.categories.find((category) => category.name===searchParams.get("cat"))
               || Object.keys(productsInfo.categoryGroups).includes(searchParams.get("gr"))
                )) return "";
            else return "active";
        }
        else return "";
    }

    function shopLinkActive(categoryGroup)
    {
        if(productsInfo.categoryGroups && location.pathname==="/shop")
        {
           if(searchParams.get("gr")===categoryGroup || productsInfo.categoryGroups[categoryGroup].includes(searchParams.get("cat"))) return "active";
        }
        return "";
    }


    return (
        <div className='bg-dark text-white text-center w-100'>
            <Container className="py-5">
                <Row className=''>
                    <Col className='col-12 col-md-4 text-center text-sm-start'>
                        <h3>Asr Digitals</h3>
                        <h5 className='text-secondary-light'>Always here to provide.</h5>
                        <hr />

                    </Col>
                    <Col className='col-12 col-md-8'>
                        <div className="d-flex flex-column text-center text-sm-start gap-3">
                            <h5>Want to hear about our latest arrivals?</h5>
                            <form action="" className='d-flex gap-3 flex-column flex-sm-row'>
                                <input type="text" className='form-control w-xs-100 w-sm-50' placeholder='Your Name'/>
                                <input type="email" className='form-control' placeholder='Your Email'/>
                                <Button variant='dark' type="submit" className='btn-dark main-button border-white border-3' style={{minWidth: "6rem"}}>Subscribe</Button>
                            </form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12 col-md-4">
                        <div className='text-center text-sm-start'>
                            <h5 className='mt-5 mb-3'>Quick Access</h5>
                            <Row className='list-unstyled d-flex flex-row flex-md-column gy-2 align-items-start'>
                                <Col className='position-relative mb-0 mb-sm-2'><div className={`footer-link d-inline-block ${linkActive("")}`}><Link to={"/"} className='d-inline-block text-decoration-none text-white fw-semibold m-0 mb-sm-2'>Home</Link></div></Col>
                                <Col className='position-relative '><div className={`footer-link d-inline-block ${linkActive("about")}`}><Link to={"/about"} className='d-inline-block text-decoration-none text-white'>About</Link></div></Col>
                                <Col className='position-relative '><div className={`footer-link d-inline-block ${linkActive("contact")}`}><Link to={"/contact"} className='d-inline-block text-decoration-none text-white'>Contact</Link></div></Col>
                                <Col className='position-relative '><div className={`footer-link d-inline-block ${linkActive("offers")}`}><Link to={"/offers"} className='d-inline-block text-decoration-none text-white'>Offers</Link></div></Col>
                                <Col className='position-relative '><div className={`footer-link d-inline-block ${linkActive("cart")}`}><Link to={"/cart"} className='d-inline-block text-decoration-none text-white'>Cart</Link></div></Col>
                                <Col className='position-relative '><div className={`footer-link d-inline-block ${linkActive("purchases")}`}><Link to={"/purchases"} className='d-inline-block text-decoration-none text-white'>Purchases</Link></div></Col>

                            </Row>
                        </div>
                    </Col>
                    <Col className='col-12 col-md-4'>
                        <div className="text-center text-sm-start">
                            <h5 className='mt-5 mb-3'>Shop</h5>
                            <Row className='list-unstyled d-flex flex-row flex-md-column gy-2 align-items-start'>
                                <Col className='position-relative mb-0 mb-sm-2'><div className={`footer-link d-inline-block ${shopExploreLinkActive()}`}><Link to={"/shop"} className='d-inline-block text-decoration-none text-white fw-semibold'>Explore</Link></div></Col>
                                <Col className='position-relative'><div className={`footer-link d-inline-block ${shopLinkActive("mobile")}`}><Link to={"/shop?gr=mobile"} className='d-inline-block text-decoration-none text-white'>Mobiles</Link></div></Col>
                                <Col className='position-relative'><div className={`footer-link d-inline-block ${shopLinkActive("computer")}`}><Link to={"/shop?gr=computer"} className='d-inline-block text-decoration-none text-white'>Computers</Link></div></Col>
                                <Col className='position-relative'><div className={`footer-link d-inline-block ${shopLinkActive("audio")}`}><Link to={"/shop?gr=audio"} className='d-inline-block text-decoration-none text-white'>Audio</Link></div></Col>
                            </Row>
                        </div>
                    </Col>
                    <Col className='col-12 col-md-4'>
                        <div className="text-center text-sm-start mt-5">
                        <h6 className='text-center text-sm-start fw-bold mb-3'>Find Us Through</h6>
                            <p className='m-0 mb-2'><BsPostcardFill className='fs-5 me-2' /> Street Name, Alexandria, Egypt 12345</p>
                            <p className='m-0 mb-2'><BsTelephoneFill className='fs-5 me-2'/> +201028549449</p>
                            <p className='m-0 mb-2'><BsFillEnvelopeAtFill className='fs-5 me-2' /> asr-digitals@gmail.com</p>
                        </div>
                        <hr />
                        <h6 className='text-center text-sm-start fw-bold mb-3'>Follow Us On Social Media</h6>
                        <div className="d-flex justify-content-center justify-content-sm-start">
                            <Row className="g-2 social-media-row">
                                <Col><Link className="d-flex justify-content-center p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{background: 'rgb(13,110,253)'}}><FaSquareFacebook /> </Link></Col>
                                <Col><Link className="d-flex justify-content-center p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{background: '#dc3545'}}><FaSquareYoutube /> </Link></Col>
                                <Col><Link className="d-flex justify-content-center p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{backgroundColor: 'limegreen'}}><FaSquareWhatsapp /> </Link></Col>
                                <Col><Link className="d-flex justify-content-center p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{backgroundColor: 'deepskyblue'}}><FaSquareTwitter /> </Link></Col>
                                <Col className='col-2'><Link className="d-flex justify-content-center p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{background: 'linear-gradient(45deg, yellow, orange 20%, magenta)'}}><FaSquareInstagram /> </Link></Col>
                                <Col className='col-2'><Link className="d-flex justify-content-center p-1 rounded-2 fs-2 social-media-icon position-relative overflow-hidden text-white" style={{backgroundColor: 'darkslateblue'}}><FaLinkedin /> </Link></Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='w-100 p-1 bg-secondary text-center'>
                OWMD © 2023 - EraaSoft
            </div>
        </div>
    );
}

export default Footer;