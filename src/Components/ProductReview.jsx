import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsStarFill, BsFillPersonFill } from "react-icons/bs";
function ProductReview({review}) {
    
    return (
        <Row className="w-100 border-3 border-bottom border-secondary-subtle rounded-3 p-3 shadow-sm gy-3">
            <Col className="col-12 col-md-2 col-lg-1 d-flex flex-row flex-md-column gap-3">
                <BsFillPersonFill className='bg-light rounded-3 fs-1 shadow-sm border border-2 border-dark' />
                <div className="d-flex flex-column">
                    <h6 className='m-0'>Username</h6>
                    <p className='m-0'>00/00/0000</p>
                </div>
            </Col>
            <Col className='col-12 col-md-10 d-flex align-items-start flex-column ps-5'>
                <h4>{review.title}</h4>
                <div className='d-flex gap-1 shadow-sm p-2 rounded-pill'>
                    {
                        [1,2,3,4,5].map((n,index) =>
                            <BsStarFill key={"product-review-rating-"+index} className={n <= review.rating ? "text-warning" : "text-dark"} />
                        )
                    }
                </div>
                <div className="d-flex flex-column align-items-start mt-3 gap-4">
                    <p className='m-0'>{review.body}</p>
                    <div>
                        {review.pros && <p className='m-0 mb-2 text-success fw-semibold'>Pros: {review.pros}</p>}
                        {review.cons && <p className='m-0 text-danger fw-semibold'>Cons: {review.cons}</p>}
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default ProductReview;