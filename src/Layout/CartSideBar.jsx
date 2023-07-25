import React from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsFillCartFill } from "react-icons/bs";
import ProductCard from '../Components/ProductCard';

function CartSideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const style = {
    btnOut: {
        right: "0",
        top: "85%",
        borderRadius: "0.5rem 0 0 0.5rem",
        zIndex: "1"
    },
    btnIn: {
        right: "100%",
        top: "85%",
        borderRadius: "0.5rem 0 0 0.5rem",
        zIndex: "1"

    }
  }

  const products = [
        {title:"My Phone with long name",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
        {title:"My Phone",price:100},
    ];  

  return (
    <>

        <Button variant="primary" onClick={handleShow} style={style.btnOut} className='position-fixed p-3 ps-4 bg-dark border-4 border-light border-end-0'>
            <BsFillCartFill className='fs-1' />
        </Button>

        
        <Offcanvas show={show} onHide={handleClose} className="cart-sidebar shadow" placement='end' style={{width: "500px"}}>
        <Button variant="primary" onClick={handleClose} style={style.btnIn} className='position-absolute p-3 ps-4 bg-dark border-4 border-light border-end-0'>
            <BsFillCartFill className='fs-1' />
        </Button>
            <Offcanvas.Header closeButton className='bg-secondary-subtle'>
            <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row className='gy-4 mx-2 pt-2'>
                {
                    products.map((product) =>(
                        <Col className='col-6'>
                            <ProductCard product={product} />
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