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

function CartSideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cart = useSelector((store) => store.cart.cart);
  const dispatch = useDispatch();
  const location = useLocation();


  return (
    <>

        <Button variant="primary" onClick={handleShow} className='cart-sidebar-btn btn-out position-fixed bg-secondary border-4 border-light border-end-0'>
            <BsFillCartFill />
        </Button>

        
        <Offcanvas show={show} onHide={handleClose} className="cart-sidebar shadow" placement='end'>
        <Button variant="primary" onClick={handleClose} className='cart-sidebar-btn btn-in position-absolute bg-secondary border-4 border-light border-end-0'>
            <BsFillCartFill />
        </Button>
            <Offcanvas.Header closeButton className='bg-secondary text-white' closeVariant='white'>
            <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='p-1 p-sm-3'>
                <Row className='g-0 gy-sm-4 m-0 mx-sm-2 pt-2'>
                {
                    cart.map((product,index) =>(
                        <Col key={"cart-side-bar-item-"+index} className='col-6 px-1 p-sm-0'>
                            <ProductCard productId={product.productId} showSingle={false} />
                        </Col>                            
                    ))
                }
                </Row>
            </Offcanvas.Body>
            <div className='bg-secondary p-3 cart-sidebar-bottom text-white'>
                <Row>
                    <Col>
                        <p className='fs-6 m-0'>Subtotal: 0000</p>
                    </Col>
                    <Col>
                        <p className='fs-6 m-0'>Delivery: 0000</p>
                    </Col>
                </Row>
                <hr />
                <p className='fs-5'>Total Fees: 0000</p>
                <div className="d-flex gap-2">
                    <Link to={"/checkout"} state={{prevPath: location.pathname}} className='btn btn-dark fs-5 w-100 text-center'>Checkout</Link>
                    <Link to={"/cart"} variant='secondary' className='fs-5 text-white btn btn-secondary d-flex align-items-center'><BsCartFill/> </Link>
                </div>
            </div>
        </Offcanvas>
    </>
  );
}

export default CartSideBar;