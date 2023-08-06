import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill, BsFillCartDashFill, BsPlus, BsDash, BsFillCaretUpFill, BsFillCaretDownFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, setProductCount } from '../Store/Cart/cartSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';

function ProductCartItem({productObject,productId,className}) {

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
        <Card className={`h-100 position-relative product-cart-item shadow border border-1 rounded-2 ${className}`}>
            <div className='overflow-hidden'>
            {
                product &&
                <Card.Body className='p-0 position-relative rounded-0'>
                    <Row className='g-0'>
                        <Col className='col-6 col-sm-4 pt-4 p-sm-0'>
                            <Link to={`/product/${product.id}`} className='product-card-img w-100 h-100 d-flex justify-content-center align-items-center'><img className='w-100' src={require("../img/phone.png")} /> </Link>
                        </Col>
                        <Col className="col-6 col-sm-8 p-0">
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
                                        <h5 className='m-0 mt-1 mb-2 price-tag text-danger' style={{opacity: "0.6"}}>{product.price}</h5>
                                    </div>
                                </div>
                                <div className="justify-content-between align-items-start align-items-sm-end flex-column flex-sm-row product-cart-item-bottom-row above-small gap-4 gap-sm-0">
                                    <div className="d-flex flex-column align-items-center gap-2">
                                        <div className='d-flex align-items-center w-100 product-cart-item-options'>
                                            <Button className='d-flex align-items-center h-100 rounded-start-3 rounded-0 border-2 px-1' onClick={()=>{handleCount(count-1)}}> <BsCaretLeftFill/> </Button>
                                            <input type="number" className="d-flex h-100 rounded-0 fs-5 text-center border-2 border-primary bg-transparent text-primary" min={0} max={10} value={count} onChange={(e)=>{handleCount(e.target.value)}} />
                                            <Button className='d-flex align-items-center h-100 rounded-end-3 rounded-0 border-2 px-1' onClick={()=>{handleCount(count+1)}}> <BsCaretRightFill/> </Button>
                                        </div>
                                        <Button variant='danger' className='product-cart-item-options d-flex align-items-center justify-content-center p-1 w-100 btn-danger border-2 gap-2 rounded-3 shadow'  onClick={()=>{dispatch(removeFromCart(productId)); setAdded(false);}}><BsFillCartDashFill className='fs-4' /> Remove</Button>
                                    </div>
                                    <h2 className='m-0 p-0 price-tag text-danger'>{product.price * count}</h2>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-12 p-3 pt-0 product-card-item-small-col'>
                            <div className="d-flex flex-column align-items-start justify-content-between gap-2">
                                <div className="d-flex flex-column align-items-center gap-2">
                                    <div className='d-flex align-items-center w-100 product-cart-item-options'>
                                        <Button className='d-flex align-items-center h-100 rounded-start-3 rounded-0 border-2 px-1' onClick={()=>{handleCount(count-1)}}> <BsCaretLeftFill/> </Button>
                                        <input type="number" className="d-flex h-100 rounded-0 text-center border-2 border-primary bg-transparent text-primary" min={0} max={10} value={count} onChange={(e)=>{handleCount(e.target.value)}}  />
                                        <Button className='d-flex align-items-center h-100 rounded-end-3 rounded-0 border-2 px-1' onClick={()=>{handleCount(count+1)}}> <BsCaretRightFill/> </Button>
                                    </div>
                                    <Button variant='danger' className='product-cart-item-options d-flex w-100 align-items-center justify-content-center p-1 w-100 btn-danger border-2 gap-2 rounded-3 shadow'  onClick={()=>{dispatch(removeFromCart(productId)); setAdded(false);}}><BsFillCartDashFill className='fs-4' /> Remove</Button>
                                </div>
                                <h1 className='m-0 p-0 price-tag text-danger'>{product.price * count}</h1>
                            </div>
                        </Col>
                    </Row>
                    {
                        favorite ?
                        <Button className='d-flex m-2 position-absolute top-0 left-0 align-items-center btn-warning bg-warning border-3 border-warning text-white gap-3 rounded-2 favorite-button' onClick={()=>{dispatch(removeFromFav(product.id)); setFavorite(false);}}> <BsStarFill /> </Button>
                        :
                        <Button className='d-flex m-2 position-absolute top-0 left-0 align-items-center bg-transparent text-warning border-warning border-3 gap-3 rounded-2 favorite-button' onClick={()=>{dispatch(addToFav(product.id)); setFavorite(true);}}> <BsStarFill /></Button>
                    }
                </Card.Body>
            }
            </div>
        </Card>
    );
}

export default ProductCartItem;