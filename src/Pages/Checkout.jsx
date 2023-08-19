import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Carousel, Col, Container, FloatingLabel, Row, Accordion, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import ProductCartItemOverview from '../Components/ProductCartOverViewItem';
import ReCAPTCHA from 'react-google-recaptcha';
import { addPurchase } from '../Store/Purchases/purchasesSlice';
import { getTotalFees } from '../helpers';
import { emptyCart } from '../Store/Cart/cartSlice';

const schemas = [
    yup.object({
    
      firstName: yup.string().required("Please enter your First name..."),
      lastName: yup.string().required("Please enter your Last name..."),
      email: yup.string().email("Email must be valid...").required("Please enter your email..."),
      phone: yup.string().required("Please enter your Phone number..."),
      dateOfBirth: yup.date().typeError('Please enter a valid Date').required("Please enter your date of birth"),
      
    }).required(),
    yup.object({

        city: yup.string().required("Please enter your city..."),
        address: yup.string().required("Please enter your address..."),
        street: yup.string().required("Please enter your street..."),
        zipcode: yup.string().required("Please enter your zipcode..."),

  }).required(),
  yup.object({

    creditCardNo: yup.number().typeError('Please enter a valid Credit Card Number').required("Please enter Credit Card Number..."),
    creditCardPin: yup.number("Please enter Credit Card Number...").typeError('Please enter a valid Credit Card PIN').required("Please enter Credit Card PIN..."),
    creditCardExp: yup.object({
        creditCardExpMonth: yup.number().typeError('Please enter a valid Month Number').min(1).max(12).required("Please enter Credit Card Expiration Month..."),
        creditCardExpYear: yup.number().typeError('Please enter a valid Year Number').min(23).max(30).required("Please enter Credit Card Expiration Year...")
    }).required()
    
  }).required(),
];

