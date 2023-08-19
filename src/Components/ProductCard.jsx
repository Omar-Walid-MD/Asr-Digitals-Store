import React, { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill, BsFillCartDashFill, BsPlus, BsDash, BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, setProductCount } from '../Store/Cart/cartSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';
import { onImgError, throttle } from '../helpers';

function ProductCard({productObject,productId,className,showSingle=true}) {

    const [product,setProduct] = useState(productObject);

    const cart = useSelector((store) => store.cart.cart);
    const favorites = useSelector((store) => store.favorites.favorites);
    const products = useSelector((store) => store.products.products);
    const offers = useSelector((store) => store.offers.offers);
    const dispatch = useDispatch();

    const [added,setAdded] = useState(false);
    const [count, setCount] = useState(1);
    const [favorite,setFavorite] = useState(false);
    const [offerPrice,setOfferPrice] = useState(0);

    function getCount()
    {
        let pId = product.id;
        let targetProduct = cart.find((product) => product.productId === pId);
        return targetProduct ? targetProduct.count : 1;
    }

    function handleCount(newCount)
    {
        if(newCount <= 10 && newCount > 0)
        {
            setCount(newCount);
            dispatch(setProductCount({productId: product.id,count: newCount}));
        }
    }

    
    useEffect(()=>{
        if(products.length && !productObject) setProduct(products.find((product) => product.id === productId));
    },[productId, products]);

    useEffect(()=>{
        if(product)
        {
            setAdded(cart.map((i) => i.productId).includes(product.id));
            setCount(getCount());
        }
    },[product,cart]);


    useEffect(()=>{
        if(product) setFavorite(favorites.includes(product.id));
    },[favorites, product]);

    useEffect(()=>{
        if(product && offers)
        {
            let availableOffer = offers.find((offer) => offer.productId === product.id);
            if(availableOffer) setOfferPrice(availableOffer.newPrice);
        }
    },[offers,product]);


    return (
        <Card className={`h-100 position-relative border-0 bg-transparent product-card-container  ${className}`}>
            <div className='h-100'>
            {
                product &&
                <Card.Body className='p-0 h-100 rounded-0 product-card bg-light shadow border border-1 rounded-3 overflow-hidden'>
                    <div className='d-flex flex-column align-items-center justify-content-between h-100 w-100'>
                        <Link className="text-center w-100 text-decoration-none text-dark pb-1" to={`/product/${product.id}`}>
                            <div className='mb-3 product-card-img position-relative overflow-hidden'>
                                <div className='w-100 h-100 d-flex justify-content-center align-items-center position-relative'>
                                    <img className='position-absolute' src={product.image} onError={onImgError} />
                                </div>
                                {
                                    product.rating ?
                                    <p className='m-0 fs-6 d-flex fw-semibold align-items-center gap-1 position-absolute product-card-rating left-0 bottom-0 bg-light text-warning z-2 px-1'>{product.rating} <BsStarFill /></p>
                                    : ""
                                }
                            </div>
                            <Card.Title className='product-card-title'>{product.title}</Card.Title>
                            {
                                offerPrice ?
                                <div className='d-flex flex-column w-100 align-items-center'>
                                    <Card.Text className='product-card-price price-tag price-old fw-bold m-0'>{product.price}</Card.Text>
                                    <Card.Text className='product-card-price price-tag fw-bold text-danger m-0'>{offerPrice}</Card.Text>
                                </div>
                                :
                                <Card.Text className='product-card-price price-tag fw-bold text-danger'>{product.price}</Card.Text>
                            }
                            
                        </Link>
                        <div className="d-flex w-100 justify-content-end p-2 pt-1 position-relative ">
                            
                            <div className="d-flex gap-2 justify-content-between w-100 align-items-stretch">
                                {
                                    added ?
                                    <Button className='d-flex p-2 bg-danger text-white border-3 border-transparent fs-4 rounded-3 w-100 d-flex justify-content-center main-button' onClick={()=>{throttle((()=>{dispatch(removeFromCart(product.id));setAdded(false);})(),1000);}}><BsFillCartDashFill /></Button>
                                        :
                                    <Button variant='primary' className='d-flex p-2 text-white border-0 fs-4 rounded-3 w-100 d-flex justify-content-center main-button' onClick={()=>{throttle((()=>{dispatch(addToCart(product.id));setAdded(true);})(),1000);}}><BsFillCartPlusFill /></Button>
                                }
                                {
                                    favorite ?
                                    <Button className='d-flex align-items-center p-2 bg-warning border-3 border-warning fs-4 rounded-3 main-button aspect-1' onClick={()=>{throttle((()=>{dispatch(removeFromFav(product.id));setFavorite(false);})(),1000);}}><BsStarFill /></Button>
                                    :
                                    <Button className='d-flex p-2 bg-transparent text-warning border-3 border-warning fs-4 rounded-3' onClick={()=>{throttle((()=>{dispatch(addToFav(product.id));setFavorite(true);})(),1000);}}><BsStarFill /></Button>
                                }
                            </div>
                        </div>
                    </div>
                </Card.Body>
            }
            </div>
            {
                added &&
                <div className='position-absolute d-flex flex-column jusitfy-content-center product-card-count-container my-2 m-md-0 gap-0 gap-sm-1'>
                {
                    (showSingle ? count > 0 : count > 1) && 
                    <span className='badge shadow p-1 mx-1 mx-md-2 bg-primary'>{count}</span>
                }
                    <div className='p-1 p-md-2 rounded-3 shadow d-flex flex-column gap-1 gap-sm-2 product-card-count-btn-row'>
                        <Button variant='primary' className='p-1 product-card-count-btn d-flex align-items-center justify-content-center' onClick={()=>{throttle(handleCount(count+1),1000)}}><BsFillCaretUpFill /></Button>
                        <Button variant='danger' className='p-1 product-card-count-btn d-flex align-items-center justify-content-center' onClick={()=>{throttle(handleCount(count-1),1000)}}><BsFillCaretDownFill /></Button>
                    </div>
                </div>
            }
        </Card>
    );
}

export default ProductCard;