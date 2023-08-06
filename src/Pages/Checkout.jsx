import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Carousel, Col, Container, FloatingLabel, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import ProductCartItemOverview from '../Components/ProductCartOverViewItem';
import { BsDash } from 'react-icons/bs';


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

]

function Checkout({}) {

    const cart = useSelector((store) => store.cart.cart);

    const navigate = useNavigate();
    const location = useLocation();
    const prevPath = location.state ? location.state.prevPath : "/";

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
    
    const { register: registerGeneralForm, handleSubmit: handleSubmitGeneralForm, reset: resetGeneralForm, formState: { errors: errorsGeneralForm } } = useForm({ resolver: yupResolver(schemas[0]) });
    const { register: registerShippingForm, handleSubmit: handleSubmitShippingForm, reset: resetShippingForm, formState: { errors: errorsShippingForm } } = useForm({ resolver: yupResolver(schemas[1]) });
    const { register: registerPaymentForm, handleSubmit: handleSubmitPaymentForm, reset: resetPaymentForm, formState: { errors: errorsPaymentForm } } = useForm({ resolver: yupResolver(schemas[2]) });

    function onSubmit(data)
    {
        setPurchaseData({...purchaseData,...data});
        console.log(purchaseData)

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
            // let newUser = {...purchaseData,cart:[],favorites:[]};
            // delete newUser.confirmPassword;
            // // dispatch(registerUser(newUser));
            // navigate(prevPath);
        }
    }

    function handleValidationError(errorMessage)
    {
        setValidationError("");
        setTimeout(() => {
            setValidationError(errorMessage);
        }, 0);
    }

    return (
        <div className='page-container bg-light py-3 px-0 p-md-3'>
            <Container className='px-2'> <h2 className='mt-5 mb-2'>Checkout</h2> </Container>
            <hr className='border-3' />
            <div className='pb-2'>
                <Row className='m-0'>
                    <Col>
                        <div className='p-3 shadow border rounded-sm-2'>
                            <div className="d-flex justify-content-center w-100 mb-3">
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
                                                {errorsGeneralForm.firstName ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsGeneralForm.firstName.message}</div> : ''}
                                            </FloatingLabel>

                                            <FloatingLabel className='w-100' controlId="floatingLastName" label="Last Name">
                                                <Form.Control type="text" placeholder="Last Name" {...registerGeneralForm("lastName")} />
                                                {errorsGeneralForm.lastName ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsGeneralForm.lastName.message}</div> : ''}
                                            </FloatingLabel>
                                        </div>
                                        <FloatingLabel controlId="floatingEmail" label="Email">
                                            <Form.Control type="email" placeholder="Email" {...registerGeneralForm("email")} />
                                            {errorsGeneralForm.email ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsGeneralForm.email.message}</div> : ''}
                                        </FloatingLabel>

                                        <div className="d-flex flex-column flex-sm-row w-100 gap-3">
                                            <FloatingLabel className='w-100' controlId="floatingPhoneNumber" label="Phone Number">
                                                <Form.Control type="text" placeholder="Phone Number" {...registerGeneralForm("phone")} />
                                                {errorsGeneralForm.phone ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsGeneralForm.phone.message}</div> : ''}
                                            </FloatingLabel>

                                            <FloatingLabel className='w-100' controlId="floatingDateOfBirth" label="Date of Birth">
                                                <Form.Control type="date" placeholder="Date of Birth" {...registerGeneralForm("dateOfBirth")} />
                                                {errorsGeneralForm.dateOfBirth ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsGeneralForm.dateOfBirth.message}</div> : ''}
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
                                                {errorsShippingForm.city ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsShippingForm.city.message}</div> : ''}
                                            </FloatingLabel>

                                            <FloatingLabel className='w-100' controlId="floatingZipcode" label="Zipcode">
                                                <Form.Control type="text" placeholder="Zipcode" {...registerShippingForm("zipcode")} />
                                                {errorsShippingForm.zipcode ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsShippingForm.zipcode.message}</div> : ''}
                                            </FloatingLabel>
                                        </div>
                                        
                                        <FloatingLabel controlId="floatingAddress" label="Address">
                                            <Form.Control type="text" placeholder="Address" {...registerShippingForm("address")} />
                                            {errorsShippingForm.address ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsShippingForm.address.message}</div> : ''}
                                        </FloatingLabel>

                                        <FloatingLabel controlId="floatingStreet" label="Street">
                                            <Form.Control type="text" placeholder="Street" {...registerShippingForm("street")} />
                                            {errorsShippingForm.street ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsShippingForm.street.message}</div> : ''}
                                        </FloatingLabel>
                                    </form>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <form id='checkout-form-3' onSubmit={handleSubmitPaymentForm(onSubmit)} className="d-flex flex-column gap-3 p-1">
                                        <h6>Payment</h6>

                                        <FloatingLabel controlId="floatingCreditCardNo" label="Credt Card Number">
                                            <Form.Control type="text" placeholder="First Name" {...registerPaymentForm("creditCardNo")} />
                                            {errorsPaymentForm.creditCardNo ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsPaymentForm.creditCardNo.message}</div> : ''}
                                        </FloatingLabel>

                                        <div className="d-flex flex-column flex-sm-row w-100 gap-3">
                                            <FloatingLabel className='w-100' controlId="floatingCreditCardPin" label="Credit Card PIN">
                                                <Form.Control type="text" placeholder="Credit Card PIN" {...registerPaymentForm("creditCardPin")} />
                                                {errorsPaymentForm.creditCardPin ? <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsPaymentForm.creditCardPin.message}</div> : ''}
                                            </FloatingLabel>

                                            <div className="d-flex">
                                                <div className='w-100 bg-white d-flex align-items-center gap-2 py-2 border rounded-2 position-relative'>
                                                    <span className='position-absolute top-0 m-1 ms-3' style={{color: "rgb(160,160,160)", fontSize: "0.9rem"}}>Expiration Date</span>
                                                    <div className='position-relative'>
                                                        <input style={{width: "5rem"}} className='p-0 pt-3 ps-3 bg-transparent border-0 outline-0' type="number" placeholder="Month" {...registerPaymentForm("creditCardExp.creditCardExpMonth")} />
                                                        <span className='position-absolute fs-3' style={{color: "rgb(160,160,160)",top: "0.4rem", right: "-0.7rem"}}>-</span>
                                                    </div>
                                                    <div>
                                                        <input className='p-0 pt-3 ps-3 bg-transparent border-0 outline-0' type="number" placeholder="Year" {...registerPaymentForm("creditCardExp.creditCardExpYear")} />
                                                    </div>
                                                </div>
                                                {errorsPaymentForm.creditCardExpMonth ? 
                                                <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsPaymentForm.creditCardExpMonth.message}</div> :
                                                errorsPaymentForm.creditCardExpYear ?
                                                <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{errorsPaymentForm.creditCardExpYear.message}</div> : ''}
                                            </div>

                                            
                                        </div>
                                        

                                        
                                    </form>
                                </Carousel.Item>

                                <Carousel.Item></Carousel.Item>

                            </Carousel>

                            <div className='mt-4 px-1'>
                                {validationError && <div className='error-message text-white bg-danger rounded-pill shadow-sm ps-2 mt-2'>{validationError}</div>}
                                {
                                    checkoutStage > 0 &&
                                    <Button className='bg-transparent border-0 text-primary p-0 pb-2' onClick={()=>{setCheckoutStage(checkoutStage-1)}}>Back</Button>
                                }
                                <Button variant='dark' type='submit' form={`checkout-form-${checkoutStage+1}`} className='btn-dark w-100 mt-1 fs-5'>{checkoutStage < 3 ? "Next" : "Confirm & Checkout"}</Button>
                            </div>
                            <hr className='mt-4' />
                        </div>
                    </Col>
                    <Col className='col-12 col-md-4 mb-4 m-md-0'>
                        <div className="d-flex flex-column rounded-sm-3 shadow">
                            <div className='p-1 py-2 p-sm-3 p-md-4 d-flex flex-column gap-3'>
                                <div className="d-flex justify-content-between align-items-end">
                                    <h4 className='m-0'>Cart Overview</h4>
                                    <Link to={"/cart"} className='text-decoration-none'>Edit Cart</Link>
                                </div>
                                <hr className='m-0 mb-1' />
                                <Row className='g-2 g-sm-3 g-md-4'>
                                {
                                    cart.length > 0 ? cart.map((product) =>(
                                        <Col className='col-12'>
                                            <ProductCartItemOverview productId={product.productId} />
                                        </Col>                            
                                    ))
                                    :
                                    <div className='d-flex flex-column align-items-center gap-3 p-5'>
                                        <h2>Your cart is empty.</h2>
                                        <Button variant='dark' className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                                    </div>
                                }
                                </Row>
                            </div>
                        </div>
                    </Col>
                   
                </Row>
            </div>
        </div>
    );
}

export default Checkout;