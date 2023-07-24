import React from 'react';
import { Accordion, Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import ProductCarousel from '../Components/ProductCarousel';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillStarFill, BsPhoneFill, BsTabletLandscapeFill } from "react-icons/bs";
import ProductCard from '../Components/ProductCard';


function Home({}) {

    const style = {
        header: {
            height: "650px"
        },
        section: {
            height: "500px"
        },
        sectionLarge: {
            // minHeight: "600px"
        },
        sectionSmall: {
            height: "350px"
        }
    }

   

    return (
        <div>
            <header className='bg-secondary d-flex align-items-center justify-content-center justify-content-sm-start' style={style.header}>
                <div className='header-content p-0 m-5 w-50 w-md-50 d-flex flex-column gap-3 align-items-center align-items-sm-start'>
                    <h1 className='large-title text-center text-sm-start'>Asr Digitals</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet obcaecati tenetur libero perspiciatis! Quisquam illo esse.</p>
                    <Button className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                </div>
            </header>


            <section className='bg-white d-flex flex-column' style={style.sectionLarge}>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Why Choose Us</div></div>
                <Container className='d-flex align-items-center justify-content-center py-5 h-100'>
                    <Row className='gy-4 p-3 py-4'>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-12 col-sm-6 col-lg-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* <section className='bg-secondary d-flex flex-column' style={style.section}>
                <div className="w-100 bg-light-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Trending</div></div>
                <ProductCarousel />
            </section> */}


            <section className='bg-white d-flex flex-column' style={style.section}>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Offers</div></div>
                <Container className='d-flex align-items-center justify-content-center justify-content-md-start h-100'>
                    <div className="d-flex flex-column align-items-center align-items-md-start offer-content w-75">
                        <h1 className='text-center text-md-start'>Check Our Latest Offers!</h1>
                        <p className='text-center text-md-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste.</p>
                        <Button className='btn-dark text-uppercase fs-5'>Don't Miss Out!</Button>
                    </div>
                </Container>
            </section>


            <section className='bg-secondary d-flex flex-column'>
                <div className="w-100 bg-light-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
                <Container className='d-flex align-items-center h-100 py-5'>
                    <div className="d-flex flex-column align-items-center w-100 gap-2 px-2">
                        <h1 className='text-center text-md-start'>How we started...</h1>
                        <p className='fs-5 text-center text-md-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste. Lorem ipsum, dolor sit amet.</p>
                        <p className='fs-5 text-center text-md-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste. Lorem ipsum, dolor sit amet.</p>

                        <Link className='text-info fs-5'>Read More...</Link>
                    </div>
                </Container>
            </section>


            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Newest Arrivals</div></div>
                <Container className='d-flex flex-column align-items-center py-5 px-4 h-100 gap-5'>
                    <Row className='gy-4'>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                        <Col className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-lg-0">
                            <Row className='gy-4'>
                                <Col className="col-12 col-sm-4 col-md-4 col-lg-4"><ProductCard product={{title: "Phone 202X",price: 300}} col={4} /></Col>
                                <Col className="col-12 col-sm-4 col-md-4 col-lg-4"><ProductCard product={{title: "Phone 202X",price: 300}} col={4} /></Col>
                                <Col className="col-12 col-sm-4 col-md-4 col-lg-4"><ProductCard product={{title: "Phone 202X",price: 300}} col={4} /></Col>
                            </Row>
                        </Col>
                        <Col className='col-12 col-sm-6 col-md-6 col-lg-3'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                    </Row>
                    <hr className='bg-dark w-100' />
                    <Row className='gy-4'>
                        <Col className='col-12 col-sm-6 col-md-6 col-lg-3'>
                            <img className='w-100' src={require("../img/phone.png")} alt="" />
                        </Col>
                        <Col className="col-12 col-sm-12 col-md-12 col-lg-6 order-1 order-lg-0">
                            <Row className='gy-4'>
                                <Col className="col-12 col-sm-6 col-md-4 col-lg-4"><ProductCard product={{title: "Phone 202X",price: 300}} col={4} /></Col>
                                <Col className="col-12 col-sm-6 col-md-4 col-lg-4"><ProductCard product={{title: "Phone 202X",price: 300}} col={4} /></Col>
                            </Row>
                        </Col>
                        <Col className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section className='bg-secondary d-flex flex-column' style={style.sectionSmall}>
                <div className="w-100 bg-light-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
            </section>


            {/* <section className='d-none bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Hear from our customers</div></div>
                <Container className='d-flex flex-column align-items-center py-5 h-100 gap-5'>
                    <Row className='w-100 gy-4'>
                        <Col className='col-8'>
                            <div className='d-flex gap-2 w-100 bg-danger-subtle shadow rounded-5 py-4'>
                                <div className='position-relative'>
                                    <BsPhoneFill fontSize={"20rem"}/>
                                    <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"20%",right:"0"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                </div>
                                <div className="position-relative w-100">
                                    <SampleReview text={"I like it"} />
                                    <SampleReview text={"Great product"} style={{top:"65%",left:"10%"}} />
                                    <SampleReview text={"Fantastic!"} style={{top:"25%",left:"32.5%"}}/>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-4'>
                            <div className='d-flex gap-2 w-100 bg-info-subtle shadow rounded-5 py-4'>
                                <div className="w-50 position-relative">
                                    <SampleReview text={"Fantastic!"} style={{top:"50%",left:"-80%"}}/>
                                </div>
                                <div className='position-relative'>
                                    <BsPhoneFill fontSize={"20rem"}/>
                                    <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"30%",left:"0"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-6'>
                            <Row className='gy-4'>
                                <Col className='col-12'>
                                    <div className='d-flex gap-2 w-100 bg-warning-subtle shadow rounded-5 py-4'>
                                        <div className="w-50 position-relative">
                                            <SampleReview text={"My favourite"} style={{top:"0",left:"40%"}} />
                                            <SampleReview text={"Great product overall"} style={{top:"60%",left:"-10%"}}/>
                                        </div>
                                        <div className='position-relative'>
                                            <BsPhoneFill fontSize={"20rem"}/>
                                            <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"50%",right:"-10%"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12'>
                                    <div className='d-flex gap-2 w-100 bg-primary-subtle shadow rounded-5 py-4'>
                                        <div className='position-relative'>
                                            <BsPhoneFill fontSize={"20rem"}/>
                                            <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"20%",left:"-10%"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                        </div>
                                        <div className="w-50 position-relative">
                                            <SampleReview text={"My favourite"} style={{top:"0",left:"-10%"}} />
                                            <SampleReview text={"Amazing!"} style={{top:"40%",left:"30%"}}/>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-6'>
                            <div className='d-flex flex-column gap-2 w-100 bg-success-subtle shadow rounded-5 py-4 h-100'>
                                <div className="w-50 position-relative h-100">
                                    <SampleReview text={"My favourite"} style={{top:"0",left:"11.5%"}} />
                                    <SampleReview text={"Great product overall"} style={{top:"0",left:"87.5%"}}/>
                                    <SampleReview text={"Works very smoothly! Wonderful!"} style={{top:"32.5%",left:"47.5%"}}/>
                                    <SampleReview text={"Very helpful! Just what I needed."} style={{top:"65%",left:"11.5%"}}/>

                                </div>
                                <div className='d-flex justify-content-end pe-5'>
                                    <div className="position-relative">
                                        <BsTabletLandscapeFill fontSize={"20rem"}/>
                                        <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"25%",right:"-2rem"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section> */}

            {/* <section className='bg-secondary d-flex flex-column'>
                <div className="w-100 bg-light-gradient fs-2 fw-semibold"><div className='section-title bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Branches</div></div>
                <Container className='h-100'>
                    <Row className="d-flex h-100 gx-5">
                        <Col className="col-12 col-lg-6">
                            <Container className='py-4'>
                                <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3 text-dark" variant='tabs'>
                                    <Tab eventKey="home" className='text-white' title="First Branch">
                                        <div className='bg-dark float-end ms-5 mt-3' style={{width:"16rem",height: "9rem"}}></div>
                                        <h3>First Branch Title</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>

                                    </Tab>
                                    <Tab eventKey="profile" className='text-white' title="Second Branch">
                                        <div className='bg-dark float-end ms-5 mt-3' style={{width:"16rem",height: "9rem"}}></div>
                                        <h3>Second Branch Title</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>
                                    </Tab>
                                    <Tab eventKey="longer-tab" className='text-white' title="Third Branch">
                                        <div className='bg-dark float-end ms-5 mt-3' style={{width:"16rem",height: "9rem"}}></div>
                                        <h3>Third Branch Title</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>
                                    </Tab>
                                    <Tab eventKey="contact" className='text-white' title="Fourth Branch">
                                        <div className='bg-dark float-end ms-5 mt-3' style={{width:"16rem",height: "9rem"}}></div>
                                        <h3>Fourth Branch Title</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus.</p>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, saepe sint possimus, consequuntur sunt debitis officiis, quasi quia ducimus ab quo! Numquam tempore dolorem fugit. Laudantium pariatur itaque eius exercitationem?</p>
                                    </Tab>
                                </Tabs>
                            </Container>
                        </Col>
                        <Col className='col-12 col-lg-6 h-100 ps-5 py-3 h-100'>
                            <iframe className='w-100 h-100 rounded-3 shadow' frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=noplaceisnamedlikethis&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                        </Col>
                    </Row>
                </Container>
            </section> */}

            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='section-title bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Frequently asked questions</div></div>
                <Container className="p-5 d-flex flex-column align-items-center"  style={{width: "min(50rem,100vw)"}}>
                    <Accordion alwaysOpen flush className='shadow my-5 mx-4 w-100'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header><h5>How can I ut rem atque nostrum saepe?</h5></Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus maxime similique incidunt cumque consequatur libero enim deserunt necessitatibus sapiente qui! Aperiam error totam ex doloribus voluptate! Assumenda perspiciatis saepe nesciunt.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className='text-center'>
                        <h4>Can't find your question? Feel free to <Link className='text-decoration-none text-primary'>Contact Us</Link> for any assistance!</h4>
                        <h4 className='text-info'>We are happy to help!</h4>
                    </div>
                </Container>
            </section>
        </div>
    );
}


function SampleReview({text,style})
{
    return (
        <div className='bg-white w-auto position-absolute shadow border border-2 rounded-3 d-flex flex-column gap-1 overflow-hidden' style={{...style}}>
            <div className="d-flex gap-3 p-2">
                <BsFillPersonFill className='bg-white border border-dark rounded-2 fs-1' />
                <p className='fs-4 m-0 text-nowrap'>{text}</p>
            </div>
            <div className="d-flex gap-1 fs-5 bg-primary-subtle p-2"><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
        </div>
    )
}
export default Home;