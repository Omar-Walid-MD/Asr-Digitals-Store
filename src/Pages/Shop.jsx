import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Store/Products/productsSlice';
import MultiRangeSlider from "multi-range-slider-react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill, BsCheck, BsXCircle } from 'react-icons/bs';
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import TwoRangeSlider from '../Components/TwoRangeSlider';

function Shop({}) {

    const products = useSelector((store) => store.products.products);
    const dispatch = useDispatch();

    const [filters,setFilters] = useState({categories:[], minPrice: 0, maxPrice: 5000});
    const [sort,setSort] = useState({type: "alphabetical",order: "asc"});
    const [filteredProducts,setFilteredProducts] = useState(products);

    const [searchParams] = useSearchParams();

    const categories = ["phones","tablets","laptops","desktops","headphones","earphones"];

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

    function getSortedProducts(products)
    {
        let sortedProducts = products;
        if(sort.type==="price")
        {
            sortedProducts = sortedProducts.sort((a,b)=>{
                console.log(a.price, b.price);
                return b.price - a.price;
            });
        }
        if(sort.type==="alphabetical")
        {
            sortedProducts = sortedProducts.sort((a,b)=>{
                return a.title >= b.title ? 1 : -1;
            });
        }

        if(sort.order==="desc")
        {
            sortedProducts.reverse();
        }
        console.log(sortedProducts);
        return sortedProducts;
    }




    useEffect(()=>{
        dispatch(getProducts());
    },[]);

    useEffect(()=>{
        setFilteredProducts(getSortedProducts(getFilteredProducts(products)));
        console.log(filteredProducts);
    },[filters, sort, products])

    return (
        <div className='page-container bg-light p-sm-1 px-sm-3'>
            <Container className='px-2'>
                <h2 className='mt-5 mb-2'>Shop</h2>
                {searchParams.get("search") ? <h5 className='text-muted mt-2'>Search results for "{searchParams.get("search")}"</h5> : ""}
                {searchParams.get("cat") ? <h5 className='text-muted mt-2'> Shopping for <span className='text-capitalize'>{searchParams.get("cat")+"s"}</span></h5> : ""}
            </Container>

            <hr className='border-3 mb-4' />
            <div>
                <Row className='m-0 g-0 gy-3 gy-md-0 gx-sm-4' >
                    <Col className='col-12 col-md-4 col-xl-3 d-flex flex-column align-items-start p-0 px-lg-2 z-1'>
                        <Accordion alwaysOpen defaultActiveKey={["0","1"]} className='shop-filter-accordion w-100 rounded-sm-2 shadow position-sticky top-0'>
                            <Accordion.Item eventKey="0" className='border-0 bg-light'>
                                <Accordion.Header className='bg-white w-100 rounded-top border-bottom border-2'>
                                    <h3>Filters</h3>
                                </Accordion.Header>
                                <Accordion.Body className='px-0 pb-5'>
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
                                        
                                        <div className='d-flex flex-column gap-2'>
                                            <h5 className='me-1 m-0'>Categories</h5>
                                            <Dropdown autoClose="outside">
                                                <Dropdown.Toggle className={`w-100 d-flex align-items-center justify-content-between ${filters.categories.length>0 ? "bg-primary border-primary" : "bg-secondary"}`} style={{width: "6em"}} variant="secondary" id="dropdown-basic">
                                                    {filters.categories.length>0 ? "Selected" : "Select..."}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className='p-0 rounded-0 w-100' >
                                                    <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark`}><Button className='bg-transparent border-0 d-flex justify-content-between text-danger text-capitalize w-100' onClick={()=>{setFilters({...filters,categories:[]})}}> None </Button></Dropdown.Item>
                                                {
                                                    categories.map((category) => 
                                                    <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${filters.categories.includes(category) ? "selected" : ""}`}><Button className='bg-transparent border-0 d-flex justify-content-between text-dark text-capitalize w-100' onClick={()=>{handleFilterCategories(category)}} >{category} <BsCheck className='dropdown-item-check d-none fs-4'/> </Button> </Dropdown.Item>
                                                    )
                                                }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1" className='border-0 bg-light'>
                                <Accordion.Header className='bg-white w-100'>
                                    <h3>Sort</h3>
                                </Accordion.Header>
                                <Accordion.Body className='px-0 border-top border-2'>
                                    <div className='w-100 p-3 d-flex align-items-start justify-content-between gap-2'>

                                        <Dropdown autoClose="outside">
                                            <Dropdown.Toggle className={`d-flex align-items-center justify-content-between bg-primary border-primary`} variant="primary" id="dropdown-basic">
                                                <span className='text-capitalize'> {sort.type}</span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className='p-0 rounded-0 w-100' >
                                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${sort.type==="alphabetical" ? "selected" : ""}`}><Button className='bg-transparent text-dark border-0 d-flex justify-content-between text-capitalize w-100' onClick={()=>{setSort({...sort,type: "alphabetical"})}}> Alphabetical </Button></Dropdown.Item>
                                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${sort.type==="price" ? "selected" : ""}`}><Button className='bg-transparent text-dark border-0 d-flex justify-content-between text-capitalize w-100' onClick={()=>{setSort({...sort,type: "price"})}}> Price </Button></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="d-flex gap-2">
                                            <Button className={`border-2 ${sort.order!=="asc" ? "bg-transparent text-primary" : ""}`} onClick={()=>{setSort({...sort,order:"asc"})}} > <FaSortAmountDown /> </Button>
                                            <Button className={`border-2 ${sort.order!=="desc" ? "bg-transparent text-primary" : ""}`} onClick={()=>{setSort({...sort,order:"desc"})}} > <FaSortAmountUpAlt /> </Button>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        
                    </Col>
                    <Col className='col-12 col-md-8 col-xl-9 p-0 ps-md-2 px-lg-1'>
                        <Row className='g-0 p-0 p-sm-3 shadow rounded-3 w-100 m-0'>
                            {
                                filteredProducts && filteredProducts.map((product) =>(
                                    <Col className='col-6 col-sm-4 col-xl-3 p-1 p-xl-2'>
                                        <ProductCard productObject={product} key={`shop-page-${product.id}`} />
                                    </Col>                                
                                ))
                            }
                            <Col className='col-12 mb-2 mt-2 mt-sm-4'><Button variant='dark' className='btn-dark w-100 5'>Load More</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Shop;


