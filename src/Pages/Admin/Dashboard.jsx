import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PiUsersThreeFill } from "react-icons/pi";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";
import { BsCartCheckFill, BsFillCartCheckFill, BsStarFill, BsFillPhoneFill, BsPhoneFill } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";

function Dashboard({}) {

    const [statValues,setStatValues] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);

    const [activeStat,setActiveStat] = useState(0);

    const stats = [
        {
            title: "Revenues",
            values: [30,20,50,60,80,90,85,75,60,90,75,85],
            max: 5000
        },
        {
            title: "Purchases",
            values: [80,25,45,70,65,80,90,80,55,95,70,65],
            max: 1000
        },
        {
            title: "Site Visits",
            values: [90,90,95,75,30,20,85,75,60,50,60,80],
            max: 2000
        }
    ]

    useEffect(()=>{
        setStatValues([30,20,50,60,80,90,85,75,60,90,95,75])
    },[]);


    return (
        <div className='bg-light page-container p-5'>
            <section>
                <Container>
                    <Row className='h-100 g-3'>
                        <Col className='col-12 col-lg-6'>
                            <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100'>
                                <div className='p-3'>
                                    <h3>Statistics</h3>
                                    <div>

                                        <Nav variant='underline' className='gap-3 d-flex' activeKey={activeStat} onSelect={(eventKey)=>{setActiveStat(eventKey)}}>
                                        {
                                            stats.map((stat,index)=>
                                                <Nav.Item className='text-center mb-4'>
                                                    <Nav.Link className='text-secondary' eventKey={index}>{stat.title}</Nav.Link>
                                                </Nav.Item>
                                            )
                                        }
                                            
                                        </Nav>
                                        <div className="px-3">
                                            <h4 className={`mb-4 ${Math.sign(stats[activeStat].values[stats[activeStat].values.length-1]-stats[activeStat].values[stats[activeStat].values.length-2]) >= 0 ? "text-success" : "text-danger"}`}>
                                                This Month: {stats[activeStat].values[stats[activeStat].values.length-1] / 100 * stats[activeStat].max} ({stats[activeStat].values[stats[activeStat].values.length-1]-stats[activeStat].values[stats[activeStat].values.length-2]}%)
                                            </h4>
                                            <div className='dashboard-revenues-graph position-relative d-flex align-items-end mb-5 gap-2'>
                                            {
                                                stats[activeStat].values.map((stat, index) =>
                                                <div className='graph-bar-container position-relative d-flex justify-content-center' style={{height: `${stat}%`,"--x": stat}}>
                                                    <span className='position-absolute bottom-100 mb-1'>{stat/100 * stats[activeStat].max}</span>
                                                    <div className='position-absolute top-100 text-center'>
                                                        <p className='mb-0 '>
                                                            {((index - 10) + new Date().getMonth()) > 0 ? ((index - 10) + new Date().getMonth()) : ((index - 10 + 12) + new Date().getMonth())}
                                                        </p>
                                                        <b className='text-white bg-primary w-100 px-1'>
                                                            {((index - 10) + new Date().getMonth()) === 1 ? new Date().getFullYear() : ""}
                                                        </b>
                                                    </div>

                                                </div>
                                                )
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-12 col-lg-6'>
                            <Row className='h-100 g-3'>
                                <Col className='col-12'>
                                    <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                        <div className='p-3 ps-0 d-flex align-items-start justify-content-between'>
                                            <div className='text-center px-4'>
                                                <PiUsersThreeFill fontSize={"8rem"} />
                                            </div>
                                            <div className=''>
                                                <h4>5,837 Total Registered Clients</h4>
                                                <h6>This Month</h6>
                                                <hr />
                                                <div className=''>
                                                    <Row className=''>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp /> 3,890</p></Col>
                                                        <Col className='col-6'><p className='m-0'>New Users</p></Col>

                                                        <Col className='col-6'><p className='m-0 fw-semibold text-danger'><TfiStatsDown />  238</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Removed Users</p></Col>

                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp />  1,952</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Guest Users</p></Col>

                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-3 d-flex justify-content-end'>
                                            <Link to={"clients"} className='text-decoration-none'>Manage Clients</Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-sm-6'>
                                    <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                        <div className='p-3 d-flex flex-column gap-2 justify-content-between'>
                                            <div className='mb-3 text-center'>
                                                <BsCartCheckFill fontSize={"8rem"} />
                                            </div>
                                            <div className='text-center'>
                                                <h4 className='mb-1'>36,834 Total purchases</h4>
                                                <h6>This Month</h6>
                                                <hr />
                                                <div className='text-start'>
                                                    <Row className=''>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'>3,890</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Purchases</p></Col>

                                                        <Col className='col-6'><p className='m-0 fw-semibold text-danger'>238</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Refunds</p></Col>

                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'> 1,952</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Deliveries</p></Col>

                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-3 w-100 d-flex justify-content-end'>
                                            <Link to={"purchases"} className='text-decoration-none'>Manage Purchases</Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-sm-6'>
                                    <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                        <div className='p-3 d-flex flex-column gap-2 justify-content-between'>
                                            <div className='mb-3 text-center'>
                                                <BsStarFill fontSize={"8rem"} />
                                            </div>
                                            <div className='text-center'>
                                                <h4 className='mb-1'>2,424 Total Reviews</h4>
                                                <h6>This Month</h6>
                                                <hr />
                                                <Row>
                                                    <Col>
                                                        <div className='d-flex gap-4 rounded-3'>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0 fw-semibold text-success'>3,890</p>
                                                            </div>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0'>5 <BsStarFill className='text-warning mb-1' /></p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='d-flex gap-4 rounded-3  '>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0 fw-semibold text-success'>3,890</p>
                                                            </div>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0'>5 <BsStarFill className='text-warning mb-1' /></p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='d-flex gap-4 rounded-3  '>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0 fw-semibold text-success'>3,890</p>
                                                            </div>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0'>5 <BsStarFill className='text-warning mb-1' /></p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='d-flex gap-4 rounded-3  '>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0 fw-semibold text-success'>3,890</p>
                                                            </div>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0'>5 <BsStarFill className='text-warning mb-1' /></p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='d-flex gap-4 rounded-3  '>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0 fw-semibold text-success'>3,890</p>
                                                            </div>
                                                            <div className="d-flex flex-column align-items-start">
                                                                <p className='m-0'>5 <BsStarFill className='text-warning mb-1' /></p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className='p-3 w-100 d-flex justify-content-end'>
                                            <Link to={"reviews"} className='text-decoration-none'>Manage Reviews</Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-12 col-md-6 col-lg-8'>
                            <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                <div className='p-3 d-flex w-100 align-items-start justify-content-between'>
                                    <div className='text-center px-4 d-flex align-items-center h-100'>
                                        <BsPhoneFill fontSize={"8rem"} />
                                    </div>
                                    <div className='w-100'>
                                        <h4>1,839 Total Products</h4>
                                        <h6>This Month</h6>
                                        <hr />
                                        <div className='d-flex gap-4 rounded-3  mb-3'>
                                            <div className="d-flex flex-column align-items-start">
                                                <p className='m-0 fw-semibold text-success'><TfiStatsUp /> 3,890</p>
                                                <p className='m-0 fw-semibold text-danger'><TfiStatsDown />  238</p>
                                                <p className='m-0 fw-semibold text-success'><TfiStatsUp />  1,952</p>
                                            </div>
                                            <div className="d-flex flex-column align-items-start">
                                                <p className='m-0'>New Products</p>
                                                <p className='m-0'>Removed Products</p>
                                                <p className='m-0'>Edited Products</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 d-flex justify-content-end'>
                                    <Link to={"products"} className='text-decoration-none'>Manage Products</Link>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-12 col-md-6 col-lg-4'>
                            <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column'>
                                <div className='p-3 d-flex flex-column gap-2 justify-content-between'>
                                    <div className='mb-3 text-center'>
                                        <BiSolidOffer fontSize={"8rem"} />
                                    </div>
                                    <div className='text-center'>
                                        <h4 className='mb-1'>300 Offers</h4>
                                        <h6>This Month</h6>
                                        <hr />
                                        <div className='text-start'>
                                            <Row className=''>
                                                <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp /> 3,890</p></Col>
                                                <Col className='col-6'><p className='m-0'>Running Offers</p></Col>

                                                <Col className='col-6'><p className='m-0 fw-semibold text-danger'><TfiStatsDown />  238</p></Col>
                                                <Col className='col-6'><p className='m-0'>Closed Offers</p></Col>

                                                <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp />  1,952</p></Col>
                                                <Col className='col-6'><p className='m-0'>Upcoming Offers</p></Col>

                                            </Row>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 w-100 d-flex justify-content-end'>
                                    <Link to={"offers"} className='text-decoration-none'>Manage Offers</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Dashboard;