import React from 'react';
import ProductCardLong from '../Components/ProductCardLong';
import { Button, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';

function CartPage({}) {

    const cartProducts = [
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100}
    ]


    return (
        <div className='bg-secondary-subtle p-5'>
            <Container>
                <h2 className='my-4 bg-secondary text-white p-3 px-5 mb-2 rounded-3 rounded-bottom-0 shadow d-inline-block'>Cart</h2>
                <div className="bg-secondary d-flex flex-column shadow">
                    <div className='p-4 d-flex flex-column gap-3'>
                    <Row className='gy-4'>
                    {
                        cartProducts.map((product) => 
                        <ProductCard product={product} col={3} />
                        )
                    }
                    </Row>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <div className='w-50 p-4 d-flex align-items-center justify-content-between bg-secondary rounded-3 rounded-top-0 mt-2 shadow'>
                        <h2 className='text-white'><span style={{color: "lightblue"}}>Total:</span> 1000 EGP</h2>
                        <Link className='fs-3 text-white btn btn-primary shadow'>Checkout</Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartPage;