import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Store/Cart/cartSlice';
import { getProducts } from '../Store/Products/productsSlice';
import { getCartTotalPrice, getTotalFees } from '../helpers';
import ProductCartItem from '../Components/ProductCartItem';

function CartPage({}) {

    const products = useSelector((store) => store.products.products);
    const productsInfo = useSelector((store) => store.products.productsInfo);
    const cart = useSelector((store) => store.cart.cart);
    const location = useLocation();
    
    const [fees, setFees]  = useState({subtotal:0,delivery:0,total:0});

    useEffect(()=>{
        if(products && cart && productsInfo) setFees(getTotalFees(cart,products,productsInfo));
    },[cart,products,productsInfo]);
  


    return (
        <div className='bg-light py-3 px-0 p-md-3'>
            <Container className='px-2'> <h2 className='mt-5 mb-2'>Cart</h2> </Container>
            <hr className='border-3' />
            <div className='pb-2'>
                <Row className='m-0'>
                    <Col className={`col-12 mb-4 m-md-0 ${cart.length ? "col-lg-8" : ""}`}>
                        <div className="d-flex flex-column rounded-sm-3 shadow">
                            <div className='p-1 py-2 p-sm-3 p-md-4 d-flex flex-column gap-3'>
                                <Row className='g-2 g-sm-3 g-md-4'>
                                {
                                    cart.length > 0 ? cart.map((product) =>(
                                        <Col className='col-12'>
                                            <ProductCartItem productId={product.productId} showSingle={false} />
                                        </Col>                            
                                    ))
                                    :
                                    <div className='d-flex flex-column align-items-center gap-3 p-5'>
                                        <h2>Your cart is empty.</h2>
                                        <Link to={"/shop"} className='btn btn-dark main-button fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Link>
                                    </div>
                                }
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col className={`col-12 col-lg-4 position-relative ${!cart.length ? "d-none" : ""}`}>
                        <div className="position-sticky" style={{top: "5rem"}}>
                            <div  className='shadow rounded-3 p-3'>
                                <p className='fs-5'>Subtotal Fees: <span className='price-tag'>{fees.subtotal}</span> </p>
                                <hr />
                                <p className='fs-5'>Delivery Fees: <span className='price-tag'>{fees.delivery}</span></p>
                                <hr />
                                <h3>Total Amount: <span className='price-tag fw-semibold'>{fees.total}</span></h3>
                                <Link to={"/checkout"} state={{prevPath: location.pathname}} className='fs-5 mt-4 text-white btn btn-dark main-button border-0 shadow w-100'>Checkout</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* <h2 className='my-4 bg-secondary text-white p-3 px-5 mb-3 mb-sm-2 rounded-sm-3 rounded-bottom-0 shadow d-sm-inline-block'>Cart</h2> */}
                {/* <div className="d-flex justify-content-end w-100">
                    <div className='p-4 w-xs-100 w-sm-50 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 bg-secondary rounded-sm-3 rounded-top-0 mt-3 mt-sm-2 shadow'>
                        <h2 className='text-white'><span className='text-info'>Total:</span> {totalPrice} EGP</h2>
                        <Link className='fs-3 text-white btn btn-dark shadow'>Checkout</Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default CartPage;