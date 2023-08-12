import React, { useEffect, useRef, useState } from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { BsFillCartPlusFill } from 'react-icons/bs';
import ProductSlider from '../Components/ProductSlider';

function Offers({}) {

    const [countDown,setCountDown] = useState(0);
    const [timerInterval,setTimerInterval] = useState(0);
    const [first,setFirst] = useState(false);

    const date = new Date("1 Jan 2024");

    
    const offerCountDown = useRef();
    
    function handleCountDown()
    {
        let timeLeft = date.getTime() - Date.now();

        // let timeObject = {};

        // timeObject.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        // timeObject.hours = Math.floor(timeLeft / (1000 * 60 * 60) % 24);
        // timeObject.mins = Math.floor(timeLeft / (1000 * 60) % 60);
        // timeObject.secs = Math.floor(timeLeft / (1000) % 60);

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

    function handleAnimation(targetClass)
    {
        let el = offerCountDown.current.querySelector(`.offer-timer-box.${targetClass}`)
        el.classList.remove("animation");
        setTimeout(() => {
            el.classList.add("animation");
        }, 10);
    }

    useEffect(()=>{
        if(!first)
        {
            console.log("should happen once");
            setFirst(true);
            handleCountDown();
            if(!timerInterval)
            {
                let i = setInterval(()=>{
                    console.log("set count");
                    setCountDown(x => x - 1000)
                    // handleAnimation("secs");
                    // if(getCounterObject().secs===0) handleAnimation("mins");
                },1000);
                setTimerInterval(i);
            }
        }
        
    },[]);

    useEffect(()=>{
        return ()=>{
            console.log(timerInterval);
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
            <section className='bg-success-subtle'>
                <div className='d-flex flex-column flex-md-row align-items-center p-5'>
                    <div className='px-xl-4'>
                        <img style={{width: "min(20rem,80vw)"}} src={require("../img/phone.png")} alt="" />
                    </div>
                    <div className='d-flex flex-column align-items-center align-items-md-start'>
                        <h1 className='text-center'>UPCOMING OFFER SEASON</h1>
                        <h4 className='text-secondary mb-3'>STARTS AFTER:</h4>
                        <div className='offer-countdown-container d-flex gap-2 gap-md-4 gap-lg-5' ref={offerCountDown}>
                            <div>
                                <div className='bg-secondary rounded-3 shadow offer-timer-box days'>
                                    {getCounterObject().days-1}
                                    <div className="counter-halves top-0 w-100 h-100 position-absolute d-flex flex-column">
                                        <div className="counter-half top bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().days}</span>
                                        </div>
                                        <div className="counter-half mid bg-secondary rounded-3 position-absolute top-0 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().days-1}</span>
                                        </div>
                                        <div className="counter-half bottom bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().days}</span>
                                        </div>
                                    </div>
                                    <span className='mb-1'>days</span>
                                </div>
                            </div>
                            <div>
                                <div className='bg-secondary rounded-3 shadow offer-timer-box hours'>
                                    {getCounterObject().hours-1}
                                    <div className="counter-halves top-0 w-100 h-100 position-absolute d-flex flex-column">
                                        <div className="counter-half top bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().hours}</span>
                                        </div>
                                        <div className="counter-half mid bg-secondary rounded-3 position-absolute top-0 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().hours-1}</span>
                                        </div>
                                        <div className="counter-half bottom bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().hours}</span>
                                        </div>
                                    </div>
                                    <span className='mb-1'>hours</span>
                                </div>
                            </div>
                            <div>
                                <div className='bg-secondary rounded-3 shadow offer-timer-box mins'>
                                    {getCounterObject().mins-1}
                                    <div className="counter-halves top-0 w-100 h-100 position-absolute d-flex flex-column">
                                        <div className="counter-half top bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().mins}</span>
                                        </div>
                                        <div className="counter-half mid bg-secondary rounded-3 position-absolute top-0 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().mins-1}</span>
                                        </div>
                                        <div className="counter-half bottom bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().mins}</span>
                                        </div>
                                    </div>
                                    <span className='mb-1'>minutes</span>
                                </div>
                            </div>
                            <div>
                                <div className='bg-secondary rounded-3 shadow offer-timer-box secs'>
                                    {getCounterObject().secs}
                                    <div className="counter-halves top-0 w-100 h-100 position-absolute d-flex flex-column">
                                        <div className="counter-half top bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().secs+1===60 ? 0 : getCounterObject().secs+1}</span>
                                        </div>
                                        <div className="counter-half mid bg-secondary rounded-3 position-absolute top-0 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().secs}</span>
                                        </div>
                                        <div className="counter-half bottom bg-secondary rounded-3 h-50 d-flex justify-content-center overflow-hidden">
                                            <span>{getCounterObject().secs+1===60 ? 0 : getCounterObject().secs+1}</span>
                                        </div>
                                    </div>
                                    <span className='mb-1'>seconds</span>

                                </div>
                            </div>
                        </div>
                        <h5 className='mt-4 text-center'>Stay Tuned for Awesome Deals!</h5>
                    </div>
                </div>
            </section>

            <section>
                <div className='d-flex flex-column flex-sm-row align-items-center align-items-sm-start p-5'>
                    <div className='px-xl-4'>
                        <img style={{width: "min(20rem,60vw)"}} src={require("../img/phone.png")} alt="" />
                    </div>
                    <div className='py-4 d-flex flex-column align-items-center align-items-sm-start'>
                        <h1>Phone</h1>
                        <p className='text-center text-sm-start w-md-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, excepturi repellendus, cupiditate, iusto illum aspernatur maiores.</p>
                        <div className="d-flex gap-4 align-items-center">
                            <h5 className='price-old price-tag'>1200</h5>
                            <h1 className='price-tag text-danger'>800</h1>
                        </div>
                        <Button className='d-flex align-items-center mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-3'><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                    </div>
                </div>
            </section>

            <section>
                <div>
                    <div className='d-flex flex-column flex-sm-row align-items-center align-items-sm-start p-5'>
                        <div className='px-xl-4'>
                            <img style={{width: "min(20rem,60vw)"}} src={require("../img/phone.png")} alt="" />
                        </div>
                        <div className='py-4 d-flex flex-column align-items-center align-items-sm-start'>
                            <h1>Phone</h1>
                            <p className='text-center text-sm-start w-md-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, excepturi repellendus, cupiditate, iusto illum aspernatur maiores.</p>
                            <div className="d-flex gap-4 align-items-center">
                                <h5 className='price-old price-tag'>1200</h5>
                                <h1 className='price-tag text-danger'>800</h1>
                            </div>
                            <Button className='d-flex align-items-center mt-3 btn-primary text-white fs-3 gap-2 gap-sm-3 rounded-3 shadow border-3'><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-secondary d-flex flex-column text-white'>
                {/* <div className="w-100 bg-white-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Top Offers</div></div> */}
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

            <section>
                <div className='py-5 px-3'>
                    <h1>Don't Miss Out on These Discounts!</h1>
                    <ProductSlider className={"light"} />
                </div>
            </section>

            <section>
                <Container>
                    <Row>
                    
                    </Row>
                </Container>
            </section>

        </div>
    );
}
export default Offers;