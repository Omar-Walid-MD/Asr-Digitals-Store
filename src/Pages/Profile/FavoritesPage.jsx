import React, { useEffect } from 'react';
import ProductInfoRow from '../../Components/ProductInfoRow';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../Store/Cart/cartSlice';
import { getFavs } from '../../Store/Favorites/favoritesSlice';
import { BsStarFill } from 'react-icons/bs';

function FavoritesPage({}) {

    const favorites = useSelector((store) => store.favorites.favorites);


    return (
        <div className='page-container bg-light p-sm-1 px-sm-3'>
            <div className="d-flex ps-4 pt-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                <BsStarFill fontSize={"5rem"}/>
                <div>
                    <h2 className='mt-5 mb-2'>Favorites</h2>
                </div>
            </div>
            <hr className='border-3 mb-3' />
            <Container className='p-0 px-md-2'>
                <div className="d-flex flex-column shadow rounded-3">
                    <div className='p-1 py-2 p-sm-3 p-md-4 d-flex flex-column gap-3'>
                        <Row className='g-2 g-sm-3 g-md-4'>
                        {
                            favorites.length > 0 ? favorites.map((favoriteId) =>(
                                <Col className='col-6 col-sm-4 col-lg-3'>
                                    <ProductCard productId={favoriteId} showSingle={false} />
                                </Col>                            
                            ))
                            :
                            <div className='d-flex flex-column align-items-center gap-3 p-5'>
                                <h2>You don't have favorites yet.</h2>
                                <Link to={"/shop"} className='btn-dark btn main-button border-0 fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Link>
                            </div>
                        }
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default FavoritesPage;