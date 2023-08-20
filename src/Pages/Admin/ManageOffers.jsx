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
import { BiSolidOffer } from 'react-icons/bi';

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

    const initialFilters = {
        offerId: "",
        productId: "",
        productInfo: "",
        productCategory: "",
        startMonth: "",
        endMonth: "",
        oldPrice: "",
        newPrice: "",
        status: "",
    };

    const [filteredOffers,setFilteredOffers] = useState(offers);
    const [filters,setFilters] = useState(initialFilters);

    function getProductResults()
    {
        let productIds = offers.map((offer) => offer.productId)
        return products.filter((product) => !productIds.includes(product.id) && (`${product.id} ${product.title}`).toLowerCase().includes(productSearch.toLowerCase()));
    }

    function startAddOffer()
    {
        setFormMode("add");
        handleFormModalShow();
    }

    function startEditOffer(offer)
    {
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
        if(data.newPrice >= targetProduct.price)
        {
            setValidationError("price");
        }
        else if(data.start.getTime() < new Date(new Date().toDateString()).getTime())
        {
            setValidationError("dateStart");
        }
        else if(data.end.getTime() <= data.start.getTime())
        {
            setValidationError("dateEnd");
        }
        else
        {
            let newOffer = {
                ...data,
                start: getDateString(data.start),
                end: getDateString(data.end),
                productId: targetProduct.id,
                date: Date.now(),
                id: makeUniqueId(offers),
                status: getDateString(data.start)===getDateString(new Date()) ? "running" : "upcoming"
            };
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

    function handleFilterSearch(e)
    {
        setFilters({...filters,[e.target.name]:e.target.value});
    }

    function handleOptionsScroll(e)
    {
        let optionRows = e.target.querySelectorAll(".product-info-row-options");
        optionRows.forEach((optionsRow) => {
            optionsRow.style.right = "unset";
            optionsRow.style.left = `${e.target.scrollLeft + window.innerWidth/2 - optionsRow.getBoundingClientRect().width/2}px`;
        });
        
    }

    function getFilteredOffers(offers)
    {
        let filteredOffers = offers;
        filteredOffers = filteredOffers.filter((offer) => {

            let product = products.find((p) => p.id === offer.productId);

            let offerFilterObject = {
                offerId:(offer.id),
                productId: (`${offer.productId}`),
                productInfo:(`${product.title} ${product.desc}`),
            }
            let flag = Object.keys(offerFilterObject).every((filterKey) =>
            filters[filterKey] ? offerFilterObject[filterKey] && offerFilterObject[filterKey].toString().toLowerCase().includes(filters[filterKey].toLowerCase()) : true);                
            if(!flag) return false;

            if(filters.startMonth && offer.start.slice(0,-3) !== filters.startMonth) return false;
            if(filters.endMonth && offer.end.slice(0,-3) !== filters.endMonth) return false;
            if(filters.status && offer.status !== filters.status) return false;
            if(filters.oldPrice && product.price !== +filters.oldPrice) return false;
            if(filters.newPrice && offer.newPrice !== +filters.newPrice) return false;

            return true;
        })
             
        return filteredOffers;
    }


    useEffect(()=>{
        if(products) setFilteredOffers(getFilteredOffers(offers));
    },[filters, offers, products]);


    return (
        <div className='py-3 px-0 p-md-3'>
            <div className="d-flex mt-4 ps-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                <BiSolidOffer fontSize={"5rem"}/>
                <h2 className='mt-5 mb-2'>Manage Offers</h2>
            </div>
            <hr className='border-3' />
            <Accordion alwaysOpen className='w-100'>
                <Accordion.Item eventKey="0" className='border-0 bg-transparent'>
                    <Accordion.Header className='w-100 rounded-md-3 bg-secondary px-3 py-2 arrow-white'>
                        <h4 className='text-white m-0'>Filters</h4>
                    </Accordion.Header>
                    <Accordion.Body className='px-0 pt-2 pb-0'>
                        <div className='d-flex bg-secondary rounded-md-3 p-3 d-flex flex-column justify-content-between align-items-start gap-2'>
                            <div className='d-flex flex-column w-100  gap-2 align-items-start'>
                                <p className='me-1 m-0 text-white'>Search</p>
                                <Row className='gy-2 gx-3 w-100 text-dark'>
                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="Offer ID">
                                            <Form.Control type="text" placeholder="Offer ID" name='offerId' value={filters.offerId} onChange={handleFilterSearch} />
                                        </FloatingLabel>
                                    </Col>

                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="Offer Start Month">
                                            <Form.Control as="select" className='text-capitalize' type="text" placeholder="Offer Start Month" name='startMonth' value={filters.startMonth} onChange={handleFilterSearch} >
                                                <option value={""}>--</option>
                                                <option value={"2024-03"}>2024-03</option>
                                                <option value={"2024-02"}>2024-02</option>
                                                <option value={"2024-01"}>2024-01</option>
                                                <option value={"2023-12"}>2023-12</option>
                                                <option value={"2023-11"}>2023-11</option>
                                                <option value={"2023-10"}>2023-10</option>
                                                <option value={"2023-09"}>2023-09</option>
                                                <option value={"2023-08"}>2023-08</option>
                                                <option value={"2023-07"}>2023-07</option>
                                                <option value={"2023-06"}>2023-06</option>
                                                <option value={"2023-05"}>2023-05</option>
                                                <option value={"2023-04"}>2023-04</option>
                                                <option value={"2023-03"}>2023-03</option>
                                                <option value={"2023-02"}>2023-02</option>
                                                <option value={"2023-01"}>2023-01</option>
                                            </Form.Control>
                                        </FloatingLabel>
                                    </Col>

                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="Offer End Month">
                                            <Form.Control as="select" className='text-capitalize' type="text" placeholder="Offer End Month" name='endMonth' value={filters.endMonth} onChange={handleFilterSearch} >
                                                <option value={""}>--</option>
                                                <option value={"2024-03"}>2024-03</option>
                                                <option value={"2024-02"}>2024-02</option>
                                                <option value={"2024-01"}>2024-01</option>
                                                <option value={"2023-12"}>2023-12</option>
                                                <option value={"2023-11"}>2023-11</option>
                                                <option value={"2023-10"}>2023-10</option>
                                                <option value={"2023-09"}>2023-09</option>
                                                <option value={"2023-08"}>2023-08</option>
                                                <option value={"2023-07"}>2023-07</option>
                                                <option value={"2023-06"}>2023-06</option>
                                                <option value={"2023-05"}>2023-05</option>
                                                <option value={"2023-04"}>2023-04</option>
                                                <option value={"2023-03"}>2023-03</option>
                                                <option value={"2023-02"}>2023-02</option>
                                                <option value={"2023-01"}>2023-01</option>
                                            </Form.Control>
                                        </FloatingLabel>
                                    </Col>

                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="Status">
                                            <Form.Control as="select" className='text-capitalize' type="text" placeholder="Status" name='status' value={filters.status} onChange={handleFilterSearch} >
                                                <option value={""}>--</option>
                                                <option value={"upcoming"}>Upcoming</option>
                                                <option value={"running"}>Running</option>
                                                <option value={"closed"}>Closed</option>
                                            </Form.Control>
                                        </FloatingLabel>
                                    </Col>

                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="Product ID">
                                            <Form.Control type="text" placeholder="Product ID" name='productId' value={filters.productId} onChange={handleFilterSearch} />
                                        </FloatingLabel>
                                    </Col>

                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="Product Info">
                                            <Form.Control type="text" placeholder="Product Info" name='productInfo' value={filters.productInfo} onChange={handleFilterSearch} />
                                        </FloatingLabel>
                                    </Col>

                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="Old Price">
                                            <Form.Control type="number" placeholder="Old Price" name='oldPrice' value={filters.oldPrice} onChange={handleFilterSearch} />
                                        </FloatingLabel>
                                    </Col>

                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FloatingLabel controlId="" label="New Price">
                                            <Form.Control type="number" placeholder="New Price" name='newPrice' value={filters.newPrice} onChange={handleFilterSearch} />
                                        </FloatingLabel>
                                    </Col>

                                </Row>
                            </div>
                            <Button className='bg-transparent border-0 text-info p-0' onClick={()=>{setFilters(initialFilters)}}>Clear</Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className='rounded-3 m-3 mx-md-0 overflow-hidden'><Button variant="primary" className='w-100 d-flex main-button border-0 p-1 px-2 align-items-center justify-content-center fs-5 rounded-0' onClick={startAddOffer}><BsPlus className='fs-2'/> Add Offer</Button></div>

            <div className="d-flex flex-column product-info-row-group pb-5 scrollbar light" onScroll={handleOptionsScroll}>
                <div className='d-flex flex-column gap-3 text-white'>
                    <Row className='bg-secondary shadow rounded-md-3 py-2 px-0 m-0 product-info-row'>
                        <Col className='col-1' style={{width: "5%"}}>ID</Col>
                        <Col className='col-2'>Image</Col>
                        <Col className='col-2'>Item Title</Col>
                        <Col className='col-2' style={{width: "12%"}}>Old Price</Col>
                        <Col className='col-2' style={{width: "12%"}}>New Price</Col>
                        <Col className='col-1' style={{width: "12%"}}>Start</Col>
                        <Col className='col-1' style={{width: "12%"}}>End</Col>
                        <Col className='col-1'>Status</Col>

                    </Row>
                    <div className="d-flex flex-column w-100 gap-1 pb-5">
                    {
                        filteredOffers.length && filteredOffers.map((offer) =>
                        {
                            let product = products.find((p) => p.id === offer.productId);

                            return (
                                <div className='product-info-row position-relative'>
                                    <Row className='py-3 bg-white shadow-sm border border-2 rounded-md-3 m-0 text-dark'>
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
                                        <Col className='col-1' style={{width: "12%"}}><h4 className='text-muted price-tag'>{product.price}</h4></Col>
                                        <Col className='col-1' style={{width: "12%"}}><h4 className='text-danger price-tag'>{offer.newPrice}</h4></Col>

                                        <Col className='col-1' style={{width: "12%"}}><p className='m-0'>{offer.start}</p></Col>
                                        <Col className='col-1' style={{width: "12%"}}><p className='m-0'>{offer.end}</p></Col>

                                        <Col className='col-1'><p className={`m-0 text-capitalize status fw-semibold ${offer.status}`}>{offer.status}</p></Col>

                                    </Row>
                                    <div className="position-absolute product-info-row-options bg-light rounded-3 shadow d-flex align-items-center align-items-md-end">
                                        <Link to={`/product/${product.id}`} className='fs-4 btn btn-primary d-flex align-items-center border-0 fw-bold bg-transparent text-info aspect-1 py-2 justify-content-center'><FaArrowUpRightFromSquare/></Link>
                                        <Button variant='primary' className='fs-4 d-flex align-items-center border-0 fw-bold bg-transparent text-primary aspect-1 py-2 justify-content-center' onClick={()=>{startEditOffer(offer)}}><PiPencilSimpleFill/></Button>
                                        <Button variant='danger'className='fs-4 d-flex align-items-center border-0 fw-bold bg-transparent text-danger aspect-1 py-2 justify-content-center' onClick={()=>{startDeleteOffer(offer)}}><BsTrashFill/></Button>
                                    </div>

                                </div>
                            )

                        })
                    }
                    </div>
                </div>
            </div>


            <Modal contentClassName='rounded-md-3' dialogClassName="product-show-modal m-0 position-relative" show={formModal} onHide={handleFormModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton className='bg-light border-0'>
                    <Modal.Title className='text-capitalize'>{formMode} offer</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                {
                    formMode==="add" ?
                    (!targetProduct ?
                    <div>
                        <h5 className='mb-3'>Search Product To Add Offer</h5>
                        <FloatingLabel controlId="floatingProductSearch" label="Search Product name or ID">
                            <Form.Control className='rounded' type="text" placeholder="Search Product name or ID" value={productSearch} onChange={(e)=>{setProductSearch(e.target.value)}} />
                        </FloatingLabel>
                        <hr />
                        <div className='overflow-y-scroll overflow-x-hidden scrollbar white' style={{maxHeight:"70vh",transition: "max-height 0.2s ease-out"}}>
                        {
                            productSearch ?
                            <Row >
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
                            {
                                validationError==="dateStart" ? <div className='error-message text-danger mt-1'>Start Date must not be before today.</div> :
                                validationError==="dateEnd" ? <div className='error-message text-danger mt-1'>End date must be after start date.</div> : ''
                            }


                        </div>
                    </form>)
                    :
                    formMode==="edit" ?
                    (function(){
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
                    <Modal.Footer className='position-sticky z-2 bottom-0 bg-light border-0'>
                        <div className="d-flex align-items-center w-100 gap-2">
                            <Button form={`offer-management-${formMode}`} className='w-100 text-capitalize main-button border-0' type='submit'>{formMode} offer</Button>
                            <Button variant="danger" className='main-button border-0 px-5' onClick={handleFormModalClose}>Discard</Button>
                        </div>
                    </Modal.Footer>
                    :
                    ""
                }
            </Modal>

            <Modal show={deleteModal} onHide={handleDeleteModalClose} centered={true} className='bg-transparent' dialogClassName='product-show-modal m-0 position-relative'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>Delete Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this offer?</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-2 w-100">
                        <Button variant='danger' className='w-100 main-button border-0' onClick={()=>{handleDeleteOffer(offerToDelete)}}>Delete Offer</Button>
                        <Button variant="secondary" className='text-center main-button border-0' onClick={handleDeleteModalClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ManageOffers;