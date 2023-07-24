import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsFillCartDashFill, BsStarFill, BsPhoneFill, BsFillCaretDownFill, BsFillCaretUpFill, BsFillPersonFill } from "react-icons/bs";
import ProductReview from '../Components/ProductReview';

function ProductPage({}) {

    const [added,setAdded] = useState(false);
    const [favorite,setFavorite] = useState(false);

    const specs = {
            "OS": "Windows 10",
            "RAM": "16 GBs",
            "Dimensions": "192 x 1394",
            "Weight": "123.83g"
        }

    


    return (
        <div className='bg-secondary-subtle'>
            <div className='py-5'>
                <Container className='py-5'>
                    <Row className='m-0' style={{height: "28rem"}}>
                        <Col className='col-4 h-100 p-0'>
                            <div className="d-flex w-100">
                                <div className='bg-white p-4 rounded-3 shadow'>
                                    <BsPhoneFill fontSize={"24.75rem"} />
                                </div>
                            </div>
                        </Col>
                        <Col className='col-8 h-100 ps-5'>
                            <div className="d-flex flex-column justify-content-between h-100">
                                <div className='d-flex flex-column gap-2'>
                                    <h1>Product Name</h1>
                                    <p className='m-0'>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, amet, architecto natus consequatur blanditiis possimus tenetur ullam, totam nemo delectus eum temporibus minima enim? Quidem in eaque et ut nostrum.
                                    </p>
                                    <h1 className='text-danger mt-4 fw-semibold'>100 EGP</h1>
                                </div>
                                <div className="d-flex justify-content-start align-items-center gap-4">
                                    {
                                        added ? 
                                        <div className='d-flex gap-3'>
                                            <Button className='d-flex align-items-center p-3 btn-danger fs-3 gap-3 rounded-3 shadow' onClick={()=>{setAdded(false)}}><BsFillCartDashFill className='fs-2' /> Remove</Button>
                                            <input type="number" className="rounded-3 fs-1 text-center border-3 border-primary bg-transparent text-primary" value={1} style={{width: "5rem"}} />
                                            <div className='d-flex flex-column justify-content-between'>
                                                <Button className='d-flex align-items-center p-3 py-0 btn-primary fs-3 gap-3 rounded-3 shadow'><BsFillCaretUpFill /></Button>
                                                <Button className='d-flex align-items-center p-3 py-0 btn-primary fs-3 gap-3 rounded-3 shadow'><BsFillCaretDownFill /></Button>
                                            </div>
                                        </div>
                                        :
                                        <Button className='d-flex align-items-center p-3 btn-primary text-white fs-3 gap-3 rounded-3 shadow' onClick={()=>{setAdded(true)}}><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                                    }
                                    {
                                        favorite ?
                                        <Button className='d-flex align-items-center p-3 btn-warning bg-warning text-white fs-3 gap-3 rounded-3' onClick={()=>{setFavorite(false);}}><BsStarFill className='fs-2' /> Favorited</Button>
                                        :
                                        <Button className='d-flex align-items-center p-3 bg-transparent text-warning border-warning border-3 fs-3 gap-3 rounded-3' onClick={()=>{setFavorite(true);}}><BsStarFill className='fs-2' /> Add to Favorites</Button>
                                    }
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>

                <div className='bg-secondary'>
                    <Container className='pb-5'>
                    <h3 className='mt-5 m-0 bg-info text-white p-2 px-4 rounded-3 rounded-bottom-0 shadow d-inline-block'>Specs</h3>
                    <Row className='text-white fs-5 g-3 m-0'>
                    {
                        Object.keys(specs).map((spec) => 
                        <Col className='col-6 p-0 pe-4'>
                            <Row className='g-0 border border-2 border-info rounded-2 overflow-hidden product-spec shadow'>
                                <Col className='col-3'><div className='bg-info fw-semibold p-2 px-3'>{spec}</div></Col>
                                <Col className='col-3 '><div className='p-2 px-3'>{specs[spec]}</div></Col>
                            </Row>
                        </Col>
                        )
                    }
                    </Row>
                    </Container>
                </div>

                <div className='py-5'>
                    <Container>
                        <h3 className='mt-5 bg-secondary text-white p-2 px-4 rounded-3 rounded-bottom-0 shadow d-inline-block'>Reviews</h3>
                            <div className="d-flex flex-column gap-3">
                                <form action="" className='bg-secondary p-3 rounded-3 d-flex flex-column gap-2 shadow'>
                                    <input type="text" className='form-control w-50' placeholder='Review Title' />
                                    <textarea type="text" className='form-control' placeholder='Review Description' />
                                    <div className="d-flex w-100 mt-2">
                                        <Button className='btn-dark'>Add Review</Button>
                                    </div>
                                </form>
                                <div className='position-relative d-flex justify-content-center align-items-center'>
                                    <hr className='border-4 w-100 mt-5 mb-4' />
                                    <h5 className='position-absolute bg-secondary-subtle text-secondary px-3 py-1 mt-4'>Customer Reviews</h5>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    <ProductReview />
                                    <ProductReview />
                                    <ProductReview />
                                </div>
                                <Button className='btn-dark w-100 fs-5'>Load More</Button>
                            </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;