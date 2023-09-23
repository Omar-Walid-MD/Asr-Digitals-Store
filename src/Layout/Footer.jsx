import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsFillEnvelopeAtFill, BsPhoneFill, BsPostcardFill, BsSquare, BsTelephoneFill } from 'react-icons/bs';
import { FaLinkedin, FaSquareFacebook, FaSquareInstagram, FaSquareTwitter, FaSquareWhatsapp, FaSquareYoutube } from "react-icons/fa6"
import { useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';

const schema = yup
  .object({
    name: yup.string().required("Please enter your name..."),
    email: yup.string().email("Email must be valid...").required("Please enter your email..."),
})
.required();

function Footer({}) {

    const location = useLocation();

    const [searchParams] = useSearchParams();
    const productsInfo = useSelector((store) => store.products.productsInfo);

    const [formMessage,setFormMessage] = useState();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

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

    function onSubmit(data)
    {
        reset();
        setFormMessage("Subscribed!");
    }


    return (
        <div className='bg-dark text-white text-center w-100'>
            <Container className="py-5">
                <Row className=''>
                    <Col className='col-12 col-md-4 text-center text-md-start'>
                        <div className='d-flex align-items-start gap-1 m-0 mb-2 justify-content-center justify-content-md-start footer-title'>
                            <img src={require("../img/logo-light.png")} alt="" />
                            <img src={require("../img/logo-light-text.png")} alt="" />
                        </div>
                        <h5 className='text-secondary-light'>Supplying the best for you...</h5>
                        <hr />

                    </Col>
                    <Col className='col-12 col-md-8'>
                        <div className="d-flex flex-column text-center text-md-start gap-1">
                            <div className='d-flex flex-column text-center text-md-start gap-3'>
                                <h5>Want to hear about our latest arrivals?</h5>
                                <form onSubmit={handleSubmit(onSubmit)} className='d-flex gap-3 flex-column flex-sm-row'>
                                    <input type="text" className='form-control w-xs-100 w-sm-50' placeholder='Your Name' {...register("name")}/>
                                    <input type="email" className='form-control' placeholder='Your Email' {...register("email")}/>
                                    <Button variant='dark' type="submit" className='btn-dark main-button border-white border-3' style={{minWidth: "6rem"}}>Subscribe</Button>
                                </form>
                            </div>
                            {
                                (errors.name || errors.email) &&
                                <div className='error-message text-danger mt-2'>{errors.name ? errors.name.message : errors.email && errors.email.message}</div> 
                            }
                            {formMessage && <p className='mt-1 text-info'>{formMessage}</p>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-12 col-md-4">
                        <div className='text-center text-md-start'>
                            <h5 className='mt-5 mb-3'>Quick Access</h5>
                            <div className='list-unstyled d-flex flex-column gap-2 align-items-center align-items-md-start'>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${linkActive("")}`}><Link to={"/"} className='d-inline-block text-decoration-none text-white fw-semibold'>Home</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${linkActive("about")}`}><Link to={"/about"} className='d-inline-block text-decoration-none text-white'>About</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${linkActive("contact")}`}><Link to={"/contact"} className='d-inline-block text-decoration-none text-white'>Contact</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${linkActive("offers")}`}><Link to={"/offers"} className='d-inline-block text-decoration-none text-white'>Offers</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${linkActive("cart")}`}><Link to={"/cart"} className='d-inline-block text-decoration-none text-white'>Cart</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${linkActive("purchases")}`}><Link to={"/purchases"} className='d-inline-block text-decoration-none text-white'>Purchases</Link></div></div>
                            </div>
                        </div>
                    </Col>
                    <Col className='col-12 col-md-4'>
                        <div className="text-center text-md-start">
                            <h5 className='mt-5 mb-3'>Shop</h5>
                            <div className='list-unstyled d-flex flex-column gap-2 align-items-center align-items-md-start'>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${shopExploreLinkActive()}`}><Link to={"/shop"} className='d-inline-block text-decoration-none text-white fw-semibold'>Explore</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${shopLinkActive("mobile")}`}><Link to={"/shop?gr=mobile"} className='d-inline-block text-decoration-none text-white'>Mobiles</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${shopLinkActive("computer")}`}><Link to={"/shop?gr=computer"} className='d-inline-block text-decoration-none text-white'>Computers</Link></div></div>
                                <div className='position-relative'><div className={`footer-link d-inline-block ${shopLinkActive("audio")}`}><Link to={"/shop?gr=audio"} className='d-inline-block text-decoration-none text-white'>Audio</Link></div></div>
                            </div>
                        </div>
                    </Col>
                    <Col className='col-12 col-md-4'>
                        <div className="text-center text-md-start mt-5">
                        <h6 className='fw-bold mb-3'>Find Us Through</h6>
                            <p className='m-0 mb-2'><BsPostcardFill className='fs-5 me-2' /> Street Name, Alexandria, Egypt 12345</p>
                            <p className='m-0 mb-2'><BsTelephoneFill className='fs-5 me-2'/> +201028549449</p>
                            <p className='m-0 mb-2'><BsFillEnvelopeAtFill className='fs-5 me-2' /> asr-digitals@gmail.com</p>
                        </div>
                        <hr />
                        <h6 className='text-center text-md-start fw-bold mb-3'>Follow Us On Social Media</h6>
                        <div className="d-flex justify-content-center justify-content-md-start">
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