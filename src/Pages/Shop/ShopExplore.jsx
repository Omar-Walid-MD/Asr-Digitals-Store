import React, { useEffect, useState } from 'react';
import ProductSlider from '../../Components/ProductSlider';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';
import { Link } from 'react-router-dom';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { IoCaretForwardCircle } from "react-icons/io5";
import Slider from '../../Components/Slider';
import { useSelector } from 'react-redux';


function ShopExplore({}) {

    const productsInfo = useSelector((store) => store.products.productsInfo);
    const products = useSelector((store) => store.products.products);
    const offers = useSelector((store) => store.offers.offers.filter((offer)=>offer.status==="running"));

    const [offerProducts,setOfferProducts] = useState([]);

    function getProductsOfCategory(category)
    {
        return products.filter((product) => product.category === category);
    }


    function getOfferProducts()
    {
        let updatedOfferProducts = offers.slice(0,10).map((offer) =>{

            let product = products.find((product) => product.id === offer.productId);

            return {
                product,
                newPrice: offer.newPrice
            }
        });

        if(updatedOfferProducts.length < 10)
        {
            let discounts = [10,15,20,25,30,35];
            let n = 10 - updatedOfferProducts.length;
            for (let i = 0; i < n; i++)
            {
                let product = products[Math.floor(Math.random()*products.length)];
                updatedOfferProducts.push({product ,newPrice: product.price * (100 - discounts[Math.floor(Math.random()*discounts.length)]) / 100});
            }
        }
        
        return updatedOfferProducts;
    }

    useEffect(()=>{
        if(!offerProducts.length && products.length && offers.length)
        {
            setOfferProducts(getOfferProducts());
        }
    },[offerProducts,products,offers]);


    return (
        <div>
            <header className='bg-secondary d-flex flex-column justify-content-between flex-md-row align-items-center justify-content-md-start shop-promotion-bg-img ' style={{height: "500px"}}>
                <div className='shop-promotion-phone-img order-1 order-md-0'>
                </div>
                <div className='p-5 px-2 px-sm-5 pb-3 pb-sm-0 w-100 d-flex flex-column gap-1 gap-md-3 align-items-center align-items-sm-start text-white'>
                    <div className='pt-3 text-center text-sm-start'>
                        <h1>Chromo Prime 12T</h1>
                        <p className='fs-5 fw-semibold' style={{color: "pink"}}>Stay ahead of the curve with the Chromo Prime 12T</p>
                    </div>
                    <Link to={"/product/91571"} style={{background: "linear-gradient(to right, rgba(200, 85, 195,0.5), rgba(90, 85, 220,0.8))"}} className='btn main-button text-white border-0 fs-5 p-3 px-4 text-uppercase fw-semibold'>Get now!</Link>
                </div>
            </header>

            <section className='page-section'>
                <div className='h-100 d-flex flex-column py-5 gap-3 '>
                    <h2 className='text-center ps-md-5 mb-3'>Popular Categories</h2>
                    <hr className='border-2' />
                    <Container>
                        <Row className='gy-4'>
                        {
                            productsInfo.categories && productsInfo.categories.map((category) => 
                            <Col className=''>
                                <Link to={`/shop?cat=${category.name}`} className='text-capitalize text-decoration-none text-dark shopping-category-link p-2 shadow d-flex flex-column align-items-center rounded-3'>
                                    <img style={{width:"10rem"}} src={require(`../../img/shop/shop-category-${category.name}.png`)} alt="" />
                                    <span>{category.name+"s"}</span>
                                </Link>
                            </Col>
                            )
                        }    
                        </Row>         
                    </Container>
                </div>
            </section>

            <section className='bg-secondary offers-section-4 d-flex flex-column text-white page-section position-relative'>
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
                                                <Link to={`/product/${product.product.id}`} className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center text-white text-decoration-none' style={{backgroundColor: "rgba(255,255,255,0.2)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3' style={{width: "min(15rem,50vw)"}} src={product.product.image} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{product.product.title}</h2>
                                                            <p>{product.product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h4 style={{opacity:"0.7"}} className='price-tag price-old text-dark fs-4'>{product.product.price}</h4>
                                                                <h1 className='price-tag discount-text fs-1'>{product.newPrice}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                            <Col className='col-12 col-md-6 flex-grow-1'>
                                                <Link to={`/product/${offerProducts[index+1].product.id}`} className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center text-white text-decoration-none' style={{backgroundColor: "rgba(255,255,255,0.2)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3' style={{width: "min(15rem,50vw)"}} src={offerProducts[index+1].product.image} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{offerProducts[index+1].product.title}</h2>
                                                            <p>{offerProducts[index+1].product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h4 style={{opacity:"0.7"}} className='price-tag price-old text-dark fs-4'>{offerProducts[index+1].product.price}</h4>
                                                                <h1 className='price-tag discount-text fs-1'>{offerProducts[index+1].newPrice}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Carousel.Item>
                                )
                            }
                        </Carousel>

                        <Link to={"/offers"} className='m-0 mb-4 fs-5 btn main-button bg-secondary border border-3'>More Offers <BsArrowRightCircleFill className='mb-1 ms-2'/> </Link>
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
                            <Link to={`/shop?cat=${category.name}`} className='m-0 ms-md-5 fs-5 btn main-button bg-secondary'>More items <IoCaretForwardCircle className='fs-4 mb-1 ms-2'/> </Link>
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