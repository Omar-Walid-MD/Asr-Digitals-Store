import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './ProductCard';
import { Button, Container, Row } from 'react-bootstrap';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { useRef } from 'react';

function ProductCarousel() {

    const products = [
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100}
    ]

    const scroll = useRef();

    function handleScroll(direction)
    {
      console.log(scroll.current.scrollLeft);
      scroll.current.scrollLeft += 500 * direction;
    }

    function handleProducts(products)
    {
      let output = <>
        {
          products.map((product,index) => 
          
            index % 2 === 0
            &&
            <div className='d-flex flex-column flex-md-row gap-4 align-items-center'>
              <div style={{width: "12rem"}}><ProductCard product={product} className={"w-100"} /></div> 
              {index+1 < products.length && <div style={{width: "12rem"}}><ProductCard product={products[index+1]} className={"w-100"} /></div> }
            </div>          
          )
        }
      </>;
      
      
      console.log(output);
      return output;
    }


  return (
    <div className='w-100 position-relative product-carousel-container' >
      <div className='overflow-scroll scrollbar shadow rounded-4' ref={scroll} style={{scrollBehavior: "smooth"}}>
        <div className='d-flex align-items-center gap-4 p-3 product-carousel' style={{width: "fit-content"}} >
        {
            handleProducts(products)
            // products.map((product) =>
            //     <div style={{width:"12.75rem"}}>
            //       <ProductCard product={product} className={"w-100"} />
            //     </div>
            // )
        }
        </div>
      </div>
      <div className='position-absolute top-0 h-100 d-none d-md-flex align-items-center right-0 pe-4'>
        <Button className='rounded-circle bg-dark border-0 p-2 fs-2 d-flex' onClick={()=>{handleScroll(1);}}><BsCaretRightFill /></Button>
      </div>
      <div className='position-absolute top-0 h-100 d-none d-md-flex align-items-center left-0 ps-4'>
        <Button className='rounded-circle bg-dark border-0 p-2 fs-2 d-flex' onClick={()=>{handleScroll(-1);}} ><BsCaretLeftFill /></Button>
      </div>
    </div>
    // <Carousel indicators={false} className='h-100'>
    //   <Carousel.Item >
    //     <Container className='d-flex align-items-center justify-content-center h-100 w-100'>
    //         <Row className='w-100'>
    //         {
    //             products.map((product) =>
    //                 <ProductCard product={product} col={2} />
    //             )
    //         }
    //         </Row>
    //     </Container>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <Container className='d-flex align-items-center justify-content-center h-100 w-100'>
    //         <Row className='w-100'>
    //         {
    //             products.map((product) =>
    //                 <ProductCard product={product} col={2} />
    //             )
    //         }
    //         </Row>
    //     </Container>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <Container className='d-flex align-items-center justify-content-center h-100 w-100'>
    //         <Row className='w-100'>
    //         {
    //             products.map((product) =>
    //                 <ProductCard product={product} col={2} />
    //             )
    //         }
    //         </Row>
    //     </Container>
    //   </Carousel.Item>
    // </Carousel>
  );
}

export default ProductCarousel;