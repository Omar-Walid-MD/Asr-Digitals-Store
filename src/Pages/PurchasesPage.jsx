import React, { useEffect } from 'react';
import ProductCardLong from '../Components/ProductInfoRow';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCartItemOverview from '../Components/ProductCartOverViewItem';
import PurchaseCard from '../Components/PurchaseCard';

function PurchasesPage({}) {

    const purchases = useSelector((store) => store.purchases.purchases);

    function getPurchaseHistory()
    {
        let purchaseHistory = [];
        purchases.forEach(purchase => {
            let purchaseDate = new Date(purchase.date).toLocaleDateString();
            if(!purchaseHistory.includes(purchaseDate))
            {
                purchaseHistory.push({date: purchaseDate,purchases: [purchase]});
            }
            else
            {
                purchaseHistory.find((purchaseRecord) => purchaseRecord.date === purchaseDate).purchases.push(purchase);
            }
        });
        return purchaseHistory;
    }

    return (
        <div className='page-container bg-light py-3 px-0 p-md-3'>
            <Container className='px-2'> <h2 className='mt-5 mb-2'>Purchases</h2> </Container>
            <hr className='border-3' />
            <Container className='p-0 px-md-2'>
                <div className="d-flex flex-column shadow rounded-sm-3">
                    <div className='p-1 py-2 p-sm-3 p-md-4 d-flex flex-column gap-3'>
                    <Accordion alwaysOpen defaultActiveKey={0}>
                        {
                            purchases.length > 0 ? getPurchaseHistory().map((purchaseRecord,index) =>(
                                    <Accordion.Item eventKey={index} className='border-0 bg-light purchase-accordion'>
                                        <Accordion.Header>
                                            <div className="d-flex gap-3 w-100 pe-3">
                                                <h4 className='m-0'>{purchaseRecord.date}</h4>
                                                <hr className='w-100 border-3' />
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className=''>
                                            {
                                                purchaseRecord.purchases.map((purchase) => (

                                                <PurchaseCard purchase={purchase} className='border shadow-sm rounded-3' />
                                                ))
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                            ))
                            :
                            <div className='d-flex flex-column align-items-center gap-3 p-5'>
                                <h2>You don't have purchases yet.</h2>
                                <Button variant='dark' className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
                            </div>
                        }
                        </Accordion>                          
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default PurchasesPage;