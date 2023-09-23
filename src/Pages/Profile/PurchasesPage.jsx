import React, { useEffect, useState } from 'react';
import ProductInfoRow from '../../Components/ProductInfoRow';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCartItemOverview from '../../Components/ProductCartOverViewItem';
import PurchaseCard from '../../Components/PurchaseCard';
import { BiSolidPurchaseTag } from 'react-icons/bi';

function PurchasesPage({}) {

    const currentUser = useSelector((store) => store.auth.currentUser);
    const purchases = useSelector((store) => store.purchases.purchases);
    const [userPurchases,setUserPurchases] = useState([]);

    function getPurchaseHistory()
    {
        let purchaseHistory = [];
        userPurchases.forEach(purchase => {
            let purchaseDate = new Date(purchase.date).toLocaleDateString("en");
            if(!purchaseHistory.map((purchaseRecord)=>purchaseRecord.date).includes(purchaseDate))
            {
                purchaseHistory.push({date: purchaseDate,purchases: [purchase]});
            }
            else
            {
                purchaseHistory.find((purchaseRecord) => purchaseRecord.date === purchaseDate).purchases.push(purchase);
            }
        });

        purchaseHistory.forEach((purchaseRecord) => {
            purchaseRecord.purchases = purchaseRecord.purchases.sort((a,b)=>{
                return new Date(b.date) - new Date(a.date);
            })
        })

        purchaseHistory = purchaseHistory.sort((a,b)=>{
            return new Date(b.date) - new Date(a.date);
        });
        return purchaseHistory;
    }

    useEffect(()=>{
        if(purchases && currentUser) setUserPurchases(purchases.filter((purchase) => purchase.userId === currentUser.id));
    },[purchases,currentUser])

    return (
        <div className='page-container bg-light p-sm-1 px-sm-3'>
            <div className="d-flex ps-4 pt-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                <BiSolidPurchaseTag fontSize={"5rem"}/>
                <div>
                    <h2 className='mt-5 mb-2'>Purchases</h2>
                </div>
            </div>
            <hr className='border-3 mb-3' />
            <Container className='p-0 px-md-2 pb-5'>
                <div className="d-flex flex-column shadow rounded-sm-3">
                    <div className='p-1 py-2 p-sm-3 p-md-4 '>
                        <Accordion alwaysOpen defaultActiveKey={0} className='d-flex flex-column gap-3'>
                        {
                            userPurchases.length > 0 ? getPurchaseHistory().map((purchaseRecord,index) =>(
                                    <Accordion.Item eventKey={index} className='border-0 bg-light'>
                                        <Accordion.Header>
                                            <div className="d-flex gap-3 w-100 pe-3 py-2">
                                                <h4 className='m-0'>{purchaseRecord.date}</h4>
                                                <hr className='w-100 border-3' />
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className='d-flex flex-column gap-3'>
                                            {
                                                purchaseRecord.purchases.map((purchase) => (

                                                <PurchaseCard key={`purchase-card-${purchase}`} purchase={purchase} className='border shadow-sm rounded-3 bg-white' />
                                                ))
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                            ))
                            :
                            currentUser ?
                            <div className='d-flex flex-column align-items-center gap-3 p-5'>
                                <h2>You don't have purchases yet.</h2>
                                <Link to={"/shop"} className='btn btn-dark main-button border-0 fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Link>
                            </div>
                            :
                            <div className='d-flex flex-column align-items-center gap-3 p-5'>
                                <h2>Please log in to view your purchases.</h2>
                                <Link to={"/login"} className='btn btn-dark main-button border-0 fs-5 p-2 px-4 fw-semibold'>Log in</Link>
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