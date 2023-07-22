import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

function Register({}) {
    return (
        <div className='bg-dark user-page-container d-flex align-items-center justify-content-center'>
            <form className='bg-secondary p-3 rounded-3' style={{width: "40rem"}}>
                <h2 className='mb-4 text-white'>Register</h2>
                <div className="d-flex flex-column gap-3">

                    <FloatingLabel controlId="floatingUsername" label="Username">
                        <Form.Control type="text" placeholder="Username" />
                    </FloatingLabel>
                    
                    <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control type="email" placeholder="Email" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingconfirmPassword" label="Confirm Password">
                        <Form.Control type="confirmpassword" placeholder="ConfirmP assword" />
                    </FloatingLabel>
                </div>
                <Button className='btn-dark w-100 mt-5'>Register</Button>
            </form>
        </div>
    );
}

export default Register;