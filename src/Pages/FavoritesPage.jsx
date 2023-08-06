import React, { useEffect } from 'react';
import ProductCardLong from '../Components/ProductInfoRow';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Store/Cart/cartSlice';
import { getFavs } from '../Store/Favorites/favoritesSlice';

function FavoritesPage({}) {

    const favorites = useSelector((store) => store.favorites.favorites);


    return (
        <div className='bg-light py-3 px-0 p-md-3'>
            <Container className='px-2'> <h2 className='mt-5 mb-2'>Favorites</h2> </Container>
            <hr className='border-3' />
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
                                <Button variant='dark' className='btn-dark fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Button>
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