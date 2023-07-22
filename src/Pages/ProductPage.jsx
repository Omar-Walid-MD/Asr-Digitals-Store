import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsFillCartDashFill, BsStarFill, BsPhoneFill, BsFillCaretDownFill, BsFillCaretUpFill, BsFillPersonFill } from "react-icons/bs";
import ProductReview from '../Components/ProductReview';

function ProductPage({}) {

    const [added,setAdded] = useState(false);

    const specs = {
            "OS": "Windows 10",
            "RAM": "16 GBs",
            "Dimensions": "192 x 1394",
            "Weight": "123.83g"
        }

    


    return (
        <div className='bg-dark'>
            <Container className='py-5'>
                <Row className='m-0' style={{height: "28rem"}}>
                    <Col className='col-6 h-100 p-0'>
                        <div className="d-flex w-100">
                            <div className='bg-white p-4 rounded-4'>
                                <BsPhoneFill style={{fontSize: "25rem"}} />
                            </div>
                        </div>
                    </Col>
                    <Col className='col-6 h-100'>
                        <div className="d-flex flex-column justify-content-between h-100">
                            <div className='d-flex flex-column gap-3'>
                                <h1 className='text-white'>Product Name</h1>
                                <p className='text-white m-0'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, amet, architecto natus consequatur blanditiis possimus tenetur ullam, totam nemo delectus eum temporibus minima enim? Quidem in eaque et ut nostrum.
                                </p>
                                <h1 className='text-danger mt-3'>100 EGP</h1>
                            </div>
                            <div className="d-flex flex- align-items-start gap-4">
                                {
                                    added ? 
                                    <div className='d-flex gap-3'>
                                        <Button className='d-flex align-items-center p-3 bg-transparent text-danger border-3 border-danger fs-3 gap-3 rounded-4' onClick={()=>{setAdded(false)}}><BsFillCartDashFill className='fs-2' /> Remove</Button>
                                        <input type="number" className="rounded-4 fs-1 text-center border-3 border-primary bg-transparent text-white" value={1} style={{width: "5rem"}} />
                                        <div className='d-flex flex-column justify-content-between'>
                                            <Button className='d-flex align-items-center p-3 py-0 bg-transparent text-primary border-3 fs-3 gap-3 rounded-3'><BsFillCaretUpFill /></Button>
                                            <Button className='d-flex align-items-center p-3 py-0 bg-transparent text-primary border-3 fs-3 gap-3 rounded-3'><BsFillCaretDownFill /></Button>
                                        </div>
                                    </div>
                                    :
                                    <Button className='d-flex align-items-center p-3 bg-transparent text-primary border-3 fs-3 gap-3 rounded-4' onClick={()=>{setAdded(true)}}><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                                }
                                <Button className='d-flex align-items-center p-3 bg-transparent text-warning border-warning border-3 fs-3 gap-3 rounded-4 '><BsStarFill className='fs-2' /> Favorite</Button>
                            </div>

                        </div>
                    </Col>
                </Row>
                <div>
                    <h2 className='text-white my-5'>Specs</h2>
                    <Row className='text-white fs-5 g-3'>
                    {
                        Object.keys(specs).map((spec) => 
                        <Col className='col-6'>
                            <Row className='g-0 border border-2 border-info rounded-2 overflow-hidden product-spec'>
                                <Col className='col-3'><div className='bg-info text-dark fw-semibold p-2 px-3'>{spec}</div></Col>
                                <Col className='col-3 '><div className='p-2 px-3'>{specs[spec]}</div></Col>
                            </Row>
                        </Col>
                        )
                    }
                    </Row>
                </div>
                <div className='pt-5'>
                    <h2 className='text-white my-5'>Reviews</h2>
                    <div className="d-flex flex-column gap-3">
                        <form action="" className='bg-secondary p-3 rounded-4 d-flex flex-column gap-2'>
                            <input type="text" className='form-control w-50' placeholder='Review Title' />
                            <textarea type="text" className='form-control' placeholder='Review Description' />
                            <div className="d-flex w-100 mt-2">
                                <Button className='btn-dark'>Add Review</Button>
                            </div>
                        </form>
                        <ProductReview />
                        <ProductReview />
                        <ProductReview />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default ProductPage;