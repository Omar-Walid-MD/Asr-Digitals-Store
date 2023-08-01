import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, editProduct, getProducts } from '../Store/Products/productsSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProductInfoRow from '../Components/ProductInfoRow';
import { BsPlus, BsStarFill } from 'react-icons/bs';

const schema = yup
  .object({
    title: yup.string().required("Please enter a product title..."),
    price: yup.number().required("Please enter a price..."),
    desc: yup.string()
  })
  .required();

function ProductsManagementPage({}) {

    const products = useSelector((store) => store.products.products);
    const dispatch = useDispatch();

    const [productToShow,setProductToShow] = useState();
    const [productToEdit,setProductToEdit] = useState();
    const [productToDelete,setProductToDelete] = useState();

    const [formMode,setFormMode] = useState("add");
    const [filters,setFilters] = useState({search:"",minPrice:0,maxPrice:1000000})
    
    const [formModal,setFormModal] = useState(false);
    const handleFormModalShow = () => setFormModal(true);
    const handleFormModalClose = () => setFormModal(false);

    const [deleteModal,setDeleteModal] = useState(false);
    const handleDeleteModalShow = () => setDeleteModal(true);
    const handleDeleteModalClose = () => setDeleteModal(false);

    const [showModal,setShowModal] = useState(false);
    const handleShowModalShow = () => setShowModal(true);
    const handleShowModalClose = () => setShowModal(false);


    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });

    function showProduct(product)
    {
        setProductToShow(product);
        handleShowModalShow();
    }

    function startAddProduct()
    {
        setFormMode("add");
        handleFormModalShow();
    }

    function startEditProduct(product)
    {
        setFormMode("edit");
        setProductToEdit(product);
        handleFormModalShow();
        Object.keys(schema.fields).forEach((key)=>{
            setValue(key,product[key]);
        })
        
    }

    function startDeleteProduct(product)
    {
        setProductToDelete(product);
        handleDeleteModalShow();
    }

    function handleDeleteProduct(product)
    {
        dispatch(deleteProduct({productId: product.id}));
        handleDeleteModalClose();
        setProductToDelete(null);
    }

    function onSubmitAdd(data)
    {
        dispatch(addProduct(data));
        reset();
        handleFormModalClose();
        setProductToEdit(null);
    }

    function onSubmitEdit(data)
    {
        dispatch(editProduct({productId: productToEdit.id,editedProduct: data}));
        reset();
        handleFormModalClose();
    }

    function handleOptionsScroll(e)
    {
        let optionRows = e.target.querySelectorAll(".product-info-row-options");
        optionRows.forEach((optionsRow) => {
            optionsRow.style.right = "unset";
            optionsRow.style.left = e.target.scrollLeft + "px";
        });
        
    }

    function getFilteredProducts(products)
    {
        let filteredProducts = products;
        if(filters.search)
        {
            filteredProducts = filteredProducts.filter((product) => (`${product.title} ${product.desc}`).toLowerCase().includes((filters.search).toLowerCase()));
        }
        filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice && product.price >= filters.minPrice);
        return filteredProducts;
    }
    
    useEffect(()=>{
        dispatch(getProducts());
    },[]);

    return (
        <div className='bg-light'>
            <div className='p-0 px-md-2'>
                <h2 className='my-4 bg-secondary text-white p-3 px-5 mb-3 mb-sm-2 rounded-sm-3 rounded-bottom-0 shadow d-sm-inline-block'>Product Management</h2>
                <div className='bg-secondary p-3 mb-2 d-flex justify-content-between'>
                    <div><input type="search" value={filters.search} onChange={(e)=>{setFilters({...filters,search:e.target.value})}} /></div>
                    <Button variant="primary" className='d-flex p-1 px-2 align-items-center fs-4' onClick={startAddProduct}><BsPlus/> Add Product</Button>
                </div>

                <div className="bg-secondary p-2 d-flex flex-column shadow product-info-row-group scrollbar" onScroll={handleOptionsScroll}>
                    <div className='d-flex flex-column gap-3 text-white'>
                        <Row className='w-sm-100 product-info-row'>
                            <Col className='col-2'>Image</Col>
                            <Col className='col-2'>Name</Col>
                            <Col className='col-1'>Price</Col>
                            <Col className='col-4'>Description</Col>
                            <Col>Specs</Col>
                        </Row>
                        <div className="d-flex flex-column w-100 gap-2 pb-5">
                        {
                            getFilteredProducts(products).map((product) =>
                            <ProductInfoRow product={product} showProduct={showProduct} editProduct={startEditProduct}  deleteProduct={startDeleteProduct} />
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={formModal} onHide={handleFormModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>{formMode} product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        formMode==="add" ?
                        <form onSubmit={handleSubmit(onSubmitAdd)}>
                            <div className="d-flex flex-column gap-3">
                                <FloatingLabel controlId="floatingProductTitle" label="Product Title">
                                    <Form.Control type="text" placeholder="Product Title" {...register("title")} />
                                    {errors.title ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.title.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingProductPrice" label="Product Price">
                                    <Form.Control type="number" placeholder="Product Price" {...register("price")} />
                                    {errors.price ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.price.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingProductDesc" label="Product Description">
                                    <Form.Control type="text" placeholder="Product Description" {...register("desc")} />
                                    {errors.desc ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.desc.message}</div> : ''}
                                </FloatingLabel>
                            </div>
                            <Button className='w-100 mt-3' type='submit'>Add Product</Button>
                        </form>
                        : formMode==="edit" ?
                        <form onSubmit={handleSubmit(onSubmitEdit)}>
                            <div className="d-flex flex-column gap-3">
                                <FloatingLabel controlId="floatingProductTitle" label="Product Title">
                                    <Form.Control type="text" placeholder="Product Title" {...register("title")} />
                                    {errors.title ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.title.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingProductPrice" label="Product Price">
                                    <Form.Control type="number" placeholder="Product Price" {...register("price")} />
                                    {errors.price ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.price.message}</div> : ''}
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingProductDesc" label="Product Description">
                                    <Form.Control type="text" placeholder="Product Description" {...register("desc")} />
                                    {errors.desc ? <div className='error-message text-white bg-danger rounded-3 shadow-sm ps-1 mt-2'>{errors.desc.message}</div> : ''}
                                </FloatingLabel>
                            </div>
                            <Button className='w-100 mt-3' type='submit'>Edit Product</Button>
                        </form>
                        : ""
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFormModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteModal} onHide={handleDeleteModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete "{productToDelete && productToDelete.title}" ?</p>
                    <Button variant='danger' onClick={()=>{handleDeleteProduct(productToDelete)}}>Delete Product</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteModalClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <Modal dialogClassName="product-show-modal m-0" show={showModal} onHide={handleShowModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>Product Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    productToShow ?
                    <div>
                        <Row>
                            <Col className='col-12 col-sm-4 h-100 p-0'><img className='w-100' src={require("../img/phone.png")} alt="" /></Col>
                            <Col className='col-12 col-sm-8 h-100'>
                                <div className="d-flex flex-column justify-content-between h-100 product-page-col">
                                    <div className='d-flex flex-column gap-2'>
                                        <h1>{productToShow.title}</h1>
                                        <p className='m-0'>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, amet, architecto natus consequatur blanditiis possimus tenetur ullam, totam nemo delectus eum temporibus minima enim? Quidem in eaque et ut nostrum.
                                        </p>
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <p className='m-0 fs-5 text-warning-emphasis fw-semibold'>{productToShow.rating}</p>
                                            <div className='position-relative'>
                                                <div className='d-flex justify-content-between' style={{width: "200px", height: "50px"}}>{[1,2,3,4,5].map((n,index)=><BsStarFill key={"pr-p-b-s-"+index} className={"text-dark fs-3 d-flex justify-content-center w-100"} />)}</div>
                                                <div className="position-absolute top-0 overflow-hidden" style={{width: `${productToShow.rating / 5 * 200}px`}}>
                                                    <div className='d-flex justify-content-between' style={{width: "200px", height: "50px"}}>{[1,2,3,4,5].map((n,index)=><BsStarFill key={"pr-p-g-s-"+index} className={"text-warning fs-3 d-flex justify-content-center w-100"} />)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className='text-danger mt-2 fw-semibold'>{productToShow.price} EGP</h1>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        
                    </div>
                    : ""
                }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProductsManagementPage;