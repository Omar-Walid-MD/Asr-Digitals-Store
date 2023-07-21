import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
        <div style={{height: "1500px"}}>
            <Row className='h-100 m-0'>
                <Col className='col-4 h-100 bg-secondary d-flex'>
                    <div className='w-100 mx-4 my-5 bg-dark position-sticky top-0' style={{height: "700px"}}>

                    </div>
                </Col>
                <Col className='col-8 h-100 bg-dark'>
                    <Container className='py-5 px-4'>
                        <Row className='gy-4'>
                            {
                                products.map((product) =>(
                                    <Col className='col-3'>
                                        <ProductCard product={product} />
                                    </Col>
                                ))
                            }
                        </Row>

                    </Container>
                </Col>
            </Row>
        </div>
    );
}

export default Shop;