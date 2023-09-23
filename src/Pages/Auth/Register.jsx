import React, { useEffect, useState } from 'react';
import { Button, Carousel, Container, FloatingLabel, Form } from 'react-bootstrap';
import { BsBack, BsBackspace } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, loginUser, registerUser } from '../../Store/Auth/auth';



const schemas = [
    yup.object({

    email: yup.string().email("Email must be valid...").required("Please enter your email..."),
    password: yup.string().required("Please enter a password..."),
    confirmPassword: yup.string().required("Please confirm your password..."),

  }).required(),
  yup.object({

    firstName: yup.string().required("Please enter your First name..."),
    lastName: yup.string().required("Please enter your Last name..."),
    username: yup.string(),
    phone: yup.string().required("Please enter your Phone number..."),
    dateOfBirth: yup.date().typeError("Please enter valid date").required("Please enter your date of birth"),
    
  }).required(),
  yup.object({

    city: yup.string(),
    address: yup.string(),
    street: yup.string(),
    zipcode: yup.string(),
    creditCardNo: yup.string()
    
  }).required(),

]


function Register({}) {

    const navigate = useNavigate();
    const location = useLocation();
    const prevPath = location.state ? location.state.prevPath : "/";

    const dispatch = useDispatch();
    const users = useSelector((store) => store.auth.users);
    const [validationError,setValidationError] = useState("");

    const [staffKey,setStaffKey] = useState("")
    
    const [registerStage,setRegisterStage] = useState(0);
    const [userData,setUserData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        dateOfBirth: 0,
        city: "",
        address: "",
        zipcode: "",
        creditCardNo: ""
    });
    
    const { register: registerBasic, handleSubmit: handleSubmitBasic, reset: resetBasic, formState: { errors: errorsBasic } } = useForm({ resolver: yupResolver(schemas[0]) });
    const { register: registerGeneral, handleSubmit: handleSubmitGeneral, reset: resetGeneral, formState: { errors: errorsGeneral } } = useForm({ resolver: yupResolver(schemas[1]) });
    const { register: registerExtra, handleSubmit: handleSubmitExtra, reset: resetExtra, formState: { errors: errorsExtra } } = useForm({ resolver: yupResolver(schemas[2]) });

    function onSubmit(data)
    {
        let updatedUserData = {...userData,...data};
        setUserData(updatedUserData);
        if(registerStage===0)
        {
            if(users.map((user) => user.email).includes(data.email))
            {
                handleValidationError("Email already registered...");
                return;
            }
            else
            {
                if(data.password!==data.confirmPassword)
                {
        
                    handleValidationError("Password mismatch...");
                    return;
                }
                else
                {
                    if(staffKey && staffKey!=="adminKey123")
                    {
                        handleValidationError("Invalid Staff key... Please enter a correct key or clear to proceed.");
                    }
                    else
                    {
                        handleValidationError("");
                        setRegisterStage(registerStage+1);
                    }   
                }
                      

            }
        }
        else if(registerStage===1)
        {
            if(data.username && users.map((user) => user.username).includes(data.username))
            {
                handleValidationError("Username already in use...");
                return;
            }
            else
            {               
                handleValidationError("");
                setRegisterStage(registerStage+1);

            }
        }
        else if(registerStage===2)
        {
            let newUser = {...updatedUserData,cart:[],favorites:[], role: staffKey ? "admin" : "client"};
            delete newUser.confirmPassword;
            newUser.dateOfBirth = newUser.dateOfBirth.toISOString().split('T')[0];
            dispatch(registerUser(newUser));
            navigate(prevPath);
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
        <div className='bg-light-gradient page-container d-flex align-items-start align-items-sm-center justify-content-center py-3'>
            <div className="d-flex flex-column align-items-start">
                <div className='p-3 shadow border bg-light rounded-sm-2 auth-form-container'>

                    <div className='d-flex justify-content-between w-100 mb-2' >
                        <h2 className='text-center mb-4 p-0 m-0'>Register</h2>
                        <div className='d-flex align-items-start gap-1 m-0' style={{width:"min(11.4rem,45vw)"}}>
                            <img style={{width:"30%"}} src={require("../../img/logo.png")} alt="" />
                            <img style={{width:"70%"}} src={require("../../img/logo-text.png")} alt="" />
                        </div>
                    </div>


                    <div className="d-flex justify-content-center w-100 mb-5">
                        <div className='d-flex'>
                            <div className={`register-stage-label position-relative d-flex align-items-center ${registerStage >= 0 ? "active" : ""}`}>
                                <div className={`d-flex shadow-sm p-3 fs-3 aspect-1 rounded-circle justify-content-center align-items-center`}>
                                    1
                                    <span className='position-absolute'>Account</span>
                                </div>
                            </div>
                            <div className={`register-stage-label position-relative d-flex align-items-center ${registerStage >= 1 ? "active" : ""}`}>
                                <div className={`d-flex shadow-sm p-3 fs-3 aspect-1 rounded-circle justify-content-center align-items-center`}>
                                    2
                                    <span className='position-absolute'>General</span>
                                </div>
                            </div>
                            <div className={`register-stage-label position-relative d-flex align-items-center ${registerStage >= 2 ? "active" : ""}`}>
                                <div className={`d-flex shadow-sm p-3 fs-3 aspect-1 rounded-circle justify-content-center align-items-center`}>
                                    3
                                    <span className='position-absolute'>Extra</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Carousel className='w-100' controls={false} indicators={false} activeIndex={registerStage}>
                        <Carousel.Item>
                            <form id='register-form-1' onSubmit={handleSubmitBasic(onSubmit)} className="d-flex flex-column gap-3 p-1">
                                <h6>Basic Account</h6>
                                <FloatingLabel className='form-required' controlId="floatingEmail" label="Email">
                                    <Form.Control type="email" placeholder="Email" {...registerBasic("email")} />
                                    {errorsBasic.email ? <div className='error-message text-danger mt-2'>{errorsBasic.email.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel className='form-required' controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" {...registerBasic("password")} />
                                    {errorsBasic.password ? <div className='error-message text-danger mt-2'>{errorsBasic.password.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel className='form-required' controlId="floatingconfirmPassword" label="Confirm Password">
                                    <Form.Control type="password" placeholder="Confirm Password" {...registerBasic("confirmPassword")} />
                                    {errorsBasic.confirmPassword ? <div className='error-message text-danger mt-2'>{errorsBasic.confirmPassword.message}</div> : ''}
                                </FloatingLabel>

                                <div>
                                    <h6 className='text-secondary' style={{opacity:"0.5"}}>Working with us?</h6>
                                    <FloatingLabel controlId="" label="Enter a valid Staff Key">
                                        <Form.Control type="text" placeholder='Enter a valid Staff Key' value={staffKey} onChange={(e)=>{setStaffKey(e.target.value)}} />
                                    </FloatingLabel>
                                </div>
                            </form>
                        </Carousel.Item>

                        <Carousel.Item>
                            <form id='register-form-2' onSubmit={handleSubmitGeneral(onSubmit)} className="d-flex flex-column gap-3 p-1">
                                <h6>General Info</h6>  
                                <div className="d-flex w-100 gap-3">
                                    <FloatingLabel className='w-50 form-required' controlId="floatingFirstName" label="First Name">
                                        <Form.Control type="text" placeholder="First Name" {...registerGeneral("firstName")} />
                                        {errorsGeneral.firstName ? <div className='error-message text-danger mt-2'>{errorsGeneral.firstName.message}</div> : ''}
                                    </FloatingLabel>

                                    <FloatingLabel className='w-50 form-required' controlId="floatingLastName" label="Last Name">
                                        <Form.Control type="text" placeholder="Last Name" {...registerGeneral("lastName")} />
                                        {errorsGeneral.lastName ? <div className='error-message text-danger mt-2'>{errorsGeneral.lastName.message}</div> : ''}
                                    </FloatingLabel>
                                </div>
                                
                                <FloatingLabel controlId="floatingUsername" label="Username">
                                    <Form.Control type="text" placeholder="Username" {...registerGeneral("username")} />
                                    {errorsGeneral.username ? <div className='error-message text-danger mt-2'>{errorsGeneral.username.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel className='form-required' controlId="floatingPhoneNumber" label="Phone Number">
                                    <Form.Control type="text" placeholder="Phone Number" {...registerGeneral("phone")} />
                                    {errorsGeneral.phone ? <div className='error-message text-danger mt-2'>{errorsGeneral.phone.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel className='form-required' controlId="floatingDateOfBirth" label="Date of Birth">
                                    <Form.Control type="date" placeholder="Date of Birth" {...registerGeneral("dateOfBirth")} />
                                    {errorsGeneral.dateOfBirth ? <div className='error-message text-danger mt-2'>{errorsGeneral.dateOfBirth.message}</div> : ''}
                                </FloatingLabel>
                            </form>
                        </Carousel.Item>

                        <Carousel.Item>
                            <form id='register-form-3' onSubmit={handleSubmitExtra(onSubmit)} className="d-flex flex-column gap-3 p-1">   
                                <h6>Address and Payment</h6>
                                <div className="d-flex w-100 gap-3">  
                                    <FloatingLabel className='w-50' controlId="floatingCity" label="City">
                                        <Form.Control type="text" placeholder="City" {...registerExtra("city")} />
                                        {errorsExtra.city ? <div className='error-message text-danger mt-2'>{errorsExtra.city.message}</div> : ''}
                                    </FloatingLabel>

                                    <FloatingLabel className='w-50' controlId="floatingZipcode" label="Zipcode">
                                        <Form.Control type="text" placeholder="Zipcode" {...registerExtra("zipcode")} />
                                        {errorsExtra.zipcode ? <div className='error-message text-danger mt-2'>{errorsExtra.zipcode.message}</div> : ''}
                                    </FloatingLabel>
                                </div>
                                
                                <FloatingLabel controlId="floatingAddress" label="Address">
                                    <Form.Control type="text" placeholder="Address" {...registerExtra("address")} />
                                    {errorsExtra.address ? <div className='error-message text-danger mt-2'>{errorsExtra.address.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingStreet" label="Street">
                                    <Form.Control type="text" placeholder="Street" {...registerExtra("street")} />
                                    {errorsExtra.street ? <div className='error-message text-danger mt-2'>{errorsExtra.street.message}</div> : ''}
                                </FloatingLabel>


                                <FloatingLabel controlId="floatingCreditCardNo" label="Credit Card Number">
                                    <Form.Control type="number" placeholder="Credit Card Number" {...registerExtra("creditCardNo")} />
                                    {errorsExtra.creditCardNo ? <div className='error-message text-danger mt-2'>{errorsExtra.creditCardNo.message}</div> : ''}
                                </FloatingLabel>
                            </form>
                        </Carousel.Item>
                    </Carousel>

                    <div className='mt-4 px-1'>
                        {validationError && <div className='error-message text-danger mt-2'>{validationError}</div>}
                        {
                            registerStage > 0 &&
                            <Button className='bg-transparent border-0 text-primary p-0 pb-2' onClick={()=>{setRegisterStage(registerStage-1)}}>Back</Button>
                        }
                        <Button variant='dark' type='submit' form={`register-form-${registerStage+1}`} className='main-button border-0 w-100 mt-1 fs-5'>{registerStage < 2 ? "Next" : "Register"}</Button>
                    </div>
                    <hr className='mt-4' />
                    <div className='w-100 text-center'>
                        Have an account? <Link to={"/login"} className='text-decoration-none'>Log in</Link>
                    </div>
                </div>

                <Link to={prevPath} className='bg-light fs-5 p-2 rounded-sm-2 text-dark text-decoration-none w-100 shadow border text-center mt-3 fw-semibold'> Back</Link>

            </div>
        </div>
    );
}

export default Register;