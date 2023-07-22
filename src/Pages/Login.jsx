import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

function Login({}) {
    return (
        <div className='bg-dark user-page-container d-flex align-items-center justify-content-center'>
            <form className='bg-secondary p-3 rounded-3' style={{width: "40rem"}}>
                <h2 className='mb-4 text-white'>Login</h2>
                <div className="d-flex flex-column gap-3">
                    <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control type="email" placeholder="Email" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                </div>
                <Button className='btn-dark w-100 mt-5'>Log in</Button>
            </form>
        </div>
    );
}

export default Login;