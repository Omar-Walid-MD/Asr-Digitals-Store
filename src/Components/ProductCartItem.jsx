import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill, BsFillCartDashFill, BsPlus, BsDash, BsFillCaretUpFill, BsFillCaretDownFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, setProductCount } from '../Store/Cart/cartSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';
import { onImgError, throttle } from '../helpers';

function ProductCartItem({productObject,productId,className}) {

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

    // console.log(product)
    
    useEffect(()=>{
        if(products.length && !productObject) setProduct(products.find((product) => product.id === productId));
    },[productId, products]);

    useEffect(()=>{
        if(product)
        {
            setAdded(cart.map((i) => i.productId).includes(product.id));
            setCount(getCount());
            // setFirstCountSet(true);
        }
    },[product,cart]);


    // useEffect(()=>{
    //     if(product) setFavorite(favorites.includes(product.id));
    // },[favorites, product]);

    useEffect(()=>{
        if(product && offers)
        {
            let availableOffer = offers.find((offer) => offer.productId === product.id);
            if(availableOffer) setOfferPrice(availableOffer.newPrice);
        }
    },[offers,product])

    return (
        <Card className={`h-100 position-relative product-cart-item shadow border border-1 rounded-2 ${className}`}>
            <div className='overflow-hidden'>
            {
                product &&
                <Card.Body className='p-0 position-relative rounded-0'>
                    <Row className='g-0'>
                        <Col className='col-6 col-sm-5 p-sm-0'>
                            <Link to={`/product/${product.id}`} className='w-100 h-100 d-flex justify-content-center align-items-start align-items-md-center p-3'>
                                <div className='product-card-img position-relative overflow-hidden rounded-3' style={{width:"min(20rem,40vw)"}}>
                                    <img src={product.image} onError={onImgError} />
                                </div>
                            </Link>
                        </Col>
                        <Col className=" p-0">
                            <div className='py-3 pe-3 d-flex flex-column gap-2 justify-content-start justify-content-sm-between h-100'>
                                <div>
                                    <div className='d-flex align-items-start flex-column gap-1'>
                                        <h2 className='m-0 product-cart-item-title'>{product.title}</h2>
                                        <div className="d-flex product-cart-item-rating">
                                        {
                                            [1,2,3,4,5].map((n)=>
                                            <div className='position-relative'>
                                                <BsStarFill key={"pr-p-g-s-"+n} className={"text-dark d-flex justify-content-center"} />
                                                <div style={{width: `${n <= product.rating ? 100 : n === Math.ceil(product.rating) ? product.rating % 1 * 100 : 0}%`}} className='position-absolute top-0 overflow-hidden'>
                                                    <BsStarFill key={"pr-p-g-s-"+n} className={"text-warning d-flex justify-content-center"} />
                                                </div>
                                            </div>
                                            )
                                        }
                                        </div>
                                        {
                                            offerPrice ?
                                            <div className='mt-1 mb-2'>
                                                <h6 className='m-0 price-old price-tag text-muted'>{product.price}</h6>
                                                <h4 className='m-0 price-tag text-danger'>{offerPrice}</h4>
                                            </div>
                                            :
                                            <h4 className='m-0 mt-1 mb-2 price-tag text-danger'>{product.price}</h4>
                                        }
                                    </div>
                                </div>
                                <div className="justify-content-between align-items-start align-items-sm-end flex-column flex-sm-row product-cart-item-bottom-row above-small gap-4 gap-sm-0">
                                    <div className="d-flex flex-column align-items-center gap-2">
                                        <div className='d-flex align-items-center w-100 product-cart-item-options'>
                                            <Button className='d-flex align-items-center h-100 rounded-start-3 rounded-0 border-2 px-1' onClick={()=>{throttle(handleCount(count-1),1000)}}> <BsCaretLeftFill/> </Button>
                                            <input type="number" className="d-flex h-100 rounded-0 fs-5 text-center border-2 border-primary bg-transparent text-primary" min={0} max={10} value={count} onChange={(e)=>{handleCount(e.target.value)}} />
                                            <Button className='d-flex align-items-center h-100 rounded-end-3 rounded-0 border-2 px-1' onClick={()=>{throttle(handleCount(count+1),1000)}}> <BsCaretRightFill/> </Button>
                                        </div>
                                        <Button variant='danger' className='product-cart-item-options d-flex align-items-center justify-content-center p-1 w-100 btn-danger border-0 gap-2 rounded-3 shadow main-button'  onClick={()=>{throttle((()=>{dispatch(removeFromCart(product.id));setAdded(false);})(),1000);}}><BsFillCartDashFill className='fs-4' /> Remove</Button>
                                    </div>
                                    <h2 className='m-0 p-0 price-tag text-danger'>{(offerPrice || product.price) * count}</h2>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-12 p-3 pt-0 product-card-item-small-col'>
                            <div className="d-flex flex-column align-items-center justify-content-between gap-2 w-100">
                                <div className="d-flex flex-column align-items-center gap-2 w-100">
                                    <div className='d-flex justify-content-center w-100 product-cart-item-options'>
                                        <Button className='d-flex justify-content-center h-100 rounded-start-3 rounded-0 border-2 px-1' onClick={()=>{throttle(handleCount(count-1),1000)}}> <BsCaretLeftFill/> </Button>
                                        <input type="number" className="d-flex h-100 w-100 rounded-0 text-center border-2 border-primary bg-transparent text-primary" min={0} max={10} value={count} onChange={(e)=>{handleCount(e.target.value)}}  />
                                        <Button className='d-flex align-items-center h-100 rounded-end-3 rounded-0 border-2 px-1' onClick={()=>{throttle(handleCount(count+1),1000)}}> <BsCaretRightFill/> </Button>
                                    </div>
                                    <Button variant='danger' className='product-cart-item-options d-flex w-100 align-items-center justify-content-center p-1 w-100 btn-danger border-0 gap-2 rounded-3 shadow main-button'  onClick={()=>{dispatch(removeFromCart(productId)); setAdded(false);}}><BsFillCartDashFill className='fs-4' /> Remove</Button>
                                </div>
                                <h1 className='m-0 p-0 price-tag text-danger'>{(offerPrice || product.price) * count}</h1>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            }
            </div>
        </Card>
    );
}

export default ProductCartItem;