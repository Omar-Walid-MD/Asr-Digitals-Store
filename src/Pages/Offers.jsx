import React, { useEffect, useRef, useState } from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsPlus, BsPlusCircleFill, BsX } from 'react-icons/bs';
import ProductSlider from '../Components/ProductSlider';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { onImgError } from '../helpers';

function Offers({}) {

    const products = useSelector((store) => store.products.products);
    const offers = useSelector((store) => store.offers.offers.filter((offer)=>offer.status==="running"));


    const [countDown,setCountDown] = useState(0);
    const [timerInterval,setTimerInterval] = useState(0);
    const [first,setFirst] = useState(false);

    const date = new Date("1 Sep 2024");

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
                        <h5 className='mt-4 text-center text-uppercase fw-bold fs-4'>Stay Tuned for Awesome Deals!</h5>
                    </div>
                </div>
                <div className="position-absolute offers-header-bottom"></div>
            </section>

            <section className='pt-5 offers-section-1 text-white'>
                <div className='d-flex flex-column flex-lg-row align-items-center py-5 px-4 px-lg-5'>
                    <div className='px-2 position-relative d-flex justify-content-center'>
                        <img style={{width: "min(30rem,60vw)",filter:"drop-shadow(0 10px 5px rgba(255,255,255,0.5))"}} src={require("../img/offers/offers-laptop-1.png")}  alt="" />
                        <div className='position-absolute bottom-0 overflow-hidden discount-tag-container' style={{height:"26em",width:"22em",fontSize:"min(1em,2vw)"}} >
                            <div className="discount-tag-margin position-absolute top-0 left-0 d-flex align-items-center justify-content-center" style={{height:"7em"}}>
                                <p className='position-absolute bg-danger text-white discount-tag shadow p-0 d-flex justify-content-center align-items-center'>Now <span className=''>20%</span> Off</p>
                            </div>
                        </div>

                    </div>
                    <div className='text-center text-lg-start w-100'>
                        <h1>SpectraBook X1</h1>
                        <p className='text-center text-lg-start '>Immerse yourself in the world of content creation and multimedia with the SpectraBook X1, a high-performance laptop that offers a stunning display and powerful graphics capabilities.</p>
                        <div className="fw-semibold">
                            <h6 className='text-danger mb-0 fw-bold'>Now Only For</h6>
                            <h1 className='price-tag discount-text' style={{fontSize:"4rem"}}>3200</h1>
                        </div>
                        <div className='w-auto d-flex align-items-start'>
                            <Link to={"/product/83416"} className='btn btn-primary d-flex align-items-center w-xs-100 justify-content-center w-lg-auto mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-0 main-button'><BsFillCartPlusFill className='fs-2' /> Add to Cart</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className='offers-section-2'>
                <div className='d-flex flex-column flex-lg-row-reverse align-items-center p-5'>
                    <div className='px-2 position-relative d-flex justify-content-center'>
                        <img style={{width: "min(30rem,60vw)",filter:"drop-shadow(0 10px 20px rgb(125, 50, 255, 0.5))"}} src={require("../img/offers/offers-headphone-1.png")} alt="" />
                    </div>
                    <div className='text-center text-lg-start w-lg-50'>
                        <h1>SonicBlast Pro</h1>
                        <p className='text-center text-lg-start fs-5'>The SonicBlast Pro headphones deliver an immersive audio experience with powerful bass and crystal-clear sound quality.</p>
                        <div className="fw-semibold">
                            <h6 className='text-danger mb-0 fw-bold'>Now Only For</h6>
                            <h1 className='price-tag discount-text' style={{fontSize:"4rem"}}>350</h1>
                        </div>
                        <div className='w-auto d-flex align-items-start'>
                            <Link to={"/product/12355"} className='btn btn-primary d-flex align-items-center w-xs-100 justify-content-center w-lg-auto mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-0 main-button'><BsFillCartPlusFill className='fs-2' /> Add to Cart</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className=''>
                <div className='offers-section-3-a pt-5'>
                    <Container>
                        <h3 className='text-center'>Save up to <span className='discount-text' >40%</span> on these bundles!</h3>
                        
                        <div className='d-flex flex-column flex-xl-row align-items-center text-center text-xl-start py-5 gap-4'>
                            <div>
                                <h2>Buy the desktop collection</h2>
                                <h6 className='text-danger text-uppercase m-0'>For Only</h6>
                                <h1 className='price-tag discount-text'>950</h1>
                                <p>Get all you need for your desktop at once and at a good price.</p>
                                <Button className='d-flex align-items-center justify-content-center w-100 mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-0 main-button'> Get Now!</Button>
                            </div>
                            <div className='d-flex flex-column flex-sm-row align-items-stretch gap-5 gap-md-5 position-relative w-xs-100 w-sm-auto'>
                                <div className='position-relative d-flex align-items-center justify-content-center'>
                                    <div><img className='offer-bundle-img-width offer-bundle-img-shadow mb-5 pb-5 pb-lg-3' src={require("../img/offers/offers-bundle-1-a.png")} alt="" /></div>
                                    <div className='position-absolute bottom-0 text-center d-none d-sm-block'>
                                        <h5 className=''>TurboGrip 200</h5>
                                        <h4 className='text-danger price-tag price-old'>400</h4>
                                    </div>
                                    <div className='position-absolute bottom-0 text-center d-block d-sm-none'>
                                        <h2 className=''>TurboGrip 200</h2>
                                        <h1 className='text-danger price-tag price-old'>400</h1>
                                    </div>
                                </div>
                                <div className='position-relative d-flex align-items-center justify-content-center'><BsPlus className='offer-bundle-plus position-absolute mb-sm-5' fontSize={"min(5rem,20vw)"}/></div>
                                <div className='position-relative d-flex align-items-center justify-content-center'>
                                    <div><img className='offer-bundle-img-width offer-bundle-img-shadow mb-5 pb-5 pb-lg-3' src={require("../img/offers/offers-bundle-1-b.png")} alt="" /></div>
                                    <div className='position-absolute bottom-0 text-center d-none d-sm-block'>
                                        <h5 className=''>RapidFire Elite</h5>
                                        <h4 className='text-danger price-tag price-old'>550</h4>
                                    </div>
                                    <div className='position-absolute bottom-0 text-center d-block d-sm-none'>
                                        <h2 className=''>RapidFire Elite</h2>
                                        <h1 className='text-danger price-tag price-old'>550</h1>
                                    </div>
                                </div>
                                <div className='position-relative d-flex align-items-center justify-content-center'><BsPlus className='offer-bundle-plus position-absolute mb-sm-5' fontSize={"min(5rem,20vw)"}/></div>
                                <div className='position-relative d-flex align-items-center justify-content-center'>
                                    <div><img className='offer-bundle-img-width offer-bundle-img-shadow mb-5 pb-5 pb-lg-3' src={require("../img/offers/offers-bundle-1-c.png")} alt="" /></div>
                                    <div className='position-absolute bottom-0 text-center d-none d-sm-block'>
                                        <h5 className=''>MemoPhone Max</h5>
                                        <h4 className='text-danger price-tag price-old'>550</h4>
                                    </div>
                                    <div className='position-absolute bottom-0 text-center d-block d-sm-none'>
                                        <h2 className=''>MemoPhone Max</h2>
                                        <h1 className='text-danger price-tag price-old'>550</h1>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </Container>
                </div>
                <div className='offers-section-3-b'>
                    <Container>

                        <div className='d-flex flex-column flex-xl-row align-items-center py-5 gap-4'>
                            <div className='text-center text-xl-start'>
                                <h2>Up your voice with the Mega Stereo Bundle</h2>
                                
                                <h6 className='text-danger text-uppercase m-0'>For Only</h6>
                                <h1 className='price-tag discount-text'>2100</h1>
                                <p>Get ready for your next talk or conference with a set of quality speakers and microphone.</p>
                                <Button className='d-flex w-100 align-items-center justify-content-center mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-0 main-button'> Get Now!</Button>
                            </div>
                            <div className='d-flex flex-column flex-sm-row align-items-center align-items-sm-end gap-3 position-relative'>
                                <div className='position-relative d-flex flex-column gap-2 justify-content-center me-2'>
                                    <div className="d-flex justify-content-center">
                                        <img className='offer-bundle-img-shadow' src={require("../img/offers/offers-bundle-2-a.png")} style={{width:"min(12rem,30vw"}} alt="" />
                                        <img className='offer-bundle-img-shadow' src={require("../img/offers/offers-bundle-2-a.png")} style={{width:"min(12rem,30vw"}} alt="" />
                                    </div>
                                    <div className='text-center d-none d-sm-block'>
                                        <h5 className=''>SoundBarPro S2</h5>
                                        <h4 className='text-danger price-tag price-old'>1900</h4>
                                    </div>
                                    <div className='text-center d-block d-sm-none'>
                                        <h2 className=''>SoundBarPro S2</h2>
                                        <h1 className='text-danger price-tag price-old'>1900</h1>
                                    </div>
                                </div>
                                <div className='position-relative d-flex align-self-center align-items-center justify-content-center'><BsPlus className='offer-bundle-plus position-absolute mt-3 mt-sm-0 mb-sm-5 ms-sm-4' fontSize={"min(5rem,20vw)"}/></div>
                                <div className='position-relative d-flex flex-column justify-content-center'>
                                    <img className='offer-bundle-img-shadow' src={require("../img/offers/offers-bundle-2-b.png")} style={{width:"min(12rem,60vw)"}} alt="" />
                                    <div className='text-center d-none d-sm-block'>
                                        <h5 className=''>VocalPro M1</h5>
                                        <h4 className='text-danger price-tag price-old'>1000</h4>
                                    </div>
                                    <div className='text-center d-block d-sm-none'>
                                        <h2 className=''>VocalPro M1</h2>
                                        <h1 className='text-danger price-tag price-old'>1000</h1>
                                    </div>
                                    
                                </div>


                            </div>
                        </div>

                    </Container>
                </div>
                <div className='offers-section-3-c'>
                    <Container>

                        <div className='d-flex flex-column flex-xl-row align-items-center py-5 gap-3 gap-xl-5'>
                            <div className='text-center text-white text-xl-start'>
                                <h2>The More, The Merrier</h2>
                                <h6 className='text-danger text-uppercase m-0'>Exclusive Offer</h6>
                                <h1 className='discount-text' style={{fontSize:"min(3rem,10vw)"}}>FREE SMARTPHONE</h1>
                                <p>Want a gift for friends and family? Buy any 3 of the newest Smartphone Series and get the 4th for <b className='fs-5'>ABSOLUTELY FREE</b>.</p>
                                <Button className='d-flex w-100 align-items-center justify-content-center mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-0 main-button'> Get Now!</Button>
                            </div>
                            <div className='d-flex flex-column flex-sm-row align-items-center gap-xl-3 position-relative'>
                                <img className='' src={require("../img/offers/offers-bundle-3-a.png")} style={{width:"min(16.8rem,60vw)",filter:"drop-shadow(0 0 10px lightskyblue)"}} alt="" />
                                <div className='position-relative d-flex justify-content-center align-items-center mt-4 m-sm-0 align-self-sm-stretch' style={{width:"3rem"}}>
                                    <BsPlus className='position-absolute offer-bundle-plus ms-sm-3' fontSize={"4rem"} color='lightpink'/>
                                </div>
                                <div className='d-flex align-items-center justify-content-center position-relative'>
                                    <img className='offer-bundle-img-width' src={require("../img/offers/offers-bundle-3-b.png")} style={{width:"min(15rem,60vw)",filter:"drop-shadow(0 0 10px rebeccapurple)"}} alt="" />
                                    <div className='position-absolute bottom-0 overflow-hidden discount-tag-container' style={{height:"20.6em",width:"8.4em",fontSize:"min(1em,4vw)"}}>
                                        <div className="discount-tag-margin position-absolute top-0 left-0 d-flex align-items-center justify-content-center" style={{height:"4em"}}>
                                            <p className='position-absolute bg-danger text-white discount-tag shadow p-0 d-flex justify-content-center align-items-center' style={{height:"1.2em",fontSize:"1.2em"}}>Free</p>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>

                    </Container>
                </div>
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
                                                <Link to={`/product/${product.product.id}`} className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center text-white text-decoration-none' style={{backgroundColor: "rgba(255,255,255,0.15)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3 bg-light' style={{width: "min(15rem,50vw)"}} src={product.product.image} onError={onImgError} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{product.product.title}</h2>
                                                            <p>{product.product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h5 className='price-tag text-dark fs-5 price-old'>{product.product.price}</h5>
                                                                <h1 className='price-tag discount-text fs-1'>{product.newPrice}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                            <Col className='col-12 col-md-6 flex-grow-1'>
                                                <Link to={`/product/${offerProducts[index+1].product.id}`} className='p-3 rounded-3 h-100 shadow d-flex flex-column align-items-center text-white text-decoration-none' style={{backgroundColor: "rgba(255,255,255,0.15)",backdropFilter: "blur(0.5em)"}}>
                                                    <div className='d-flex flex-column flex-xl-row align-items-center align-items-xl-start gap-4'>
                                                        <div className='d-flex justify-content-start'><img className='border rounded-3 bg-light' style={{width: "min(15rem,50vw)"}} src={offerProducts[index+1].product.image} onError={onImgError} alt="" /></div>
                                                        <div className='d-flex flex-column align-items-center align-items-xl-start'>
                                                            <h2>{offerProducts[index+1].product.title}</h2>
                                                            <p>{offerProducts[index+1].product.desc}</p>
                                                            <div className='d-flex flex-xl-column gap-5 gap-xl-2 align-items-center align-items-xl-start justify-content-between'>
                                                                <h5 className='price-tag text-dark fs-5 price-old'>{offerProducts[index+1].product.price}</h5>
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
                    </Container>
                </div>
            </section>

            <section className='position-relative' style={{height:"500px",boxShadow:"inset 0 0 50px black"}}>
                <div className='offers-section-5 top-0 left-0 position-absolute w-xs-100 h-100'></div>
                <div className="d-flex align-items-center justify-content-end h-100">
                    <div className="w-xs-100 h-100 w-md-50 offers-section-5-content text-center py-5 px-3 ps-sm-4 d-flex flex-column-reverse flex-md-column gap-5">
                        <div>
                            <h1>Find More Awesome Offers at your Nearest Branch!</h1>
                            <h6 className='text-danger'>Exclusive Offers are waiting for our arriving customers.</h6>
                        </div>
                        <div>
                            <img style={{width:"min(20rem,80vw)",filter:"drop-shadow(2px 2px 2px rgba(0,0,0,0.8))"}} src={require("../img/offers/offers-section-5-img.png")} alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
export default Offers;