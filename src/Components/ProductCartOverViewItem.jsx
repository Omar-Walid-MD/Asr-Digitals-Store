import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill, BsFillCartDashFill, BsPlus, BsDash, BsFillCaretUpFill, BsFillCaretDownFill, BsCaretLeftFill, BsCaretRightFill, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, setProductCount } from '../Store/Cart/cartSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';
import { onImgError } from '../helpers';

function ProductCartItemOverview({productObject,productId,productCount,productPrice,className}) {

    const [product,setProduct] = useState(productObject);

    const cart = useSelector((store) => store.cart.cart);
    const favorites = useSelector((store) => store.favorites.favorites);
    const products = useSelector((store) => store.products.products);
    const offers = useSelector((store) => store.offers.offers);
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);
    const [offerPrice,setOfferPrice] = useState(0);

    function getCount()
    {
        let pId = product.id;
        let targetProduct = cart.find((product) => product.productId === pId);
        return targetProduct ? targetProduct.count : 1;
    }


    
    useEffect(()=>{
        if(products.length && !productObject) setProduct(products.find((product) => product.id === productId));
    },[productId, products]);

    useEffect(()=>{
        if(product && !productCount)
        {
            setCount(getCount());
        }
    },[product,cart]);

    useEffect(()=>{
        if(product && offers)
        {
            let availableOffer = offers.find((offer) => offer.productId === product.id);
            if(availableOffer) setOfferPrice(availableOffer.newPrice);
        }
    },[offers,product])



    return (
        <Card className={`h-100 position-relative product-cart-item border border-1 rounded-2 ${className}`}>
            <div className='overflow-hidden'>
            {
                product &&
                <Card.Body className='p-0 position-relative rounded-0'>
                    <Row className='g-0'>
                        <Col className='col-2 p-2 d-flex align-items-center'>
                            <Link to={`/product/${product.id}`} className='w-100 h-100 d-flex justify-content-center align-items-center p-2'>
                                <div className='product-card-img position-relative overflow-hidden rounded-1'>
                                    <div className='w-100 h-100 d-flex justify-content-center align-items-center position-relative'>
                                        <img className='position-absolute' src={product.image} onError={onImgError} />
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col className="col-4 p-2 d-flex align-items-center">
                            <h5 className='m-0'>{product.title}</h5>
                        </Col>
                        <Col className="col-3 p-2 d-flex align-items-center">
                            <h5 className='m-0 mt-1 mb-2 price-tag text-danger fw-bold d-flex align-items-end'>{productCount || count} <BsX/> {(productPrice || offerPrice || product.price)}</h5>
                        </Col>
                        <Col className="col-3 p-2 d-flex align-items-center">
                            <h4 className='m-0 p-0 price-tag text-danger'>{(productPrice || offerPrice || product.price) * (productCount || count)}</h4>
                        </Col>
                    </Row>
                </Card.Body>
            }
            </div>
        </Card>
    );
}

export default ProductCartItemOverview;