import React, { useEffect, useRef, useState } from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsPlus, BsPlusCircleFill, BsX } from 'react-icons/bs';
import ProductSlider from '../Components/ProductSlider';
import { useSelector } from 'react-redux';

function Offers({}) {

    const products = useSelector((store) => store.products.products);

    const [countDown,setCountDown] = useState(0);
    const [timerInterval,setTimerInterval] = useState(0);
    const [first,setFirst] = useState(false);

    const date = new Date("1 Jan 2024");

     
    function handleCountDown()
    {
        let timeLeft = date.getTime() - Date.now();

        setCountDown(timeLeft);        
    }

    function getCounterObject()
    {
        let timeObject = {days:0,hours:0,mins:0,secs:0};
        timeObject.days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        timeObject.hours = Math.floor(countDown / (1000 * 60 * 60) % 24);
        timeObject.mins = Math.floor(countDown / (1000 * 60) % 60);
        timeObject.secs = Math.floor(countDown / (1000) % 60);
        return timeObject;
    }

    const [offerProducts,setOfferProducts] = useState([]);

    // function getProductsOfCategory(category)
    // {
    //     return products.filter((product) => product.category === category);
    // }

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


    useEffect(()=>{
        if(!first)
        {
            setFirst(true);
            handleCountDown();
            if(!timerInterval)
            {
                let i = setInterval(()=>{
                    setCountDown(x => x - 1000)
                },1000);
                setTimerInterval(i);
            }
        }
        
    },[]);

    useEffect(()=>{
        return ()=>{
            clearInterval(timerInterval);
        };
    },[timerInterval]);

    // useEffect(()=>{
    //     // handleAnimation("secs");
    // },[countDown]);
    
    // useEffect(()=>{
    //     handleAnimation("mins");
    // },[countDown.mins]);
    // useEffect(()=>{
    //     handleAnimation("secs");
    // },[countDown.secs]);
    // useEffect(()=>{
    //     handleAnimation("hours");
    // },[countDown.hours]);
    // useEffect(()=>{
    //     handleAnimation("days");
    // },[countDown.days]);

    return (
        <div>
            <section className='offers-header position-relative py-5'>
                <div className='d-flex flex-column align-items-center p-5'>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className='text-center px-0 px-sm-3 px-md-5'>Deals Like You Have Never Seen Before!</h1>
                        <h4 className='mb-4'>COMING IN:</h4>
                        <div className='offer-countdown-container d-flex gap-2 gap-sm-3 gap-md-4'>
                            <div>
                                <div className='rounded-3 shadow offer-timer-box days'>
                                    {getCounterObject().days}
                                    <span className='mb-1'>days</span>
                                </div>
                            </div>
                            <div>
                                <div className='rounded-3 shadow offer-timer-box hours'>
                                    {getCounterObject().hours}
                                    <span className='mb-1'>hours</span>
                                </div>
                            </div>
                            <div>
                                <div className='rounded-3 shadow offer-timer-box mins'>
                                    {getCounterObject().mins}
                                    <span className='mb-1'>minutes</span>
                                </div>
                            </div>
                            <div>
                                <div className='rounded-3 shadow offer-timer-box p-0'>
                                    {getCounterObject().secs}
                                    <span className='mb-1'>seconds</span>

                                </div>
                            </div>
                        </div>
                        <h5 className='mt-4 text-center text-uppercase fw-bold'>Stay Tuned for Awesome Deals!</h5>
                    </div>
                </div>
            </section>

            <section className='pt-4 offers-section-1 text-white'>
                <div className='d-flex flex-column flex-lg-row align-items-center py-5 px-4 px-lg-5'>
                    <div className='px-2 position-relative d-flex justify-content-center'>
                        <img style={{width: "min(30rem,60vw)",filter:"drop-shadow(0 10px 5px rgba(0,0,0,0.5))"}} src={require("../img/offers-laptop-1.png")} alt="" />
                        <div className='position-absolute bottom-0 overflow-hidden' style={{height:"85.5%",width:"71%"}}>
                            <h5 className='position-absolute bg-danger text-white discount-tag  d-flex justify-content-center align-items-center'>Now <span>20%</span> Off</h5>
                        </div>

                    </div>
                    <div className='text-center text-lg-start w-100'>
                        <h1>SpectraBook X1</h1>
                        <p className='text-center text-lg-start '>Immerse yourself in the world of content creation and multimedia with the SpectraBook X1, a high-performance laptop that offers a stunning display and powerful graphics capabilities.</p>
                        <div className="fw-semibold">
                            <h6 className='text-danger mb-0'>Now Only For</h6>
                            <h1 className='price-tag text-danger' style={{fontSize:"4rem"}}>1200</h1>
                        </div>
                        <Button className='d-flex align-items-center w-xs-100 justify-content-center w-lg-auto mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-3'><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                    </div>
                </div>
            </section>

            <section className='offers-section-2'>
                <div className='d-flex flex-column flex-lg-row-reverse align-items-center p-5'>
                    <div className='px-2 position-relative d-flex justify-content-center'>
                        <img style={{width: "min(30rem,60vw)",filter:"drop-shadow(0 10px 20px rgb(185, 50, 255, 0.5))"}} src={require("../img/offers-headphone-1.png")} alt="" />
                    </div>
                    <div className='text-center text-lg-start w-lg-50'>
                        <h1>SonicBlast</h1>
                        <p className='text-center text-lg-start fs-5'>The SonicBlast Pro headphones deliver an immersive audio experience with powerful bass and crystal-clear sound quality.</p>
                        <div className="fw-semibold">
                            <h6 className='text-danger mb-0'>Now Only For</h6>
                            <h1 className='price-tag text-danger' style={{fontSize:"4rem"}}>1200</h1>
                        </div>
                        <Button className='d-flex align-items-center w-xs-100 justify-content-center w-lg-auto mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-3'><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                    </div>
                </div>
            </section>

            <section className='py-5'>
                <Container>
                    <h3>Save up to 40% on these bundles!</h3>
                    
                    <div className='d-flex flex-column flex-xl-row align-items-center text-center text-xl-start py-5 gap-4'>
                        <div>
                            <h2>Buy the desktop collection</h2>
                            <h6 className='text-danger text-uppercase m-0'>For Only</h6>
                            <h1 className='text-danger price-tag' style={{fontSize:"5rem"}}>950</h1>
                            <p>Get all you need for your desktop at once and at a good price.</p>
                            <Button className='d-flex align-items-center justify-content-center w-100 mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-3'> Get Now!</Button>
                        </div>
                        <div className='d-flex flex-column flex-sm-row align-items-stretch gap-4 gap-md-5 position-relative'>
                            <div className='position-relative d-flex align-items-center justify-content-center'>
                                <div><img className='offer-bundle-img mb-5' src={require("../img/offers-bundle-1-a.png")} alt="" /></div>
                                <h4 className='position-absolute text-danger bottom-0 price-tag price-old'>400</h4>
                            </div>
                            <div className='position-relative d-flex align-items-center justify-content-center'><BsPlus className='position-absolute mb-sm-5' fontSize={"min(5rem,12vw)"}/></div>
                            <div className='position-relative d-flex align-items-center justify-content-center'>
                                <div><img className='offer-bundle-img mb-5' src={require("../img/offers-bundle-1-b.png")} alt="" /></div>
                                <h4 className='position-absolute text-danger bottom-0 price-tag price-old'>550</h4>
                            </div>
                            <div className='position-relative d-flex align-items-center justify-content-center'><BsPlus className='position-absolute mb-sm-5' fontSize={"min(5rem,12vw)"}/></div>
                            <div className='position-relative d-flex align-items-center justify-content-center'>
                                <div><img className='offer-bundle-img mb-5' src={require("../img/offers-bundle-1-c.png")} alt="" /></div>
                                <h4 className='position-absolute text-danger bottom-0 price-tag price-old'>400</h4>
                            </div>


                        </div>
                    </div>

                    <hr />

                    <div className='d-flex flex-column flex-xl-row align-items-center py-5 gap-2'>
                        <div className='text-center text-xl-start'>
                            <h2>Up your voice with the Mega Stereo Bundle</h2>
                             
                            <h6 className='text-danger text-uppercase m-0'>For Only</h6>
                            <h1 className='text-danger price-tag' style={{fontSize:"5rem"}}>600</h1>
                            <p>Get ready for your next talk or conference with a set of quality speakers and microphone.</p>
                            <Button className='d-flex w-100 align-items-center justify-content-center mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-3'> Get Now!</Button>
                        </div>
                        <div className='d-flex flex-column flex-sm-row align-items-center align-items-sm-end gap-4 position-relative'>
                            <div className='position-relative d-flex justify-content-center me-2'>
                                <img className='mb-5' src={require("../img/offers-bundle-2-a.png")} style={{width:"min(12rem,28vw"}} alt="" />
                                <img className='mb-5' src={require("../img/offers-bundle-2-a.png")} style={{width:"min(12rem,28vw"}} alt="" />
                                <h4 className='position-absolute text-danger bottom-0 price-tag price-old'>800</h4>
                            </div>
                            <div className='position-relative d-flex align-self-center align-items-center justify-content-center'><BsPlus className='position-absolute mb-sm-5' fontSize={"min(5rem,12vw)"}/></div>
                            <div className='position-relative d-flex justify-content-center'>
                                <img className='mb-5' src={require("../img/offers-bundle-2-b.png")} style={{width:"min(12rem,28vw"}} alt="" />
                                <h4 className='position-absolute text-danger bottom-0 price-tag price-old'>400</h4>
                            </div>


                        </div>
                    </div>

                    <hr />

                    <div className='d-flex flex-column flex-xl-row align-items-center py-5 gap-3 gap-xl-5'>
                        <div className='text-center text-xl-start'>
                            <h2>The More, The Merrier</h2>
                            <h6 className='text-danger text-uppercase m-0'>Exclusive Offer</h6>
                            <h1 className='text-danger' style={{fontSize:"min(3rem,10vw)"}}>FREE SMARTPHONE</h1>
                            <p>Want a gift for friends and family? Buy any 3 of the newest Smartphone Series and get the 4th for <b className='fs-5'>ABSOLUTELY FREE</b>.</p>
                            <Button className='d-flex w-100 align-items-center justify-content-center mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-3'> Get Now!</Button>
                        </div>
                        <div className='d-flex flex-column flex-sm-row align-items-center gap-xl-3 position-relative'>
                            <img src={require("../img/offers-bundle-3-a.png")} style={{width:"min(15rem,60vw)"}} alt="" />
                            <div className='position-relative d-flex justify-content-center align-items-center mt-4 m-sm-0 align-self-sm-stretch' style={{width:"3rem"}}>
                                <BsPlus className='position-absolute' fontSize={"4rem"}/>
                            </div>
                            <div className='d-flex align-items-center justify-content-center position-relative'>
                                <img className='offer-bundle-img' src={require("../img/offers-bundle-3-b.png")} style={{width:"min(15rem,60vw)"}} alt="" />
                                <div className='position-absolute bottom-0 overflow-hidden' style={{height:"82.5%",width:"56%"}}>
                                    <h5 className='position-absolute bg-danger text-white discount-tag  d-flex justify-content-center align-items-center' sty>FREE</h5>
                                </div>
                            </div>



                        </div>
                    </div>

                </Container>
            </section>

            <section className='bg-secondary d-flex flex-column text-white offers-section-4 page-section position-relative'>

                <div>
                    <Container className='pt-5 p-0'>
                        <Carousel className='w-100' interval={3000} controls={false}>
                            {
                                     offerProducts.map((product,index) => 

                                    (index%2===0 && index+1<offerProducts.length) &&
                                    <Carousel.Item>
                                        <Row className='mb-5 pb-2 gy-2'>
                                            <Col className='col-12 col-md-6 flex-grow-1'>
                                                <div className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center' style={{backgroundColor: "rgba(245, 250, 255,0.05)",backdropFilter: "blur(0.5em)"}}>
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
                                                <div className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center' style={{backgroundColor: "rgba(245, 250, 255,0.05)",backdropFilter: "blur(0.5em)"}}>
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
                    </Container>
                </div>
            </section>

            <section style={{height:"800px"}}>
                <div className="d-flex align-items-center justify-content-end h-100">
                    <div className="w-xs-100 h-100 w-md-50 bg-secondary text-white h-100 py-5  px-3">
                        <h1>Find More Awesome Offers at your nearest branch</h1>
                        <h6>Exclusive Offers are waiting for our arriving customers.</h6>
                    </div>
                </div>
            </section>

            {/* <section>
                <div className='py-5 px-3'>
                    <h1>Don't Miss Out on These Discounts!</h1>
                    <ProductSlider className={"light"} />
                </div>
            </section> */}

            {/* <section>
                <Container>
                    <Row>
                    
                    </Row>
                </Container>
            </section> */}

        </div>
    );
}
export default Offers;