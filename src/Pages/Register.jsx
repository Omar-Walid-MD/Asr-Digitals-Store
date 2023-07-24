import React, { useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { BsBack, BsBackspace } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getUsers, registerUser } from '../Store/Auth/auth';



const schema = yup
  .object({
    firstName: yup.string().required("Please enter your First name..."),
    lastName: yup.string().required("Please enter your Last name..."),
    username: yup.string().required("Please enter a username..."),

    email: yup.string().email("Email must be valid...").required("Please enter your email..."),
    phone: yup.string().required("Please enter your Phone number..."),

    password: yup.string().required("Please enter a password..."),
    confirmPassword: yup.string().required("Please confirm your password..."),
  })
  .required();

function Register({}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();
    
    function onSubmit(data)
    {
        console.log(data);
        let newUser = {...data};
        delete newUser.confirmPassword;
        dispatch(registerUser(newUser));
    }


    useEffect(()=>{
        dispatch(getUsers());
    },[]);


    return (
        <div className='bg-secondary-subtle user-page-container d-flex align-items-center justify-content-center'>
            <div className="d-flex flex-column align-items-start">
                <h3 className='bg-secondary text-white p-2 px-4 rounded-3 rounded-bottom-0 shadow d-inline-block'>Register</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-secondary p-3 shadow rounded-top-left-0' style={{width: "40rem"}}>
                    <div className="d-flex flex-column gap-3">

                        <div className="d-flex w-100 gap-3">
                        <FloatingLabel className='w-50' controlId="floatingFirstName" label="First Name">
                            <Form.Control type="text" placeholder="First Name" {...register("firstName")} />
                            {errors.firstName ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.firstName.message}</div> : ''}
                        </FloatingLabel>

                        <FloatingLabel className='w-50' controlId="floatingLastName" label="Last Name">
                            <Form.Control type="text" placeholder="Last Name" {...register("lastName")} />
                            {errors.lastName ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.lastName.message}</div> : ''}
                        </FloatingLabel>
                        </div>
                        <FloatingLabel controlId="floatingUsername" label="Username">
                            <Form.Control type="text" placeholder="Username" {...register("username")} />
                            {errors.username ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.username.message}</div> : ''}
                        </FloatingLabel>
                        
                        <FloatingLabel controlId="floatingEmail" label="Email">
                            <Form.Control type="email" placeholder="Email" {...register("email")} />
                            {errors.email ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.email.message}</div> : ''}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number">
                            <Form.Control type="text" placeholder="Phone Number" {...register("phone")} />
                            {errors.phone ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.phone.message}</div> : ''}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" {...register("password")} />
                            {errors.password ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.password.message}</div> : ''}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingconfirmPassword" label="Confirm Password">
                            <Form.Control type="confirmpassword" placeholder="Confirm Password" {...register("confirmPassword")} />
                            {errors.confirmPassword ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.confirmPassword.message}</div> : ''}
                        </FloatingLabel>
                    </div>
                    <Button type='submit' className='btn-dark w-100 mt-4 fs-4'>Register</Button>
                </form>
                <div className="d-flex w-100 justify-content-end">
                    <div className='p-2 px-5 d-flex align-items-center justify-content-between bg-secondary rounded-3 rounded-top-0 mt-2 shadow'>
                        <Link to={"/"} className='fs-3 text-white text-decoration-none'>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;