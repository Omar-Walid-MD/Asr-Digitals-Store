import React, { useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill, BsFillCartDashFill, BsPlus, BsDash } from "react-icons/bs";
import { Link } from 'react-router-dom';

function ProductCard({product,col=3}) {

    const [added,setAdded] = useState(false);
    const [favorite,setFavorite] = useState(false);

    return (
        <Card className='h-100 position-relative product-card shadow rounded-3'>
            <Card.Body className='p-0 overflow-hidden rounded-2'>
                <div className='d-flex flex-column align-items-center justify-content-between h-100 w-100'>
                    <Link className="text-center text-decoration-none text-dark pb-4" to="/product">
                        <BsPhoneFill style={{fontSize: "8rem"}} className='m-3 mb-2'/>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text className='fs-4 fw-bold text-danger'>{product.price} EGP</Card.Text>
                    </Link>
                    <div className="d-flex w-100 justify-content-end bg-primary-subtle p-2 position-relative">
                        <p className='m-0 ms-2 fs-6 d-flex fw-semibold align-items-center gap-1 position-absolute product-card-rating left-0 text-warning'>3.5 <BsStarFill /></p>
                        <div className="d-flex gap-1 justify-content-between">
                            {
                                added ?
                                <Button className='d-flex p-2 bg-transparent text-danger border-2 border-danger fs-4 rounded-circle' onClick={()=>{setAdded(false);}}><BsFillCartDashFill /></Button>
                                    :
                                <Button className='d-flex p-2 bg-transparent text-primary border-2 fs-4 rounded-circle' onClick={()=>{setAdded(true);}}><BsFillCartPlusFill /></Button>
                            }
                            {
                                favorite ?
                                <Button className='d-flex p-2 bg-warning border-2 border-warning fs-4 rounded-circle' onClick={()=>{setFavorite(false);}}><BsStarFill /></Button>
                                :
                                <Button className='d-flex p-2 bg-transparent text-warning border-2 border-warning fs-4 rounded-circle' onClick={()=>{setFavorite(true);}}><BsStarFill /></Button>
                            }
                        </div>
                    </div>
                </div>
            </Card.Body>
            {
                added &&
                <>
                    <span className='position-absolute badge shadow p-1 px-2 fs-5 bg-primary product-card-count'>1</span>
                    <div className='position-absolute bottom-0 d-flex gap-1 m-1 product-card-count-btn-row'>
                        <Button className='p-0 product-card-count-btn d-flex align-items-center justify-content-center'><BsPlus className='fs-5' /></Button>
                        <Button className='p-0 btn-danger product-card-count-btn d-flex align-items-center justify-content-center fs-2'><BsDash className='fs-5' /></Button>
                    </div>
                </>
            }
        </Card>
    );
}

export default ProductCard;