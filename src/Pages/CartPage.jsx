import React from 'react';
import ProductCardLong from '../Components/ProductCardLong';
import { Button, Container } from 'react-bootstrap';

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
        <div className='bg-dark p-5'>
            <Container>
                <h2 className='text-white my-4'>Cart</h2>
                <div className="bg-secondary rounded-4 d-flex flex-column">
                    <div className='p-3 d-flex flex-column gap-3'>
                    {
                        cartProducts.map((product) => 
                        <ProductCardLong product={product} />
                        )
                    }
                    </div>
                    <div className='p-4 d-flex justify-content-between'>
                        <h2 className='text-white'>Total: 1000 EGP</h2>
                        <Button className='btn-dark fs-3'>Checkout</Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartPage;