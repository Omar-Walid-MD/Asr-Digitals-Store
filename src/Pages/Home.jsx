import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
            height: "600px"
        },
        sectionSmall: {
            height: "350px"
        }
    }

   

    return (
        <div>
            <header className='bg-secondary d-flex align-items-center' style={style.header}>
                <div className='p-5 m-5 w-50 d-flex flex-column gap-3 align-items-start'>
                    <h1 className='large-title'>Asr Digitals</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet obcaecati tenetur libero perspiciatis! Quisquam illo esse.</p>
                    <Button className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                </div>
            </header>
            <section className='bg-white d-flex flex-column' style={style.sectionLarge}>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Why Choose Us</div></div>
                <Container className='d-flex align-items-center justify-content-center h-100'>
                    <Row>
                        <Col className='col-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                        <Col className='col-3'>
                            <h4>Feature Title</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, est. Corrupti placeat sequi fugit in sed atque accusantium, eaque architecto! Pariatur, dolor non! Vitae iusto, exercitationem ratione neque cumque sapiente!</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='bg-secondary d-flex flex-column' style={style.section}>
                <div className="w-100 bg-light-gradient fs-2 fw-semibold"><div className='bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Trending</div></div>
                <ProductCarousel />
            </section>
            <section className='bg-white d-flex flex-column' style={style.section}>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Our Offers</div></div>
                <Container className='d-flex align-items-center h-100'>
                    <div className="d-flex flex-column align-items-start w-50">
                        <h1>Check Our Latest Offers!</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste.</p>
                        <Button className='btn-dark text-uppercase fs-5'>Don't Miss Out!</Button>
                    </div>
                </Container>
            </section>
            <section className='bg-secondary d-flex flex-column' style={style.sectionLarge}>
                <div className="w-100 bg-light-gradient fs-2 fw-semibold"><div className='bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
                <Container className='d-flex align-items-center h-100'>
                    <div className="d-flex flex-column align-items-center w-100 gap-2">
                        <h1>How we started...</h1>
                        <p className='fs-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi error illo quasi aut facere sint necessitatibus temporibus iure iste. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, hic, cumque nihil minus et rerum delectus pariatur porro quos voluptatibus fugit. Obcaecati quam suscipit odio, veniam earum laudantium totam dolor! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam neque magnam autem ratione blanditiis optio molestiae praesentium, atque, dolore, voluptatibus ex quis doloribus animi debitis enim voluptates necessitatibus minima. Aliquid?</p>
                        <Link className='text-info fs-5'>Read More...</Link>
                    </div>
                </Container>
            </section>
            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Newest Arrivals</div></div>
                <Container className='d-flex flex-column align-items-center py-5 h-100 gap-5'>
                    <div className='d-flex w-100 gap-4'>
                        <div className="w-25">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </div>
                        <div className="w-50 d-flex align-items-center">
                            <Row className='w-100'>
                                <ProductCard product={{title: "Phone 202X",price: 300}} col={4} />
                                <ProductCard product={{title: "Phone 202X",price: 300}} col={4} />
                                <ProductCard product={{title: "Phone 202X",price: 300}} col={4} />
                            </Row>
                        </div>
                        <div>
                            <BsPhoneFill fontSize={"20rem"} />
                        </div>
                    </div>
                    <hr className='bg-dark w-100' />
                    <div className='d-flex w-100 gap-4'>
                        <div>
                            <BsPhoneFill fontSize={"20rem"} />
                        </div>
                        <div className="w-50 d-flex align-items-center">
                            <Row className='w-100'>
                                <ProductCard product={{title: "Phone 202X",price: 300}} col={4} />
                                <ProductCard product={{title: "Phone 202X",price: 300}} col={4} />
                                {/* <ProductCard product={{title: "Phone 202X",price: 300}} col={4} /> */}
                            </Row>
                        </div>
                        <div className="w-25">
                            <h1>My Phone 202X</h1>
                            <p className='text-dark fs-5'>Quasi quod ea ducimus repudiandae saepe at aliquam neque cum quidem quis?</p>
                        </div>
                    </div>
                </Container>
            </section>
            <section className='bg-secondary d-flex flex-column' style={style.sectionSmall}>
                <div className="w-100 bg-light-gradient fs-2 fw-semibold"><div className='bg-secondary text-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>About Us</div></div>
            </section>
            <section className='bg-white d-flex flex-column'>
                <div className="w-100 bg-dark-gray-gradient fs-2 fw-semibold"><div className='bg-white d-inline-block m-0 h-100 p-2 ps-4 pe-3'>Hear from our customers</div></div>
                <Container className='d-flex flex-column align-items-center py-5 h-100 gap-5'>
                    <Row className='w-100 gy-4'>
                        <Col className='col-8'>
                            <div className='d-flex gap-2 w-100 bg-danger-subtle shadow rounded-5 py-4'>
                                <div className='position-relative'>
                                    <BsPhoneFill fontSize={"20rem"}/>
                                    <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"20%",right:"0"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                </div>
                                <div className="position-relative">
                                    <SampleReview text={"I like it"} />
                                    <SampleReview text={"Great product"} style={{top:"13rem",left:"2rem"}} />
                                    <SampleReview text={"Fantastic!"} style={{top:"5rem",left:"11rem"}}/>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-4'>
                            <div className='d-flex gap-2 w-100 bg-info-subtle shadow rounded-5 py-4'>
                                <div className="w-50 position-relative">
                                    <SampleReview text={"Fantastic!"} style={{top:"10rem",left:"-5rem"}}/>
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
                                            <SampleReview text={"My favourite"} style={{top:"0rem",left:"8rem"}} />
                                            <SampleReview text={"Great product overall"} style={{top:"12rem",left:"-2rem"}}/>
                                        </div>
                                        <div className='position-relative'>
                                            <BsPhoneFill fontSize={"20rem"}/>
                                            <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"50%",right:"-2rem"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                        </div>
                                    </div>
                                </Col>
                                <Col className='col-12'>
                                    <div className='d-flex gap-2 w-100 bg-primary-subtle shadow rounded-5 py-4'>
                                        <div className='position-relative'>
                                            <BsPhoneFill fontSize={"20rem"}/>
                                            <div className="d-flex gap-1 bg-secondary position-absolute p-2 rounded-pill fs-4" style={{top:"20%",left:"-2rem"}}><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /><BsFillStarFill className='text-warning' /></div>
                                        </div>
                                        <div className="w-50 position-relative">
                                            <SampleReview text={"My favourite"} style={{top:"0rem",left:"-2rem"}} />
                                            <SampleReview text={"Amazing!"} style={{top:"8rem",left:"5rem"}}/>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-6'>
                            <div className='d-flex flex-column gap-2 w-100 bg-success-subtle shadow rounded-5 py-4 h-100'>
                                <div className="w-50 position-relative h-100">
                                    <SampleReview text={"My favourite"} style={{top:"0rem",left:"2rem"}} />
                                    <SampleReview text={"Great product overall"} style={{top:"0rem",left:"17rem"}}/>
                                    <SampleReview text={"Works very smoothly! Wonderful!"} style={{top:"8rem",left:"9rem"}}/>
                                    <SampleReview text={"Very helpful! Just what I needed."} style={{top:"16rem",left:"2rem"}}/>

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