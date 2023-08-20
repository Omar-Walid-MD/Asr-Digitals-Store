import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillPersonFill } from 'react-icons/bs';
import { PiUsersThreeFill } from "react-icons/pi";
import ProductCartItemOverview from '../../Components/ProductCartOverViewItem';
import PurchaseCard from '../../Components/PurchaseCard';
import { getCapitalized } from '../../helpers';

function ManageClients({}) {

    const users = useSelector((store) => store.auth.users);
    const purchases = useSelector((store) => store.purchases.purchases);

    const initialFilters = {generalSearch:"",userId:"",email:"",username:"",name:"",phone:"",address:""}
    const [filters,setFilters] = useState(initialFilters);
    const [filteredUsers,setFilteredUsers] = useState(users);

    function handleFilterSearch(e)
    {
        setFilters({...filters,[e.target.name]:e.target.value});
    }

    function getFilteredUsers(users)
    {
        let filteredUsers = users;
            filteredUsers = filteredUsers.filter((user) => {
                let userFilterObject = {
                    generalSearch:(`${user.title} ${user.email} ${user.firstName} ${user.lastName} ${user.username || ""}`),
                    userId: (`${user.id}`),
                    email: user.email,
                    username: user.username,
                    name: (`${user.firstName} ${user.lastName}`),
                    phone: user.phone,
                    address: (`${user.city} ${user.address} ${user.street}`)
                }
                let flag = Object.keys(filters).every((filterKey) =>
                filters[filterKey] ? userFilterObject[filterKey] && userFilterObject[filterKey].toLowerCase().includes(filters[filterKey].toLowerCase()) : true);                
                return flag;
        });
             
        return filteredUsers;
    }


    function getUserPurchases(userId)
    {
        return purchases.filter((purchase) => purchase.userId === userId);
    }

    useEffect(()=>{
        setFilteredUsers((getFilteredUsers(users)));
    },[filters, users]);


    return (
        <div className='py-3 px-0 p-md-3'>
            <div className="d-flex mt-4 ps-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                <PiUsersThreeFill fontSize={"5rem"}/>
                <h2 className='mt-5 mb-2'>Manage Clients</h2>
            </div>
            <hr className='border-3' />
            <Accordion alwaysOpen className='w-100'>
                <Accordion.Item eventKey="0" className='border-0'>
                    <Accordion.Header className='w-100 rounded-md-3 bg-secondary px-3 py-2 arrow-white'>
                        <h4 className='text-white m-0'>Filters</h4>
                    </Accordion.Header>
                    <Accordion.Body className='px-0 pt-2'>
                        <div className='d-flex bg-secondary rounded-md-3 p-3 d-flex flex-column justify-content-between align-items-start gap-2'>
                            <div className='d-flex flex-column w-100  gap-2 align-items-start'>
                                <h5 className='me-1 m-0 text-white'>Search</h5>
                                <Row className='g-1 w-100'>
                                    <Col className='col-12 col-md-6 p-1'><Form.Control type="search" placeholder="Search by General" name='generalSearch'  value={filters.generalSearch} onChange={handleFilterSearch} /></Col>
                                    <Col className='col-12 col-sm-6 col-md-3 p-1'><Form.Control type="search" placeholder="Search by ID" name='userId' value={filters.userId} onChange={handleFilterSearch} /></Col>
                                    <Col className='col-12 col-sm-6 col-md-3 p-1'><Form.Control type="search" placeholder="Search by Email" name='email'  value={filters.email} onChange={handleFilterSearch} /></Col>
                                    <Col className='col-12 col-sm-6 col-md-3 p-1'><Form.Control type="search" placeholder="Search by Username" name='username'  value={filters.username} onChange={handleFilterSearch} /></Col>
                                    <Col className='col-12 col-sm-6 col-md-3 p-1'><Form.Control type="search" placeholder="Search by Name" name='name'  value={filters.name} onChange={handleFilterSearch} /></Col>
                                    <Col className='col-12 col-sm-6 col-md-3 p-1'><Form.Control type="search" placeholder="Search by Phone" name='phone'  value={filters.phone} onChange={handleFilterSearch} /></Col>
                                    <Col className='col-12 col-sm-6 col-md-3 p-1'><Form.Control type="search" placeholder="Search by Address" name='address'  value={filters.address} onChange={handleFilterSearch} /></Col>


                                </Row>
                            </div>
                            <Button className='bg-transparent border-0 text-info p-0' onClick={()=>{setFilters(initialFilters)}}>Clear</Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='p-0 py-2 d-flex flex-column gap-2 w-100'>
            {
                filteredUsers.map((user) =>
                <div className='bg-white border rounded-md-3 p-3 shadow-sm d-flex flex-column align-items-start gap-3 w-100'>
                    <div className='d-flex flex-column flex-lg-row align-items-start gap-3 w-100'>
                        <div>
                            <BsFillPersonFill fontSize={"5rem"} className='rounded-3 shadow-sm border border-2' />
                        </div>
                        <div className='d-flex flex-column flex-sm-row w-100'>
                            
                                <div className='w-100'>
                                    <Row>
                                        <Col className='col-12 col-lg-3 fw-semibold'>User Id:</Col>
                                        <Col className='col-12 col-lg-3 purchase-detail-info'>{user.id}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-lg-3 fw-semibold'>Email:</Col>
                                        <Col className='col-12 col-lg-3 purchase-detail-info'>{user.email}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-lg-3 fw-semibold'>Username:</Col>
                                        <Col className='col-12 col-lg-3 purchase-detail-info'>{user.username || "(Not Specified)"}</Col>
                                    </Row>
                                </div>
                                <div className='w-100'>
                                    <Row>
                                        <Col className='col-12 col-lg-3 fw-semibold'>Full Name:</Col>
                                        <Col className='col-12 col-lg-3 purchase-detail-info'>{user.firstName} - {user.lastName}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-lg-3 fw-semibold'>Phone Number:</Col>
                                        <Col className='col-12 col-lg-3 purchase-detail-info'>{user.phone}</Col>
                                    </Row>
                                    <Row>
                                        <Col className='col-12 col-lg-3 fw-semibold'>Date of Birth:</Col>
                                        <Col className='col-12 col-lg-3 purchase-detail-info'>{user.dateOfBirth}</Col>
                                    </Row>
                                </div>
                        </div>
                    </div>
                    <div className='w-100'>
                    <Accordion alwaysOpen className='w-100'>
                        <Accordion.Item eventKey="0" className='border-0 bg-white purchase-accordion purchase-record'>
                                <Accordion.Header className='py-2'>
                                    <div className="d-flex w-100 position-absolute">
                                        <hr className='w-100 border-3 position-absolute' />
                                    </div>
                                    <h5 className='m-0 bg-white'>Details</h5>
                                </Accordion.Header>
                                <Accordion.Body className='pt-2 p-0'>
                                    <Accordion alwaysOpen className='w-100'>
                                        <Accordion.Item eventKey="0" className='border-0 bg-white purchase-accordion purchase-record'>
                                                <Accordion.Header className='py-2'>
                                                    <div className="d-flex w-100 position-absolute">
                                                        <hr className='w-100 border-2 position-absolute' />
                                                    </div>
                                                    <h6 className='m-0 bg-white'>Address and Payment Info</h6>
                                                </Accordion.Header>
                                                <Accordion.Body className='px-0 pb-5'>
                                                    <div className="d-flex flex-column gap-2">
                                                        <Row>
                                                            <Col className='col-12 col-sm-3 fw-semibold'>City:</Col>
                                                            <Col className='col-12 col-sm-9 purchase-detail-info'>{user.city}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='col-12 col-sm-3 fw-semibold'>Address:</Col>
                                                            <Col className='col-12 col-sm-9 purchase-detail-info'>{user.address}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='col-12 col-sm-3 fw-semibold'>Street:</Col>
                                                            <Col className='col-12 col-sm-9 purchase-detail-info'>{user.street}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='col-12 col-sm-3 fw-semibold'>Credit Card No:</Col>
                                                            <Col className='col-12 col-sm-9 purchase-detail-info'>{user.creditCardNo}</Col>
                                                        </Row>
                                                    </div>
                                                </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="1" className='border-0 bg-white purchase-accordion purchase-record'>
                                            <Accordion.Header className='py-2'>
                                                <div className="d-flex w-100 position-absolute">
                                                    <hr className='w-100 border-2 position-absolute' />
                                                </div>
                                                <h6 className='m-0 bg-white'>Current Cart</h6>
                                            </Accordion.Header>
                                            <Accordion.Body className='px-0 pb-5'>
                                                <div>
                                                {
                                                    user.cart.length ?
                                                    <div className=''>
                                                        <div style={{width: "500px"}}>
                                                            <Row className='mb-2'>
                                                                <Col className="col-3">Image</Col>
                                                                <Col className="col-3">Name</Col>
                                                                <Col className="col-3">Price</Col>
                                                                <Col className="col-3">Total</Col>
                                                            </Row>
                                                            <Row className='g-2 g-sm-3 g-md-4'>
                                                            {
                                                                user.cart.map((item) =>(
                                                                    <Col className='col-12'>
                                                                        <ProductCartItemOverview productId={item.productId} productCount={item.count} />
                                                                    </Col>                            
                                                                ))
                                            
                                                            }
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>User's cart is empty</div>
                                                }
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2" className='border-0 bg-white purchase-accordion purchase-record'>
                                            <Accordion.Header className='py-2'>
                                                <div className="d-flex w-100 position-absolute">
                                                    <hr className='w-100 border-2 position-absolute' />
                                                </div>
                                                <h6 className='m-0 bg-white'>Purchases</h6>
                                            </Accordion.Header>
                                            <Accordion.Body className='px-0 pb-5'>
                                                <div>
                                                {
                                                    getUserPurchases(user.id).length > 0 ? getUserPurchases(user.id).map((purchase) =>
                                                    <PurchaseCard purchase={purchase} />
                                                    )
                                                    : <div>User has no purchases.</div>
                                                }
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        
                    </div>
                </div>
                )
            }
            </div>
        </div>
    );
}

export default ManageClients;