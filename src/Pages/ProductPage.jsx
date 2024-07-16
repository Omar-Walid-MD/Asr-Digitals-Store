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
import { addReview, getReviews, getReviewsArray } from '../Store/Reviews/reviewsSlice';
import { addToFav, getFavs, removeFromFav } from '../Store/Favorites/favoritesSlice';
import { setProductRating } from '../Store/Products/productsSlice';
import { getRating, getRatingCount, onImgError, throttle } from '../helpers';
import { child, get, ref } from 'firebase/database';
import { database } from '../Firebase/firebase';


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

    const currentUser = useSelector((store) => store.auth.currentUser);
    const cart = useSelector((store) => store.cart.cart);
    const favorites = useSelector((store) => store.favorites.favorites);
    const productsInfo = useSelector((store) => store.products.productsInfo);
    const offers = useSelector((store) => store.offers.offers);

    const [reviews,setReviews] = useState();

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const products = useSelector((store) => store.products.products);

    const [product,setProduct] = useState();
    const [added,setAdded] = useState(false);
    const [count, setCount] = useState(1);
    const [offerPrice,setOfferPrice] = useState(0);
    const [favorite,setFavorite] = useState(false);
    const [rating,setRating] = useState(5);
    const [relatedProducts,setRelatedProducts] = useState([]);
    const [reviewsCount,setReviewsCount] = useState(5);

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
            dispatch(setProductCount({productId: product.id,count: newCount}));
        }
    }

    function handlePreviewImage(e)
    {
        let pageX = e.pageX || e.touches[0].pageX;
        let pageY = e.pageY || e.touches[0].pageY;
        let el = e.currentTarget; let rect = el.getBoundingClientRect();
        let xOffset = (pageX - rect.left - document.documentElement.scrollLeft) / rect.width * 100;
        let yOffset = (pageY - rect.top  - document.documentElement.scrollTop) / rect.height * 100;
        el.style.backgroundPosition = `${xOffset}% ${yOffset}%`;
    }

    function handleRating(e)
    {
        setRating(e.target.value);
    }

    function onSumbit(data)
    {
        const newReview = {...data,userId:currentUser ? currentUser.id : 0,date: Date.now()}
        dispatch(addReview({productId,newReview}));
        dispatch(setProductRating({productId: product.id,rating: getRating([...reviews.map((review)=>review.rating),rating])}));
        reset();
        setRating(5);
        setReviews([...reviews,newReview])
    }

    function getRelatedProducts()
    {
        if(product)
        {
            let filteredProducts = products.filter((productInList) => productInList.category===product.category && productInList!==product);

            let relatedProducts = filteredProducts.filter((productInList) => {

                if(productInList === product) return false;
    
                let nameWords = productInList.title.split(" ").join("").split(/(?=[A-Z])/);

                let includesWord = false;
                nameWords.forEach(word => {
    
                    if(word.length >= 3 && product.title.toLowerCase().includes(word.toLowerCase()))
                    {
                        includesWord = true;
                        return;
                    }
                });
    
                if(includesWord) return true;
                
                return false;
            });

            relatedProducts = [...relatedProducts,...filteredProducts.filter((productInList) => {
                if(relatedProducts.includes(productInList)) return false;
                if(productInList.category!==product.category) return false;

                let sharedSpecCount = 0;
                Object.keys(product.specs).forEach((specKey) => {
                    if(product.specs[specKey]===productInList.specs[specKey]) sharedSpecCount++;
                });
                return sharedSpecCount > 2;
            })];

            
            while(relatedProducts.length<5)
            {
                filteredProducts = filteredProducts.filter((productInList)=>!relatedProducts.includes(productInList));
                relatedProducts.push(filteredProducts[Math.floor(Math.random()*filteredProducts.length)]);
            }

            return relatedProducts;
        }
    }

    useEffect(()=>{
        if(products.length)
        {
            setProduct(products.find((product) => product.id === productId));
        };
    },[productId, products]);

    useEffect(()=>{
        if(product)
        {
            setCount(getCount());
            setAdded(cart.map((i) => i.productId).includes(product.id));
            if(!relatedProducts.length) setRelatedProducts(getRelatedProducts());
        }
    },[product,cart]);

    useEffect(()=>{
       if(product) setFavorite(favorites.includes(product.id));
    },[favorites, product]);

    useEffect(()=>{
        if(product && offers)
        {
            let availableOffer = offers.find((offer) => offer.productId === productId && offer.status === "running");
            if(availableOffer) setOfferPrice(availableOffer.newPrice);
            else setOfferPrice(0);
        }
    },[offers,product]);

    useEffect(()=>{
        if(!reviews)
        {
            (async()=>{
                await get(child(ref(database), `reviews/${productId}`)).then((snapshot) => {
                    setReviews(snapshot.exists() ? getReviewsArray(snapshot.val()) : []);
               });
            })()
        }
    },[reviews]);

    return (
        <div className='bg-light'>
            <div className='page-section'>
            {
                product ?

                <Container className='py-5'>
                    <Row className='m-0 gy-4'>
                        <Col className='col-12 col-md-4 h-100 p-0'>
                            <div className="d-flex w-100 position-relative">
                                <div className='bg-white w-100 overflow-hidden rounded-3 shadow'>
                                    <img className='w-100' src={product.image} onError={onImgError} />
                                    <div className='product-img-preview rounded-3 w-100 h-100 position-absolute top-0 left-0'
                                    onMouseEnter={(e)=>{e.target.style.opacity = "1"}}
                                    onMouseLeave={(e)=>{e.target.style.opacity = "0"}}
                                    onMouseMove={handlePreviewImage}
                                    onTouchStart={(e)=>{e.target.style.opacity = "1"}}
                                    onTouchEnd={(e)=>{e.target.style.opacity = "0"}}
                                    onTouchMove={handlePreviewImage}
                                    style={{background: `url("${product.image}")`}}
                                    ></div>
                                </div>
                            </div>
                        </Col>
                        <Col className='col-12 col-md-8 h-100 p-0 px-md-2'>
                            <div className="d-flex flex-column align-items-center align-items-md-start justify-content-between h-100 p-0 ps-md-4">
                                <div className='d-flex flex-column align-items-center align-items-md-start gap-2'>
                                    <h1>{product.title}</h1>
                                    <p className='m-0'>{product.desc}</p>
                                    {
                                        reviews?.length >= 3 ?
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <p className='m-0 fs-5 text-warning-emphasis text-center text-sm-start fw-semibold'>{product.rating} ({reviews.length} reviews)</p>
                                            <div className="d-flex gap-2">
                                                {
                                                    [1,2,3,4,5].map((n)=>
                                                    <div className='position-relative' key={`star-${n}`}>
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
                                    {
                                        offerPrice ?
                                        <div className='mt-2'>
                                            <h6 className='m-0 text-uppercase text-danger text-center text-sm-start fw-bold mb-2' style={{letterSpacing:"0.2em"}}>Limited Offer</h6>
                                            <div className='d-flex align-items-center gap-3'>
                                                {offerPrice ? <h5 className='price-tag mt-2 price-old m-0'>{product.price}</h5> : ""}
                                                <h1 className='text-danger price-tag fw-semibold discount-text' style={{fontSize:"3rem"}}>{offerPrice}</h1>
                                            </div>
                                        </div>
                                        :
                                        <h1 className='text-danger price-tag fw-semibold'>{product.price}</h1>

                                    }
                                </div>
                                <div className="d-flex w-xs-100 w-md-auto flex-column flex-lg-row align-items-stretch align-items-md-start  align-items-lg-stretch gap-4 mt-4">
                                    {
                                        added ? 
                                        <div className='d-flex gap-3 w-xs-100 w-md-auto flex-column flex-sm-row'>
                                            <Button variant='danger' className='d-flex w-xs-100 w-sm-50 align-items-center justify-content-center justify-content-md-start p-3 btn-danger fs-3 gap-3 rounded-3 shadow main-button border-0' onClick={()=>{throttle((()=>{dispatch(removeFromCart(productId));setAdded(false);})(),1000);}}><BsFillCartDashFill className='fs-2' /> Remove</Button>
                                            <div className="d-flex w-xs-100 w-sm-50 gap-3">
                                                <input type="number" className="rounded-3 w-xs-100 w-sm-100 fs-1 text-center border-3 border-primary bg-transparent text-primary" min={0} max={10} value={count} onChange={(e)=>{throttle(handleCount(e.target.value),1500)}}  style={{width: "5rem"}} />
                                                <div className='d-flex flex-column gap-3 gap-md-0 justify-content-between'>
                                                    <Button className='d-flex align-items-center p-3 py-0 btn-primary fs-3 gap-3 rounded-3 shadow border-3' onClick={throttle(()=>{handleCount(count+1)},1000)}><BsFillCaretUpFill /></Button>
                                                    <Button className='d-flex align-items-center p-3 py-0 btn-primary fs-3 gap-3 rounded-3 shadow border-3' onClick={throttle(()=>{handleCount(count-1)},1000)}><BsFillCaretDownFill /></Button>
                                                </div> 
                                            </div>
                                        </div>
                                        :
                                        <Button className='d-flex align-items-center w-xs-100 align-items-center justify-content-center justify-content-md-start p-3 btn-primary text-white fs-3 gap-3 rounded-3 shadow border-0 main-button' onClick={()=>{throttle((()=>{dispatch(addToCart(productId));setAdded(true);})(),1000);}}><BsFillCartPlusFill className='fs-2' /> Add to Cart</Button>
                                    }
                                    {
                                        favorite ?
                                        <Button className='d-flex w-xs-100 w-md-auto align-items-center justify-content-center justify-content-md-start p-3 btn-warning bg-warning border-0 border-warning text-white fs-3 gap-3 rounded-3 main-button' onClick={()=>{throttle((()=>{dispatch(removeFromFav(productId));setFavorite(false);})(),1000);}}><BsStarFill className='fs-2' /> Favorited</Button>
                                        :
                                        <Button className='d-flex w-xs-100 w-md-auto align-items-center justify-content-center justify-content-md-start p-3 bg-transparent text-warning border-warning border-3 fs-3 gap-3 rounded-3' onClick={()=>{throttle((()=>{dispatch(addToFav(productId));setFavorite(true);})(),1000);}}><BsStarFill className='fs-2' />Favorite</Button>
                                    }
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
                :
                <Container className='py-5'>
                    <Row className='m-0 gy-4'>
                        <Col className='col-12 col-md-4 h-100 p-0'>
                            <div className='d-flex w-100 justify-content-center'>
                                <div className='loading-bg shadow rounded-3' style={{width:"min(27rem,100%)",aspectRatio: "1"}}></div>
                            </div>
                        </Col>
                        <Col className='col-12 col-md-8 h-100 p-0 px-md-2'>
                            <div className="d-flex flex-column align-items-center align-items-md-start gap-3 p-0 ps-md-4">
                                <div className='loading-bg shadow rounded-3' style={{height: "4rem", width:"min(20rem,100%)"}}></div>
                                <div className='loading-bg shadow rounded-3' style={{height: "4rem", width:"min(40rem,100%)"}}></div>
                                <div className='loading-bg shadow rounded-3' style={{height: "4rem", width:"min(10rem,100%)"}}></div>
                                <div className="d-flex flex-column flex-md-row align-items-start w-100 gap-3 mt-5">
                                    <div className='loading-bg shadow w-xs-100 w-md-50 w-lg-25 rounded-3' style={{height: "5rem", width:"min(15rem,100%)"}}></div>
                                    <div className='loading-bg shadow w-xs-100 w-md-50 w-lg-25 rounded-3' style={{height: "5rem", width:"min(12rem,100%)"}}></div>

                                </div>


                            </div>
                        </Col>
                    </Row>
                </Container>
            }
            </div>
            <div className='bg-secondary position-relative page-section'>
                <div className='position-absolute bottom-100 left-0 w-100'><Container><h3 className='mt-5 m-0 p-2 px-4 bg-secondary text-white rounded-top shadow d-inline-block'>Specs</h3></Container></div>
                <Container className='py-5'>
                    <Row className='text-white fs-5 g-3 m-0'>
                    {
                        product ?
                        
                        productsInfo.categories && productsInfo.categories.find((category) => category.name === product.category).specs.map((spec, index) =>
                        
                        product.specs[spec.code] ?
                        <Col key={"product-spec-"+index} className='col-12 p-0'>
                            <div className='d-flex flex-column align-items-start product-spec'>
                                <div className='p-0' style={{minWidth: "8rem"}}><div className='bg-info fw-semibold p-2 px-3 rounded-top shadow-sm text-capitalize'>{spec.name}</div></div>
                                <div className='w-100 border border-info border-3 shadow-sm' style={{borderRadius: "0 0.5rem 0.5rem 0.5rem"}}><div className='p-2 px-3'>{product.specs[spec.code]}</div></div>
                            </div>
                        </Col>
                        : ""
                        )

                        :

                        <div className='d-flex flex-column w-100 gap-5'>
                            <div className='loading-bg shadow rounded-3 w-100' style={{height: "4rem"}}></div>
                            <div className='loading-bg shadow rounded-3 w-100' style={{height: "4rem"}}></div>
                            <div className='loading-bg shadow rounded-3 w-100' style={{height: "4rem"}}></div>
                        </div>
                    }
                    </Row>
                </Container>
            </div>


            <div className='d-flex position-relative align-items-start flex-column p-0 py-5 px-md-4 gap-3'>
                <div className='position-absolute bottom-100 left-0 w-100'><Container><h3 className='mt-5 m-0 p-2 px-4 bg-light rounded-top d-inline-block'>Related Products</h3></Container></div>
            {
                (product && relatedProducts) ?
                <ProductSlider variant={"light"} products={relatedProducts}/>
                :
                <Container>
                    <Row className="gy-3">
                        <Col className='col-6 col-sm-3 col-xl-2 px-2' style={{height: "18rem"}}><div className='loading-bg shadow rounded-3 w-100 h-100'></div></Col>
                        <Col className='col-6 col-sm-3 col-xl-2 px-2' style={{height: "18rem"}}><div className='loading-bg shadow rounded-3 w-100 h-100'></div></Col>
                        <Col className='col-6 col-sm-3 col-xl-2 px-2' style={{height: "18rem"}}><div className='loading-bg shadow rounded-3 w-100 h-100'></div></Col>
                        <Col className='col-6 col-sm-3 col-xl-2 px-2' style={{height: "18rem"}}><div className='loading-bg shadow rounded-3 w-100 h-100'></div></Col>
                        <Col className='col-6 col-sm-3 col-xl-2 px-2' style={{height: "18rem"}}><div className='loading-bg shadow rounded-3 w-100 h-100'></div></Col>
                        <Col className='col-6 col-sm-3 col-xl-2 px-2' style={{height: "18rem"}}><div className='loading-bg shadow rounded-3 w-100 h-100'></div></Col>
                    </Row>
                </Container>
            }
            </div>

            <div>
                <div className='bg-light-gradient overflow-hidden'><Container><h3 className='mt-5 m-0 p-2 px-4 bg-light rounded-top shadow d-inline-block'>Reviews</h3></Container></div>
                <div className='py-5'>
                    {
                        product && reviews ?
                        <Container>
                            <div className="d-flex flex-column gap-3">
                                {
                                    reviews.length >= 3 ?

                                    <div className='d-flex flex-column flex-md-row align-items-center align-items-sm-start  gap-5 py-5'>
                                        <div className='rounded-circle p-3' style={{width: "min(250px,80vw)", aspectRatio:"1", background: `conic-gradient(rgb(var(--bs-warning-rgb)) ${product.rating / 5 * 100}%, transparent 0)`}}>
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
                                    : <p className='text-center py-5 fs-4'>Be from the first customers to review this product!</p>
                                }

                                <form onSubmit={handleSubmit(onSumbit)} className='bg-secondary p-3 rounded-3 d-flex flex-column gap-2 shadow'>
                                    <input type="text" className='form-control w-md-50' placeholder='Review Title' {...register("title")}/>
                                    <div className='position-relative py-2 pb-4 d-flex align-items-center' style={{width: "10rem"}}>
                                        <input className='w-100 opacity-0' type="range" min={1} max={5} value={rating} onInput={handleRating} {...register("rating")} style={{cursor: "pointer"}} />
                                        <div className="position-absolute left-0 w-100 d-flex justify-content-between" style={{pointerEvents: "none"}}>
                                        {
                                            [1,2,3,4,5].map((n) =>
                                            <BsStarFill key={`product-page-review-input-rating-${n}`} className={`fs-4 ${n <= rating ? "text-warning" : "text-light"}`} />
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
                                        <Button variant='dark' type='submit' className='btn main-button border-3 border-white'>Add Review</Button>
                                    </div>
                                </form>


                                <div className='position-relative d-flex justify-content-center align-items-center'>
                                    <hr className='border-4 w-100 mt-5 mb-4' />
                                    <h5 className='position-absolute bg-light text-secondary px-3 py-1 mt-4'>Customer Reviews</h5>
                                </div>
                                <div className="d-flex flex-column gap-4 align-items-center">
                                {
                                    reviews.length > 0 ? reviews.slice(0,reviewsCount).map((review) => 
                                    <ProductReview key={`product-page-review-${review.id}`} review={review}/>
                                    )
                                    :
                                    <div className='w-100 text-center p-5 rounded-3 shadow'>
                                        <p className='fs-3 m-0 fw-semibold'>No reviews on this product yet...</p>
                                    </div>
                                }
                                </div>
                                {reviews && reviewsCount < reviews.length ? <Button variant='dark' className='btn-dark main-button border-0 w-100 fs-5' onClick={()=>setReviewsCount(c => c+5)}>Load More</Button> : ""}
                                
                            </div>
                        </Container>
                        :
                        <Container className='d-flex flex-column w-100 gap-5 py-5'>
                            <div className='loading-bg shadow rounded-3 w-100' style={{height: "15rem"}}></div>
                            <div className='loading-bg shadow rounded-3 w-100' style={{height: "4rem"}}></div>
                            <div className='loading-bg shadow rounded-3 w-100' style={{height: "12rem"}}></div>
                        </Container>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductPage;