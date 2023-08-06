import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsStarFill, BsPhoneFill, BsFillCartDashFill, BsPlus, BsDash, BsFillCaretUpFill, BsFillCaretDownFill, BsCaretLeftFill, BsCaretRightFill, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart, setProductCount } from '../Store/Cart/cartSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';

function ProductCartItemOverview({productObject,productId,className}) {

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

    
    useEffect(()=>{
        if(products.length && !productObject) setProduct(products.find((product) => product.id === parseInt(productId)));
    },[productId, products]);

    useEffect(()=>{
        if(product)
        {
            setAdded(cart.map((i) => i.productId).includes(""+product.id));
            setCount(getCount());
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
                            <Link to={`/product/${product.id}`} className='product-card-img w-100 h-100 d-flex justify-content-center align-items-center'><img className='w-75' src={require("../img/phone.png")} /> </Link>
                        </Col>
                        <Col className="col-6 col-sm-8 p-0">
                            <div className='py-3 pe-3 d-flex flex-row gap-2 justify-content-between align-items-center h-100'>
                                <div>
                                    <div className='d-flex align-items-start flex-column gap-1'>
                                        <h4 className='m-0'>{product.title}</h4>
                                        <h5 className='m-0 mt-1 mb-2 price-tag text-danger fw-bold d-flex align-items-end'>{count} <BsX/> {product.price}</h5>
                                    </div>
                                </div>
                                <h2 className='m-0 p-0 price-tag text-danger'>{product.price * count}</h2>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            }
            </div>
        </Card>
    );
}

export default ProductCartItemOverview;