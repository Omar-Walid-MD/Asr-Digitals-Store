import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsFillCartPlusFill, BsFillCartDashFill, BsStarFill, BsPhoneFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function ProductCardLong({product}) {
    return (
        <Card className='h-100 overflow-hidden product-card'>
            <Card.Body  className=' p-0'>
                <div className='d-flex align-items-center justify-content-between h-100 w-100'>
                    <Link className="d-flex text-center text-decoration-none text-dark p-3" to="/product">
                        <BsPhoneFill style={{fontSize: "10rem"}} className=''/>
                        <div className="d-flex flex-column align-items-start w-50">
                            <Card.Title className='fs-3'>{product.title}</Card.Title>
                            <Card.Text className='text-start'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, quaerat neque? Atque error odit dolorem ipsa ea voluptatem molestiae sequi eveniet. Quos rem amet minima atque molestias sed ratione obcaecati.
                            </Card.Text>
                        </div>
                        <div className='d-flex align-items-center gap-4'>
                            <Card.Text className='fs-1 fw-bold text-danger ms-5 mb-2'>{product.price} EGP</Card.Text>
                            <span className='badge bg-primary fs-6'>×11</span>
                        </div>
                    </Link>
                    <Button className='d-flex m-3 p-2 bg-transparent text-primary border-2 fs-1 rounded-3 position-absolute bottom-0 right-0'><BsFillCartDashFill /></Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCardLong;