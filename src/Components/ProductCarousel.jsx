import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';

function ProductCarousel() {

    const products = [
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100},
        {title: "My Phone",price: 100}
    ]


  return (

    <Carousel indicators={false} className='h-100'>
      <Carousel.Item >
        <Container className='d-flex align-items-center justify-content-center h-100 w-100'>
            <Row className='w-100'>
            {
                products.map((product) =>
                    <ProductCard product={product} col={2} />
                )
            }
            </Row>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container className='d-flex align-items-center justify-content-center h-100 w-100'>
            <Row className='w-100'>
            {
                products.map((product) =>
                    <ProductCard product={product} col={2} />
                )
            }
            </Row>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container className='d-flex align-items-center justify-content-center h-100 w-100'>
            <Row className='w-100'>
            {
                products.map((product) =>
                    <ProductCard product={product} col={2} />
                )
            }
            </Row>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProductCarousel;