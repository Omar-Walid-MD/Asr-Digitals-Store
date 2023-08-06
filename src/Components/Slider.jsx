import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './ProductCard';
import { Button, Container, Row } from 'react-bootstrap';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { useRef } from 'react';

function Slider({content, className, style}) {

    const scroll = useRef();

    function handleScroll(direction)
    {
      scroll.current.scrollLeft += 500 * direction;
    }



  return (
    <div className={`w-100 position-relative product-carousel-container ${className || ""}`} style={style} >
      <div className='overflow-x-scroll scrollbar shadow rounded-md-2' ref={scroll} style={{scrollBehavior: "smooth"}}>
        <div className='d-flex align-items-center gap-2 gap-md-4 p-md-4 product-carousel' style={{width: "fit-content"}} >
        {
           content
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
  );
}

export default Slider;