{/* <Col className='col-12'>
    <div className='d-flex flex-column flex-md-row gap-0 gap-md-4 bg-secondary text-white shadow rounded-3 p-3'>
        <h5 className='text-light'>Filter By:</h5>
        <Row>
            <Col>
                <h5>Price</h5>
                <div style={{width: "min(20rem,80vw)"}} className='fs-4 range-slider-container'>
                    <MultiRangeSlider
                        min={0}
                        max={5000}
                        ruler={false}
                    />
                </div>
            </Col>
                <Col className='py-2'>
                    <div className="d-flex gap-2">
                        <h5>Categories</h5>
                    </div>
                    <div className='d-flex gap-2 align-items-center'>
                        <Dropdown autoClose="outside" >
                            <Dropdown.Toggle className='d-flex align-items-center justify-content-between' style={{width: "6rem"}} variant="secondary" id="dropdown-basic">
                                {filters.categories.length>0 ? "Selected" : "Select..."}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='p-0 rounded-0 w-0'>
                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark`}><Button className='bg-transparent border-0 d-flex justify-content-between text-danger text-capitalize w-100' onClick={()=>{setFilters({...filters,categories:[]})}}> None </Button></Dropdown.Item>
                            {
                                categories.map((category) => 
                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${filters.categories.includes(category) ? "selected" : ""}`}><Button className='bg-transparent border-0 d-flex justify-content-between text-dark text-capitalize w-100' onClick={()=>{handleFilterCategories(category)}} >{category} <BsCheck className='dropdown-item-check d-none fs-4'/> </Button> </Dropdown.Item>
                                )
                            }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
                <Col className='py-2'>
                    <div className="d-flex gap-5">
                        <h5>Brands</h5>
                    </div>

                    <div className='d-flex gap-2 align-items-center'>
                        <Dropdown autoClose="outside" >
                            <Dropdown.Toggle className='d-flex align-items-center justify-content-between' style={{width: "6rem"}} variant="secondary" id="dropdown-basic">
                                {filters.brands.length>0 ? "Selected" : "Select..."}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='p-0 rounded-0 w-0'>
                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark`}><Button className='bg-transparent border-0 d-flex justify-content-between text-danger text-capitalize w-100' onClick={()=>{setFilters({...filters,brands:[]})}}> None </Button></Dropdown.Item>
                            {
                                brands.map((brand) => 
                                <Dropdown.Item className={`p-0 dropdown-select border-bottom border-dark ${filters.brands.includes(brand) ? "selected" : ""}`}><Button className='bg-transparent border-0 d-flex justify-content-between text-dark text-capitalize w-100' onClick={()=>{handleFilterBrands(brand)}} >{brand} <BsCheck className='dropdown-item-check d-none fs-4'/> </Button> </Dropdown.Item>
                                )
                            }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
        </Row> 
        </div>
</Col> */}