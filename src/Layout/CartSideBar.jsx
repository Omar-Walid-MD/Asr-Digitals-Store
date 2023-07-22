import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsFillCartFill } from "react-icons/bs";

function CartSideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const style = {
    btnOut: {
        left: "0",
        top: "85%",
        borderRadius: "0 0.5rem 0.5rem 0"
    },
    btnIn: {
        left: "100%",
        top: "85%",
        borderRadius: "0 0.5rem 0.5rem 0"

    }
  }

  return (
    <>

        <Button variant="primary" onClick={handleShow} style={style.btnOut} className='position-fixed p-3 ps-4 bg-dark border-4 border-light border-start-0'>
            <BsFillCartFill className='fs-1' />
        </Button>

        
        <Offcanvas show={show} onHide={handleClose}>
        <Button variant="primary" onClick={handleClose} style={style.btnIn} className='position-absolute p-3 ps-4 bg-dark border-4 border-light border-start-0'>
            <BsFillCartFill className='fs-1' />
        </Button>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
    </>
  );
}

export default CartSideBar;