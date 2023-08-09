import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './ProductCard';
import Slider from "./Slider";
import { Button, Container, Row } from 'react-bootstrap';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { useRef } from 'react';

function ProductSlider({className, variant="dark", style}) {

    const products = [
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000},
        {title: "My Phone",price: 10000}
    ]

    function handleProducts(products)
    {
      let output = <>
        {
          products.map((product,index) => 
          
            index % 2 === 0
            &&
            <div key={"product-carousel-product-"+product.id+"-"+index} className='d-flex flex-column flex-md-row gap-2 gap-md-4 align-items-center'>
              <div style={{width:"min(12rem,50vw)"}}><ProductCard productId={"1"} className="w-100" /></div>
              {index+1 < products.length && <div style={{width:"min(12rem,50vw)"}}><ProductCard productId={"1"} className="w-100" /></div>}
            </div>          
          )
        }
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