import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsCart, BsCartFill, BsFillCartFill } from "react-icons/bs";
import ProductCard from '../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Store/Cart/cartSlice';
import { Link, useLocation } from 'react-router-dom';
import { getTotalFees } from '../helpers';

function CartSideBar() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const location = useLocation();
  
  const products = useSelector((store) => store.products.products);
  const productsInfo = useSelector((store) => store.products.productsInfo);
  const cart = useSelector((store) => store.cart.cart);
  const offers = useSelector((store) => store.offers.offers);

  const [fees, setFees]  = useState({subtotal:0,delivery:0,total:0});

  useEffect(()=>{
    if(products && cart && productsInfo && offers) setFees(getTotalFees(cart,products,productsInfo,offers));
},[cart,products,productsInfo,offers]);


  return (
    <>

        <Button variant="primary" onClick={handleShow} className='cart-sidebar-btn btn-out position-fixed bg-secondary border-4 border-light border-end-0'>
            <BsFillCartFill />
        </Button>

        
        <Offcanvas show={show} onHide={handleClose} className="cart-sidebar shadow" placement='end'>
        <Button variant="primary" onClick={handleClose} className='cart-sidebar-btn btn-in position-absolute bg-secondary border-4 border-light border-end-0'>
            <BsFillCartFill />
        </Button>
        <div className='overflow-hidden h-100 d-flex flex-column justify-content-between'>
            <Offcanvas.Header closeButton className='bg-secondary text-white shadow' closeVariant='white'>
            <Offcanvas.Title><h4>Cart</h4></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='p-1 p-sm-3 '>
                <div className='d-flex flex-column gap-4 align-items-center justify-content-start p-3'>
                {
                    cart.length ? cart.map((product) =>(
                        <div key={`cart-side-bar-item-${product.id}`} className='w-100'>
                            <ProductCard productId={product.productId} showSingle={false} />
                        </div>                            
                    ))
                    :
                    <div className='d-flex flex-column align-items-center gap-3 h-100'>
                        <h2>Your cart is empty.</h2>
                        <Link to={"/shop"} className='btn btn-dark main-button fs-5 p-3 px-4 text-uppercase fw-semibold'>Shop now!</Link>
                    </div>
                }
                </div>
            </Offcanvas.Body>
            {
                cart.length>0 ?
                <div className='bg-secondary p-3 cart-sidebar-bottom text-white'>
                    <p className='fs-6 m-0'>Subtotal: <span className='price-tag fw-semibold'>{fees.subtotal}</span></p>
                    <hr />
                    <p className='fs-6 m-0'>Delivery: <span className='price-tag fw-semibold'>{fees.delivery}</span></p>
                    <hr />
                    <p className='fs-4'>Total Fees: <span className='price-tag fw-semibold'>{fees.total}</span></p>
                    <div className="d-flex gap-2">
                        <Link to={"/checkout"} state={{prevPath: location.pathname}} className='btn btn-dark main-button border border-3 fs-5 w-100 text-center'>Checkout</Link>
                        <Link to={"/cart"} variant='secondary' className='fs-5 main-button border-0 text-white btn btn-secondary d-flex align-items-center'><BsCartFill/> </Link>
                    </div>
                </div>
                : ""
            }
        </div>
        </Offcanvas>
    </>
  );
}

export default CartSideBar;