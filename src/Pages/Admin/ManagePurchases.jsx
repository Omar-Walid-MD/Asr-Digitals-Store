import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Row, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PurchaseCard from '../../Components/PurchaseCard';
import { BsFillCartCheckFill } from 'react-icons/bs';

function ManagePurchases({}) {

    // const purchases = useSelector((store) => store.auth.purchases);
    const purchases = useSelector((store) => store.purchases.purchases);

    const initialFilters = {
        purchaseId: "",
        dateBefore: "",
        dateAfter: "",
        status: "",
        subtotal: "",
        delivery: "",
        total: "",
        userId: "",
        userInfo: "",
        userAddress: "",
        orderCount: "",
    };
    const [filters,setFilters] = useState(initialFilters);
    const [filteredPurchases,setFilteredPurchases] = useState(purchases);

    function handleFilterSearch(e)
    {
        setFilters({...filters,[e.target.name]:e.target.value});
    }

    function getFilteredPurchases(purchases)
    {
        let filteredPurchases = purchases;

        
        filteredPurchases = filteredPurchases.filter((purchase) => {
            let purchaseFilterObject = {
                purchaseId:(purchase.id),
                userId: (`${purchase.userId}`),
                userInfo:(`${purchase.details.firstName} ${purchase.details.lastName} ${purchase.details.email}`),
                address: (`${purchase.details.city} ${purchase.details.address} ${purchase.details.street} ${purchase.details.zipcode}`)
            }
            let flag = Object.keys(purchaseFilterObject).every((filterKey) =>
            filters[filterKey] ? purchaseFilterObject[filterKey] && purchaseFilterObject[filterKey].toString().toLowerCase().includes(filters[filterKey].toLowerCase()) : true);                
            return flag;
        });

        filteredPurchases = filteredPurchases.filter((purchase) => {
            console.log(filters.total);
            if(filters.dateBefore && purchase.date > new Date(filters.dateBefore).getTime()) return false;
            if(filters.dateAfter && purchase.date < new Date(filters.dateAfter).getTime()) return false;
            if(filters.status && purchase.status !== filters.status) return false;
            if(filters.total && purchase.total !== +filters.total) return false;
            if(filters.subtotal && purchase.subtotal !== +filters.subtotal) return false;
            if(filters.delivery && purchase.delivery !== +filters.delivery) return false;

            return true;
        })
             
        // console.log(filteredPurchases);
        return filteredPurchases;
    }

    useEffect(()=>{
        setFilteredPurchases(getFilteredPurchases(purchases));
    },[filters, purchases]);

    return (
        <div className='py-3 px-0 p-md-3'>
            <div className="d-flex mt-4 ps-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                <BsFillCartCheckFill fontSize={"5rem"}/>
                <h2 className='mt-5 mb-2'>Manage Purchases</h2>
            </div>
            <hr className='border-3' />
            <Accordion alwaysOpen defaultActiveKey={"0"} className='w-100'>
                <Accordion.Item eventKey="0" className='border-0 bg-transparent'>
                    <Accordion.Header className='w-100 rounded-md-3 bg-secondary px-3 py-2 arrow-white'>
                        <h4 className='text-white m-0'>Filters</h4>
                    </Accordion.Header>
                    <Accordion.Body className='px-0 pt-2'>
                        <div className='d-flex bg-secondary rounded-md-3 p-3 d-flex flex-column justify-content-between align-items-start gap-2'>
                            <div className='d-flex flex-column w-100  gap-2 align-items-start'>

                            <Accordion alwaysOpen className='w-100'>

                                <Accordion.Item eventKey="0" className='border-0 bg-secondary text-white'>
                                    <Accordion.Header className='arrow-white'>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>Basic Info</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0'>
                                        <Row className='gy-2 gx-3 w-100 text-dark'>
                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Purchase ID">
                                                    <Form.Control type="text" placeholder="Purchase ID" name='purchaseId' value={filters.purchaseId} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Date Before">
                                                    <Form.Control type="date" placeholder="Date Before" name='dateBefore' value={filters.dateBefore} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Date After">
                                                    <Form.Control type="date" placeholder="Date After" name='dateAfter' value={filters.dateAfter} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Status">
                                                    <Form.Control as="select" className='text-capitalize' type="text" placeholder="Status" name='status' value={filters.status} onChange={handleFilterSearch} >
                                                        <option value={""}>--</option>
                                                        <option value={"pending"}>Pending</option>
                                                        <option value={"success"}>Success</option>
                                                        <option value={"cancelled"}>Cancelled</option>
                                                    </Form.Control>
                                                </FloatingLabel>
                                            </Col>

                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className='border-0 bg-secondary text-white'>
                                    <Accordion.Header className='arrow-white'>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>Fees</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0'>
                                        <Row className='gy-2 gx-3 w-100 text-dark'>
                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Total">
                                                    <Form.Control type="number" placeholder="Total" name='total' value={filters.total} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Subtotal">
                                                    <Form.Control type="number" placeholder="Subtotal" name='subtotal' value={filters.subtotal} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Delivery">
                                                    <Form.Control type="number" placeholder="Delivery" name='delivery' value={filters.delivery} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>

                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2" className='border-0 bg-secondary text-white'>
                                    <Accordion.Header className='arrow-white'>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>Customer Details</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0'>
                                        <Row className='gy-2 gx-3 w-100 text-dark'>
                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="User ID">
                                                    <Form.Control type="text" placeholder="User ID" name='userId' value={filters.userId} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="User Info">
                                                    <Form.Control type="text" placeholder="User Info" name='userInfo' value={filters.userInfo} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Address">
                                                    <Form.Control type="text" placeholder="Address" name='address' value={filters.address} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>
                                        </Row>

                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3" className='border-0 bg-secondary text-white'>
                                    <Accordion.Header className='arrow-white'>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>Order Details</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0'>
                                        <Row className='gy-2 gx-3 w-100 text-dark'>
                                            <Col className='col-12 col-sm-6 col-md-3'>
                                                <FloatingLabel controlId="" label="Order Count">
                                                    <Form.Control type="text" placeholder="Order Count" name='orderCount' value={filters.orderCount} onChange={handleFilterSearch} />
                                                </FloatingLabel>
                                            </Col>

                                            
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                                
                            </div>
                            <Button className='bg-transparent border-0 text-info p-0' onClick={()=>{setFilters(initialFilters)}}>Clear</Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> 
            <div className='pt-2 d-flex flex-column gap-3 w-100'>
            {
                purchases.length ? filteredPurchases.map((purchase) => (

                <PurchaseCard purchase={purchase} className='bg-white border rounded-md-3  shadow-sm' />
                ))
                :
                ""
            }
            </div>
        </div>
    );
}

export default ManagePurchases;