import React, { useState } from 'react';
import { Accordion, Button, Carousel, Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import ProductSlider from '../Components/ProductSlider';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillStarFill, BsPhoneFill, BsTabletLandscapeFill } from "react-icons/bs";
import ProductCard from '../Components/ProductCard';
import { FaTruckMoving, FaLaptop } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { RiHandCoinFill } from "react-icons/ri";

function Home({}) {

    const style = {
        header: {
            height: "675px"
        },
        section: {
            height: "525px"
        },
        sectionSmall: {
            height: "400px"
        }
    }

    const [branchSelect,setBranchSelect] = useState(1);

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
            coordinates: "31.2163837,29.9274562"
        },
        {
            coordinates: "31.2036875,29.8836064"
        },
        {
            coordinates: "31.2867826,30.023901"
        },
        {
            coordinates: "31.2171035,29.9427816"
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

   

    return (
        <div>
            <header className='bg-secondary homepage-header d-flex align-items-center justify-content-center justify-content-sm-start pb-5' style={style.header}>
                <Container className='m-5 d-flex justify-content-center justify-content-sm-start'>
                    <div className='header-content text-white p-0 m-0 m-sm-5 w-xs-100 w-sm-50 d-flex flex-column gap-3 align-items-center align-items-sm-start'>
                        <h1 className='large-title text-center text-sm-start'>Asr Digitals</h1>
                        <p className='text-center text-sm-start w-xs-100 w-lg-75 fs-5 fw-bold'>The home of all the digitals you need. Get your next devices with fair costs and best qualities.</p>
                        <Button variant='dark' className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold border-white border-3 main-button'>Shop now!</Button>
                    </div>
                </Container>
            </header>


            <section className='position-relative page-section bg-white d-flex flex-column bg-img-1'>
                <div className="position-absolute bottom-100 w-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Why Choose Us</div></div>
                {/* <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Why Choose Us</div></div> */}
                <Container className='d-flex align-items-center justify-content-center p-0 py-5 w-100'>
                    <Row className='gy-4 py-4 w-100 h-100'>
                    {
                        whyChooseUs.map((w) => (

                        <Col className='col-12 col-sm-6 col-lg-3 px-1 px-lg-3'>
                            <div className="wcu-card">
                                <div className="d-flex align-items-center wcu-card-header bg-dark text-white p-3 position-relative shadow-sm">
                                    <div className="d-flex position-absolute wcu-card-icon bg-dark rounded-circle border border-4 border-white p-3">{w.icon}</div>
                                    <h5 className='m-0'>{w.header}</h5>
                                </div>
                                <div className='border border-top-0 border-2 wcu-card-text bg-white shadow-sm p-3'>
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
                    <ProductSlider />
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
                        <Link to={"/offers"} className='btn fs-5 p-3 px-4 text-uppercase fw-semibold border-0 main-button'>Don't Miss Out!</Link>
                    </div>
                </Container>
            </section>


            <section className='position-relative page-section bg-secondary d-flex flex-column bg-img-3'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
                <Container className='d-flex align-items-center h-100 py-5'>
                    <div className="d-flex flex-column align-items-center w-100 gap-2 px-2 text-white">
                        <h1 className='text-center text-md-start'>How we started...</h1>
                        <hr className='w-50 mt-0' />
                        <p className='fs-5 text-center text-light w-xs-100 w-md-50'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste. Lorem ipsum, dolor sit amet.
                        </p>

                        <Link className='text-info fs-5 text-decoration-none'>Read More...</Link>
                    </div>
                </Container>
            </section>


            <section className='position-relative page-section bg-white d-flex flex-column bg-img-4'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Newest Arrivals</div></div>
                <Container className='d-flex flex-column align-items-center p-2 py-5 px-sm-4 h-100 gap-5'>
                    <Row className='g-2 g-sm-2 g-sm-4 pt-3'>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-3 text-center text-sm-start">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2 px-xl-3"><ProductCard productId={"1"} col={4} /></Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2 px-xl-3"><ProductCard productId={"1"} col={4} /></Col>
                        <Col className="col-12 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2 px-xl-3 d-flex justify-content-center">
                            <ProductCard productId={"1"} className={"w-xs-50 w-md-100"} />
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                    </Row>
                    <hr className='bg-dark w-100' />
                    <Row className='g-1 g-sm-2 g-sm-4'>
                        <Col className='col-12 col-sm-6 col-md-6 col-lg-3 order-1 order-lg-0'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2 px-xl-3"><ProductCard productId={"2"} col={4} /></Col>
                        <Col className="col-6 col-md-4 col-lg-2 order-1 order-lg-0 px-1 px-sm-2 px-xl-3"><ProductCard productId={"2"} col={4} /></Col>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-4 ps-sm-5 text-center text-sm-start">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                    </Row>
                </Container>
            </section>

             {/* HIDDEN */}
            <section className='position-relative page-section bg-secondary d-flex flex-column' style={style.sectionSmall}>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
            </section>

            {/* HIDDEN */}
            <section className='position-relative page-section bg-white d-flex flex-column bg-img-1'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Hear from our customers</div></div>
                <Container className='w-100 py-5 d-flex flex-column'>

                    <Carousel className='w-100' controls={false} indicators={false} interval={2000}>
                        <Carousel.Item>
                            <Row>
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0'>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0'>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0'>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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
                                <Col className='col-12 col-sm-6 col-md-4 py-2'>
                                    <div className="d-flex flex-column w-100 h-100 rounded-3 p-3 shadow-sm" style={{backgroundColor: "rgba(255,255,255,0.3)",backdropFilter: "blur(0.2rem)"}}>
                                        <div className='h-100 d-flex flex-column align-items-center'>
                                            <h2 className='m-0 '>Phone 1X</h2>
                                            <div className='d-flex gap-2 text-warning fs-3 mt-2'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>
                                            <img style={{height: "min(20rem,50vw)"}} src={require("../img/phone.png")} alt="" />
                                        </div>
                                        <div className='w-100 d-flex flex-column'>
                                            <div className="d-flex flex-column gap-3">

                                                <div className="w-100 bg-white shadow rounded-3 p-3 d-flex flex-column gap-1 align-items-start">
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

                    {/* <Carousel className='w-100' controls={false} indicators={false} interval={3000}>
                        <Carousel.Item>
                            <div className="p-2 w-100 h-100">
                                <div className="d-flex flex-column flex-md-row w-100 h-100 bg-warning-subtle rounded-3 p-2 shadow-sm">
                                    <div className='h-100 d-flex justify-content-center'>
                                        <img style={{height: "min(25rem,90vw)"}} src={require("../img/phone.png")} alt="" />
                                    </div>
                                    <div className='w-100 d-flex flex-column p-3'>
                                        <div className="d-flex flex-column flex-md-row align-items-center gap-0 gap-md-4 fs-1 text-secondary"><h1 style={{fontSize: "3rem"}}>Phone 1X</h1><div className='d-flex gap-2 text-warning'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>  </div>
                                        <hr className='border-5' />
                                        <div className="d-flex flex-column gap-3">

                                            <div className="w-100 shadow rounded-3 p-3 d-flex flex-column flex-md-row gap-md-3 align-items-start gap-1">
                                                <div className='bg-white px-2 fs-3 rounded-3'>
                                                    <BsFillPersonFill />
                                                </div>
                                                <div className='d-flex flex-column fs-5'>
                                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-md-3 gap-1"><h3>I like it</h3><div className='d-flex gap-1 mb-2 text-warning rounded-pill shadow-sm p-1'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div> </div>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis illo corporis distinctio officiis facilis.
                                                </div>
                                            </div>

                                            <div className="w-100 shadow rounded-3 p-3 d-flex flex-column flex-md-row gap-md-3 align-items-start gap-1">
                                                <div className='bg-white px-2 fs-3 rounded-3'>
                                                    <BsFillPersonFill />
                                                </div>
                                                <div className='d-flex flex-column fs-5'>
                                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-md-3 gap-1"><h3>I like it</h3><div className='d-flex gap-1 mb-2 text-warning rounded-pill shadow-sm p-1'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div> </div>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis illo corporis distinctio officiis facilis.
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="p-2 w-100 h-100">
                                <div className="d-flex flex-column flex-md-row w-100 h-100 bg-info-subtle rounded-3 p-2 shadow-sm">
                                    <div className='h-100 d-flex justify-content-center'>
                                        <img style={{height: "min(25rem,90vw)"}} src={require("../img/phone.png")} alt="" />
                                    </div>
                                    <div className='w-100 d-flex flex-column p-3'>
                                        <div className="d-flex flex-column flex-md-row align-items-center gap-0 gap-md-4 fs-1 text-secondary"><h1 style={{fontSize: "3rem"}}>Phone 1X</h1><div className='d-flex gap-2 text-warning'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>  </div>
                                        <hr className='border-5' />
                                        <div className="d-flex flex-column gap-3">

                                            <div className="w-100 shadow rounded-3 p-3 d-flex flex-column flex-md-row gap-md-3 align-items-start gap-1">
                                                <div className='bg-white px-2 fs-3 rounded-3'>
                                                    <BsFillPersonFill />
                                                </div>
                                                <div className='d-flex flex-column fs-5'>
                                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-md-3 gap-1"><h3>I like it</h3><div className='d-flex gap-1 mb-2 text-warning rounded-pill shadow-sm p-1'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div> </div>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis illo corporis distinctio officiis facilis.
                                                </div>
                                            </div>

                                            <div className="w-100 shadow rounded-3 p-3 d-flex flex-column flex-md-row gap-md-3 align-items-start gap-1">
                                                <div className='bg-white px-2 fs-3 rounded-3'>
                                                    <BsFillPersonFill />
                                                </div>
                                                <div className='d-flex flex-column fs-5'>
                                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-md-3 gap-1"><h3>I like it</h3><div className='d-flex gap-1 mb-2 text-warning rounded-pill shadow-sm p-1'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div> </div>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis illo corporis distinctio officiis facilis.
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="p-2 w-100 h-100">
                                <div className="d-flex flex-column flex-md-row w-100 h-100 bg-secondary-subtle rounded-3 p-2 shadow-sm">
                                    <div className='h-100 d-flex justify-content-center'>
                                        <img style={{height: "min(25rem,90vw)"}} src={require("../img/phone.png")} alt="" />
                                    </div>
                                    <div className='w-100 d-flex flex-column p-3'>
                                        <div className="d-flex flex-column flex-md-row align-items-center gap-0 gap-md-4 fs-1 text-secondary"><h1 style={{fontSize: "3rem"}}>Phone 1X</h1><div className='d-flex gap-2 text-warning'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div>  </div>
                                        <hr className='border-5' />
                                        <div className="d-flex flex-column gap-3">

                                            <div className="w-100 shadow rounded-3 p-3 d-flex flex-column flex-md-row gap-md-3 align-items-start gap-1">
                                                <div className='bg-white px-2 fs-3 rounded-3'>
                                                    <BsFillPersonFill />
                                                </div>
                                                <div className='d-flex flex-column fs-5'>
                                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-md-3 gap-1"><h3>I like it</h3><div className='d-flex gap-1 mb-2 text-warning rounded-pill shadow-sm p-1'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div> </div>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis illo corporis distinctio officiis facilis.
                                                </div>
                                            </div>

                                            <div className="w-100 shadow rounded-3 p-3 d-flex flex-column flex-md-row gap-md-3 align-items-start gap-1">
                                                <div className='bg-white px-2 fs-3 rounded-3'>
                                                    <BsFillPersonFill />
                                                </div>
                                                <div className='d-flex flex-column fs-5'>
                                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-md-3 gap-1"><h3>I like it</h3><div className='d-flex gap-1 mb-2 text-warning rounded-pill shadow-sm p-1'><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /><BsFillStarFill /></div> </div>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis illo corporis distinctio officiis facilis.
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel> */}
                </Container>
            </section>

            <section className='position-relative page-section bg-secondary d-flex flex-column'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Branches</div></div>
                <Container className='h-100 py-5'>
                    <Row className="d-flex h-100">
                        <Col className="col-12 col-lg-6">
                            <Container className='py-4'>
                                <Nav variant='underline' className='branch-nav gap-0 d-flex justify-content-between' activeKey={branchSelect} onSelect={(eventKey)=>{setBranchSelect(eventKey)}}>
                                    <Nav.Item className='text-center'>
                                        <Nav.Link eventKey="1">First Branch</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='text-center'>
                                        <Nav.Link eventKey="2">Second Branch</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='text-center'>
                                        <Nav.Link eventKey="3">Third Branch</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='text-center'>
                                        <Nav.Link eventKey="4">Fourth Branch</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <hr className='w-100 border-white border-2 mt-0'/>
                                <Carousel className='w-100 pt-4' controls={false} indicators={false} fade={"true"} activeIndex={+branchSelect-1}>
                                    <Carousel.Item>
                                        <div className='text-white bg-secondary'>
                                            <div className="d-flex flex-column align-items-center align-items-md-start flex-xl-row gap-2 mt-3 justify-content-between gap-xl-5 w-100">
                                                <div className="d-flex flex-column text-md-start text-center gap-2">
                                                    <h4>First Branch Address</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatem quidem distinctio libero, culpa modis.</p>
                                                </div>
                                                <div className='bg-light' style={{height: "min(10rem,50vw)",aspectRatio: "16/9"}}></div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className='text-white bg-secondary'>
                                            <div className="d-flex flex-column align-items-center align-items-sm-start flex-xl-row gap-2 mt-3 justify-content-between gap-xl-5 w-100">
                                                <div className="d-flex flex-column text-sm-start text-center gap-2">
                                                    <h4>Second Branch Address</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatem quidem distinctio libero, culpa modis.</p>
                                                </div>
                                                <div className='bg-light' style={{height: "min(10rem,50vw)",aspectRatio: "16/9"}}></div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                    <div className='text-white bg-secondary'>
                                            <div className="d-flex flex-column align-items-center align-items-sm-start flex-xl-row gap-2 mt-3 justify-content-between gap-xl-5 w-100">
                                                <div className="d-flex flex-column text-sm-start text-center gap-2">
                                                    <h4>Third Branch Address</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatem quidem distinctio libero, culpa modis.</p>
                                                </div>
                                                <div className='bg-light' style={{height: "min(10rem,50vw)",aspectRatio: "16/9"}}></div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                    <div className='text-white bg-secondary'>
                                            <div className="d-flex flex-column align-items-center align-items-sm-start flex-xl-row gap-2 mt-3 justify-content-between gap-xl-5 w-100">
                                                <div className="d-flex flex-column text-sm-start text-center gap-2">
                                                    <h4>Fourth Branch Address</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatem quidem distinctio libero, culpa modis.</p>
                                                </div>
                                                <div className='bg-light' style={{height: "min(10rem,50vw)",aspectRatio: "16/9"}}></div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </Container>
                        </Col>
                        <Col className='col-12 col-lg-6 py-3' style={{height: "25rem"}}>
                            <iframe className='w-100 h-100 rounded-3 shadow'  src={`https://www.google.com/maps/embed/v1/place?q=${branches[+branchSelect-1].coordinates}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='position-relative bg-white d-flex flex-column'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Frequently asked questions</div></div>
                <Container className="p-0 py-5">
                    <div className='m-0 d-flex flex-column'>
                        <Accordion flush className='shadow my-5 m-0 w-100'>
                            
                        {
                            faqs.map((faq, index) => (

                            <Accordion.Item eventKey={index}>
                                <Accordion.Header><h5>{faq.q}</h5></Accordion.Header>
                                <Accordion.Body>{faq.a}</Accordion.Body>
                            </Accordion.Item>
                            ))
                        }
                        </Accordion>
                        <div className="w-100 px-3 p-sm-0">
                            <div className='text-center'>
                                <h4>Can't find your question? Feel free to <Link className='text-decoration-none text-primary'>Contact Us</Link> for any assistance!</h4>
                                <h4 className='text-info'>We are happy to help!</h4>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}


function SampleReview({text, className})
{
    return (
        <div className={`bg-white w-auto shadow border border-2 rounded-3 d-flex flex-column gap-1 overflow-hidden ${className}`} >
            <div className="d-flex gap-3 p-2">
                <BsFillPersonFill className='bg-white border border-dark rounded-2 fs-1' />
                <p className='fs-4 m-0 text-nowrap'>{text}</p>
            </div>
            <div className="d-flex gap-1 fs-5 p-2"><BsFillStarFill cla style={{backdropFilter: "blur(0.5em)"}}ssName='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
        </div>
    )
}
export default Home;