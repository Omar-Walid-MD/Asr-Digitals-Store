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
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
    ];


    return (
        <div className='shop-page-container bg-secondary-subtle'>
            
            <Row className='m-0'>
                <Col className='col-12 col-md-3 d-flex flex-column align-items-start'>
                    <h2 className='bg-secondary text-white p-3 px-5 rounded-3 rounded-bottom-0 shadow d-inline-block'>Shop</h2>
                    <div className='w-100 bg-secondary rounded-2 shadow position-sticky top-0 mb-4 p-3 text-white'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, eveniet non asperiores at enim similique ipsa repellat fugit dolorem, atque odit. Consequuntur dolores nemo quod vitae officiis necessitatibus nisi tenetur.
                    </div>
                </Col>
                <Col className='col-12 col-md-9 shop-page-shopping-col'>
                    <div className='p-0 w-100'>
                        <Row className='g-4 p-3 pt-1 shadow rounded-3 w-100 m-0'>
                            {
                                products.map((product) =>(
                                    <Col className='col-6 col-sm-4 col-lg-3'>
                                        <ProductCard product={product} />
                                    </Col>                                
                                ))
                            }
                            <Col className='col-12 mb-2'><Button className='btn-dark w-100 fs-4'>Load More</Button></Col>
                        </Row>

                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Shop;