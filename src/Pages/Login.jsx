import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, loginUser, registerUser } from '../Store/Auth/auth';


const schema = yup
  .object({
    email: yup.string().email("Email must be valid...").required("Please enter your email..."),
    password: yup.string().required("Please enter your password..."),
  })
  .required();

function Login({}) {

    const navigate = useNavigate();
    const location = useLocation();
    const {prevPath} = location.state || null;

    const dispatch = useDispatch();
    const users = useSelector((store) => store.auth.users);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [validationError,setValidationError] = useState("");

    function onSubmit(data)
    {
        let targetUser = users.find((user) => user.email === data.email);
        console.log(users);
        if(targetUser && targetUser !== -1)
        {
            if(targetUser.password === data.password)
            {
                dispatch(loginUser(targetUser));
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
        // if(users.map((user) => user.email).includes(data.email))
        // {
        //     handleValidationError("Email already registered...");
        // }
        // else
        // {
        // }
    }

    function handleValidationError(errorMessage)
    {
        setValidationError("");
        setTimeout(() => {
            setValidationError(errorMessage);
        }, 0);
    }


    useEffect(()=>{
        dispatch(getUsers());
    },[]);


    return (
        <div className='bg-secondary-subtle user-page-container d-flex align-items-center justify-content-center'>
            <div className="d-flex flex-column align-items-start">
                <h3 className='bg-secondary text-white p-2 px-4 rounded-3 rounded-bottom-0 shadow d-inline-block'>Log in</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-secondary p-3 shadow rounded-top-left-0' style={{width: "40rem"}}>
                    <div className="d-flex flex-column gap-3">
                        <FloatingLabel controlId="floatingEmail" label="Email">
                            <Form.Control type="email" placeholder="Email" {...register("email")} />
                            {errors.email ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.email.message}</div> : ''}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" {...register("password")} />
                            {errors.password ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.password.message}</div> : ''}
                        </FloatingLabel>

                        <div className="d-flex w-100 align-items-center justify-content-between fs-5">
                            <Link className='text-info text-decoration-none'>Forgot password?</Link>
                            <label htmlFor='remember-me-checkbox' className='text-white d-flex gap-2'>
                                <input type="checkbox" name="" id="remember-me-checkbox" className='mt-1'/>
                                Remember me?
                            </label>
                        </div>
                    </div>
                    <div className='mt-4'>
                        {validationError && <div className='error-message text-white text-center bg-danger rounded-3 shadow-sm ps-1 mt-2'>{validationError}</div>}
                        <Button type='submit' className='btn-dark w-100 mt-2 fs-4'>Log in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;