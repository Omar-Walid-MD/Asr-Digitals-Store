import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Row, Form, Modal, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsFillInfoCircleFill, BsPlus, BsTrashFill } from 'react-icons/bs';
import { addOffer, deleteOffer, editOffer } from '../../Store/Offers/offers';
import { getDateString, makeUniqueId } from '../../helpers';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { PiPencilSimpleFill } from 'react-icons/pi';

const schema = yup
  .object({
    newPrice: yup.number().typeError("Please Enter a New Price"),
    start: yup.date().typeError("Please enter a Start Date"),
    end: yup.date().typeError("Please enter an End Date")
  })
  .required();

function ManageOffers({}) {

    
    const offers = useSelector((store) => store.offers.offers);
    const products = useSelector((store) => store.products.products);
    const dispatch = useDispatch();

    const [formMode,setFormMode] = useState("add");
    const [offerToEdit,setOfferToEdit] = useState();
    const [offerToDelete,setOfferToDelete] = useState();
    const [validationError,setValidationError] = useState("");

    const [productSearch,setProductSearch] = useState("");
    const [targetProduct,setTargetProduct] = useState("");

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });

    const [formModal,setFormModal] = useState(false);
    const handleFormModalShow = () => setFormModal(true);
    const handleFormModalClose = () => {
        setFormModal(false);
        setProductSearch("");
        setTargetProduct(null);
        setValidationError("");
        reset();
    };

    const [deleteModal,setDeleteModal] = useState(false);
    const handleDeleteModalShow = () => setDeleteModal(true);
    const handleDeleteModalClose = () => setDeleteModal(false);

    function getProductResults()
    {
        return products.filter((product) => (`${product.id} ${product.title}`).toLowerCase().includes(productSearch.toLowerCase()));
    }

    function startAddOffer()
    {
        setFormMode("add");
        handleFormModalShow();
    }

    function startEditOffer(offer)
    {
        console.log("yes edit");
        setFormMode("edit");
        setOfferToEdit(offer);
        handleFormModalShow();
        Object.keys(schema.fields).forEach((key)=>{
            setValue(key,offer[key]);
        });
        
    }

    function startDeleteOffer(offer)
    {
        setOfferToDelete(offer);
        handleDeleteModalShow();
    }

    function handleDeleteOffer(offer)
    {
        dispatch(deleteOffer({offerId: offer.id}));
        handleDeleteModalClose();
        setOfferToDelete(null);
    }

    function onSubmitAdd(data)
    {
        console.log(data);
        if(data.newPrice >= targetProduct.price)
        {
            setValidationError("price");
        }
        else if(data.end.getTime() <= data.start.getTime())
        {
            setValidationError("date");
        }
        else
        {
            let newOffer = {...data, start: getDateString(data.start), end: getDateString(data.end), productId: targetProduct.id, date: Date.now(), id: makeUniqueId(offers)};
            dispatch(addOffer(newOffer));
            reset();
            handleFormModalClose();
            setValidationError("");
        }
    }

    function onSubmitEdit(data)
    {
        let editedOffer = {...data, start: getDateString(data.start), end: getDateString(data.end)};
        dispatch(editOffer({offerId: offerToEdit.id,editedOffer: editedOffer}));
        reset();
        handleFormModalClose();
    }

    function handleOptionsScroll(e)
    {
        console.log()
        let optionRows = e.target.querySelectorAll(".product-info-row-options");
        optionRows.forEach((optionsRow) => {
            optionsRow.style.right = "unset";

            optionsRow.style.transform = `translateX(${e.target.scrollLeft + window.innerWidth/2 - optionsRow.getBoundingClientRect().width/2}px)` ;

            // optionsRow.style.left = e.target.scrollLeft + window.innerWidth/2 - optionsRow.getBoundingClientRect().width/2 + "px";
        });
        
    }



    return (
        <div className='py-3 px-0 p-md-3'>
            <Container className='px-2'> <h2 className='mt-5 mb-2'>Manage Offers</h2> </Container>
            <hr className='border-3' />
            <Accordion alwaysOpen defaultActiveKey={"0"} className='w-100'>
                <Accordion.Item eventKey="0" className='border-0 bg-light'>
                    <Accordion.Header className='w-100 rounded-sm-3 bg-secondary px-3 py-2 arrow-white'>
                        <h4 className='text-white m-0'>Filters</h4>
                    </Accordion.Header>
                    <Accordion.Body className='px-0 pt-2'>
                        <div className='d-flex bg-secondary rounded-sm-3 p-3 d-flex flex-column justify-content-between align-items-start gap-2'>
                            <div className='d-flex flex-column w-100  gap-2 align-items-start'>
                                <h5 className='me-1 m-0 text-white'>Search</h5>
                                <Row className='g-1'>


                                </Row>
                            </div>
                        
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className='rounded-sm-3 overflow-hidden my-3'><Button variant="primary" className='w-100 d-flex  p-1 px-2 align-items-center justify-content-center fs-5 rounded-0' onClick={startAddOffer}><BsPlus className='fs-2'/> Add Offer</Button></div>

            <div className="d-flex flex-column product-info-row-group pb-5 scrollbar light" onScroll={handleOptionsScroll}>
                <div className='d-flex flex-column gap-3 text-white'>
                    <Row className='bg-secondary shadow rounded-sm-3 py-2 px-0 m-0 product-info-row'>
                        <Col className='col-1' style={{width: "5%"}}>ID</Col>
                        <Col className='col-2'>Image</Col>
                        <Col className='col-2'>Item Title</Col>
                        <Col className='col-2' style={{width: "15%"}}>Old Price</Col>
                        <Col className='col-2' style={{width: "15%"}}>New Price</Col>
                        <Col className='col-2' style={{width: "15%"}}>Start</Col>
                        <Col className='col-2' style={{width: "15%"}}>End</Col>
                    </Row>
                    <div className="d-flex flex-column w-100 gap-1 pb-5">
                    {
                        offers.map((offer) =>
                        {
                            let product = products.find((p) => p.id === offer.productId);

                            return (
                                <div className='product-info-row position-relative'>
                                    <Row className='py-3 bg-white shadow-sm border border-2 rounded-3 m-0 text-dark'>
                                        <Col className='col-1' style={{width: "5%"}}>{offer.id}</Col>
                                        <Col className='col-2'>
                                            <div className='rounded-2 overflow-hidden h-100' style={{width:"min(10rem,40vw)"}} ><img className='w-100' src={product.image} alt="" /></div>
                                        </Col>
                                        <Col className='col-2'>
                                            <div className='w-100'>
                                                <p className='m-0'>ID: {product.id}</p>
                                                <h4>{product.title}</h4>
                                                
                                            </div>
                                        </Col>
                                        <Col className='col-2' style={{width: "15%"}}><h4 className='text-muted price-tag'>{product.price}</h4></Col>
                                        <Col className='col-2' style={{width: "15%"}}><h4 className='text-danger price-tag'>{offer.newPrice}</h4></Col>

                                        <Col className='col-2' style={{width: "15%"}}><p className='m-0'>{offer.start}</p></Col>
                                        <Col className='col-2' style={{width: "15%"}}><p className='m-0'>{offer.end}</p></Col>

                                    </Row>
                                    <div className="position-absolute product-info-row-options bg-light rounded-3 shadow d-flex align-items-center align-items-md-end">
                                        <Link to={`/product/${product.id}`} className='fs-4 btn btn-primary d-flex align-items-center border-0 fw-bold bg-transparent text-info aspect-1 py-2 justify-content-center'><FaArrowUpRightFromSquare/></Link>
                                        <Button variant='primary' className='fs-4 d-flex align-items-center border-0 fw-bold bg-transparent text-primary aspect-1 py-2 justify-content-center' onClick={()=>{startEditOffer(offer)}}><PiPencilSimpleFill/></Button>
                                        <Button variant='danger'className='fs-4 d-flex align-items-center border-0 fw-bold bg-transparent text-danger aspect-1 py-2 justify-content-center' onClick={()=>{}}><BsTrashFill/></Button>
                                    </div>

                                </div>
                            )

                        })
                    }
                    </div>
                </div>
            </div>


            <Modal contentClassName='rounded-md-3' dialogClassName="product-show-modal m-0 position-relative" show={formModal} onHide={handleFormModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>{formMode} offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    formMode==="add" ?
                    (!targetProduct ?
                    <div>
                        <h5 className='mb-3'>Search Product To Add Offer</h5>
                        <FloatingLabel controlId="floatingProductSearch" label="Search Product name or ID">
                            <Form.Control className='rounded' type="text" placeholder="Search Product name or ID" value={productSearch} onChange={(e)=>{setProductSearch(e.target.value)}} />
                        </FloatingLabel>
                        <hr />
                        <div>
                        {
                            productSearch ?
                            <Row>
                            {
                                getProductResults().map((product) =>
                                
                                <Col as={Button} className='p-1 bg-transparent border-0' onClick={()=>{setTargetProduct(product); setValue("newPrice",product.price); setValue("start",new Date().toISOString().split('T')[0]); setValue("end",new Date(Date.now()+(1000*60*60*24*30)).toISOString().split('T')[0]);}}>
                                    <div className='p-3 rounded-3 shadow-sm border h-100 d-flex flex-column align-items-center text-dark'>
                                        <p>ID: {product.id}</p>
                                        <div className='rounded-2 overflow-hidden' style={{width:"min(10rem,30vw)"}}><img className='w-100' src={product.image} alt="" /></div>
                                        <h5 className=' mt-3'>{product.title}</h5>
                                        <h4 className='text-danger'>{product.price}</h4>
                                    </div>
                                </Col>
                                )
                            }
                            </Row>
                            : ""
                        }
                        </div>
                    </div>
                    :
                    <form className='d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3' id='offer-management-add' onSubmit={handleSubmit(onSubmitAdd)}>
                        <div className='rounded-2 overflow-hidden h-100' style={{width:"min(20rem,40vw)"}} ><img className='w-100' src={targetProduct.image} alt="" /></div>
                        <div className='w-100 text-center text-md-start'>
                            <p className='m-0'>ID: {targetProduct.id}</p>
                            <h2>{targetProduct.title}</h2>
                            <h4 className='text-danger price-tag price-old mb-4'>{targetProduct.price}</h4>

                            <FloatingLabel controlId="floatingProductSearch" label="New Price">
                                <Form.Control className='rounded' type="number" placeholder="Enter New Price" {...register("newPrice")} />
                                {errors.newPrice ? <div className='error-message text-danger mt-1'>{errors.newPrice.message}</div> : ''}
                                {validationError==="price" ? <div className='error-message text-danger mt-1'>New price must be less than current price.</div> : ''}

                            </FloatingLabel>
                            <div className='d-flex gap-2 mt-2'>
                                <FloatingLabel className='w-100' controlId="floatingProductSearch" label="Offer Start">
                                    <Form.Control className='rounded' type="date" placeholder="Enter Offer Start" {...register("start")} />
                                </FloatingLabel>
                                {errors.start ? <div className='error-message text-danger mt-1'>{errors.start.message}</div> : ''}
                                <FloatingLabel className='w-100' controlId="floatingProductSearch" label="Offer End">
                                    <Form.Control className='rounded' type="date" placeholder="Enter Offer End" {...register("end")} />
                                </FloatingLabel>
                                {errors.end ? <div className='error-message text-danger mt-1'>{errors.end.message}</div> : ''}
                            </div>
                            {validationError==="date" ? <div className='error-message text-danger mt-1'>End date must be after start date.</div> : ''}


                        </div>
                    </form>)
                    :
                    formMode==="edit" ?
                    (function(){
                        console.log("ugh?");
                        let product = products.find((p) => p.id === offerToEdit.productId);
                        return (
                            <form className='d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3' id='offer-management-edit' onSubmit={handleSubmit(onSubmitEdit)}>
                                <div className='rounded-2 overflow-hidden h-100' style={{width:"min(20rem,40vw)"}} ><img className='w-100' src={product.image} alt="" /></div>
                                <div className='w-100 text-center text-md-start'>
                                    <p className='m-0'>ID: {product.id}</p>
                                    <h2>{product.title}</h2>
                                    <h4 className='text-danger price-tag price-old mb-4'>{product.price}</h4>

                                    <FloatingLabel controlId="floatingProductSearch" label="New Price">
                                        <Form.Control className='rounded' type="number" placeholder="Enter New Price" {...register("newPrice")} />
                                        {errors.newPrice ? <div className='error-message text-danger mt-1'>{errors.newPrice.message}</div> : ''}
                                        {validationError==="price" ? <div className='error-message text-danger mt-1'>New price must be less than current price.</div> : ''}

                                    </FloatingLabel>
                                    <div className='d-flex gap-2 mt-2'>
                                        <FloatingLabel className='w-100' controlId="floatingProductSearch" label="Offer Start">
                                            <Form.Control className='rounded' type="date" placeholder="Enter Offer Start" {...register("start")} />
                                        </FloatingLabel>
                                        {errors.start ? <div className='error-message text-danger mt-1'>{errors.start.message}</div> : ''}
                                        <FloatingLabel className='w-100' controlId="floatingProductSearch" label="Offer End">
                                            <Form.Control className='rounded' type="date" placeholder="Enter Offer End" {...register("end")} />
                                        </FloatingLabel>
                                        {errors.end ? <div className='error-message text-danger mt-1'>{errors.end.message}</div> : ''}
                                    </div>
                                    {validationError==="date" ? <div className='error-message text-danger mt-1'>End date must be after start date.</div> : ''}


                                </div>
                            </form>
                        )
                    })()
                    
                    : ""
                } 
                </Modal.Body>
                {
                    ((formMode==="add" && targetProduct) || formMode==="edit") ?
                    <Modal.Footer className='position-sticky z-2 bottom-0 bg-white'>
                        <div className="d-flex align-items-center w-100 gap-2">
                            <Button form={`offer-management-${formMode}`} className='w-100 text-capitalize' type='submit'>{formMode} offer</Button>
                            <Button variant="danger" onClick={handleFormModalClose}>Discard</Button>
                        </div>
                    </Modal.Footer>
                    :
                    ""
                }
            </Modal>

            <Modal show={deleteModal} onHide={handleDeleteModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this offer?</p>
                    <Button variant='danger' onClick={()=>{handleDeleteOffer(offerToDelete)}}>Delete Product</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ManageOffers;