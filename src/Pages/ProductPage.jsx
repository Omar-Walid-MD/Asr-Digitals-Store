import React, { useRef, useState, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { BsFillCartPlusFill, BsFillCartDashFill, BsStarFill, BsPhoneFill, BsFillCaretDownFill, BsFillCaretUpFill, BsFillPersonFill } from "react-icons/bs";
import ProductReview from '../Components/ProductReview';
import ProductSlider from '../Components/ProductSlider';
import { useParams } from 'react-router';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setProductCount } from '../Store/Cart/cartSlice';
import { addReview, getReviews } from '../Store/Reviews/reviewsSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';
import { setProductRating } from '../Store/Products/productsSlice';
import { getRating, getRatingCount } from '../helpers';


const schema = yup
  .object({
    title: yup.string().required("Please enter review title..."),
    body: yup.string().required("Please enter review body..."),
    rating: yup.number(),
    pros: yup.string(),
    cons: yup.string()
  })
  .required();


function ProductPage({})
{
    const {productId} = useParams();

    const cart = useSelector((store) => store.cart.cart);
    const favorites = useSelector((store) => store.favorites.favorites);
    const reviews = useSelector((store) => store.reviews.reviews.filter((review) => review.productId === productId).reverse());
    const productsInfo = useSelector((store) => store.products.productsInfo);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const products = useSelector((store) => store.products.products);

    const [product,setProduct] = useState();
    const [added,setAdded] = useState(false);
    const [count, setCount] = useState(1);
    const [favorite,setFavorite] = useState(false);

    const [firstCountSet,setFirstCountSet] = useState(false);

    const [rating,setRating] = useState(5);

    function getCount()
    {
        let targetProduct = cart.find((product) => product.productId === productId)
        return targetProduct ? targetProduct.count : 1;
    }

    function handleCount(newCount)
    {
        if(newCount <= 10 && newCount > 0)
        {
            setCount(newCount);
            dispatch(setProductCount({productId: ""+product.id,count: newCount}));
        }
    }

    function handlePreviewImage(e)
    {
        let el = e.currentTarget; let rect = el.getBoundingClientRect();
        let xOffset = (e.pageX - rect.left - document.documentElement.scrollLeft) / rect.width * 100;
        let yOffset = (e.pageY - rect.top  - document.documentElement.scrollTop) / rect.height * 100;
        el.style.backgroundPosition = `${xOffset}% ${yOffset}%`;
    }

    function handleRating(e)
    {
        setRating(e.target.value);
    }

    function onSumbit(data)
    {
        dispatch(addReview({...data,productId:productId}));
        dispatch(setProductRating({productId: product.id,rating: getRating([...reviews.map((review)=>review.rating),rating])}));
        reset();
        setRating(5);
    }

    useEffect(()=>{
        if(products.length) setProduct(products.find((product) => product.id === parseInt(productId)));
    },[productId, products]);

    useEffect(()=>{
        if(product)
        {
            setCount(getCount());
            setAdded(cart.map((i) => i.productId).includes(""+product.id));
            // setFirstCountSet(true);
        }
    },[product,cart]);

    useEffect(()=>{
       if(product) setFavorite(favorites.includes(product.id));
    },[favorites, product]);


    return (
        <div className='bg-light'>
            <div>
                {
                    product ?
                    <Container className='py-5'>
                        <Row className='m-0 gy-4'>
                            <Col className='col-12 col-md-4 h-100 p-0'>
                                <div className="d-flex w-100 position-relative">
                                    <div className='bg-white p-4 rounded-3 shadow'>
                                        <img className='w-100' src={require("../img/phone.png")} />
                                        <div className='product-img-preview rounded-3 w-100 h-100 position-absolute top-0 left-0'
                                        onMouseEnter={(e)=>{e.target.style.opacity = "1"}}
                                        onMouseLeave={(e)=>{e.target.style.opacity = "0"}}
                                        onMouseMove={handlePreviewImage}
                                        ></div>
                                    </div>
                                </div>
                            </Col>
                            <Col className='col-12 col-md-8 h-100'>
                                <div className="d-flex flex-column justify-content-between h-100 product-page-col">
                                    <div className='d-flex flex-column gap-2'>
                                        <h1>{product.title}</h1>
                                        <p className='m-0'>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, amet, architecto natus consequatur blanditiis possimus tenetur ullam, totam nemo delectus eum temporibus minima enim? Quidem in eaque et ut nostrum.
                                        </p>
                                        {
                                            reviews.length >= 5 ?
                                            <div className="d-flex flex-column flex-md-row gap-2">
                                                <p className='m-0 fs-5 text-warning-emphasis fw-semibold'>{product.rating} ({reviews.length} reviews)</p>
                                                <div className="d-flex gap-2">
                                                    {
                                                        [1,2,3,4,5].map((n)=>
                                                        <div className='position-relative'>
                                                            <BsStarFill key={"pr-p-g-s-"+n} className={"text-dark fs-3 d-flex justify-content-center"} />
                                                            <div style={{width: `${n <= product.rating ? 100 : n === Math.ceil(product.rating) ? product.rating % 1 * 100 : 0}%`}} className='position-absolute top-0 overflow-hidden'>
                                                                <BsStarFill key={"pr-p-g-s-"+n} className={"text-warning fs-3 d-flex justify-content-center"} />
                                                            </div>
                                                        </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            : ""
                                        }
                                        
                                        <h1 className='text-danger price-tag mt-2 fw-semibold'>{product.price}</h1>
                                    </div>
                                    <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-4 mt-4">
                                        {
                                            added ? 
                                            <div className='d-flex gap-3 flex-column flex-sm-row'>
                                                <Button variant='danger' className='d-flex align-items-center p-3 btn-danger fs-3 gap-3 rounded-3 shadow' onClick={()=>{dispatch(removeFromCart(productId)); setAdded(false);}}><BsFillCartDashFill className='fs-2' /> Remove</Button>
                                                <div className="d-flex gap-3">
                                                    <input type="number" className="rounded-3 fs-1 text-center border-3 border-primary bg-transparent text-primary" min={0} max={10} value={count} onChange={(e)=>{handleCount(e.target.value)}}  style={{width: "5rem"}} />
                                                    <div className='d-flex flex-column gap-3 gap-md-0 justify-content-between'>
                                                        <Button className='d-flex align-items-center p-3 py-0 btn-primary fs-3 gap-3 rounded-3 shadow border-3' onClick={()=>{handleCount(count+1)}}><BsFillCaretUpFill /></Button>
                                                        <Button className='d-flex align-items-center p-3 py-0 btn-primary fs-3 gap-3 rounded-3 shadow border-3' onClick={()=>{handleCount(count-1)}}><BsFillCaretDownFill /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <Button className='d-flex align-items-center p-3 btn-primary text-white fs-3 gap-3 rounded-3 shadow border-3' onClick={()=>{dispatch(addToCart(productId)); setAdded(true);}}><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                                        }
                                        {
                                            favorite ?
                                            <Button className='d-flex align-items-center p-3 btn-warning bg-warning border-3 border-warning text-white fs-3 gap-3 rounded-3' onClick={()=>{dispatch(removeFromFav(product.id)); setFavorite(false);}}><BsStarFill className='fs-2' /> Favorited</Button>
                                            :
                                            <Button className='d-flex align-items-center p-3 bg-transparent text-warning border-warning border-3 fs-3 gap-3 rounded-3' onClick={()=>{dispatch(addToFav(product.id)); setFavorite(true);}}><BsStarFill className='fs-2' />Favorite</Button>
                                        }
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Spinner />
                }

                <div className='bg-light-gradient overflow-hidden'><Container><h3 className='mt-5 m-0 p-2 px-4 bg-secondary text-white rounded-top shadow d-inline-block'>Specs</h3></Container></div>
                <div className='bg-secondary'>
                    <Container className='py-5'>
                        <Row className='text-white fs-5 g-3 m-0'>
                        {
                            product && productsInfo.categories && productsInfo.categories.find((category) => category.name === product.category).specs.map((spec, index) =>
                            
                            product.specs[spec.code] ?
                            <Col key={"related-product-"+index} className='col-12 p-0'>
                                <div className='d-flex flex-column align-items-start product-spec'>
                                    <div className='p-0' style={{minWidth: "8rem"}}><div className='bg-info fw-semibold p-2 px-3 rounded-top shadow-sm text-capitalize'>{spec.name}</div></div>
                                    <div className='w-100 border border-info border-3 shadow-sm' style={{borderRadius: "0 0.5rem 0.5rem 0.5rem"}}><div className='p-2 px-3'>{product.specs[spec.code]}</div></div>
                                </div>
                            </Col>
                            : ""
                            )
                        }
                        </Row>
                    </Container>
                </div>


                <div className='bg-dark-gray-gradient overflow-hidden'><Container><h3 className='mt-5 m-0 p-2 px-4 bg-light rounded-top shadow d-inline-block'>Related Products</h3></Container></div>
                <div className='d-flex align-items-start flex-column p-0 py-5 px-md-4 gap-3'>
                    <ProductSlider variant={"light"}/>
                </div>

                <div className='bg-light-gradient overflow-hidden'><Container><h3 className='mt-5 m-0 p-2 px-4 bg-light rounded-top shadow d-inline-block'>Reviews</h3></Container></div>
                <div className='py-5'>
                    {
                        product && reviews ?
                        <Container>
                            <div className="d-flex flex-column gap-3">
                                {
                                    reviews.length >= 5 ?

                                    <div className='d-flex flex-column flex-md-row gap-5 py-5'>
                                        <div className='rounded-circle p-3' style={{width: "250px", aspectRatio:"1", background: `conic-gradient(rgb(var(--bs-warning-rgb)) ${product.rating / 5 * 100}%, transparent 0)`}}>
                                            <div className="bg-light w-100 h-100 rounded-circle shadow-lg d-flex justify-content-center align-items-center pb-3 text-warning-emphasis" style={{fontSize: "min(5em,50vw)"}}>{product.rating}<BsStarFill className='ms-2 mt-4' style={{fontSize: "0.75em"}} /></div>
                                        </div>
                                        <div className='d-flex align-items-start justify-content-between flex-column'>
                                            <div className='d-flex align-items-start gap-1 flex-column'>
                                                <div className="d-flex gap-3 fs-4 align-items-center text-warning-emphasis"><div>5 <BsStarFill className='' /></div> <div className='d-flex align-items-center position-relative' style={{height: "1.5rem", width: "min(15rem,50vw)"}}><div className='bg-white w-100 h-50 position-absolute rounded-pill overflow-hidden shadow'><div className='bg-warning h-100 rounded-pill' style={{width: `${getRatingCount(reviews, 5) / reviews.length * 100}%` }}></div></div></div>({getRatingCount(reviews,5)})</div>
                                                <div className="d-flex gap-3 fs-4 align-items-center text-warning-emphasis"><div>4 <BsStarFill className='' /></div> <div className='d-flex align-items-center position-relative' style={{height: "1.5rem", width: "min(15rem,50vw)"}}><div className='bg-white w-100 h-50 position-absolute rounded-pill overflow-hidden shadow'><div className='bg-warning h-100 rounded-pill' style={{width: `${getRatingCount(reviews, 4) / reviews.length * 100}%` }}></div></div></div>({getRatingCount(reviews,4)})</div>
                                                <div className="d-flex gap-3 fs-4 align-items-center text-warning-emphasis"><div>3 <BsStarFill className='' /></div> <div className='d-flex align-items-center position-relative' style={{height: "1.5rem", width: "min(15rem,50vw)"}}><div className='bg-white w-100 h-50 position-absolute rounded-pill overflow-hidden shadow'><div className='bg-warning h-100 rounded-pill' style={{width: `${getRatingCount(reviews, 3) / reviews.length * 100}%` }}></div></div></div>({getRatingCount(reviews,3)})</div>
                                                <div className="d-flex gap-3 fs-4 align-items-center text-warning-emphasis"><div>2 <BsStarFill className='' /></div> <div className='d-flex align-items-center position-relative' style={{height: "1.5rem", width: "min(15rem,50vw)"}}><div className='bg-white w-100 h-50 position-absolute rounded-pill overflow-hidden shadow'><div className='bg-warning h-100 rounded-pill' style={{width: `${getRatingCount(reviews, 2) / reviews.length * 100}%` }}></div></div></div>({getRatingCount(reviews,2)})</div>
                                                <div className="d-flex gap-3 fs-4 align-items-center text-warning-emphasis"><div>1 <BsStarFill className='' /></div> <div className='d-flex align-items-center position-relative' style={{height: "1.5rem", width: "min(15rem,50vw)"}}><div className='bg-white w-100 h-50 position-absolute rounded-pill overflow-hidden shadow'><div className='bg-warning h-100 rounded-pill' style={{width: `${getRatingCount(reviews, 1) / reviews.length * 100}%` }}></div></div></div>({getRatingCount(reviews,1)})</div>
                                            </div>
                                            <p className='m-0 mt-3 fs-4'>{reviews.length} total reviews</p>
                                        </div>
                                    </div>
                                    : <p className='text-center py-5 fs-4'>Be the first to review this product!</p>
                                }

                                <form onSubmit={handleSubmit(onSumbit)} className='bg-secondary p-3 rounded-3 d-flex flex-column gap-2 shadow'>
                                    <input type="text" className='form-control w-md-50' placeholder='Review Title' {...register("title")}/>
                                    <div className='position-relative py-2 pb-4 d-flex align-items-center' style={{width: "10rem"}}>
                                        <input className='w-100 opacity-0' type="range" min={1} max={5} value={rating} onInput={handleRating} {...register("rating")} style={{cursor: "pointer"}} />
                                        <div className="position-absolute left-0 w-100 d-flex justify-content-between" style={{pointerEvents: "none"}}>
                                        {
                                            [1,2,3,4,5].map((n,index) =>
                                            <BsStarFill key={"product-page-review-input-rating-"+index} className={`fs-4 ${n <= rating ? "text-warning" : "text-light"}`} />
                                            )
                                        }
                                        </div>
                                    </div>
                                    <textarea type="text" className='form-control' placeholder='Review Body' {...register("body")} />
                                    <div className="d-flex flex-column flex-sm-row gap-2">
                                        <input type="text" className='form-control w-100 bg-success-subtle' placeholder='Pros (optional)' {...register("pros")} />
                                        <input type="text" className='form-control w-100 bg-danger-subtle' placeholder='Cons (optional)' {...register("cons")} />
                                    </div>
                                    
                                    <div className="d-flex w-100 mt-2">
                                        <Button variant='dark' type='submit' className='btn-dark'>Add Review</Button>
                                    </div>
                                </form>


                                <div className='position-relative d-flex justify-content-center align-items-center'>
                                    <hr className='border-4 w-100 mt-5 mb-4' />
                                    <h5 className='position-absolute bg-light text-secondary px-3 py-1 mt-4'>Customer Reviews</h5>
                                </div>
                                <div className="d-flex flex-column gap-4 align-items-center">
                                {
                                    reviews.length > 0 ? reviews.map((review,index) => 
                                    <ProductReview key={"product-page-review-"+index} review={review}/>
                                    )
                                    :
                                    <div className='w-100 text-center p-5 rounded-3 shadow'>
                                        <p className='fs-3 m-0 fw-semibold'>No reviews on this product yet...</p>
                                    </div>
                                }
                                </div>
                                <Button variant='dark' className='btn-dark w-100 fs-5'>Load More</Button>
                            </div>
                        </Container>
                        :
                        <Spinner />
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductPage;