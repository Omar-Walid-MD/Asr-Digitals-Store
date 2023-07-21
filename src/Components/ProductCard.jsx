import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsPhoneFill } from "react-icons/bs";
import { BsFillCartPlusFill, BsStarFill } from "react-icons/bs";
function ProductCard({product}) {
    return (
        <Card className='h-100 overflow-hidden product-card'>
            <Card.Body className='d-flex flex-column align-items-center justify-content-between p-0'>
                <BsPhoneFill style={{fontSize: "8rem"}} className='m-3 mb-2'/>
                <div className='d-flex flex-column align-items-center gap-3 w-100'>
                    <div className="text-center">
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text className='fs-4 fw-bold text-danger'>{product.price} EGP</Card.Text>
                    </div>
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
    );
}

export default ProductCard;