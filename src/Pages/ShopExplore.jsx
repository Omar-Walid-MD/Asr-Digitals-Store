import React, { useEffect, useState } from 'react';
import ProductSlider from '../Components/ProductSlider';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import Slider from '../Components/Slider';
import { useSelector } from 'react-redux';

function ShopExplore({}) {

    const productsInfo = useSelector((store) => store.products.productsInfo);
    const products = useSelector((store) => store.products.products);

    const [offerProducts,setOfferProducts] = useState([]);

    useEffect(()=>{
        if(!offerProducts.length && products.length)
        {
            let updatedOfferProducts = [];
            for (let i = 0; i < 6; i++)
            {
                updatedOfferProducts.push({product: products[Math.floor(Math.random()*products.length)],discount: parseInt(Math.floor(Math.random()*50)/10)*10});
            }
            setOfferProducts(updatedOfferProducts);
        }
        console.log(offerProducts);
    },[offerProducts,products])


    return (
        <div>
            <header className='bg-secondary d-flex align-items-center justify-content-center justify-content-sm-start shop-promotion-bg-img' style={{height: "500px"}}>
                <div className='shop-promotion-phone-img'>
                </div>
                <div className='p-0 m-5 w-100 d-flex flex-column gap-3 align-items-center align-items-sm-start text-white'>
                    <h1 className='text-center text-sm-start'>Chromo Prime 12T</h1>
                    <p className='fs-5 fw-semibold' style={{color: "pink"}}>Stay ahead of the curve with the Chromo Prime 12T</p>
                    <Link to={"/product/91571"} style={{borderColor: "slateblue"}} className='btn text-white bg-transparent border-4 fs-5 p-3 px-4 text-uppercase fw-semibold'>Get now!</Link>
                </div>
            </header>

            <section>
                <div className='h-100 d-flex flex-column py-5 gap-3'>
                    <h3 className='text-center text-md-start ps-md-5 mb-3'>Popular Categories</h3>
                    <Container>
                        <Row className='gy-4'>
                        {
                            productsInfo.categories && productsInfo.categories.map((category) => 
                            <Col className=''>
                                <Link to={`/shop/q?cat=${category.name}`} className='text-capitalize text-decoration-none text-dark shopping-category-link p-2 shadow d-flex flex-column align-items-center rounded-3'>
                                    <img style={{width:"10rem",filter: "drop-shadow(0 2px 5px rgb(0,20,100,0.8))"}} src={require(`../img/shop-category-${category.name}.png`)} alt="" />
                                    <span>{category.name+"s"}</span>
                                </Link>
                            </Col>
                            )
                        }    
                        </Row>         
                    </Container>
                </div>
            </section>

            <section className='bg-secondary d-flex flex-column text-white bg-img-2 page-section'>
                <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top Offers</div></div>
                <div>
                    <Container className='pt-5 p-0'>
                        <Carousel className='w-100' interval={3000} controls={false}>
                            {
                                     offerProducts.map((product,index) => 

                                    (index%2===0 && index+1<offerProducts.length) &&
                                    <Carousel.Item >
                                        <Row className='mb-5 gy-2'>
                                            <Col className='col-12 col-md-6'>
                                                <div className='p-3 rounded-3 shadow d-flex flex-column align-items-center' style={{backgroundColor: "rgba(255,255,255,0.15)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3' style={{width: "min(15rem,50vw)"}} src={product.product.image} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{product.product.title}</h2>
                                                            <p>{product.product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h5 style={{opacity: "0.6"}} className='price-tag price-old'>{parseInt(product.product.price / (product.discount / 100))}</h5>
                                                                <h1 style={{color:"red"}} className='price-tag'>{product.product.price}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className='col-12 col-md-6'>
                                                <div className='p-3 rounded-3 shadow d-flex flex-column align-items-center' style={{backgroundColor: "rgba(255,255,255,0.15)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3' style={{width: "min(15rem,50vw)"}} src={offerProducts[index+1].product.image} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{offerProducts[index+1].product.title}</h2>
                                                            <p>{offerProducts[index+1].product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h5 style={{opacity: "0.6"}} className='price-tag price-old'>{parseInt(offerProducts[index+1].product.price / (offerProducts[index+1].discount / 100))}</h5>
                                                                <h1 style={{color:"red"}} className='price-tag'>{offerProducts[index+1].product.price}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Carousel.Item>
                                )
                            }
                        </Carousel>
                    </Container>
                </div>
            </section>

            <section className='bg-white d-flex flex-column position-relative'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top selling</div></div>
                <div className='h-100 d-flex align-items-center flex-column py-5 gap-3'>
                    <h3 className='text-start w-100 ps-5 pb-2'>Phones</h3>
                    <ProductSlider variant={"white"} products={products.slice(0,12)} />
                    <div className='text-center text-sm-start w-100 p-0 px-3 px-md-5'>
                        <Link className='m-0 ms-md-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Laptops</h3>
                    <ProductSlider variant={"white"} products={products.slice(0,12)} />
                    <div className='text-center text-sm-start w-100 p-0 px-3 px-md-5'>
                        <Link className='m-0 ms-md-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                    

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Tablets</h3>
                    <ProductSlider variant={"white"} products={products.slice(0,12)} />
                    <div className='text-center text-sm-start w-100 p-0 px-3 px-md-5'>
                        <Link className='m-0 ms-md-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </div>
                    
                    

                    <hr className='bg-white border-3 border-dark w-100 m-5' />
                    
                    <h3 className='text-start w-100 ps-5 pb-2'>Desktops</h3>
                    <ProductSlider variant={"white"} products={products.slice(0,12)} />
                    <div className='text-center text-sm-start w-100 p-0 px-3 px-md-5'>
                        <Link className='m-0 ms-md-5 fs-5 btn btn-dark'>More items <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
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

        </div>
    );
}


export default ShopExplore;