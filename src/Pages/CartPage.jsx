import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Store/Cart/cartSlice';
import { getProducts } from '../Store/Products/productsSlice';
import { getCartTotalPrice } from '../helpers';

function CartPage({}) {

    const products = useSelector((store) => store.products.products);
    const cart = useSelector((store) => store.cart.cart);
    const dispatch = useDispatch();

    const [totalPrice, setTotalPrice]  = useState(0);


    useEffect(()=>{
        if(products && cart) setTotalPrice(getCartTotalPrice(cart,products));
    },[cart,products]);
  


    return (
        <div className='bg-light py-3 px-0 p-md-3'>
            <Container className='p-0 px-md-2'>
                <h2 className='my-4 bg-secondary text-white p-3 px-5 mb-3 mb-sm-2 rounded-sm-3 rounded-bottom-0 shadow d-sm-inline-block'>Cart</h2>
                <div className="bg-secondary d-flex flex-column shadow">
                    <div className='p-1 py-2 p-sm-3 p-md-4 d-flex flex-column gap-3'>
                        <Row className='g-2 g-sm-3 g-md-4'>
                        {
                            cart.length > 0 ? cart.map((product) =>(
                                <Col className='col-6 col-sm-4 col-lg-3'>
                                    <ProductCard productId={product.productId} showSingle={false} />
                                </Col>                            
                            ))
                            :
                            <div className='d-flex flex-column align-items-center text-white gap-3 p-5'>
                                <h2>Your cart is empty.</h2>
                                <Button variant='dark' className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                            </div>
                        }
                        </Row>
                    </div>
                </div>
                <div className="d-flex justify-content-end w-100">
                    <div className='p-4 w-xs-100 w-sm-50 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 bg-secondary rounded-sm-3 rounded-top-0 mt-3 mt-sm-2 shadow'>
                        <h2 className='text-white'><span className='text-info'>Total:</span> {totalPrice} EGP</h2>
                        <Link className='fs-3 text-white btn btn-dark shadow'>Checkout</Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartPage;