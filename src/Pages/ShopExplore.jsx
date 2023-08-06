import React from 'react';
import ProductCarousel from '../Components/ProductCarousel';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import Slider from '../Components/Slider';

function ShopExplore({}) {

    const categories = ["Phones","Tablets","Laptops","Desktops","Headphones","Earphones"];
    const brands = ["Brand 1","Brand 2","Brand 3","Brand 4"];




    return (
        <div>
            <header className='bg-secondary d-flex align-items-center justify-content-center justify-content-sm-start' style={{height: "500px"}}>
                <div className='header-content p-0 m-5 w-100 d-flex flex-column gap-3 align-items-center align-items-sm-start'>
                    <h1 className='text-center text-sm-start'>New Phone Promotion</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet obcaecati tenetur libero perspiciatis! Quisquam illo esse.</p>
                    <Button variant='dark' className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                </div>
            </header>

            <section>
                <div className='h-100 d-flex flex-column py-5 gap-3'>
                    <h3 className='text-center text-md-start ps-md-5 mb-3'>Shop by Category</h3>
                    <Slider 
                    content={categories.map((category) =>
                        <div style={{width: "13rem"}}>
                            <div className="shadow p-4 rounded-3">
                                <div className='bg-secondary rounded-3 w-100 aspect-1' style={{aspectRatio: "1"}}></div>
                                <p className='m-0 mt-3 fs-5'>{category}</p>
                            </div>
                        </div>
                        )}
                    className={"light"}
                    />

                    <hr className='my-5' />

                    <h3 className='text-center text-md-start ps-md-5 mb-3'>Shop by Brand</h3>
                    <Slider 
                    content={brands.map((brand) =>
                        <div style={{width: "13rem"}}>
                            <div className="shadow p-4 rounded-3">
                                <div className='bg-secondary rounded-3 w-100 aspect-1' style={{aspectRatio: "1"}}></div>
                                <p className='m-0 mt-3 fs-5'>{brand}</p>
                            </div>
                        </div>
                        )}
                    className={"light"}
                    />
                </div>
            </section>

            <section className='bg-secondary d-flex flex-column text-white'>
                <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top Offers</div></div>
                <div>
                    <Container className='pt-5 p-0'>
                        <Carousel className='w-100' interval={3000} controls={false}>
                            <Carousel.Item >
                                <Row className='mb-5 gy-2'>
                                    <Col className='col-12 col-md-6'>
                                        <div className='bg-secondary-subtle mb-5 h-100 rounded-3 shadow d-flex flex-column align-items-center'>
                                            <div className='d-flex flex-row align-items-center'>
                                                <div className='d-flex justify-content-start'><img style={{width: "min(15rem,50vw)"}} src={require("../img/phone.png")} alt="" /></div>
                                                <div className='h-100 py-4 text-dark'>
                                                    <h2>Phone 20XX</h2>
                                                    <div className='d-none d-sm-block'>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                        <h5 className='price-tag price-old'>300</h5>
                                                        <h1 className='text-danger price-tag'>100</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-block px-4 d-sm-none text-dark'>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                <h5 className='price-tag price-old'>300</h5>
                                                <h1 className='text-danger price-tag'>100</h1>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='col-12 col-md-6'>
                                        <div className='bg-secondary-subtle mb-5 h-100 rounded-3 shadow d-flex flex-column align-items-center'>
                                            <div className='d-flex flex-row align-items-center'>
                                                <div className='d-flex justify-content-start'><img style={{width: "min(15rem,50vw)"}} src={require("../img/phone.png")} alt="" /></div>
                                                <div className='h-100 py-4 text-dark'>
                                                    <h2>Phone 20XX</h2>
                                                    <div className='d-none d-sm-block'>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                        <h5 className='price-tag price-old'>300</h5>
                                                        <h1 className='text-danger price-tag'>100</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-block px-4 d-sm-none text-dark'>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                <h5 className='price-tag price-old'>300</h5>
                                                <h1 className='text-danger price-tag'>100</h1>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                            <Carousel.Item >
                                <Row className='mb-5 gy-2'>
                                    <Col className='col-12 col-md-6'>
                                        <div className='bg-secondary-subtle mb-5 h-100 rounded-3 shadow d-flex flex-column align-items-center'>
                                            <div className='d-flex flex-row align-items-center'>
                                                <div className='d-flex justify-content-start'><img style={{width: "min(15rem,50vw)"}} src={require("../img/phone.png")} alt="" /></div>
                                                <div className='h-100 py-4 text-dark'>
                                                    <h2>Phone 20XX</h2>
                                                    <div className='d-none d-sm-block'>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                        <h5 className='price-tag price-old'>300</h5>
                                                        <h1 className='text-danger price-tag'>100</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-block px-4 d-sm-none text-dark'>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                <h5 className='price-tag price-old'>300</h5>
                                                <h1 className='text-danger price-tag'>100</h1>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='col-12 col-md-6'>
                                        <div className='bg-secondary-subtle mb-5 h-100 rounded-3 shadow d-flex flex-column align-items-center'>
                                            <div className='d-flex flex-row align-items-center'>
                                                <div className='d-flex justify-content-start'><img style={{width: "min(15rem,50vw)"}} src={require("../img/phone.png")} alt="" /></div>
                                                <div className='h-100 py-4 text-dark'>
                                                    <h2>Phone 20XX</h2>
                                                    <div className='d-none d-sm-block'>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                        <h5 className='price-tag price-old'>300</h5>
                                                        <h1 className='text-danger price-tag'>100</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-block px-4 d-sm-none text-dark'>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                <h5 className='price-tag price-old'>300</h5>
                                                <h1 className='text-danger price-tag'>100</h1>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                            <Carousel.Item >
                                <Row className='mb-5 gy-2'>
                                    <Col className='col-12 col-md-6'>
                                        <div className='bg-secondary-subtle mb-5 h-100 rounded-3 shadow d-flex flex-column align-items-center'>
                                            <div className='d-flex flex-row align-items-center'>
                                                <div className='d-flex justify-content-start'><img style={{width: "min(15rem,50vw)"}} src={require("../img/phone.png")} alt="" /></div>
                                                <div className='h-100 py-4 text-dark'>
                                                    <h2>Phone 20XX</h2>
                                                    <div className='d-none d-sm-block'>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                        <h5 className='price-tag price-old'>300</h5>
                                                        <h1 className='text-danger price-tag'>100</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-block px-4 d-sm-none text-dark'>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                <h5 className='price-tag price-old'>300</h5>
                                                <h1 className='text-danger price-tag'>100</h1>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className='col-12 col-md-6'>
                                        <div className='bg-secondary-subtle mb-5 h-100 rounded-3 shadow d-flex flex-column align-items-center'>
                                            <div className='d-flex flex-row align-items-center'>
                                                <div className='d-flex justify-content-start'><img style={{width: "min(15rem,50vw)"}} src={require("../img/phone.png")} alt="" /></div>
                                                <div className='h-100 py-4 text-dark'>
                                                    <h2>Phone 20XX</h2>
                                                    <div className='d-none d-sm-block'>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                        <h5 className='price-tag price-old'>300</h5>
                                                        <h1 className='text-danger price-tag'>100</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-block px-4 d-sm-none text-dark'>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt commodi ipsam.</p>
                                                <h5 className='price-tag price-old'>300</h5>
                                                <h1 className='text-danger price-tag'>100</h1>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        </Carousel>
                    </Container>
                </div>
            </section>

            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top Selling</div></div>
                <div className='h-100 d-flex align-items-center flex-column py-5 gap-3'>
                    <h3 className='text-start w-100 ps-5 pb-2'>Phones</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Laptops</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                    

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Tablets</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                    
                    

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Desktops</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                        
                    
                </div>
            </section>
            

            <section className='bg-secondary d-flex flex-column text-white'>
                <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Featured</div></div>
                <Container className='d-flex flex-column align-items-center py-5 px-4 h-100 gap-5'>
                    <Row className='gy-4'>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"1"} col={4} /></Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"1"} col={4} /></Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"1"} col={4} /></Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                    </Row>
                    <hr className='bg-dark w-100' />
                    <Row className='gy-4'>
                        <Col className='col-12 col-sm-6 col-md-6 col-lg-3 order-1 order-lg-0'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"2"} col={4} /></Col>
                                <Col className="col-sm-6 col-md-4 col-lg-2 order-1 order-lg-0"><ProductCard productId={"2"} col={4} /></Col>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-4 ps-5">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top Brands</div></div>
                <div className='h-100 d-flex align-items-center flex-column py-5 gap-3'>
                    <h3 className='text-start w-100 ps-5 pb-2'>Brand 1</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Brand 2</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                    

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Brand 3</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                    
                    

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Brand 4</h3>
                    <ProductCarousel className={"light"} />
                    <div className='text-center text-sm-start w-100 p-0 px-sm-5'>
                        <Link className='m-0 ms-sm-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                        
                    
                </div>
            </section>
        </div>
    );
}


export default ShopExplore;