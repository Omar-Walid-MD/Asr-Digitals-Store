import React, { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill, BsFillCartDashFill, BsPlus, BsDash, BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, setProductCount } from '../Store/Cart/cartSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';

function ProductCard({productObject,productId,className,showSingle=true}) {

    const [product,setProduct] = useState(productObject);

    const cart = useSelector((store) => store.cart.cart);
    const favorites = useSelector((store) => store.favorites.favorites);
    const products = useSelector((store) => store.products.products);
    const dispatch = useDispatch();

    const [added,setAdded] = useState(false);
    const [count, setCount] = useState(1);
    const [favorite,setFavorite] = useState(false);

    const [firstCountSet,setFirstCountSet] = useState(false);

    function getCount()
    {
        let pId = ''+product.id;
        let targetProduct = cart.find((product) => product.productId === pId);
        return targetProduct ? targetProduct.count : 1;
    }

    function handleCount(newCount)
    {
        if(newCount <= 10 && newCount > 0)
        {
            setCount(newCount);
            dispatch(setProductCount({productId: ""+product.id,count: newCount}));
        }
    }

    // console.log(product)
    
    useEffect(()=>{
        if(products.length && !productObject) setProduct(products.find((product) => product.id === parseInt(productId)));
    },[productId, products]);

    useEffect(()=>{
        if(product)
        {
            setAdded(cart.map((i) => i.productId).includes(""+product.id));
            setCount(getCount());
            // setFirstCountSet(true);
        }
    },[product,cart]);


    useEffect(()=>{
        if(product) setFavorite(favorites.includes(product.id));
    },[favorites, product]);


    return (
        <Card className={`h-100 position-relative product-card shadow border-0 ${className}`}>
            <div className='overflow-hidden border border-1 rounded-1'>
            {
                product &&
                <Card.Body className='p-0'>
                    <div className='d-flex flex-column align-items-center justify-content-between h-100 w-100'>
                        <Link className="text-center text-decoration-none text-dark pb-4 px-2" to={`/product/${product.id}`}>
                            <div className='product-card-img w-100 d-flex justify-content-center'><img className='w-100' src={require("../img/phone.png")} /> </div>
                            <Card.Title className='product-card-title'>{product.title}</Card.Title>
                            <Card.Text className='product-card-price price-tag fw-bold text-danger'>{product.price}</Card.Text>
                        </Link>
                        <div className="d-flex w-100 justify-content-end bg-primary-subtle p-2 position-relative">
                            {
                                product.rating &&
                                <p className='m-0 ms-2 fs-6 d-flex fw-semibold align-items-center gap-1 position-absolute product-card-rating left-0 text-warning'>{product.rating} <BsStarFill /></p>
                            }
                            <div className="d-flex gap-2 justify-content-between w-100">
                                {
                                    added ?
                                    <Button className='d-flex p-2 bg-danger text-white border-2 border-danger fs-4 rounded-3 w-100 d-flex justify-content-center' onClick={()=>{dispatch(removeFromCart(""+product.id)); setAdded(false);}}><BsFillCartDashFill /></Button>
                                        :
                                    <Button variant='primary' className='d-flex p-2 text-white border-2 fs-4 rounded-3 w-100 d-flex justify-content-center' onClick={()=>{dispatch(addToCart(""+product.id)); setAdded(true);}}><BsFillCartPlusFill /></Button>
                                }
                                {
                                    favorite ?
                                    <Button className='d-flex p-2 bg-warning border-2 border-warning fs-4 rounded-3' onClick={()=>{dispatch(removeFromFav(product.id)); setFavorite(false);}}><BsStarFill /></Button>
                                    :
                                    <Button className='d-flex p-2 bg-transparent text-warning border-2 border-warning fs-4 rounded-3' onClick={()=>{dispatch(addToFav(product.id)); setFavorite(true);}}><BsStarFill /></Button>
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
                        <Button variant='primary' className='p-1 product-card-count-btn d-flex align-items-center justify-content-center' onClick={()=>{handleCount(count+1)}}><BsFillCaretUpFill /></Button>
                        <Button variant='danger' className='p-1 product-card-count-btn d-flex align-items-center justify-content-center' onClick={()=>{handleCount(count-1)}}><BsFillCaretDownFill /></Button>
                    </div>
                </div>
            }
        </Card>
    );
}

export default ProductCard;