import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login({}) {
    return (
        <div className='bg-secondary-subtle user-page-container d-flex align-items-center justify-content-center'>
            <div className="d-flex flex-column align-items-start">
                <h3 className='bg-secondary text-white p-2 px-4 rounded-3 rounded-bottom-0 shadow d-inline-block'>Login</h3>
                <form className='bg-secondary p-3 shadow rounded-top-left-0' style={{width: "40rem"}}>
                    <div className="d-flex flex-column gap-3">
                        <FloatingLabel controlId="floatingEmail" label="Email">
                            <Form.Control type="email" placeholder="Email" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>

                        <div className="d-flex w-100 align-items-center justify-content-between fs-5">
                            <Link className='text-info text-decoration-none'>Forgot password?</Link>
                            <label htmlFor='remember-me-checkbox' className='text-white d-flex gap-2'>
                                <input type="checkbox" name="" id="remember-me-checkbox" className='mt-1'/>
                                Remember me?
                            </label>
                        </div>
                    </div>
                    <Button className='btn-dark w-100 mt-4 fs-4'>Log in</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;