import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './ProductCard';
import Slider from "./Slider";
import { Button, Container, Row } from 'react-bootstrap';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';

function ProductSlider({className, variant="dark", style, products=[]}) {

    function handleProducts(products)
    {
      let output =
      <>
        <div key={"product-carousel-product-1"} className='d-flex align-items-stretch gap-2 gap-md-4'>
        {
          Array.from({length:products.length/2}).map((x,index) => 
          
            <div key={`product-slider-product-${index*2}`} style={{width:"min(12rem,50vw)"}} className="">
              <ProductCard productObject={products[index*2]} className="w-100 h-100" />
            </div>
          )
        }
        </div>
        <div key={"product-carousel-product-2"} className='d-flex align-items-stretch gap-2 gap-md-4'>
        {
          Array.from({length:products.length/2}).map((x,index) => 
          
            <div key={`product-slider-product-${index*2+1}`} style={{width:"min(12rem,50vw)"}} className="">
              <ProductCard productObject={products[index*2+1]} className="w-100 h-100" />
            </div>
          )
        }
        </div>
      </>;
      
      return output;
    }


  return (
    <Slider 
    content={handleProducts(products)}
    variant={variant}
    className={className}
    style={style}
    />
  );
}

export default ProductSlider;