function Checkout({}) {

    const cart = useSelector((store) => store.cart.cart);
    const products = useSelector((store) => store.products.products);
    const productsInfo = useSelector((store) => store.products.productsInfo);
    const offers = useSelector((store) => store.offers.offers);

    const currentUser = useSelector((store) => store.auth.currentUser);
    const purchaseLoading = useSelector((store) => store.purchases.loading);
    const purchaseSuccess = useSelector((store) => store.purchases.purchaseSuccess);

    const navigate = useNavigate();
    const location = useLocation();
    const prevPath = location.state ? location.state.prevPath : "/";
    const dispatch = useDispatch();

    if(cart && !cart.length) navigate("/cart");


    const captchaRef = useRef();

    const [fees, setFees]  = useState({subtotal:0,delivery:0,total:0});
    const [validationError,setValidationError] = useState("");
    const [checkoutStage,setCheckoutStage] = useState(0);
    const [purchaseData,setPurchaseData] = useState({
        
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: 0,

        city: "",
        address: "",
        street: "",
        zipcode: "",

        creditCardNo: 0,
        creditCardPin: 0,
        creditCardExp: {creditCardExpMonth: 0, creditCardExpYear: 0}
    });
    const [password,setPassword] = useState("");
    const [purchaseState,setPurchaseState] = useState("");

    const { register: registerGeneralForm, handleSubmit: handleSubmitGeneralForm, reset: resetGeneralForm, formState: { errors: errorsGeneralForm }, setValue: setGeneralFormValue } = useForm({ resolver: yupResolver(schemas[0]) });
    const { register: registerShippingForm, handleSubmit: handleSubmitShippingForm, reset: resetShippingForm, formState: { errors: errorsShippingForm }, setValue: setShippingFormValue } = useForm({ resolver: yupResolver(schemas[1]) });
    const { register: registerPaymentForm, handleSubmit: handleSubmitPaymentForm, reset: resetPaymentForm, formState: { errors: errorsPaymentForm }, setValue: setPaymentFormValue } = useForm({ resolver: yupResolver(schemas[2]) });

    function onSubmit(data)
    {
        setPurchaseData({...purchaseData,...data});

        if(checkoutStage===0)
        {
            handleValidationError("");
            setCheckoutStage(checkoutStage+1);
        }
        else if(checkoutStage===1)
        {
            handleValidationError("");
            setCheckoutStage(checkoutStage+1);
        }
        else if(checkoutStage===2)
        {
            setCheckoutStage(checkoutStage+1);
        }
    }

    function onCheckoutSubmit(e)
    {
        e.preventDefault();
        const token = captchaRef.current.getValue();
        if(checkoutStage===3)
        {
            if(password!==currentUser.password)
            {
                handleValidationError("password");
            }
            else 
            {
                if(!token && false)
                {
                    handleValidationError("ReCAPTCHA");
                }
                else
                {
                    
                    let newPurchase = {
                        total: fees.total,
                        subtotal: fees.subtotal,
                        deliveryFees: fees.delivery,
                        order: cart.map((cartItem) => ({
                            itemId: cartItem.productId,
                            count: cartItem.count,
                            price: (()=>{
                                let availableOffer = offers.find((offer) => offer.productId===cartItem.productId);
                                return availableOffer ? availableOffer.newPrice : products.find((product)=>product.id===cartItem.productId).price;
                            })()
                        })),
                        orderCount: cart.reduce((t,item)=>{return t + item.count},0),
                        details: {...purchaseData,dateOfBirth: purchaseData.dateOfBirth.toISOString().split('T')[0]},
                        estimatedDeliveryHours: 2+Math.floor(Math.random()*3)+parseInt(fees.total/1000),
                        status: "pending",
                        userId: currentUser ? currentUser.id : 0,
                        date: Date.now()
                    };
                    console.log(cart.reduce((t,item)=>{t+=item.count},0));
                    dispatch(addPurchase(newPurchase));
                }
            }
        }

    }

    function handleValidationError(errorMessage)
    {
        setValidationError("");
        setTimeout(() => {
            setValidationError(errorMessage);
        }, 0);
    }

    useEffect(()=>{
        if(currentUser)
        {
            const setValue = [setGeneralFormValue,setShippingFormValue,setPaymentFormValue];
            schemas.forEach((schema,index) => {
                Object.keys(schema.fields).forEach((key)=>{
                    if(currentUser[key])
                    {
                        setValue[index](key,currentUser[key]);
                    }
                });
            });
        }
    },[currentUser]);


    useEffect(()=>{
        if(products && cart && productsInfo && offers) setFees(getTotalFees(cart,products,productsInfo,offers));
    },[cart,products,productsInfo,offers]);

    useEffect(()=>{
        console.log(purchaseSuccess);
        if(purchaseSuccess) 
        {
            dispatch(emptyCart());
            setPurchaseState("loading");
            window.onbeforeunload = function() {
                return true;
            };
            setTimeout(() => {
                setPurchaseState("completed");
            }, 3000);
        }
    },[purchaseLoading]);

    useEffect(()=>{
        return ()=>{
            // setPurchaseState("loading");
            window.onbeforeunload = null;
        }
    },[]);

    return (
        <div className='page-container bg-light py-3 px-0 p-md-3'>
            {
                !purchaseState ?
                <>
                    <Container className='px-2'> <h2 className='mt-5 mb-2'>Checkout</h2> </Container>
                    <hr className='border-3' />
                    <div className='pb-2'>
                        <Row className='m-0'>
                            <Col>
                                <div className='p-3 shadow border rounded-sm-2'>
                                    <div className="d-flex justify-content-center w-100 mb-5">
                                        <div className='d-flex'>
                                            <div className={`register-stage-label position-relative d-flex align-items-center ${checkoutStage >= 0 ? "active" : ""}`}>
                                                <div className={`d-flex shadow-sm p-3 fs-3 aspect-1 rounded-circle justify-content-center align-items-center`}>
                                                    1
                                                    <span className='position-absolute'>General</span>
                                                </div>
                                            </div>
                                            <div className={`register-stage-label position-relative d-flex align-items-center ${checkoutStage >= 1 ? "active" : ""}`}>
                                                <div className={`d-flex shadow-sm p-3 fs-3 aspect-1 rounded-circle justify-content-center align-items-center`}>
                                                    2
                                                    <span className='position-absolute'>Delivery</span>
                                                </div>
                                            </div>
                                            <div className={`register-stage-label position-relative d-flex align-items-center ${checkoutStage >= 2 ? "active" : ""}`}>
                                                <div className={`d-flex shadow-sm p-3 fs-3 aspect-1 rounded-circle justify-content-center align-items-center`}>
                                                    3
                                                    <span className='position-absolute'>Payment</span>
                                                </div>
                                            </div>
                                            <div className={`register-stage-label position-relative d-flex align-items-center ${checkoutStage >= 3 ? "active" : ""}`}>
                                                <div className={`d-flex shadow-sm p-3 fs-3 aspect-1 rounded-circle justify-content-center align-items-center`}>
                                                    4
                                                    <span className='position-absolute'>Confirm</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <Carousel className='w-100' controls={false} indicators={false} activeIndex={checkoutStage}>
                                        <Carousel.Item>
                                            <form id='checkout-form-1' onSubmit={handleSubmitGeneralForm(onSubmit)} className="d-flex flex-column gap-3 p-1">
                                                <h6>General</h6>

                                                <div className="d-flex flex-column flex-sm-row w-100 gap-3">
                                                    <FloatingLabel className='w-100' controlId="floatingFirstName" label="First Name">
                                                        <Form.Control type="text" placeholder="First Name" {...registerGeneralForm("firstName")} />
                                                        {errorsGeneralForm.firstName ? <div className='error-message text-danger mt-2'>{errorsGeneralForm.firstName.message}</div> : ''}
                                                    </FloatingLabel>

                                                    <FloatingLabel className='w-100' controlId="floatingLastName" label="Last Name">
                                                        <Form.Control type="text" placeholder="Last Name" {...registerGeneralForm("lastName")} />
                                                        {errorsGeneralForm.lastName ? <div className='error-message text-danger mt-2'>{errorsGeneralForm.lastName.message}</div> : ''}
                                                    </FloatingLabel>
                                                </div>
                                                <FloatingLabel controlId="floatingEmail" label="Email">
                                                    <Form.Control type="email" placeholder="Email" {...registerGeneralForm("email")} />
                                                    {errorsGeneralForm.email ? <div className='error-message text-danger mt-2'>{errorsGeneralForm.email.message}</div> : ''}
                                                </FloatingLabel>

                                                <div className="d-flex flex-column flex-sm-row w-100 gap-3">
                                                    <FloatingLabel className='w-100' controlId="floatingPhoneNumber" label="Phone Number">
                                                        <Form.Control type="text" placeholder="Phone Number" {...registerGeneralForm("phone")} />
                                                        {errorsGeneralForm.phone ? <div className='error-message text-danger mt-2'>{errorsGeneralForm.phone.message}</div> : ''}
                                                    </FloatingLabel>

                                                    <FloatingLabel className='w-100' controlId="floatingDateOfBirth" label="Date of Birth">
                                                        <Form.Control type="date" placeholder="Date of Birth" {...registerGeneralForm("dateOfBirth")} />
                                                        {errorsGeneralForm.dateOfBirth ? <div className='error-message text-danger mt-2'>{errorsGeneralForm.dateOfBirth.message}</div> : ''}
                                                    </FloatingLabel>
                                                </div>
                                            </form>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <form id='checkout-form-2' onSubmit={handleSubmitShippingForm(onSubmit)} className="d-flex flex-column gap-3 p-1">   
                                                <h6>Delivery</h6>

                                                <div className="d-flex flex-column flex-sm-row w-100 gap-3">
                                                    <FloatingLabel className='w-100' controlId="floatingCity" label="City">
                                                        <Form.Control type="text" placeholder="City" {...registerShippingForm("city")} />
                                                        {errorsShippingForm.city ? <div className='error-message text-danger mt-2'>{errorsShippingForm.city.message}</div> : ''}
                                                    </FloatingLabel>

                                                    <FloatingLabel className='w-100' controlId="floatingZipcode" label="Zipcode">
                                                        <Form.Control type="text" placeholder="Zipcode" {...registerShippingForm("zipcode")} />
                                                        {errorsShippingForm.zipcode ? <div className='error-message text-danger mt-2'>{errorsShippingForm.zipcode.message}</div> : ''}
                                                    </FloatingLabel>
                                                </div>
                                                
                                                <FloatingLabel controlId="floatingAddress" label="Address">
                                                    <Form.Control type="text" placeholder="Address" {...registerShippingForm("address")} />
                                                    {errorsShippingForm.address ? <div className='error-message text-danger mt-2'>{errorsShippingForm.address.message}</div> : ''}
                                                </FloatingLabel>

                                                <FloatingLabel controlId="floatingStreet" label="Street">
                                                    <Form.Control type="text" placeholder="Street" {...registerShippingForm("street")} />
                                                    {errorsShippingForm.street ? <div className='error-message text-danger mt-2'>{errorsShippingForm.street.message}</div> : ''}
                                                </FloatingLabel>
                                            </form>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <form id='checkout-form-3' onSubmit={handleSubmitPaymentForm(onSubmit)} className="d-flex flex-column gap-3 p-1">
                                                <h6>Payment</h6>

                                                <FloatingLabel controlId="floatingCreditCardNo" label="Credt Card Number">
                                                    <Form.Control type="text" placeholder="First Name" {...registerPaymentForm("creditCardNo")} />
                                                    {errorsPaymentForm.creditCardNo ? <div className='error-message text-danger mt-2'>{errorsPaymentForm.creditCardNo.message}</div> : ''}
                                                </FloatingLabel>

                                                <div className="d-flex flex-column flex-sm-row w-100 gap-3">
                                                    <FloatingLabel className='w-sm-50' controlId="floatingCreditCardPin" label="Credit Card PIN">
                                                        <Form.Control type="text" placeholder="Credit Card PIN" {...registerPaymentForm("creditCardPin")} />
                                                        {errorsPaymentForm.creditCardPin ? <div className='error-message text-danger mt-2'>{errorsPaymentForm.creditCardPin.message}</div> : ''}
                                                    </FloatingLabel>


                                                    <div className="d-flex w-sm-50 gap-3">
                                                        <FloatingLabel className='w-50' controlId="floatingCreditCardExpMnth" label="Exp. Month">
                                                            <Form.Select aria-label="Default select example" {...registerPaymentForm("creditCardExp.creditCardExpMonth")}>
                                                                {/* <option></option> */}
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                            </Form.Select>
                                                            {errorsPaymentForm.creditCardExpMonth ? <div className='error-message text-danger mt-2'>{errorsPaymentForm.creditCardExpMonth.message}</div> : ''}
                                                        </FloatingLabel>

                                                        <FloatingLabel className='w-50' controlId="floatingCreditCardExpYr" label="Exp. Year">
                                                            <Form.Select aria-label="Default select example" {...registerPaymentForm("creditCardExp.creditCardExpYear")}>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                            </Form.Select>
                                                            {errorsPaymentForm.creditCardExpYear ? <div className='error-message text-danger mt-2'>{errorsPaymentForm.creditCardExpYear.message}</div> : ''}
                                                        </FloatingLabel>
                                                    </div>


                                                </div>
                                            </form>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <div>
                                                <h4 className='text-center'>Purchase Summary</h4>
                                                <div className="mt-3 p-4">
                                                    <p className='m-0'>Subtotal Fees: <strong>{fees.subtotal}</strong></p>
                                                    <hr />
                                                    <p className='m-0'>Delivery Fees: <strong>{fees.delivery}</strong></p>
                                                    <hr />
                                                    <h4>Total Amount: {fees.total}</h4>
                                                    <form id='checkout-form-4' onSubmit={onCheckoutSubmit} className="">
                                                        <FloatingLabel className='w-100 mt-5' controlId="floatingCheckoutPassword" label="Enter Password">
                                                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                                        </FloatingLabel>
                                                        {validationError==="password" && <div className='error-message text-danger mt-2'>Password Incorrect...</div>}
                                                        <ReCAPTCHA ref={captchaRef} className='mt-3' sitekey={"6LctVIsnAAAAANlWcPejAxTnDV8xLmhXFN1PulUF"} />
                                                        {validationError==="ReCAPTCHA" && <div className='error-message text-danger mt-2'>ReCAPTCHA Failed...</div>}

                                                    </form>
                                                </div>
                                            </div>
                                        </Carousel.Item>

                                    </Carousel>

                                    <div className='mt-4 px-1'>
                                        {
                                            checkoutStage > 0 &&
                                            <Button className='bg-transparent border-0 text-primary p-0 pb-2' onClick={()=>{setCheckoutStage(checkoutStage-1)}}>Back</Button>
                                        }
                                        <Button variant='dark' type='submit' form={`checkout-form-${checkoutStage+1}`} className='btn-dark main-button border-0 w-100 mt-1 fs-5'>{checkoutStage < 3 ? "Next" : "Confirm & Checkout"}</Button>
                                    </div>
                                    <hr className='mt-4' />
                                </div>
                                <Link to={prevPath} className='btn main-button border-0 mt-3'>Back To Previous Page </Link>
                            </Col>
                            <Col className='col-12 col-md-5 mb-4 m-md-0'>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0" className='border-0 shadow bg-light rounded-bottom overflow-hidden'>
                                        <Accordion.Header className='px-4 py-3 bg-white shadow-sm rounded-top'>
                                            <h4 className='m-0'>Cart Overview</h4>
                                        </Accordion.Header>
                                        <Accordion.Body className=''>
                                            {
                                                cart.length > 0 ?
                                                <>
                                                    <Link to={"/cart"} className='text-decoration-none'>Edit Cart</Link>
                                                    <hr className=''/>
                                                    <div className="d-flex flex-column">
                                                        <div className='d-flex flex-column gap-3'>
                                                            <div className='overflow-x-scroll scrollbar light'>
                                                                <div style={{width: "500px"}}>
                                                                    <Row className='mb-2'>
                                                                        <Col className="col-3">Image</Col>
                                                                        <Col className="col-3">Name</Col>
                                                                        <Col className="col-3">Price</Col>
                                                                        <Col className="col-3">Total</Col>
                                                                    </Row>
                                                                    <Row className='g-2 g-sm-3 g-md-4'>
                                                                    {
                                                                        cart.map((product) =>(
                                                                            <Col className='col-12'>
                                                                                <ProductCartItemOverview productId={product.productId} />
                                                                            </Col>                            
                                                                        ))
                                                    
                                                                    }
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <div className='d-flex flex-column align-items-center gap-3 py-4'>
                                                    <h2 className='text-center'>Your cart is empty.</h2>
                                                    <Button variant='dark' className='btn-dark main-button border-0 fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                                                </div>
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <div className="mt-3 rounded-sm-3 p-4 shadow">
                                    <p className='m-0'>Subtotal Fees: <strong>{fees.subtotal}</strong></p>
                                    <hr />
                                    <p className='m-0'>Delivery Fees: <strong>{fees.delivery}</strong></p>
                                    <hr />
                                    <h4>Total Amount: {fees.total}</h4>
                                </div>
                            </Col>
                        
                        </Row>
                    </div>
                </>
                :
                <div className='page-container d-flex flex-column gap-2 align-items-center justify-content-center'>
                {
                    purchaseState==="loading"
                    ?
                    <>
                        <Spinner className='fs-2 mb-1' />
                        <h4 className='purchase-loading-text'>Processing Purchase</h4>
                        <p>(This process might take a few moments.)</p>
                    </>
                    : purchaseState==="completed"
                    ?
                    <div className='d-flex flex-column align-items-center'>
                        <div className='loading-completed mb-5 d-flex align-items-center justify-content-center'>
                            <div className="check-container">
                                <div className="check-small rounded-pill overflow-hidden"></div>
                                <div className="check-long rounded-pill overflow-hidden"></div>
                            </div>
                        </div>
                        <h2>Purchase has been completed!</h2>
                        <div className="d-flex gap-2 p-0 w-100">
                            <Link to={prevPath} className='btn main-button border-0 mt-3 w-100'>Back To Previous Page </Link>
                            <Link to={"/purchases"} className='btn main-button border-0 btn-primary mt-3 w-100'>Track Purchase</Link>
                        </div>
                    </div>
                    : ""
                }
                </div>
            
                
            }
        </div>
    );
}

export default Checkout;