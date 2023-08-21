import React, { useEffect, useRef, useState } from 'react';
import { Accordion, Button, Col, Container, Dropdown, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, editProduct, getProducts } from '../../Store/Products/productsSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProductInfoRow from '../../Components/ProductInfoRow';
import { BsCaretDown, BsCaretDownFill, BsCaretUpFill, BsPlus, BsStarFill, BsCheck, BsFillPhoneFill } from 'react-icons/bs';
import { getCapitalized, makeUniqueId, onImgError } from '../../helpers';
import TwoRangeSlider from '../../Components/TwoRangeSlider';
import { BiSolidCopy } from 'react-icons/bi';
const schema = yup
  .object({
    title: yup.string().required("Please enter a product title..."),
    image: yup.string().url().required("Please enter an image link"),
    price: yup.number().typeError("Please enter a valid price...").required("Please enter a price..."),
    desc: yup.string(),

    category: yup.string().required("Please select a category")
  })
  .required();

function ManageProducts({}) {

    const products = useSelector((store) => store.products.products);
    const productsInfo = useSelector((store) => store.products.productsInfo);
    const dispatch = useDispatch();

    const [productPreviewImage, setProductPreviewImage] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productSpecs, setProductSpecs] = useState({});

    const [productToShow,setProductToShow] = useState();
    const [productToEdit,setProductToEdit] = useState();
    const [productToDelete,setProductToDelete] = useState();

    const initialFilters = {search:"",categories:[], minPrice: 0, maxPrice: 5000, specs:{}};

    const [formMode,setFormMode] = useState("add");
    const [filters,setFilters] = useState(initialFilters);
    const [specFilterOptions,setSpecFilterOptions] = useState({});
    const [filteredProducts,setFilteredProducts] = useState(products);
    const [sort,setSort] = useState({type: "id",order: "asc"});
    const [formAccordKey,setFormAccordKey] = useState("0");

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });
    
    const errorInputIndexes = {
        title: "0",
        image: "0",
        price: "0",
        category: "1"
    }

    const [formModal,setFormModal] = useState(false);
    const handleFormModalShow = () => setFormModal(true);
    const handleFormModalClose = () => {
        setFormModal(false);
        setValue("category","");
        setProductCategory("");
        setProductSpecs({});
        setProductPreviewImage("");
        reset();
    };

    const [deleteModal,setDeleteModal] = useState(false);
    const handleDeleteModalShow = () => setDeleteModal(true);
    const handleDeleteModalClose = () => setDeleteModal(false);

    const [showModal,setShowModal] = useState(false);
    const handleShowModalShow = () => setShowModal(true);
    const handleShowModalClose = () => setShowModal(false);

    const mainScroll = useRef();
    const dummyScroll = useRef();

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
        setProductPreviewImage(product.image);
        setProductCategory(product.category);
        setProductSpecs(product.specs);
        handleFormModalShow();
        Object.keys(schema.fields).forEach((key)=>{
            setValue(key,product[key]);
        });
        
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
        let newProduct = {...data,specs: productSpecs, rating: 0, id: makeUniqueId(products)};
        dispatch(addProduct(newProduct));
        reset();
        handleFormModalClose();
        setProductToEdit(null);
    }

    function onSubmitEdit(data)
    {
        let editedProduct = {...data,specs: productSpecs};
        dispatch(editProduct({productId: productToEdit.id,editedProduct: editedProduct}));
        reset();
        handleFormModalClose();
    }

    function syncScroll(e,targetScroll)
    {
        if(targetScroll)
        {
            targetScroll.scrollLeft = e.target.scrollLeft;
        }
    }

    function handleOptionsScroll(e)
    {
        let optionRows = e.target.querySelectorAll(".product-info-row-options");
        optionRows.forEach((optionsRow) => {
            optionsRow.style.right = "unset";
            optionsRow.style.left = `${e.target.scrollLeft + window.innerWidth/2 - optionsRow.getBoundingClientRect().width/2}px`;
        });        
    }

    function handleSort(sortType)
    {
        if(sort.type!==sortType)
        {
            setSort({type:sortType,order:"asc"});
        }
        else
        {
            setSort({...sort,order: sort.order==="asc" ? "desc" : "asc"});
        }
    }

    function getFilteredProducts(products)
    {
        let filteredProducts = products;
        if(filters.search)
        {
            filteredProducts = filteredProducts.filter((product) => (`${product.title} ${product.desc}`).toLowerCase().includes((filters.search).toLowerCase()));
        }
        filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice && product.price >= filters.minPrice);
        
        if(filters.categories.length) filteredProducts = filteredProducts.filter((product) => filters.categories.includes(product.category));

        filteredProducts = filteredProducts.filter((product)=>Object.keys(filters.specs).every((specKey)=>
            filters.specs[specKey].length ? product.specs[specKey] && filters.specs[specKey].includes(product.specs[specKey]) : true));                
     
        return filteredProducts;
    }

    function getSortedProducts(products)
    {
        let sortedProducts = products;
        if(sort.type==="id")
        {
            sortedProducts = sortedProducts.sort((a,b)=>{
                return a.id >= b.id ? 1 : -1;
            });
        }
        else if(sort.type==="price")
        {
            sortedProducts = sortedProducts.sort((a,b)=>{
                return b.price - a.price;
            });
        }
        else if(sort.type==="name")
        {
            sortedProducts = sortedProducts.sort((a,b)=>{
                return a.title >= b.title ? 1 : -1;
            });
        }

        if(sort.order==="desc")
        {
            sortedProducts.reverse();
        }
        return sortedProducts;
    }

    function handleFilterCategories(category)
    {
        let updatedCategories = [];
        if(filters.categories.includes(category))
        {
            updatedCategories = filters.categories.filter((categoryInList) => categoryInList !== category);
        }
        else
        {
            updatedCategories = [...filters.categories,category];
        }
        setFilters({...filters,categories: updatedCategories});
    }

    function handleFilterSpecs(specCode,specValue)
    {
        let updatedFilter = filters;
        if(specValue)
        {
            if(filters.specs[specCode] && filters.specs[specCode].includes(specValue))
            {
                updatedFilter = {...filters,specs: {...filters.specs,[specCode]: filters.specs[specCode].filter((specInList) => specInList !== specValue)}};
            }
            else
            {
                updatedFilter = {...filters,specs: {...filters.specs,[specCode]: filters.specs[specCode] ?  [...filters.specs[specCode],specValue] : [specValue]}};
            }
        }
        else
        {
            updatedFilter = {...filters,specs: {...filters.specs,[specCode]: []}};
        }
        setFilters(updatedFilter);
    }

    function getSpecFilterOptions(products)
    {
        if(productsInfo.categories && products)
        {
            let specList = productsInfo.categories;
            let specOptions = {};
            products.map((product)=>specList.find((cat) => cat.name === product.category).specs.map((spec)=>{specOptions[spec.code] = {...spec,availableValues:[]}}));
            for (let i = 0; i < products.length; i++)
            {
                const product = products[i];
                
                for (let s = 0; s < Object.keys(product.specs).length; s++)
                {
                    if(specOptions[Object.keys(product.specs)[s]] && !specOptions[Object.keys(product.specs)[s]].availableValues.includes(Object.values(product.specs)[s]))
                        specOptions[Object.keys(product.specs)[s]].availableValues.push(Object.values(product.specs)[s]);    
                }
                
            }
            return specOptions;
        }
    
    }

    useEffect(()=>{
        if(Object.keys(errors).length > 0) setFormAccordKey(errorInputIndexes[Object.keys(errors)[0]])
    },[errors]);

    useEffect(()=>{
        setFilteredProducts(getSortedProducts(getFilteredProducts(products)));
        setSpecFilterOptions(getSpecFilterOptions(products));
    },[filters, sort, products, productsInfo]);


    return (
        <div className='py-3 px-0 p-md-3'>
            <div className="d-flex mt-4 ps-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                <BsFillPhoneFill fontSize={"5rem"}/>
                <h2 className='mt-5 mb-2'>Manage Products</h2>
            </div>
            <hr className='border-3' />
            <Accordion className='w-100 rounded-md-3'>
                <Accordion.Item eventKey="0" className='border-0 bg-transparent'>
                    <Accordion.Header className='w-100 rounded-md-3 bg-secondary px-3 py-2 text-white arrow-white'>
                        <h4 className='text-white m-0'>Filters</h4>
                    </Accordion.Header>
                    <Accordion.Body className='px-0 pt-2 pb-0'>
                        <div className='d-flex bg-secondary rounded-md-3 p-3 d-flex flex-column justify-content-between align-items-start gap-2'>
                            <div className='d-flex flex-column w-100  gap-2 align-items-start'>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-5">
                                    <div className='w-100'>
                                        <p className='me-1 m-0 text-white fw-semibold mb-2'>Search</p>
                                        <Form.Control type="search" placeholder="Search Products"  value={filters.search} onChange={(e)=>{setFilters({...filters,search:e.target.value})}} />
                                    </div>
                                    <div className='w-100'>
                                        <p className='me-1 m-0 text-white fw-semibold mb-2'>Price</p>
                                        <div style={{width: "min(30rem,100%)"}} className='fs-4'>
                                            <TwoRangeSlider minValue={filters.minPrice} maxValue={filters.maxPrice}
                                            minLimit={0} maxLimit={5000} snap={100}
                                            setMin={(value)=>{setFilters(prev => ({...prev,minPrice:value}));}}
                                            setMax={(value)=>{setFilters(prev => ({...prev,maxPrice:value}));}} 
                                            labelClassName={"text-white"}/>

                                        </div>

                                    </div>
                                </div>
                                {/* <hr className='w-100 border-white border-2 my-2 mb-1' /> */}
                                <hr className='w-100 border-white border-2 my-2 mb-1' />
                                <div className='d-flex flex-column gap-2'>
                                    <p className='m-0 text-white fw-semibold'>Categories</p>
                                    <div>
                                        <Row className='gy-2 m-0'>
                                        {
                                            productsInfo.categories && productsInfo.categories.map((category) =>
                                            <Col className='px-1 col-6 col-sm-3 col-md-2'><Button variant='secondary' className={`w-100 d-flex btn-secondary align-items-center justify-content-between text-capitalize ${filters.categories.includes(category.name) ? "bg-primary border-primary" : "bg-secondary"}`} onClick={()=>{handleFilterCategories(category.name)}}>{category.name}</Button></Col>
                                            )
                                        }
                                        </Row>
                                    </div>
                                </div>
                                <hr className='w-100 border-white border-2 my-2 mb-1' />
                                <div className='d-flex flex-column gap-2'>
                                    <p className='me-1 m-0 text-white fw-semibold'>Specs</p>
                                    <Row className='gy-2 m-0'>
                                    {
                                        specFilterOptions && Object.keys(specFilterOptions).map((spec) =>
                                        
                                        <Col className='px-1'>
                                            <Dropdown autoClose="outside">
                                                <Dropdown.Toggle className={`w-100 d-flex align-items-center justify-content-between text-capitalize ${(filters.specs[spec] && filters.specs[spec].length) ? "bg-primary border-primary" : "bg-secondary"}`} style={{width: "6em"}} variant="secondary" id="dropdown-basic">
                                                    {specFilterOptions[spec].name}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className='p-0 rounded-2 overflow-hidden w-100 dropdown-select-menu' >
                                                    <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark`}><Button className='bg-transparent border-0 d-flex justify-content-between text-danger text-capitalize w-100' onClick={()=>{handleFilterSpecs(spec)}}> None </Button></Dropdown.Item>
                                                {
                                                    specFilterOptions[spec].availableValues.map((specValue) => 
                                                    <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${(filters.specs[spec] && filters.specs[spec].includes(specValue)) ? "selected" : ""}`}><Button className='bg-transparent border-0 d-flex justify-content-between text-dark text-capitalize w-100' onClick={()=>{handleFilterSpecs(spec,specValue)}}>{specValue} <BsCheck className='dropdown-item-check d-none fs-4'/> </Button> </Dropdown.Item>
                                                    )
                                                }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        )
                                    }
                                    </Row>
                                </div>
                            </div>
                            <hr className='w-100 border-white border-2 my-2 mb-1' />
                            <Button className='bg-transparent border-0 text-info p-0' onClick={()=>{setFilters(initialFilters)}}>Clear</Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            
            <div className='rounded-3 m-3 mx-md-0 overflow-hidden'><Button variant="primary" className='w-100 d-flex main-button border-0 p-1 px-2 align-items-center justify-content-center fs-5 rounded-0' onClick={startAddProduct}><BsPlus className='fs-2'/> Add Product</Button></div>
            
            <div className='position-fixed right-0 left-0 w-100 px-0 px-md-3 z-3 bottom-0'>
                <div className='overflow-x-scroll scrollbar light scrollbar-lg ' style={{backdropFilter:"none"}} ref={dummyScroll} onScroll={(e)=>{syncScroll(e,mainScroll.current)}}>
                    <div style={{width:"1000px",height:"0.1em"}}></div>
                </div>
            </div>
            
            <div className="d-flex flex-column product-info-row-group pb-5 " ref={mainScroll} onScroll={(e)=>{handleOptionsScroll(e);syncScroll(e,dummyScroll.current)}} onMouseEnter={handleOptionsScroll} onTouchStart={handleOptionsScroll} >
                <div className='d-flex flex-column gap-3 text-white'>
                    <Row className='bg-secondary shadow rounded-md-3 py-2 px-0 m-0 product-info-row'>
                        <Col className='col-1 pe-0'>
                            <Button variant="transparent" className='w-100 text-white d-flex align-items-center justify-content-between' onClick={()=>{handleSort("id")}}>
                                ID
                                {
                                    sort.type==="id" ? sort.order==="asc" ?
                                    <BsCaretDownFill /> : <BsCaretUpFill/>
                                    : <BsCaretDownFill style={{opacity:"0.25"}} />
                                }
                                
                            </Button>
                        </Col>
                        <Col className='col-2 pe-0 d-flex align-items-center'>Image</Col>
                        <Col className='col-2 pe-0'>
                            <Button variant="transparent" className='w-100 text-white d-flex align-items-center justify-content-between' onClick={()=>{handleSort("name")}}>
                                Name
                                {
                                    sort.type==="name" ? sort.order==="asc" ?
                                    <BsCaretDownFill /> : <BsCaretUpFill/>
                                    : <BsCaretDownFill style={{opacity:"0.25"}} />
                                }
                                
                            </Button>
                        </Col>
                        <Col className='col-1 px-0' style={{width: "8%"}}>
                            <Button variant="transparent" className='w-100 text-white d-flex align-items-center justify-content-between' onClick={()=>{handleSort("price")}}>
                                Price
                                {
                                    sort.type==="price" ? sort.order==="asc" ?
                                    <BsCaretDownFill /> : <BsCaretUpFill/>
                                    : <BsCaretDownFill style={{opacity:"0.25"}} />
                                }
                                
                            </Button>
                        </Col>
                        <Col className='col-1 pe-0 d-flex align-items-center' style={{width: "8%"}}>Category</Col>

                        <Col className='col-1 pe-0 d-flex align-items-center' style={{width: "22%"}}>Description</Col>
                        <Col className='pe-0 d-flex align-items-center'>Specs</Col>
                    </Row>
                    <div className="d-flex flex-column w-100 gap-1 pb-5">
                    {
                        filteredProducts && filteredProducts.map((product) =>
                        <ProductInfoRow product={product} showProduct={showProduct} editProduct={startEditProduct}  deleteProduct={startDeleteProduct} />
                        )
                    }
                    </div>
                </div>
            </div>

            <Modal contentClassName='rounded-md-3' dialogClassName="product-show-modal m-0 position-relative" show={formModal} onHide={handleFormModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>{formMode} product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        formMode==="add" ?
                        <form id='product-management-add' onSubmit={handleSubmit(onSubmitAdd)}>
                            <Accordion activeKey={formAccordKey}>

                                <Accordion.Item eventKey="0" className='border-0 purchase-accordion purchase-record'>
                                    <Accordion.Header onClick={()=>{setFormAccordKey(formAccordKey==="0" ? "" : "0")}}>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>General</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0 pb-5'>
                                        <Row className='gy-4'>
                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductTitle" label="Product Title">
                                                    <Form.Control type="text" placeholder="Product Title" {...register("title")} />
                                                    {errors.title ? <div className='error-message text-danger mt-1'>{errors.title.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>
                                            
                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductPrice" label="Product Price">
                                                    <Form.Control type="number" placeholder="Product Price" {...register("price")} />
                                                    {errors.price ? <div className='error-message text-danger mt-1'>{errors.price.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6'>
                                                <div className='d-flex justify-content-center h-100'>
                                                    <div className="d-flex flex-column">
                                                        <div className='d-flex align-items-center justify-content-center border border-bottom-0 rounded-top shadow-sm p-2 position-relative w-100'  style={{height: "250px", aspectRatio: "1"}}>
                                                            <img className="h-100" src={productPreviewImage} onError={onImgError} />
                                                            <span className='position-absolute bottom-0 left-0 text-muted m-2' style={{fontSize:"0.8rem"}}>Image Preview</span>
                                                        </div>
                                                        <FloatingLabel controlId="floatingProductImage" label="Product Image Link">
                                                            <Form.Control className='rounded-0 rounded-bottom' type="text" placeholder="Product Image Link" {...register("image")} onInput={(e)=>{setProductPreviewImage(e.target.value);}} />
                                                            {errors.image ? <div className='error-message text-danger mt-1'>{errors.image.message}</div> : ''}
                                                        </FloatingLabel>

                                                    </div>
                                                </div>
                                            </Col>

                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductDesc" label="Product Description" >
                                                    <Form.Control as="textarea"  type="text" style={{minHeight: "307.5px"}} placeholder="Product Description" {...register("desc")} />
                                                    {errors.desc ? <div className='error-message text-danger mt-1'>{errors.desc.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className='border-0 purchase-accordion purchase-record'>
                                    <Accordion.Header onClick={()=>{setFormAccordKey(formAccordKey==="1" ? "" : "1")}}>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>Category</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0 pb-5'>
                                        <Row className='gy-4'>
                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductCategory" label="Product Category">
                                                    <Form.Control as="select" className='text-capitalize' type="text" placeholder="Product Category" {...register("category")} onInput={(e)=>{setProductCategory(e.target.value);}}>
                                                        <option  value="">--Select Category--</option>
                                                    {
                                                        productsInfo.categories ? productsInfo.categories.map((category) =>
                                                        <option  value={category.name}>{category.name}</option>
                                                        )
                                                        : ""
                                                    }
                                                    </Form.Control>
                                                    {errors.category ? <div className='error-message text-danger mt-1'>{errors.category.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>
                                            
                                            {
                                                productCategory ?
                                                <Container>
                                                    <p className='m-0 mb-2 mt-4'>Specs</p>
                                                    <hr className='w-100 border-1 mt-2'/>
                                                    <Row className='g-3'>
                                                    {
                                                        productsInfo.categories.find((category) => category.name === productCategory).specs.map((spec) =>
                                                        
                                                        <Col className='col-12 col-sm-6'>
                                                            <FloatingLabel controlId="" label={getCapitalized(spec.name)}>
                                                                <Form.Control type="text" placeholder={spec.name} name={spec.code} value={productSpecs[spec.code]} onChange={(e)=>{setProductSpecs(prev => ({...prev,[spec.code]:e.target.value}))}} />
                                                            </FloatingLabel>
                                                        </Col>
                                                        )
                                                    }
                                                    </Row>
                                                </Container>
                                                : ""
                                            }
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </form>
                        : formMode==="edit" ?
                        <form id='product-management-edit' onSubmit={handleSubmit(onSubmitEdit)}>
                            <Accordion defaultActiveKey="0">

                                <Accordion.Item eventKey="0" onClick={()=>{setFormAccordKey("0")}} className='border-0 purchase-accordion purchase-record'>
                                    <Accordion.Header>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>General</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0 pb-5'>
                                        <Row className='gy-4'>
                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductTitle" label="Product Title">
                                                    <Form.Control type="text" placeholder="Product Title" {...register("title")} />
                                                    {errors.title ? <div className='error-message text-danger mt-1'>{errors.title.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>
                                            
                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductPrice" label="Product Price">
                                                    <Form.Control type="number" placeholder="Product Price" {...register("price")} />
                                                    {errors.price ? <div className='error-message text-danger mt-1'>{errors.price.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>

                                            <Col className='col-12 col-sm-6'>
                                                <div className="d-flex flex-column">
                                                    <div className='d-flex align-items-center justify-content-center border border-bottom-0 rounded-top shadow-sm p-2 position-relative' style={{height: "200px", aspectRatio: "1"}}>
                                                        <img className="h-100" src={productPreviewImage} onError={(e)=>{e.target.src = require("../../img/image-placeholder.png")}} />
                                                        <span className='position-absolute bottom-0 left-0 text-muted m-2' style={{fontSize:"0.8rem"}}>Image Preview</span>
                                                    </div>
                                                    <FloatingLabel controlId="floatingProductImage" label="Product Image Link">
                                                        <Form.Control className='rounded-0 rounded-bottom' type="text" placeholder="Product Image Link" {...register("image")} onInput={(e)=>{setProductPreviewImage(e.target.value);}} />
                                                        {errors.image ? <div className='error-message text-danger mt-1'>{errors.image.message}</div> : ''}
                                                    </FloatingLabel>

                                                </div>
                                            </Col>

                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductDesc" label="Product Description" >
                                                    <Form.Control as="textarea"  type="text" style={{minHeight: "260px"}} placeholder="Product Description" {...register("desc")} />
                                                    {errors.desc ? <div className='error-message text-danger mt-1'>{errors.desc.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" onClick={()=>{setFormAccordKey("0")}} className='border-0 purchase-accordion purchase-record'>
                                    <Accordion.Header>
                                        <div className="d-flex w-100 position-absolute bottom-0 my-3">
                                            <hr className='w-100 border-2 position-absolute' />
                                        </div>
                                        <h5 className='m-0 py-2'>Category</h5>
                                    </Accordion.Header>
                                    <Accordion.Body className='px-0 pb-5'>
                                        <Row className='gy-4'>
                                            <Col className='col-12 col-sm-6'>
                                                <FloatingLabel controlId="floatingProductCategory" label="Product Category">
                                                    <Form.Control as="select" className='text-capitalize' type="text" placeholder="Product Category" {...register("category")} onInput={(e)=>{setProductCategory(e.target.value);}}>
                                                        <option  value="">--Select Category--</option>
                                                    {
                                                        productsInfo.categories ? productsInfo.categories.map((category) =>
                                                        <option  value={category.name}>{category.name}</option>
                                                        )
                                                        : ""
                                                    }
                                                    </Form.Control>
                                                    {errors.category ? <div className='error-message text-danger mt-1'>{errors.category.message}</div> : ''}
                                                </FloatingLabel>
                                            </Col>
                                            
                                            {
                                                productCategory ?
                                                <Container>
                                                    <p className='m-0 mb-2 mt-4'>Specs</p>
                                                    <hr className='w-100 border-1 mt-2'/>
                                                    <Row className='g-3'>
                                                    {
                                                        productsInfo.categories.find((category) => category.name === productCategory).specs.map((spec) =>
                                                        
                                                        <Col className='col-12 col-sm-6'>
                                                            <FloatingLabel controlId="" label={getCapitalized(spec.name)}>
                                                                <Form.Control type="text" placeholder={spec.name} value={productSpecs[spec.code]} onChange={(e)=>{setProductSpecs(prev => ({...prev,[spec.code]:e.target.value}))}} />
                                                            </FloatingLabel>
                                                        </Col>
                                                        )
                                                    }
                                                    </Row>
                                                </Container>
                                                : ""
                                            }
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            
                        </form>
                        : ""
                    }
                </Modal.Body>
                <Modal.Footer className='position-sticky z-2 bottom-0 bg-white'>
                    <div className="d-flex align-items-center w-100 gap-2">
                        <Button form={`product-management-${formMode}`} className='w-100 main-button border-0 text-capitalize' type='submit'>{formMode} product</Button>
                        <Button variant="danger" className='main-button border-0' onClick={handleFormModalClose}>Discard</Button>
                    </div>
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

            <Modal dialogClassName="product-show-modal m-0 position-relative" show={showModal} onHide={handleShowModalClose} centered={true} className='bg-transparent'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-capitalize'>Product Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    productToShow ?
                    <div>
                        <Row>
                            <Col className='col-12 col-sm-4 h-100 p-0 d-flex justify-content-center p-2 position-relative'>
                                <div className='position-relative'>
                                    <img className='rounded-3' style={{width: "min(100%,75vw"}} src={productToShow.image} onError={onImgError} alt="" />
                                    <Button className='position-absolute m-2 top-0 right-0 bg-white border-0 text-secondary d-flex p-1 shadow-sm' onClick={()=>{navigator.clipboard.writeText(productToShow.image);}}><BiSolidCopy className='fs-2' /></Button>
                                </div>
                            </Col>
                            <Col className='col-12 col-sm-8 h-100'>
                                <div className="d-flex flex-column justify-content-between h-100 product-page-col">
                                    <div className='d-flex flex-column gap-2'>
                                        <h1>{productToShow.title}</h1>
                                        <p className='m-0'>
                                            {productToShow.desc || <span>(No description provided yet)</span>}
                                        </p>
                                        <div className="d-flex flex-row gap-2 align-items-center">
                                            <p className='m-0 fs-5 text-warning-emphasis fw-semibold'>{productToShow.rating}</p>
                                            <div className='position-relative'>
                                                <div className='d-flex justify-content-between align-items-center' style={{width: "150px", height: "50px"}}>{[1,2,3,4,5].map((n,index)=><BsStarFill key={"pr-p-b-s-"+index} className={"text-dark fs-3 d-flex justify-content-center w-100"} />)}</div>
                                                <div className="position-absolute top-0 overflow-hidden" style={{width: `${productToShow.rating / 5 * 150}px`}}>
                                                    <div className='d-flex justify-content-between align-items-center' style={{width: "150px", height: "50px"}}>{[1,2,3,4,5].map((n,index)=><BsStarFill key={"pr-p-g-s-"+index} className={"text-warning fs-3 d-flex justify-content-center w-100"} />)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <h1 className='text-danger mt-2 fw-semibold'>{productToShow.price} EGP</h1>
                                    </div>
                                </div>
                            </Col>
                            <Col className='col-12'>
                                <hr />
                                <Row className='g-2'>
                                {
                                    productsInfo.categories.find((category) => category.name === productToShow.category).specs.map((spec) =>
                                    
                                    <Col className='col-12 col-sm-6 px-3'>
                                        <Row className='h-100 border rounded-3 overflow-hidden'>
                                            <Col className="col-6 bg-light fw-semibold text-capitalize h-100 border-end p-2">{spec.name}</Col>
                                            <Col className="col-6 p-2">{productToShow.specs[spec.code] || "Not provided"}</Col>
                                        </Row>
                                    </Col>
                                    )
                                }
                                </Row>
                            </Col>
                        </Row>
                        
                    </div>
                    : ""
                }
                </Modal.Body>
                <Modal.Footer className='position-sticky z-2 bottom-0 bg-white'>
                    <Button variant="secondary" className='main-button border-0' onClick={handleShowModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default ManageProducts;