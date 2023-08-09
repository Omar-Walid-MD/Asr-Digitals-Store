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

    const [firstCountSet,setFirstCountSet] = useState(false);

    function getCount()
    {
        let pId = ''+product.id;
        let targetProduct = cart.find((product) => product.productId === pId);
        return targetProduct ? targetProduct.count : 1;
    }


    
    useEffect(()=>{
        if(products.length && !productObject) setProduct(products.find((product) => product.id === parseInt(productId)));
    },[productId, products]);

    useEffect(()=>{
        if(product)
        {
            setCount(getCount());
        }
    },[product,cart]);



    return (
        <Card className={`h-100 position-relative product-cart-item border border-1 rounded-2 ${className}`}>
            <div className='overflow-hidden'>
            {
                product &&
                <Card.Body className='p-0 position-relative rounded-0'>
                    <Row className='g-0'>
                        <Col className='col-3 p-2 d-flex align-items-center'>
                            <Link to={`/product/${product.id}`} className='product-card-img w-100 h-100 d-flex justify-content-center align-items-center'><img className='w-75' src={require("../img/phone.png")} /> </Link>
                        </Col>
                        <Col className="col-3 p-2 d-flex align-items-center">
                            <h5 className='m-0'>{product.title}</h5>
                        </Col>
                        <Col className="col-3 p-2 d-flex align-items-center">
                            <h5 className='m-0 mt-1 mb-2 price-tag text-danger fw-bold d-flex align-items-end'>{count} <BsX/> {product.price}</h5>
                        </Col>
                        <Col className="col-3 p-2 d-flex align-items-center">
                            <h4 className='m-0 p-0 price-tag text-danger'>{product.price * count}</h4>
                        </Col>
                    </Row>
                </Card.Body>
            }
            </div>
        </Card>
    );
}

export default ProductCartItemOverview;