import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Dropdown, DropdownButton, Row, Spinner } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/Products/productsSlice';
import MultiRangeSlider from "multi-range-slider-react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill, BsCheck, BsXCircle } from 'react-icons/bs';
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import TwoRangeSlider from '../../Components/TwoRangeSlider';
import { BiSolidShoppingBag } from "react-icons/bi";


function Shop({products=[],searchParams}) {

    const productsInfo = useSelector((store) => store.products.productsInfo);
    const dispatch = useDispatch();

    const initalFilters = {search:"",categories:[], minPrice: 0, maxPrice: 5000, specs:{}};

    const [filters,setFilters] = useState(initalFilters);
    const [specFilterOptions,setSpecFilterOptions] = useState();
    const [sort,setSort] = useState({type: "date",order: "asc"});
    const [resultsCount,setResultsCount] = useState(12);
    const [filteredProducts,setFilteredProducts] = useState(products);

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

    function getFilteredProducts(products,filters)
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
        if(sort.type==="date")
        {
            sortedProducts = sortedProducts.sort((a,b)=>{
                return b.date - a.date;
            });
        }
        else if(sort.type==="price")
        {
            sortedProducts = sortedProducts.sort((a,b)=>{
                return b.price - a.price;
            });
        }
        else if(sort.type==="alphabetical")
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
            // console.log(specOptions);
            Object.keys(specOptions).forEach((specKey) => {
                specOptions[specKey].availableValues = specOptions[specKey].availableValues.sort((a,b)=>{
                    return a >= b ? 1 : -1;
                });
            })


            return specOptions;
        }
    
    }


    useEffect(()=>{
        setFilteredProducts(getSortedProducts(getFilteredProducts(products,filters)));
    },[filters, sort, products, productsInfo]);


    useEffect(()=>{
        setFilters(initalFilters);
        setSpecFilterOptions(getSpecFilterOptions(products));
    },[searchParams])



    return (
        <div className='bg-light p-sm-1 px-sm-3'>
            <div className="d-flex ps-4 gap-1 gap-sm-3 align-items-end justify-content-center justify-content-md-start">
                <BiSolidShoppingBag fontSize={"5rem"}/>
                <div>
                    <h2 className='mt-5 mb-2'>Shop</h2>
                    {searchParams.get("q") ? <h5 className='text-muted mt-2'>Search results for "{searchParams.get("q")}"</h5> : ""}
                    {searchParams.get("gr") ? <h5 className='text-muted mt-2'> Shopping for <span className='text-capitalize'>{searchParams.get("gr")} Products</span></h5> :
                    searchParams.get("cat") ? <h5 className='text-muted mt-2'> Shopping for <span className='text-capitalize'>{searchParams.get("cat")+"s"}</span></h5> : ""}
                </div>
            </div>

            <hr className='border-3 mb-4' />
            <div>
                <Row className='m-0 g-0 gy-3 gy-md-0 gx-sm-4 pb-4' >
                    <Col className='col-12 col-md-4 col-xl-3 d-flex flex-column align-items-start px-1 px-sm-0 px-lg-2 z-1'>
                        <Accordion alwaysOpen className='shop-filter-accordion w-100 shadow'>

                            <Accordion.Item eventKey="0" className='border-0 bg-light'>
                                <Accordion.Header className='bg-white w-100 px-3 py-2 border-bottom border-2 '>
                                    <h3>Sort</h3>
                                </Accordion.Header>
                                <Accordion.Body className='px-0 '>
                                    <div className='w-100 p-3 d-flex align-items-start justify-content-between gap-2'>

                                        <Dropdown autoClose="outside">
                                            <Dropdown.Toggle className={`d-flex align-items-center justify-content-between bg-secondary border-secondary`} variant="secondary" id="dropdown-basic">
                                                <span className='text-capitalize'> {sort.type}</span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className='p-0 rounded-0 w-100' >
                                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${sort.type==="date" ? "selected" : ""}`}><Button className='bg-transparent text-dark border-0 d-flex justify-content-between text-capitalize w-100' onClick={()=>{setSort({...sort,type: "date"})}}> Date </Button></Dropdown.Item>
                                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${sort.type==="alphabetical" ? "selected" : ""}`}><Button className='bg-transparent text-dark border-0 d-flex justify-content-between text-capitalize w-100' onClick={()=>{setSort({...sort,type: "alphabetical"})}}> Alphabetical </Button></Dropdown.Item>
                                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${sort.type==="price" ? "selected" : ""}`}><Button className='bg-transparent text-dark border-0 d-flex justify-content-between text-capitalize w-100' onClick={()=>{setSort({...sort,type: "price"})}}> Price </Button></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="d-flex gap-2">
                                            <Button variant='dark' className={`border-2 ${sort.order!=="asc" ? "bg-transparent text-secondary" : ""}`} onClick={()=>{setSort({...sort,order:"asc"})}} > <FaSortAmountDown /> </Button>
                                            <Button variant='dark' className={`border-2 ${sort.order!=="desc" ? "bg-transparent text-secondary" : ""}`} onClick={()=>{setSort({...sort,order:"desc"})}} > <FaSortAmountUpAlt /> </Button>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="1" className='border-0 bg-light'>
                                <Accordion.Header className='bg-white w-100 px-3 py-2'>
                                    <h3>Filters</h3>
                                </Accordion.Header>
                                <Accordion.Body className='px-0 border-top border-2'>
                                    <div className='w-100 p-3'>
                                        <div>
                                            <h5>Price</h5>
                                            <div className='fs-4 range-slider-container text-dark'>
                                                <TwoRangeSlider minValue={filters.minPrice} maxValue={filters.maxPrice}
                                                minLimit={0} maxLimit={5000} snap={100}
                                                setMin={(value)=>{setFilters(prev => ({...prev,minPrice:value}));}}
                                                setMax={(value)=>{setFilters(prev => ({...prev,maxPrice:value}));}} />
                                            </div>
                                        </div>

                                        <hr className='border-2' />
                                        
                                        {
                                            !searchParams.get("cat") ?
                                            <>
                                                <div className='d-flex flex-column gap-2'>
                                                    <h5 className='me-1 m-0'>Categories</h5>
                                                    <Dropdown autoClose="outside">
                                                        <Dropdown.Toggle className={`w-100 d-flex align-items-center justify-content-between ${filters.categories.length>0 ? "bg-primary border-primary" : "bg-secondary"}`} style={{width: "6em"}} variant="secondary" id="dropdown-basic">
                                                            {filters.categories.length>0 ? "Selected" : "Select..."}
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className='p-0 rounded-0 w-100' >
                                                            <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark`}><Button className='bg-transparent border-0 d-flex justify-content-between text-danger text-capitalize w-100' onClick={()=>{console.log(filters.categories);setFilters({...filters,categories:[]})}}> None </Button></Dropdown.Item>
                                                        {
                                                            (productsInfo.categoryGroups 
                                                            && searchParams.get("gr")) ?
                                                            productsInfo.categoryGroups[searchParams.get("gr")].map((category) => 
                                                            <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${filters.categories.includes(category) ? "selected" : ""}`}><Button className='bg-transparent border-0 d-flex justify-content-between text-dark text-capitalize w-100' onClick={()=>{handleFilterCategories(category)}} >{category} <BsCheck className='dropdown-item-check d-none fs-4'/> </Button> </Dropdown.Item>
                                                            )
                                                            : searchParams.get("q") &&
                                                            (function(){
                                                                let categories = [];
                                                                products.forEach((product)=>{
                                                                    if(!categories.includes(product.category)) categories.push(product.category);
                                                                });
                                                                return categories;
                                                                })()
                                                                .map((category) => 
                                                            <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${filters.categories.includes(category) ? "selected" : ""}`}><Button className='bg-transparent border-0 d-flex justify-content-between text-dark text-capitalize w-100' onClick={()=>{handleFilterCategories(category)}} >{category} <BsCheck className='dropdown-item-check d-none fs-4'/> </Button> </Dropdown.Item>
                                                            )
                                                        }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>

                                                <hr className='border-2' />
                                            </>
                                            : ""
                                        }
                                        
                                        <div className='d-flex flex-column gap-2'>
                                            <h5 className='me-1 m-0'>Specs</h5>
                                            <Row className='gy-2'>
                                            {
                                                specFilterOptions ? Object.keys(specFilterOptions).map((spec) =>
                                                
                                                <Col className='col-12'>
                                                    <Dropdown autoClose="outside">
                                                        <Dropdown.Toggle className={`w-100 d-flex align-items-center justify-content-between text-capitalize ${(filters.specs[spec] && filters.specs[spec].length) ? "bg-primary border-primary" : "bg-secondary"}`} style={{width: "6em"}} variant="secondary" id="dropdown-basic">
                                                            {specFilterOptions[spec].name}
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className='p-0 rounded-0 w-100' >
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
                                                :
                                                [1,2,3,4,5].map((n) =>
                                                <Col className='col-12'>
                                                    <div className='loading-bg w-100 rounded-3 shadow' style={{height: "2.2rem"}}></div>
                                                </Col>
                                                )
                                            }
                                            </Row>
                                        </div>
                                        
                                        {

                                        }
                                        <div className='text-end mt-5'>
                                            <Button className='bg-transparent border-0 text-primary' onClick={()=>{setFilters(initalFilters)}}>Clear Filters</Button>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            
                        </Accordion>
                        
                    </Col>
                    {
                        filteredProducts.length ?
                        <Col className='col-12 col-md-8 col-xl-9 p-0 ps-md-2 px-lg-1'>
                            <Row className='g-0 p-0 p-sm-3 shadow rounded-3 w-100 m-0'>
                                {
                                    filteredProducts && filteredProducts.slice(0,resultsCount).map((product) =>(
                                        <Col className='col-6 col-sm-4 col-xl-3 p-1 p-xl-2'>
                                            <ProductCard productObject={product} key={`shop-page-${product.id}`} />
                                        </Col>                                
                                    ))
                                }
                                {filteredProducts && resultsCount < filteredProducts.length ? <Col className='col-12 mb-2 mt-2 mt-sm-4 px-2'><Button variant='dark' className='btn-dark w-100 5' onClick={()=>setResultsCount(c => c+12)}>Load More</Button></Col> : ""}
                            </Row>
                        </Col>
                        :
                        filters!==initalFilters ?
                        <Col className='col-12 col-md-8 col-xl-9 p-0 ps-md-2 px-lg-1'>
                            <div className='py-5 px-sm-3 shadow rounded-3 w-100 m-0 text-center'>
                                <h3 className='mb-4'>No results for the current filters.</h3>
                                <Button variant='dark' className='btn fs-4' onClick={()=>{setFilters(initalFilters)}}>Clear Filters</Button>
                                
                            </div>
                        </Col>
                        :
                        <Col className='col-12 col-md-8 col-xl-9 p-0 ps-md-2 px-lg-1'>
                            <Row className='g-0 p-0 p-sm-3 shadow rounded-3 w-100 m-0'>
                            {
                                [1,2,3,4,5,6,7,8].map((n) =>
                                <Col className='col-6 col-sm-4 col-xl-3 p-1 p-xl-2'>
                                    <div className='loading-bg w-100 rounded-3 shadow' style={{height: "25rem"}}></div>
                                </Col>
                                )
                            }
                            </Row>
                        </Col>
                    }
                </Row>
            </div>
        </div>
    );
}

export default Shop;
