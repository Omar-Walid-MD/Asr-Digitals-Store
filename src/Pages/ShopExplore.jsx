import React, { useEffect, useState } from 'react';
import ProductSlider from '../Components/ProductSlider';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { IoCaretForwardCircle } from "react-icons/io5";
import Slider from '../Components/Slider';
import { useSelector } from 'react-redux';


function ShopExplore({}) {

    const productsInfo = useSelector((store) => store.products.productsInfo);
    const products = useSelector((store) => store.products.products);

    const [offerProducts,setOfferProducts] = useState([]);

    function getProductsOfCategory(category)
    {
        return products.filter((product) => product.category === category);
    }

    useEffect(()=>{
        if(!offerProducts.length && products.length)
        {
            let discounts = [10,15,20,25,30,35];
            let updatedOfferProducts = [];
            for (let i = 0; i < 6; i++)
            {
                updatedOfferProducts.push({product: products[Math.floor(Math.random()*products.length)],discount: discounts[Math.floor(Math.random()*discounts.length)]});
            }
            setOfferProducts(updatedOfferProducts);
        }
        console.log(offerProducts);
    },[offerProducts,products]);


    return (
        <div>
            <header className='bg-secondary d-flex align-items-center justify-content-center justify-content-sm-start shop-promotion-bg-img ' style={{height: "500px"}}>
                <div className='shop-promotion-phone-img'>
                </div>
                <div className='p-0 m-5 w-100 d-flex flex-column gap-3 align-items-center align-items-sm-start text-white'>
                    <h1 className='text-center text-sm-start'>Chromo Prime 12T</h1>
                    <p className='fs-5 fw-semibold' style={{color: "pink"}}>Stay ahead of the curve with the Chromo Prime 12T</p>
                    <Link to={"/product/91571"} style={{borderColor: "slateblue"}} className='btn text-white bg-transparent border-4 fs-5 p-3 px-4 text-uppercase fw-semibold'>Get now!</Link>
                </div>
            </header>

            <section className='page-section'>
                <div className='h-100 d-flex flex-column py-5 gap-3 '>
                    <h3 className='text-center text-md-start ps-md-5 mb-3'>Popular Categories</h3>
                    <Container>
                        <Row className='gy-4'>
                        {
                            productsInfo.categories && productsInfo.categories.map((category) => 
                            <Col className=''>
                                <Link to={`/shop/q?cat=${category.name}`} className='text-capitalize text-decoration-none text-dark shopping-category-link p-2 shadow d-flex flex-column align-items-center rounded-3'>
                                    <img style={{width:"10rem"}} src={require(`../img/shop-category-${category.name}.png`)} alt="" />
                                    <span>{category.name+"s"}</span>
                                </Link>
                            </Col>
                            )
                        }    
                        </Row>         
                    </Container>
                </div>
            </section>

            <section className='bg-secondary d-flex flex-column text-white bg-img-2 page-section position-relative'>
                <div className="w-100 fs-2 fw-semibold position-absolute bottom-100"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top Offers</div></div>
                <div>
                    <Container className='pt-5 p-0'>
                        <Carousel className='w-100' interval={3000} controls={false}>
                            {
                                     offerProducts.map((product,index) => 

                                    (index%2===0 && index+1<offerProducts.length) &&
                                    <Carousel.Item>
                                        <Row className='mb-5 pb-2 gy-2'>
                                            <Col className='col-12 col-md-6 flex-grow-1'>
                                                <div className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center' style={{backgroundColor: "rgba(255,255,255,0.15)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3' style={{width: "min(15rem,50vw)"}} src={product.product.image} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{product.product.title}</h2>
                                                            <p>{product.product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h5 style={{opacity: "0.6"}} className='price-tag price-old'>{parseInt(product.product.price / ((100 - product.discount) / 100)) - parseInt(product.product.price / ((100 - product.discount) / 100))%5}</h5>
                                                                <h1 style={{color:"rgb(255,60,60)"}} className='price-tag'>{product.product.price}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className='col-12 col-md-6 flex-grow-1'>
                                                <div className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center' style={{backgroundColor: "rgba(255,255,255,0.15)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3' style={{width: "min(15rem,50vw)"}} src={offerProducts[index+1].product.image} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{offerProducts[index+1].product.title}</h2>
                                                            <p>{offerProducts[index+1].product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h5 style={{opacity: "0.6"}} className='price-tag price-old'>{parseInt(offerProducts[index+1].product.price / ((100 - offerProducts[index+1].discount) / 100)) - parseInt(offerProducts[index+1].product.price / ((100 - offerProducts[index+1].discount) / 100))%5}</h5>
                                                                <h1 style={{color:"rgb(255,60,60)"}} className='price-tag'>{offerProducts[index+1].product.price}</h1>
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

                        <Link to={"/offers"} className='m-0 mb-4 fs-5 btn main-button border border-3'>More Offers <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
                    </Container>
                </div>
            </section>

            <section className='bg-light d-flex flex-column position-relative'>
                <div className="w-100 position-absolute bottom-100 fs-2 fw-semibold"><div className='section-title bg-light d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top selling</div></div>
                <div className='h-100 d-flex align-items-center flex-column py-5 gap-3'>
                {
                    productsInfo.categories && productsInfo.categories.map((category,index) => 
                    <>
                        <Container className='p-0'>
                            <h3 className='text-start w-100 text-capitalize'>{category.name+"s"}</h3>
                        </Container>
                        <ProductSlider variant={"light"} products={getProductsOfCategory(category.name).slice(0,12)} />
                        <div className='text-center text-sm-start w-100 p-0 px-3 px-md-5'>
                            <Link to={`/shop/q?cat=${category.name}`} className='m-0 ms-md-5 fs-5 btn main-button'>More items <IoCaretForwardCircle className='fs-4 mb-1 ms-2'/> </Link>
                        </div>
                        {index < productsInfo.categories.length-1 ?  <hr className='bg-white border-3 border-dark w-100 m-5' /> : ""}
                       

                    
                    </>
                    )
                }
                                        
                    
                </div>
            </section>
            

        </div>
    );
}


export default ShopExplore;