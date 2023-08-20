import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer';
import CartSideBar from './Layout/CartSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, getCurrentUser, getUsers } from './Store/Auth/auth';
import { useEffect, useState } from 'react';
import { getProducts, getProductsInfo, setProductRating } from './Store/Products/productsSlice';
import { getCart } from './Store/Cart/cartSlice';
import { getFavs } from './Store/Favorites/favoritesSlice';
import { getReviews } from './Store/Reviews/reviewsSlice';
import { getPurchases, setPurchaseStatus } from './Store/Purchases/purchasesSlice';
import { getOffers, setOfferStatus } from './Store/Offers/offers';
import ScrollToTop from './Layout/ScrollToTop';
import { generateRandomOffers, generateRandomPurchases, generateRandomReviews, getRating, makeIdWithChars, refreshOffers, refreshPurchases } from './helpers';
import { getPreviewStats } from './Store/PreviewStats/previewStats';

function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.auth.currentUser);
  const purchases = useSelector((store) => store.purchases.purchases);
  const offers = useSelector((store) => store.offers.offers);

  const users = useSelector((store) => store.auth.users);
  const products = useSelector((store) => store.products.products);
  const reviews = useSelector((store) => store.reviews.reviews);

  const [reviewsCheck,setReviewsCheck] = useState(false);

  const [refreshInterval,setRefreshInterval] = useState();

  useEffect(()=>{
    console.log("fetching all data");
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getProductsInfo());
    dispatch(getCurrentUser());
    dispatch(getReviews());
    dispatch(getPurchases());
    dispatch(getOffers());
    dispatch(getPreviewStats());
  },[]);
  
  useEffect(()=>{
    dispatch(getCart());
    dispatch(getFavs());
  },[currentUser]);

  useEffect(()=>{
    const interval = setInterval(() => {
      refreshPurchases(purchases,(purchase,status)=>{dispatch(setPurchaseStatus({purchase,status}))})
      refreshOffers(offers,(offer,status)=>{dispatch(setOfferStatus({offer,status}))})

    }, 1000 * 60 * 5);
    return ()=> clearInterval(interval);  
  },[purchases,offers]);

  // useEffect(()=>{
  //   if(users.length && products.length && !reviewsCheck)
  //   {
  //     function checkProduct(index)
  //     {
  //       if(index < products.length)
  //       {
  //         let product = products[index];
  //         setTimeout(() => {
  //           let updatedRating = getRating(reviews.filter((review)=>review.productId===product.id).map((review)=>+review.rating));
  //           console.log(updatedRating); 
  //           if(updatedRating !== product.rating) dispatch(setProductRating({productId: product.id,rating: updatedRating}));

  //           checkProduct(index+1);
  //         }, 1000);
  //       }
  //     }
      
  //     checkProduct(0);

        
  //     setReviewsCheck(true);
  //   }
  // },[reviews,products])

  // useEffect(()=>{
  //   if(users.length)
  //   {
  //     function givePw(index)
  //     {
  //       if(index < users.length)
  //       {
  //         let user = users[index];
  //         setTimeout(() => {
  //               let updatedUser = {...user,password:makeIdWithChars(10)}
  //           console.log(updatedUser); 
  //           dispatch(editUser(updatedUser));

  //           givePw(index+1);
  //         }, 2000);
  //       }
  //     }
      
  //     givePw(0);

        
  //   }
  // },[users])


  return (
    <div className="App">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default App;
