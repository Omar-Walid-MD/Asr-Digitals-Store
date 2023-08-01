import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { BsFillCartPlusFill, BsFillCartDashFill, BsStarFill, BsPhoneFill, BsLink, BsBoxArrowInUpRight, BsPencil, BsPencilFill, BsTrash2Fill, BsTrashFill, BsInfo } from "react-icons/bs";
import { Link } from 'react-router-dom';

function ProductInfoRow({product, showProduct, editProduct, deleteProduct}) {

    return (
        <div className='product-info-row position-relative'>
            <Row className=' bg-light shadow w-sm-100 m-0 text-dark rounded'>
                <Col className='col-2 d-flex justify-content-center border-end border-3 border-secondary'><img style={{height: "9rem"}} src={require("../img/phone.png")} alt="" /></Col>
                <Col className='col-2 p-3 d-flex justify-content-center border-end border-3 border-secondary'><h3>{product.title}</h3></Col>
                <Col className='col-1 p-3 d-flex justify-content-center border-end border-3 border-secondary'><h3 className='text-danger'>{product.price}</h3></Col>
                <Col className='col-4 p-3 d-flex justify-content-center border-end border-3 border-secondary'>{product.desc}</Col>
                <Col className='col-3 p-3 d-flex justify-content-center'>Specs</Col>
            </Row>
            <div className="position-absolute product-info-row-options bg-light rounded-bottom-3 shadow d-flex align-items-center align-items-md-end gap-2 p-2">
                <Button variant='primary' onClick={()=>{showProduct(product)}}><BsInfo/></Button>
                <Link to={`/product/${product.id}`} className='btn btn-primary'><BsBoxArrowInUpRight/></Link>
                <Button variant='info' onClick={()=>{editProduct(product)}}><BsPencilFill/></Button>
                <Button variant='danger' onClick={()=>{deleteProduct(product)}}><BsTrashFill/></Button>
            </div>

        </div>
    );
}

export default ProductInfoRow;