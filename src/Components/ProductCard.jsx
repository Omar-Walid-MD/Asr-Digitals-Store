import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function ProductCard({product,col=3}) {
    return (
        <Col className={`col-${col}`}>
            <Card className='h-100 overflow-hidden product-card shadow'>
                <Card.Body  className=' p-0'>
                    <div className='d-flex flex-column align-items-center justify-content-between h-100 w-100'>
                        <Link className="text-center text-decoration-none text-dark pb-2" to="/product">
                            <BsPhoneFill style={{fontSize: "8rem"}} className='m-3 mb-2'/>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text className='fs-4 fw-bold text-danger'>{product.price} EGP</Card.Text>
                        </Link>
                        <div className="d-flex w-100 justify-content-between align-items-end bg-primary-subtle p-2">
                            <p className='m-0 fs-5 d-flex fw-semibold align-items-center gap-1'>5/5 <BsStarFill className='text-warning' /></p>
                            <div className="d-flex gap-2">
                                <Button className='d-flex p-2 bg-transparent text-primary border-2 fs-4 rounded-circle'><BsFillCartPlusFill /></Button>
                                <Button className='d-flex p-2 bg-transparent text-primary border-2 fs-4 rounded-circle'><BsStarFill /></Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;