import React from 'react';
import { Accordion, Button, Carousel, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import ProductCarousel from '../Components/ProductCarousel';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillStarFill, BsPhoneFill, BsTabletLandscapeFill } from "react-icons/bs";
import ProductCard from '../Components/ProductCard';


function Home({}) {

    const style = {
        header: {
            height: "650px"
        },
        section: {
            height: "500px"
        },
        sectionLarge: {
            // minHeight: "600px"
        },
        sectionSmall: {
            height: "350px"
        }
    }

   

    return (
        <div>
            <header className='bg-secondary d-flex align-items-center justify-content-center justify-content-sm-start' style={style.header}>
                <div className='header-content p-0 m-5 w-50 d-flex flex-column gap-3 align-items-center align-items-sm-start'>
                    <h1 className='large-title text-center text-sm-start'>Asr Digitals</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet obcaecati tenetur libero perspiciatis! Quisquam illo esse.</p>
                    <Button variant='dark' className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                </div>
            </header>


            <section className='bg-white d-flex flex-column' style={style.sectionLarge}>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Why Choose Us</div></div>
                <Container className='d-flex align-items-center justify-content-center py-5 h-100'>
                    <Row className='gy-4 p-3 py-4'>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className='bg-secondary d-flex flex-column'>
                <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Trending</div></div>
                <div className='h-100 d-flex align-items-center flex-column py-5 gap-3'>
                    <h3 className='text-start w-100 ps-5 text-white'>Check our popular products</h3>
                    <hr className='bg-white border-3 border-white w-100 mx-5' />
                    <ProductCarousel />
                </div>
            </section>


            <section className='bg-white d-flex flex-column' style={style.section}>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Offers</div></div>
                <Container className='d-flex align-items-center justify-content-center justify-content-md-start h-100'>
                    <div className="d-flex flex-column align-items-center align-items-md-start offer-content w-75">
                        <h1 className='text-center text-md-start'>Check Our Latest Offers!</h1>
                        <p className='text-center text-md-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste.</p>
                        <Button className='btn-dark text-uppercase fs-5'>Don't Miss Out!</Button>
                    </div>
                </Container>
            </section>


            <section className='bg-secondary d-flex flex-column'>
                <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
                <Container className='d-flex align-items-center h-100 py-5'>
                    <div className="d-flex flex-column align-items-center w-100 gap-2 px-2">
                        <h1 className='text-center text-md-start'>How we started...</h1>
                        <p className='fs-5 text-center text-md-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste. Lorem ipsum, dolor sit amet.</p>
                        <p className='fs-5 text-center text-md-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste. Lorem ipsum, dolor sit amet.</p>

                        <Link className='text-info fs-5'>Read More...</Link>
                    </div>
                </Container>
            </section>


            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Newest Arrivals</div></div>
                <Container className='d-flex flex-column align-items-center py-5 px-4 h-100 gap-5'>
                    <Row className='gy-4'>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                        {/* <Col className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-lg-0"> */}
                            {/* <Row className='gy-4'> */}
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"1"} col={4} /></Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"1"} col={4} /></Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"1"} col={4} /></Col>
                            {/* </Row> */}
                        {/* </Col> */}
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                    </Row>
                    <hr className='bg-dark w-100' />
                    <Row className='gy-4'>
                        <Col className='col-12 col-sm-6 col-md-6 col-lg-3 order-1 order-lg-0'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                        {/* <Col className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-lg-0">
                            <Row className='gy-4'> */}
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"2"} col={4} /></Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"2"} col={4} /></Col>
                            {/* </Row>
                        </Col> */}
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-4 ps-5">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className='bg-secondary d-flex flex-column' style={style.sectionSmall}>
                <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
            </section>


            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Hear from our customers</div></div>
                <Container className='w-100 py-5 d-flex flex-column'>

                    <Carousel className='w-100' controls={false} indicators={false} interval={2000}>
                        <Carousel.Item>
                            <div className="p-2 w-100 h-100">
                                <div className="d-flex flex-column flex-md-row w-100 h-100 bg-primary-subtle rounded-3 p-2 shadow-sm">
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
                                <div className="d-flex flex-column flex-md-row w-100 h-100 bg-success-subtle rounded-3 p-2 shadow-sm">
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
                                <div className="d-flex flex-column flex-md-row w-100 h-100 bg-danger-subtle rounded-3 p-2 shadow-sm">
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
                    </Carousel>

                    <Carousel className='w-100' controls={false} indicators={false} interval={3000}>
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
                    </Carousel>
                </Container>
            </section>

            <section className='bg-secondary d-flex flex-column'>
                <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Branches</div></div>
                <Container className='h-100 py-5'>
                    <Row className="d-flex h-100">
                        <Col className="col-12 col-lg-6 order-1 order-md-0">
                            <Container className='py-4'>
                                <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3 text-dark" variant='tabs'>
                                    <Tab eventKey="home" className='text-white' title="First Branch">
                                        <h3>First Branch Title</h3>
                                        <div className='bg-dark float-md-end my-3 ms-4' style={{width:"min(16rem,65vw)",height: "9rem"}}></div>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>

                                    </Tab>
                                    <Tab eventKey="profile" className='text-white' title="Second Branch">
                                        <h3>Second Branch Title</h3>
                                        <div className='bg-dark float-md-end my-3 ms-4' style={{width:"min(16rem,65vw)",height: "9rem"}}></div>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>
                                    </Tab>
                                    <Tab eventKey="longer-tab" className='text-white' title="Third Branch">
                                        <h3>Third Branch Title</h3>
                                        <div className='bg-dark float-md-end my-3 ms-4' style={{width:"min(16rem,65vw)",height: "9rem"}}></div>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>
                                    </Tab>
                                    <Tab eventKey="contact" className='text-white' title="Fourth Branch">
                                        <h3>Fourth Branch Title</h3>
                                        <div className='bg-dark float-md-end my-3 ms-4' style={{width:"min(16rem,65vw)",height: "9rem"}}></div>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>
                                    </Tab>
                                </Tabs>
                            </Container>
                        </Col>
                        <Col className='col-12 col-lg-6 py-3' style={{height: "25rem"}}>
                            <iframe className='w-100 h-100 rounded-3 shadow'  src="https://www.google.com/maps/embed/v1/place?q=noplaceisnamedlikethis&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Frequently asked questions</div></div>
                <Container className="p-0 p-md-4">
                    <Row className='m-0'>
                        <Col className='col-12 col-md-6 p-0'>
                                <Accordion alwaysOpen flush className='shadow my-5 m-0 w-100'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                                        <Accordion.Body>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                                        <Accordion.Body>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                                        <Accordion.Body>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                                        <Accordion.Body>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                                        <Accordion.Body>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                                        <Accordion.Body>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                        </Col>
                        <Col className='col-12 col-md-6 p-0 p-lg-5'>
                            <div className="h-100 d-flex align-items-start py-5">
                                <div className='text-center py-5'>
                                    <h4>Can't find your question? Feel free to <Link className='text-decoration-none text-primary'>Contact Us</Link> for any assistance!</h4>
                                    <h4 className='text-info'>We are happy to help!</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
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
            <div className="d-flex gap-1 fs-5 bg-primary-subtle p-2"><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
        </div>
    )
}
export default Home;