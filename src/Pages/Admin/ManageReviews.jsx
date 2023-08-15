import React, { useEffect } from 'react';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PurchaseCard from '../../Components/PurchaseCard';

function ManageReviews({}) {

    const reviews = useSelector((store) => store.reviews.reviews);

    return (
        <div className='page-container bg-light py-3 px-0 p-md-3'>
            <Container className='px-2'> <h2 className='mt-5 mb-2'>Manage Reviews</h2> </Container>
            <hr className='border-3' />
            <div className='p-1 py-2 p-sm-3 p-md-4 d-flex flex-column gap-3 w-100'>
            {
                reviews.length ? reviews.map((review) => (

                <div>{review.title}</div>
                ))
                :
                ""
            }
            </div>
        </div>
    );
}

export default ManageReviews;