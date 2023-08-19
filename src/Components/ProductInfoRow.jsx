import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { BsBoxArrowInUpRight, BsPencil, BsPencilFill, BsTrash2Fill, BsTrashFill, BsFillInfoCircleFill, BsInfoCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PiPencilSimpleFill } from "react-icons/pi";
import { onImgError } from '../helpers';

function ProductInfoRow({product, showProduct, editProduct, deleteProduct}) {

    return (
        <div className='product-info-row position-relative '>
            <Row className='bg-white shadow-sm w-sm-100 m-0 text-dark rounded-md-3 border'>
                <Col className='col-1 d-flex justify-content-center'>{product.id}</Col>
                <Col className='col-2 d-flex justify-content-center py-2'><img className='rounded-3 shadow-sm border' style={{height: "9rem"}} src={product.image} onError={onImgError} alt="" /></Col>
                <Col className='col-2 p-3 d-flex justify-content-center'><h5>{product.title}</h5></Col>
                <Col className='col-1 p-3 d-flex justify-content-center' style={{width: "8%"}}><h5 className='text-danger'>{product.price}</h5></Col>
                <Col className='col-1 p-3 d-flex justify-content-center text-capitalize' style={{width: "8%"}}>{product.category}</Col>
                <Col className='col-1 p-3 d-flex justify-content-start' style={{width: "22%"}}>{product.desc}</Col>
                <Col className='p-3 d-flex justify-content-center'>
                    <div>
                    {
                        product.specs &&
                        Object.keys(product.specs).map((spec) =>
                        <div className='d-inline-block rounded-pill border border-2 border-primary p-1 px-2 m-1 shadow-sm'>{product.specs[spec]}</div>
                        
                        )
                    }
                    </div>
                </Col>
            </Row>
            <div className="position-absolute product-info-row-options bg-light rounded-3 shadow d-flex align-items-center align-items-md-end">
                <Button variant='primary' className='fs-4 d-flex align-items-center border-0 fw-bold bg-transparent text-success aspect-1 py-2 justify-content-center' onClick={()=>{showProduct(product)}}><BsFillInfoCircleFill/></Button>
                <Link to={`/product/${product.id}`} className='fs-4 btn btn-primary d-flex align-items-center border-0 fw-bold bg-transparent text-info aspect-1 py-2 justify-content-center'><FaArrowUpRightFromSquare/></Link>
                <Button variant='primary' className='fs-4 d-flex align-items-center border-0 fw-bold bg-transparent text-primary aspect-1 py-2 justify-content-center' onClick={()=>{editProduct(product)}}><PiPencilSimpleFill/></Button>
                <Button variant='danger'className='fs-4 d-flex align-items-center border-0 fw-bold bg-transparent text-danger aspect-1 py-2 justify-content-center' onClick={()=>{deleteProduct(product)}}><BsTrashFill/></Button>
            </div>

        </div>
    );
}

export default ProductInfoRow;