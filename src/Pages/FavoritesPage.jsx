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
    const dispatch = useDispatch();
  
  
    useEffect(()=>{
      dispatch(getFavs());
    },[])
  


    return (
        <div className='bg-light py-3 px-0 p-md-3'>
            <Container className='p-0 px-md-2'>
                <h2 className='my-4 bg-secondary text-white p-3 px-5 mb-3 mb-sm-2 rounded-sm-3 rounded-bottom-0 shadow d-sm-inline-block'>Favorites</h2>
                <div className="bg-secondary d-flex flex-column shadow">
                    <div className='p-1 py-2 p-sm-3 p-md-4 d-flex flex-column gap-3'>
                        <Row className='g-2 g-sm-3 g-md-4'>
                        {
                            favorites.length > 0 ? favorites.map((favoriteId) =>(
                                <Col className='col-6 col-sm-4 col-lg-3'>
                                    <ProductCard productId={favoriteId} showSingle={false} />
                                </Col>                            
                            ))
                            :
                            <div className='d-flex flex-column align-items-center text-white gap-3 p-5'>
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