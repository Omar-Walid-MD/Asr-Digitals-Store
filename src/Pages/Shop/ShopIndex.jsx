import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Shop from './Shop';
import ShopExplore from './ShopExplore';
import { Container } from 'react-bootstrap';

function ShopIndex({}) {

    const [searchParams] = useSearchParams();
    const [index,setIndex] = useState(0);
    const [loading,setLoading] = useState(false);

    const products = useSelector((store) => store.products.products);
    const productsInfo = useSelector((store) => store.products.productsInfo);

    useEffect(()=>{
        setLoading(true);
        if(productsInfo.categories)
        {
            if(searchParams.size && (searchParams.get("q")
               || productsInfo.categories.find((category) => category.name===searchParams.get("cat"))
               || Object.keys(productsInfo.categoryGroups).includes(searchParams.get("gr"))
                )) setIndex(1);
            else setIndex(2);
        }
        setLoading(false);
    },[searchParams,productsInfo]);

    function getAvailableProducts()
    {
        let availableProducts = products;

        if(searchParams.get("q")) availableProducts = availableProducts.filter((product) => product.title.toLowerCase().includes(searchParams.get("q").toLowerCase()));

        if(searchParams.get("gr")) availableProducts = availableProducts.filter((product) => productsInfo.categoryGroups[searchParams.get("gr")].includes(product.category));
        else if(searchParams.get("cat")) availableProducts = availableProducts.filter((product) => product.category === searchParams.get("cat"));

        return availableProducts;

    }

    useEffect(()=>{
        window.scrollTo({top:0,left:0,behavior:'instant'});
    },[index, searchParams])

    return (
        <div className="page-container">
        {
            (loading || index===0) ?
            <div className='d-flex flex-column gap-5'>
                <div className='loading-bg w-100 rounded-3' style={{height:"500px"}}></div>
                <Container>
                    <div className='loading-bg w-100 rounded-3' style={{height:"10rem"}}></div>
                </Container>

            </div>
            :
            index===1 ?
            <Shop products={getAvailableProducts()} searchParams={searchParams} />
            : index===2 ?
            <ShopExplore />
            : "" 
            
        }
        </div>
    );
}

export default ShopIndex;