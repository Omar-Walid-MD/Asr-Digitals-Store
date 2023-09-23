import React, { useEffect, useState } from 'react';
import { Accordion, Button, Carousel, Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import ProductSlider from '../Components/ProductSlider';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillStarFill, BsPhoneFill, BsTabletLandscapeFill } from "react-icons/bs";
import ProductCard from '../Components/ProductCard';
import { FaTruckMoving, FaLaptop } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { RiHandCoinFill } from "react-icons/ri";
import { useSelector } from 'react-redux';

import i18next from "i18next";

function Home({}) {

    const style = {
        header: {
            minHeight: "675px"
        },
        section: {
            height: "525px"
        },
        sectionSmall: {
            height: "400px"
        }
    }

    const products = useSelector((store) => store.products.products);
    const [branchSelect,setBranchSelect] = useState(1);
    const [shownProducts,setShownProducts] = useState([]);


    const whyChooseUs = [
        {
            header: "Wide Collection",
            content: <>Explore a <b>diverse selection</b> of electronic devices to suit your needs.</>,
            icon: <FaLaptop />
        },
        {
            header: "Quality Products",
            content: <>We offer <b>top-quality</b> electronic devices for superior performance.</>,
            icon: <HiSparkles />
        },
        {
            header: "Fair Prices",
            content: <>Get the latest technology at <b>affordable prices</b>.</>,
            icon: <RiHandCoinFill />
        },
        {
            header: "Swift Delivery",
            content: <><b>Don't wait long</b> for your orders with our excellent delivery services.</>,
            icon: <FaTruckMoving />
        }
    ]

    const branches = [
        {
            image: "https://i.imgur.com/gKLFcVE.png",
            coordinates: "31.2163837,29.9274562",
            title: "Al-Ibrahimiya",
            desc: "Behind the Masjid of Al-Shaheed Abdul-Men'em Riyadh."
        },
        {
            image: "https://i.imgur.com/HmJiIBI.png",
            coordinates: "31.2036875,29.8836064",
            title: "Ra's Al-Tin",
            desc: "Near Farouq Cafe, at Al-Sheikh Al-Banna Street."
        },
        {
            image: "https://i.imgur.com/HnKrc0F.png",
            coordinates: "31.2869326,30.0193644",
            title: "Al-Montazah",
            desc: "In front of Al-Saa'a Square."
        },
        {
            image: "https://i.imgur.com/or6wJfW.png",
            coordinates: "31.2171035,29.9427816",
            title: "Smouha",
            desc: "Mostafa Kamel Street, near Andalusiyya Smouha Hosptial."
        }
    ]

    const faqs = [
        {
            q: "How do I place an order on your website?",
            a: "To place an order, simply browse our products, select the item(s) you wish to purchase, add them to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information, and confirm your order."
        },
        {
            q: "How long does it take to process and deliver an order?",
            a: "We strive to process and deliver orders as quickly as possible. Typically, orders are processed within 1-3 business days. Delivery times vary depending on your location."
        },
        {
            q: "What are your delivery options and costs?",
            a: "We offer standard and express delivery options. You can select Express for faster delivery, but it comes with additional fees"
        },
        {
            q: "What is your return policy?",
            a: "We have a flexible return policy. If you are not satisfied with your purchase, you can return the item within 30 days of delivery for a refund or exchange. Please review our Returns & Exchanges page for detailed instructions and any specific criteria that may apply."
        },
        {
            q: "How do I initiate a return or exchange?",
            a: "To initiate a return or exchange, please contact our customer support team through our designated channels. They will guide you through the process, provide you with a return shipping label if applicable, and assist with any further inquiries."
        },
        {
            q: "Can I place an order over the phone?",
            a: "Currently, we only accept orders placed through our website. Our online ordering process is secure, convenient, and designed to provide you with the best shopping experience."
        }
    ]

   useEffect(()=>{
    if(products.length) setShownProducts(Array.from({length:20}).map((x,i)=>{
        return products[Math.floor(Math.random()*products.length)]
    }))
   },[products])

    return (
        <div>
            <header className='d-flex bg-black align-items-start pt-3 pt-md-0 align-items-md-center justify-content-center justify-content-md-start pb-5 position-relative z-0' style={style.header}>
                <Carousel style={{zIndex:"-1"}} className='position-absolute top-0 left-0 w-100 h-100' controls={false} indicators={false} fade interval={5000}>
                    <Carousel.Item>
                        <div className="w-100 h-100 homepage-header-animation homepage-header"></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="w-100 h-100 homepage-header-animation homepage-header-1"></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="w-100 h-100 homepage-header-animation homepage-header-2"></div>
                    </Carousel.Item>
                </Carousel>
                <div className="position-absolute top-0 left-0 w-100 h-100 homepage-header-overlay"></div>
                <Container className='m-5 d-flex justify-content-center justify-content-md-start z-1'>
                    <div className='header-content text-white p-0 m-0 m-md-5 w-xs-100 w-md-50 d-flex flex-column gap-3 align-items-center align-items-md-start'>
                        <div className="d-flex justify-content-center align-items-center gap-2 w-xs-100 w-sm-auto">
                            <img style={{width:"min(10rem,30vw)"}} src={require("../img/logo-light.png")} alt="" />
                            <img style={{width:"min(21rem,60vw)"}} src={require("../img/logo-light-text.png")} alt="" />

                        </div>
                        {/* <h1 className='large-title text-center text-md-start'>Asr Digitals</h1> */}
                        <p style={{color: "rgb(136, 172, 206)"}} className='text-center text-md-start w-xs-100 w-lg-75 fs-5 fw-semibold'>The home of all the digitals you need. Get your next devices with fair costs and best qualities.</p>
                        <Link to={"/shop"} className='btn btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold border-white border-3 main-button shadow'>Shop now!</Link>
                    </div>
                </Container>
            </header>


            <section className='position-relative page-section bg-white d-flex flex-column bg-img-1'>
                <div className="position-absolute bottom-100 w-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Why Choose Us</div></div>
                <Container className='d-flex align-items-center justify-content-center p-0 py-5 w-100'>
                    <Row className='gy-4 py-4 w-100 h-100 align-items-start'>
                    {
                        whyChooseUs.map((w,index) => (

                        <Col className='col-12 col-sm-6 col-lg-3 d-flex align-items-center justify-content-center posotion-relative px-2 px-md-3' key={`wcu-${index}`}>
                            <div className="wcu-card w-100">
                                <div className="d-flex align-items-center wcu-card-header bg-dark text-white p-3 position-relative shadow-sm">
                                    <div className="d-flex position-absolute wcu-card-icon bg-dark rounded-circle border border-4 border-white p-3">{w.icon}</div>
                                    <h5 className='m-0'>{w.header}</h5>
                                </div>
                                <div className='border border-top-0 border-2 wcu-card-text shadow-sm p-3'>
                                    <div></div>
                                    <p className='fs-5 text-muted'>{w.content}</p>
                                </div>
                            </div>
                        </Col>
                        ))
                    }
                    </Row>
                </Container>
            </section>


            <section className='position-relative page-section bg-secondary d-flex flex-column bg-img-2'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Trending</div></div>
                <div className='h-100 d-flex align-items-center flex-column py-5 gap-3'>
                    <Container className='p-0'>
                        <h3 className='text-start w-100 text-white'>Check our popular products</h3>
                        <hr className='bg-white border-3 border-white w-100 mb-0' />
                    </Container>
                    <ProductSlider products={shownProducts} />
                </div>
            </section>


            <section className='position-relative page-section bg-white d-flex flex-column bg-img-offer' style={style.section}>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Offers</div></div>
                <Container className='d-flex align-items-center justify-content-center justify-content-md-start h-100'>
                    <div className="d-flex flex-column align-items-center align-items-md-start offer-content w-75">
                        <h1 className='text-center text-md-start'>Looking for a Deal?</h1>
                        <p className='text-center text-md-start fs-5 mb-5'>
                            We always have interesting offers for you!
                        </p>
                        <Link to={"/offers"} className='btn fs-5 p-3 px-4 text-uppercase fw-semibold border-0 main-button bg-secondary shadow'>Don't Miss Out!</Link>
                    </div>
                </Container>
            </section>


            <section className='position-relative page-section bg-secondary d-flex flex-column bg-img-3'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
                <Container className='d-flex align-items-center h-100 py-5'>
                    <div className="d-flex flex-column align-items-center w-100 gap-2 px-2 text-white">
                        <h1 className='text-center'>Who are <b className='text-info'>We?</b> <br /> And What Do We Offer To <b className='text-info'>You?</b></h1>
                        <hr className='w-50 mt-0' />
                        <p className='fs-5 text-center text-light w-xs-100 w-md-50'>
                        We are passionate about technology and strive to provide our customers with the latest and best everyday devices including smartphones, laptops, tablets, and more.
                        </p>

                        <Link to={"/about"} className='text-info fs-5 text-decoration-none'>Read More...</Link>
                    </div>
                </Container>
            </section>


            <section className='position-relative page-section bg-white d-flex flex-column bg-img-4'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Newest Arrivals</div></div>
                <Container className='d-flex flex-column align-items-center p-2 py-5 px-sm-4 h-100 gap-5'>
                    <Row className='gy-4 gx-2 g-sm-5 pt-3'>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-3 text-center text-sm-start p-0">
                            <h1>Electro Series</h1>
                            <p className='text-dark fs-5'>Fresh new set of Smartphones with design and performance equally astonishing.</p>
                        </Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2"><ProductCard productId={"12546"} /></Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2"><ProductCard productId={"24329"} /></Col>
                        <Col className="col-12 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2 d-flex justify-content-center">
                            <ProductCard productId={"82592"} className={"w-xs-50 w-md-100"} />
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-start pb-3 pb-sm-0'>
                            <img className='' src={require("../img/home/homepage-newest-1.png")} alt="" style={{width:"min(115%,75vw)",filter: "drop-shadow(0 2px 5px rgb(0,20,100,0.8))"}} />
                        </Col>
                    </Row>
                    <hr className='bg-dark w-100' />
                    <Row className='gy-4 gx-2 g-sm-5 pb-3'>
                        <Col className='col-12 col-sm-6 col-md-6 col-lg-3 order-1 order-lg-0 d-flex align-items-center justify-content-center justify-content-lg-end pb-3 pb-sm-0'>
                            <img className='' src={require("../img/home/homepage-newest-2.png")} alt="" style={{width:"min(120%,80vw)",filter: "drop-shadow(0 2px 5px rgb(0,20,100,0.8))"}} />
                        </Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2"><ProductCard productId={"11241"} col={4} /></Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2"><ProductCard productId={"99461"} col={4} /></Col>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-4 ps-sm-5 text-center text-sm-start">
                            <h1>Zoom</h1>
                            <p className='text-dark fs-5'>Zoom faster into the future's tech with Zoom's Lightweight, Professional Smartphones.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='position-relative page-section bg-secondary bg-img-6 d-flex flex-column'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Services</div></div>
                <Container className='h-100 py-5'>
                    <Row className='h-100 g-2 g-sm-3 g-md-4'>
                        <Col className='col-12 col-lg-9 h-100'>
                            <Row className='h-100 g-2 g-sm-3 g-md-4'>
                                <Col className='col-12 col-sm-8'>
                                    <div className='w-100 bg-light rounded-1 shadow p-4 service-card'>
                                        <h3 className='text-secondary mb-3'>Warranty and Maintenance</h3>
                                        <p className='text-muted'>We ensure that you get <b>absolutely no less</b> than what you are promised. Any defects and issues are carefully taken care of.</p>
                                    </div>
                                </Col>
                                <Col className='col-6 col-sm-4'>
                                <div className='w-100 bg-light rounded-1 shadow d-flex align-items-center justify-content-center p-0 p-md-4 service-card' style={{height: "15rem"}}>
                                        <img style={{width: "min(7rem,20vw)",height:"fit-content"}} src={require("../img/home/services-2.png")} />
                                    </div>
                                </Col>
                                <Col className='col-6 col-sm-4'>
                                    <div className='w-100 bg-light rounded-1 shadow d-flex align-items-center justify-content-center p-0 p-md-4 service-card' style={{height: "15rem"}}>
                                        <img style={{width: "min(7rem,20vw)",height:"fit-content"}} src={require("../img/home/services-1.png")} />
                                    </div>
                                </Col>
                                <Col className='col-12 col-sm-8'>
                                    <div className='w-100 bg-light rounded-1 shadow p-4 service-card'>
                                        <h3 className='text-secondary mb-3'>Customer Service</h3>
                                        <p className='text-muted'>Our staff are always ready to help. We look after even the slightest inconveniences to ensure <b>the best shopping experience</b> our customers could have.</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-12 col-lg-3'>
                            <div className='w-100 h-100 bg-light rounded-1 shadow p-4 d-flex flex-column justify-content-between service-card'>
                                <div>
                                    <h3 className='text-secondary text-center mb-3'>Need Any Help?</h3>
                                    <p className='fs-5 text-muted text-center'>We would love to help or simply hear your thoughts! We listen to you and strive to improve!</p>
                                </div>
                                <div>
                                    <p className='mb-1 text-center'>Call us at: +201028549449</p>
                                    <div className='d-flex justify-content-center mb-1'>
                                        <hr className='w-100 border-2' />
                                        <span className='px-2 text-muted fw-semibold'>OR</span>
                                        <hr className='w-100 border-2' />
                                    </div>
                                    <Link to={"/contact"} className='main-button btn bg-secondary border-0 fs-5 w-100'>Contact us now!</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='position-relative page-section bg-white d-flex flex-column bg-img-1'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Hear from our customers</div></div>
                <Container className='w-100 py-5 d-flex flex-column'>

                    <Carousel className='w-100' controls={false} indicators={false} interval={2000}>
                        <Carousel.Item>
                            <Row>
                                <Col className='col-12 col-md-6 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0'>Photon Surge 10T</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-1.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Didn't disappoint</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>Qualities are just like advertised. Great performance and experience overall.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-md-6 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Horizon Elite 9L</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-2.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>I liked it</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>Very nice phone. I recommend it along with the rest of the series.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>ZedTab Air</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-3.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Easy use</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>This tablets is a must-have for graphic designers. Smooth experience.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {/* <div className="px-5 w-50 h-100">
                            </div> */}
                        </Carousel.Item>

                        <Carousel.Item>
                            <Row>
                                <Col className='col-12 col-md-6 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0'>PulseFlow Lite</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-4.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Good Value for Money</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill className='text-dark' /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>This budget-friendly headphones provide decent audio quality and comfort, making them a solid choice for everyday use.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-md-6 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>BusinessPro B4</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-5.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Excellent Picture Quality</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>The high-resolution display of this monitor ensures vibrant colors and sharp details, perfect for multimedia and graphic design work.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>FusionTower Max</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-6.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Reliable Performance</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>This desktop computer offers reliable performance for everyday tasks, making it suitable for both work and entertainment purposes.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>

                        <Carousel.Item>
                            <Row>
                                <Col className='col-12 col-md-6 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0'>NovaBook Air 13</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-7.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Decent Performance</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>The laptop is reliable for everyday tasks, and nicely handles large applications as well.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-md-6 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Chromo Prime 12T</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-8.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Impressive Battery Life</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>This smartphone lasts all day on a single charge, even with heavy usage. No more worrying about running out of battery!</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-lg-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>AquaPad Elite</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img className='homepage-review-product-img' style={{height: "min(20rem,50vw)"}} src={require("../img/home/homepage-reviews-9.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start homepage-review-card">
                                                    <div className="d-flex gap-3 align-items-end">
                                                        <div className='bg-white shadow-sm px-2 fs-3 rounded-3'><BsFillPersonFill /></div>
                                                        <h4 className='m-0'>Sleek Design</h4>
                                                    </div>
                                                    <div className='d-flex gap-1 my-2 text-warning rounded-pill shadow-sm p-1 fs-5'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill className='text-dark' /></div>
                                                    <div className='d-flex flex-column'>
                                                        <p>The slim and elegant design of this tablet makes it a pleasure to hold and use. A great combination of style and functionality.</p>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>
                       
                    </Carousel>

                </Container>
            </section>

            <section className='position-relative page-section bg-secondary bg-img-5 d-flex flex-column'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Branches</div></div>
                <Container className='h-100 py-5'>
                    <Row className="d-flex h-100">
                        <Col className="col-12 col-lg-6">
                            <Container className='py-4'>
                                <Nav variant='underline' className='branch-nav gap-0 d-flex justify-content-between' activeKey={branchSelect} onSelect={(eventKey)=>{setBranchSelect(eventKey)}}>
                                {
                                    branches.map((branch,index)=>
                                        <Nav.Item className='text-center' key={`branch-link-${index}`}>
                                            <Nav.Link eventKey={`${index+1}`}>{branch.title}</Nav.Link>
                                        </Nav.Item>
                                    )
                                }
                                    
                                </Nav>
                                <hr className='w-100 border-white border-2 mt-0 mb-2'/>
                                <Carousel className='w-100 pt-4' controls={false} indicators={false} activeIndex={+branchSelect-1}>
                                    {
                                        branches.map((branch,index)=>

                                        <Carousel.Item style={{zIndex:"0"}} key={`branch-slide-${index}`}>
                                            <div className='text-white p-2 shadow rounded-3'>
                                                <div className="d-flex flex-column align-items-center align-items-lg-start flex-xl-row gap-2 justify-content-between gap-xl-5 w-100">
                                                    <div className="d-flex flex-column text-md-start text-center align-items-center align-items-lg-start gap-2">
                                                        <h4>{branch.title} Branch</h4>
                                                        <div className='position-relative d-flex align-items-end justify-content-center overflow-hidden rounded-3 border border-2' style={{width: "min(20rem,80vw)",aspectRatio: "16/9"}}>
                                                            <img className='position-absolute w-100' src={branch.image} />
                                                        </div>
                                                        <p className='mt-3'>{branch.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>

                                        )
                                    }
                                    
                                </Carousel>
                            </Container>
                        </Col>
                        <Col className='col-12 col-lg-6 py-3' style={{height: "25rem"}}>
                            <iframe className='w-100 h-100 rounded-3 shadow'  src={`https://www.google.com/maps/embed/v1/place?q=${branches[+branchSelect-1].coordinates}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='position-relative bg-white d-flex flex-column bg-img-7'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Frequently asked questions</div></div>
                <Container className="px-2 px-sm-0 py-5">
                    <div className='m-0 d-flex flex-column'>
                        <Accordion flush className=' my-5 m-0 w-100'>
                            
                        {
                            faqs.map((faq, index) => (

                            <Accordion.Item key={`faq-${index}`} eventKey={index} className='border-0 rounded-3 mb-2 rounded-bottom overflow-hidden shadow'>
                                <Accordion.Header className='px-4 py-3 rounded-top '><h5 className='m-0'>{faq.q}</h5></Accordion.Header>
                                <Accordion.Body className='border-top border-2 rounded-bottom fs-5'>{faq.a}</Accordion.Body>
                            </Accordion.Item>
                            ))
                        }
                        </Accordion>
                        <div className="w-100 px-3 p-sm-0">
                            <div className='text-center'>
                                <h4>Can't find your question? Feel free to <Link to={"/contact"} className='text-decoration-none text-primary'>Contact Us</Link> for any assistance!</h4>
                                <h4 style={{color:"rgb(121, 167, 211)"}}>We are happy to help!</h4>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}


export default Home;