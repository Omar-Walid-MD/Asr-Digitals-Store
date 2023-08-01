import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsFillCartFill } from "react-icons/bs";
import ProductCard from '../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Store/Cart/cartSlice';

function CartSideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cart = useSelector((store) => store.cart.cart);
  const dispatch = useDispatch();


  return (
    <>

        <Button variant="primary" onClick={handleShow} className='cart-sidebar-btn btn-out position-fixed bg-dark border-4 border-light border-end-0'>
            <BsFillCartFill />
        </Button>

        
        <Offcanvas show={show} onHide={handleClose} className="cart-sidebar shadow" placement='end' style={{width: "500px"}}>
        <Button variant="primary" onClick={handleClose} className='cart-sidebar-btn btn-in position-absolute bg-dark border-4 border-light border-end-0'>
            <BsFillCartFill />
        </Button>
            <Offcanvas.Header closeButton className='bg-secondary-subtle'>
            <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row className='gy-4 mx-2 pt-2'>
                {
                    cart.map((product,index) =>(
                        <Col key={"cart-side-bar-item-"+index} className='col-6'>
                            <ProductCard productId={product.productId} showSingle={false} />
                        </Col>                            
                    ))
                }
                </Row>
            </Offcanvas.Body>
            <div className='bg-secondary-subtle p-3 py-4 d-flex align-items-center justify-content-between'>
                <h4>Total: 3000 EGP</h4>
                <Button className='btn-dark fs-5'>Checkout</Button>
            </div>
        </Offcanvas>
    </>
  );
}

export default CartSideBar;