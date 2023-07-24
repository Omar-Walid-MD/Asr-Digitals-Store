import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';

function Shop({}) {

    const products = [
        {title:"My Phone with long name",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
    ];


    return (
        <div className='page-container bg-secondary-subtle p-5 pe-0'>
            
            <h2 className='bg-secondary text-white ms- p-3 px-5 rounded-3 rounded-bottom-0 shadow d-inline-block'>Shop</h2>
            <Row className='h-100 m-0'>
                <Col className='col-3 p-0 h-100 d-flex flex-column align-items-start'>
                    <div className='w-100 bg-secondary rounded-2 shadow position-sticky top-0 mb-5' style={{height: "700px"}}>

                    </div>
                </Col>
                <Col className='col-9'>
                    <Container className='p-4'>
                        <Row className='g-4 p-3 pt-1 bg- shadow rounded-3'>
                            {
                                products.map((product) =>(                                    
                                    <ProductCard product={product} />
                                ))
                            }
                            <Col className='col-12 mb-2'><Button className='btn-dark w-100 fs-4'>Load More</Button></Col>
                        </Row>

                    </Container>
                </Col>
            </Row>
        </div>
    );
}

export default Shop;