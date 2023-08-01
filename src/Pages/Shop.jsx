import React, { useEffect } from 'react';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Store/Products/productsSlice';

function Shop({}) {

    const products = useSelector((store) => store.products.products);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    },[])

    return (
        <div className='shop-page-container bg-light p-0 p-sm-5'>
            <Row className='m-0 g-0 gy-0 gx-sm-2'>
                <Col className='col-12 col-md-3 d-flex flex-column align-items-start'>
                    <h2 className='my-4 bg-secondary text-white p-3 px-5 mb-3 mb-sm-2 rounded-sm-3 rounded-bottom-0 shadow d-sm-inline w-xs-100 w-sm-auto'>Shop</h2>
                    <div className='w-100 bg-secondary rounded-sm-2 shadow position-sticky top-0 p-3 text-white'>
                        
                        <Accordion flush alwaysOpen className='w-100' defaultActiveKey={["0","1","2","3","4","5"]}>
                            <Accordion.Item className="bg-transparent" eventKey="0">
                                <Accordion.Header className='p-1'><h5 className='text-white'>Price</h5></Accordion.Header>
                                <Accordion.Body className='p-3'>
                                    <div className='w-100'>
                                        <div className="d-flex justify-content-between text-white fs-5">
                                            <p className='m-0'>Min</p>
                                            <p className='m-0'>Max</p>
                                        </div>
                                        <input className='w-100' type="range" name="" id="" />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className="bg-transparent" eventKey="1">
                                <Accordion.Header className='p-1'><h5 className='text-white'>Categories</h5></Accordion.Header>
                                <Accordion.Body className='p-1'>
                                    <Row>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>

                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className="bg-transparent" eventKey="2">
                                <Accordion.Header className='p-1'><h5 className='text-white'>Brands</h5></Accordion.Header>
                                <Accordion.Body className='p-1'>
                                    <Row>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>

                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className="bg-transparent" eventKey="3">
                                <Accordion.Header className='p-1'><h5 className='text-white'>Specs</h5></Accordion.Header>
                                <Accordion.Body className='p-1'>
                                    <Row>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>
                                        <Col className='col-6 col-md-12'><label className='d-flex align-items-center text-white gap-2 fs-5' >Name <input className='mt-2' type="checkbox" name="" id="" /></label> </Col>

                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Col>
                <Col className='col-12 col-md-9 shop-page-shopping-col'>
                    <div className='p-0 w-100'>
                        <Row className='g-1 g-sm-4 p-0 p-sm-3 pt-1 shadow rounded-3 w-100 m-0'>
                            {
                                products && products.map((product) =>(
                                    <Col className='col-6 col-sm-4 col-lg-3'>
                                        <ProductCard productObject={product} />
                                    </Col>                                
                                ))
                            }
                            <Col className='col-12 mb-2 mt-2 mt-sm-0'><Button variant='dark' className='btn-dark w-100 5'>Load More</Button></Col>
                        </Row>

                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Shop;