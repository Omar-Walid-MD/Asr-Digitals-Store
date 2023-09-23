import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, loginUser, registerUser } from '../../Store/Auth/auth';


const schema = yup
  .object({
    email: yup.string().email("Email must be valid...").required("Please enter your email..."),
    password: yup.string().required("Please enter your password..."),
  })
  .required();

function Login({}) {

    const navigate = useNavigate();
    const location = useLocation();
    const prevPath = location.state ? location.state.prevPath : "/";
    const loggedIn = useSelector((store) => store.auth.loggedIn);
    if(loggedIn) navigate(prevPath || "/");
    
    const dispatch = useDispatch();
    const users = useSelector((store) => store.auth.users);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [validationError,setValidationError] = useState("");

    const [remember,setRemember] = useState(true);

    function onSubmit(data)
    {
        let targetUser = users.find((user) => user.email === data.email);
        if(targetUser && targetUser !== -1)
        {
            if(targetUser.password === data.password)
            {
                dispatch(loginUser({user: targetUser,remember}));
                navigate(prevPath);
            }
            else
            {
                handleValidationError("Password incorrect...")
            }
        }
        else
        {
            handleValidationError("Email not registered...");
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
        <div className='bg-light-gradient page-container d-flex align-items-center justify-content-center'>
            <div className="d-flex flex-column align-items-start">

                <form onSubmit={handleSubmit(onSubmit)} className='bg-light p-3 border shadow rounded-sm-2 auth-form-container'>

                    <div className='d-flex justify-content-between w-100 mb-2 gap-2' >
                        <h2 className='text-start mb-4'>Welcome Back</h2>
                        <div className='d-flex align-items-start gap-1 m-0' style={{width:"min(11.4rem,65vw)"}}>
                            <img style={{width:"30%"}} src={require("../../img/logo.png")} alt="" />
                            <img style={{width:"70%"}} src={require("../../img/logo-text.png")} alt="" />
                        </div>
                    </div>


                    <div className="d-flex flex-column gap-3">
                        <FloatingLabel controlId="floatingEmail" label="Email">
                            <Form.Control type="email" placeholder="Email" {...register("email")} />
                            {errors.email ? <div className='error-message text-danger mt-2'>{errors.email.message}</div> : ''}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" {...register("password")} />
                            {errors.password ? <div className='error-message text-danger mt-2'>{errors.password.message}</div> : ''}
                        </FloatingLabel>

                        <div className="d-flex w-100 flex-column flex-sm-row gap-2 align-items-start align-items-md-center justify-content-between">
                            <Link className='text-info text-decoration-none'>Forgot password?</Link>
                            <label htmlFor='remember-me-checkbox' className='d-flex gap-2'>
                                <input type="checkbox" name="" id="remember-me-checkbox" className='mt-1' checked={remember} onClick={(e)=>{setRemember(e.target.checked)}}/>
                                Remember me?
                            </label>
                        </div>
                    </div>
                    <div className='mt-4'>
                        {validationError && <div className='error-message text-white text-center bg-danger rounded-3 shadow-sm ps-1 mt-2'>{validationError}</div>}
                        <Button variant='dark' type='submit' className='w-100 mt-2 fs-5 main-button border-0'>Log in</Button>
                    </div>
                    <hr className='mt-4' />
                    <div className='w-100 text-center'>
                        No account? <Link to={"/register"} className='text-decoration-none'>Register now</Link>
                    </div>
                </form>
                <Link to={prevPath} className='fs-5 p-2 bg-light rounded-sm-2 text-dark text-decoration-none w-100 shadow border text-center mt-3 fw-semibold'> Back</Link>

            </div>
        </div>
    );
}

export default Login;