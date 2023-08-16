import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PiUsersThreeFill } from "react-icons/pi";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";
import { BsCartCheckFill, BsFillCartCheckFill, BsStarFill, BsFillPhoneFill, BsPhoneFill, BsCaretRightFill } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";

function Dashboard({}) {

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
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
        <div className='py-5 px-0 px-sm-2 p-xl-5'>
            <section>
                <Container className='p-0 px-sm-2'>
                    <Row className='h-100 g-2 g-lg-3 mx-0'>
                        <Col className='col-12 col-lg-6 px-0 px-sm-1 px-lg-2'>
                            <div className='dashboard-card rounded-sm-3 shadow-sm border border-2 h-100'>
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
                                        <div className="px-3 ms-2 pe-0 pe-sm-3 ms-sm-0">
                                            <h4 className={`mb-4 ${Math.sign(stats[activeStat].values[stats[activeStat].values.length-1]-stats[activeStat].values[stats[activeStat].values.length-2]) >= 0 ? "text-success" : "text-danger"}`}>
                                                This Month: {stats[activeStat].values[stats[activeStat].values.length-1] / 100 * stats[activeStat].max} ({stats[activeStat].values[stats[activeStat].values.length-1]-stats[activeStat].values[stats[activeStat].values.length-2]}%)
                                            </h4>
                                            <div className='dashboard-revenues-graph ms-5 ms-sm-0 position-relative d-flex flex-column flex-sm-row align-items-start align-items-sm-end mb-5 gap-2'>
                                            {
                                                stats[activeStat].values.map((stat, index) =>
                                                <div className='graph-bar-container position-relative d-flex justify-content-center' style={{"--x": stat}}>
                                                    <span className='position-absolute mb-sm-1'>{stat/100 * stats[activeStat].max}</span>
                                                    <div className='position-absolute me-2 me-sm-0 mt-sm-1 text-center d-flex flex-row-reverse gap-2 align-items-center d-sm-block'>
                                                        <p className='mb-0'>
                                                            {((index - 10) + new Date().getMonth()) > 0 ? months[(index - 11) + new Date().getMonth()] : months[(index +1) + new Date().getMonth()]}
                                                        </p>
                                                        
                                                            {((index - 10) + new Date().getMonth()) === 1 ? <b className=''>{new Date().getFullYear()}</b> : ""}
                                                        
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
                        <Col className='col-12 col-lg-6 px-0'>
                            <Row className='h-100 g-2 g-lg-3 mx-0'>
                                <Col className='col-12  px-0 px-sm-1 px-lg-2'>
                                    <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                        <div className='p-3 ps-sm-0  d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-between'>
                                            <div className='text-center px-4'>
                                                <PiUsersThreeFill className='dashboard-icon' fontSize={"8rem"} />
                                            </div>
                                            <div className='text-center'>
                                                <h4>5,837,253 Total Registered Clients</h4>
                                                <h6>This Month</h6>
                                                <hr />
                                                <div>
                                                    <Row className='gy-1 gy-sm-0 text-start'>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp /> 3,890</p></Col>
                                                        <Col className='col-6'><p className='m-0'>New Users</p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-danger'><TfiStatsDown />  238</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Removed Users</p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp />  1,952</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Guest Users</p></Col>

                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-3 d-flex justify-content-end'>
                                            <Link to={"clients"} className='text-decoration-none d-flex align-items-center'>Manage Clients <BsCaretRightFill /></Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-sm-6 px-0 px-sm-1 px-lg-2'>
                                    <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                        <div className='p-3 d-flex flex-column gap-2 justify-content-between'>
                                            <div className='mb-3 text-center'>
                                                <BsCartCheckFill className='dashboard-icon' fontSize={"8rem"} />
                                            </div>
                                            <div className='text-center'>
                                                <h4 className='mb-1'>36,834 Total purchases</h4>
                                                <h6>This Month</h6>
                                                <hr />
                                                <div className='text-start'>
                                                    <Row className=''>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'>3,890</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Purchases</p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-danger'>238</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Refunds</p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'> 1,952</p></Col>
                                                        <Col className='col-6'><p className='m-0'>Deliveries</p></Col>

                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-3 w-100 d-flex justify-content-end'>
                                            <Link to={"purchases"} className='text-decoration-none d-flex align-items-center'>Manage Purchases <BsCaretRightFill /></Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12 col-sm-6 px-0 px-sm-1 px-lg-2'>
                                    <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                        <div className='p-3 d-flex flex-column gap-2 justify-content-between'>
                                            <div className='mb-3 text-center'>
                                                <BsStarFill className='dashboard-icon' fontSize={"8rem"} />
                                            </div>
                                            <div className='text-center'>
                                                <h4 className='mb-1'>36,834 Total purchases</h4>
                                                <h6>This Month</h6>
                                                <hr />
                                                <div className='text-start'>
                                                    <Row className='gy-1 gy-sm-0'>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'>3,890</p></Col>
                                                        <Col className='col-6'><p className='m-0 text-warning'>5 <BsStarFill className='mb-1' /> </p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-danger'>238</p></Col>
                                                        <Col className='col-6'><p className='m-0 text-warning'>4 <BsStarFill className='mb-1' /> </p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'> 1,952</p></Col>
                                                        <Col className='col-6'><p className='m-0 text-warning'>3 <BsStarFill className='mb-1' /> </p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'> 1,952</p></Col>
                                                        <Col className='col-6'><p className='m-0 text-warning'>2 <BsStarFill className='mb-1' /> </p></Col>
                                                        <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                        <Col className='col-6'><p className='m-0 fw-semibold text-success'> 1,952</p></Col>
                                                        <Col className='col-6'><p className='m-0 text-warning'>1 <BsStarFill className='mb-1' /> </p></Col>

                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-3 w-100 d-flex justify-content-end'>
                                            <Link to={"reviews"} className='text-decoration-none d-flex align-items-center'>Manage Reviews <BsCaretRightFill /></Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-12 col-md-6 col-lg-8 px-0 px-sm-1 px-lg-2'>
                            <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column justify-content-between'>
                                <div className='p-3 d-flex flex-column flex-lg-row w-100 align-items-center align-items-lg-start justify-content-between'>
                                    <div className='text-center mb-3 mb-lg-0 px-4 d-flex align-items-center h-100'>
                                        <BsPhoneFill className='dashboard-icon' fontSize={"8rem"} />
                                    </div>
                                    <div className='text-center w-100'>
                                        <h4>1,839 Total Products</h4>
                                        <h6>This Month</h6>
                                        <hr />
                                        <Row className='text-start gy-1 gy-sm-0'>
                                            <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp /> 3,890</p></Col>
                                            <Col className='col-6'><p className='m-0'>New Products</p></Col>
                                            <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                            <Col className='col-6'><p className='m-0 fw-semibold text-danger'><TfiStatsDown />  238</p></Col>
                                            <Col className='col-6'><p className='m-0'>Removed Products</p></Col>
                                            <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                            <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp />  1,952</p></Col>
                                            <Col className='col-6'><p className='m-0'>Edited Products</p></Col>

                                        </Row>
                                    </div>
                                </div>
                                <div className='p-3 d-flex justify-content-end'>
                                    <Link to={"products"} className='text-decoration-none d-flex align-items-center'>Manage Products <BsCaretRightFill /></Link>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-12 col-md-6 col-lg-4 px-0 px-sm-1 px-lg-2'>
                            <div className='dashboard-card rounded-3 shadow-sm border border-2 h-100 d-flex flex-column'>
                                <div className='p-3 d-flex flex-column gap-2 justify-content-between'>
                                    <div className='mb-3 text-center'>
                                        <BiSolidOffer className='dashboard-icon' fontSize={"8rem"} />
                                    </div>
                                    <div className='text-center'>
                                        <h4 className='mb-1'>300 Offers</h4>
                                        <h6>This Month</h6>
                                        <hr />
                                        <div className='text-start'>
                                            <Row className='gy-1 gy-sm-0'>
                                                <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp /> 3,890</p></Col>
                                                <Col className='col-6'><p className='m-0'>Running Offers</p></Col>
                                                <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                <Col className='col-6'><p className='m-0 fw-semibold text-danger'><TfiStatsDown />  238</p></Col>
                                                <Col className='col-6'><p className='m-0'>Closed Offers</p></Col>
                                                <div className='pe-lg-5'><hr className='w-100 my-2' /></div>
                                                <Col className='col-6'><p className='m-0 fw-semibold text-success'><TfiStatsUp />  1,952</p></Col>
                                                <Col className='col-6'><p className='m-0'>Upcoming Offers</p></Col>

                                            </Row>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 w-100 d-flex justify-content-end'>
                                    <Link to={"offers"} className='text-decoration-none d-flex align-items-center'>Manage Offers <BsCaretRightFill /></Link>
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