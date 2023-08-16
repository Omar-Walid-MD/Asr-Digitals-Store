import React from 'react';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import ProductCartItemOverview from '../Components/ProductCartOverViewItem';

function PurchaseCard({purchase, className=""}) {
    return (
        <div className={`p-3 ${className}`}>
            <p>{new Date(purchase.date).toLocaleDateString()}</p>
            <div className='d-flex flex-column flex-lg-row align-items-start justify-content-between'>
                <div>
                    <div className='d-flex gap-4 rounded-3  mb-3'>
                        <div className="d-flex flex-column align-items-start">
                            <p className='m-0'>Subtotal fees:</p>
                            <p className='m-0'>Delivery fees:</p>
                            <p className='m-0 fw-semibold'>Total fees:</p>
                        </div>
                        <div className="d-flex flex-column align-items-start">
                            <p className='m-0'>{purchase.subtotal}</p>
                            <p className='m-0'>{purchase.deliveryFees || "0"}</p>
                            <p className='m-0 fw-semibold'>{purchase.total}</p>
                        </div>
                    </div>
                    <h3>Status: {purchase.status}</h3>
                </div>
                <hr className='w-100 d-lg-none border-3'/>
                <div className='w-xs-100 w-lg-50'>
                    <Accordion alwaysOpen >
                        <Accordion.Item eventKey="0" className='border-0 bg-transparent pt-3'>
                            <Accordion.Header >
                                <div className="d-flex w-100 position-absolute">
                                    <hr className='w-100 border-2 position-absolute' />
                                </div>
                                <h6 className='m-0'>Purchase Details</h6>
                            </Accordion.Header>
                            <Accordion.Body className='px-0 pb-5'>
                                <div className="d-flex flex-column gap-2">
                                    <Row>
                                        <Col className='col-12 col-sm-3 fw-semibold'>Customer Name:</Col>
                                        <Col className='col-12 col-sm-9 purchase-detail-info'>{purchase.details.firstName} {purchase.details.lastName}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-sm-3 fw-semibold'>Date of Birth:</Col>
                                        <Col className='col-12 col-sm-9 purchase-detail-info'>{purchase.details.dateOfBirth}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-sm-3 fw-semibold'>Email:</Col>
                                        <Col className='col-12 col-sm-9 purchase-detail-info'>{purchase.details.email}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-sm-3 fw-semibold'>Phone:</Col>
                                        <Col className='col-12 col-sm-9 purchase-detail-info'>{purchase.details.phone}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-sm-3 fw-semibold'>Address:</Col>
                                        <Col className='col-12 col-sm-9 purchase-detail-info'>{purchase.details.city}, {purchase.details.address}, {purchase.details.street}, {purchase.details.zipcode}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-sm-3 fw-semibold'>Credit Card No:</Col>
                                        <Col className='col-12 col-sm-9 purchase-detail-info'>{purchase.details.creditCardNo}</Col>
                                    </Row>
                                </div>
                                    {/* <Col className='col-12'>Customer Name: {purchase.details.firstName} {purchase.details.lastName}</Col>
                                    <Col className='col-12'>Date of Birth: {purchase.details.dateOfBirth}</Col>
                                    <Col className='col-12'>Email: {purchase.details.email}</Col>
                                    <Col className='col-12'>Phone: {purchase.details.phone}</Col>
                                    <Col className='col-12'>Address: {purchase.details.city}, {purchase.details.address}, {purchase.details.street}, {purchase.details.zipcode}</Col>
                                    <Col className='col-12'>Credit Card No: {purchase.details.creditCardNo}</Col> */}
                                {/* </Row> */}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className='border-0 bg-transparent pt-3'>
                            <Accordion.Header>
                                <div className="d-flex w-100 position-absolute">
                                    <hr className='w-100 border-2 position-absolute' />
                                </div>
                                <h6 className='m-0'>Purchase Order</h6>
                            </Accordion.Header>
                            <Accordion.Body className='px-0'>
                            {
                                <div className='overflow-x-scroll scrollbar light'>
                                    <div style={{width: "500px"}}>
                                        <Row className='mb-2'>
                                            <Col className="col-3">Image</Col>
                                            <Col className="col-3">Name</Col>
                                            <Col className="col-3">Price</Col>
                                            <Col className="col-3">Total</Col>
                                        </Row>
                                        <Row className='g-2 g-sm-3 g-md-4'>
                                        {
                                            purchase.order.map((product) =>(
                                                <Col className='col-12'>
                                                    <ProductCartItemOverview productId={product.itemId} productCount={product.count} productPrice={product.price} />
                                                </Col>                            
                                            ))
                        
                                        }
                                        </Row>
                                    </div>
                                </div>
                            }


                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default PurchaseCard;