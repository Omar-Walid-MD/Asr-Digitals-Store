import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Store/Products/productsSlice';
import MultiRangeSlider from "multi-range-slider-react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill, BsCheck, BsXCircle } from 'react-icons/bs';

function Shop({}) {

    const products = useSelector((store) => store.products.products);
    const dispatch = useDispatch();

    const [filters,setFilters] = useState({categories:[]});
    const [sort,setSort] = useState({type: "alphabetical",order: "asc"});

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




    useEffect(()=>{
        dispatch(getProducts());
    },[])

    return (
        <div className='page-container bg-light p-0 p-sm-5'>
            <Container className='px-2'>
                <h2 className='pt-5 mb-2'>Shop</h2>
                <h5 className='text-secondary mt-2'>Search results for ""</h5>
            </Container>
            <hr className='border-3' />
            <div>
                <Row className='m-0 g-0 gy-3 gy-md-0 gx-sm-4' >
                    <Col className='col-12 col-md-4 col-xl-3 d-flex flex-column align-items-start p-0 px-lg-1 z-1'>
                        <div className='w-100 rounded-sm-2 shadow position-sticky top-0 p-3'>
                            <h3>Filters</h3>
                            
                            <hr className='border-2' />
                            <div>
                                <h5>Price</h5>
                                <div className='fs-4 range-slider-container text-dark'>
                                    <MultiRangeSlider
                                        min={0}
                                        max={5000}
                                        ruler={false}
                                        label={false}                                    
                                    />
                                </div>
                            </div>

                            <hr className='border-2' />
                            
                            <div className='d-flex gap-2'>
                                <h5 className='me-1'>Categories</h5>
                                <Dropdown autoClose="outside">
                                    <Dropdown.Toggle className={`d-flex align-items-center justify-content-between ${filters.categories.length>0 ? "bg-primary border-primary" : "bg-secondary"}`} style={{width: "6em"}} variant="secondary" id="dropdown-basic">
                                        {filters.categories.length>0 ? "Selected" : "Select..."}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='p-0 rounded-0 w-0' >
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
                    </Col>
                    <Col className='col-12 col-md-8 col-xl-9 p-0 ps-md-2 px-lg-1'>
                        <div className='shadow rounded-3 p-2 px-3 mb-2 d-flex align-items-center'>
                            <h4 className='m-0'>Sort</h4>
                        </div>
                        <div className='p-0 w-100'>
                            <Row className='g-0 p-0 p-sm-3 shadow rounded-3 w-100 m-0'>
                                {
                                    products && products.map((product) =>(
                                        <Col className='col-6 col-sm-4 col-xl-3 p-1 p-xl-2'>
                                            <ProductCard productObject={product} />
                                        </Col>                                
                                    ))
                                }
                                <Col className='col-12 mb-2 mt-2 mt-sm-4'><Button variant='dark' className='btn-dark w-100 5'>Load More</Button></Col>
                            </Row>

                        </div>
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