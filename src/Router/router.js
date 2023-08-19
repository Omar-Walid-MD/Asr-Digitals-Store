import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Main from "../Layout/Main";
import Auth from "../Layout/Auth";
import Admin from "../Layout/Admin";
import ErrorPage from "../Pages/ErrorPage";

import Home from "../Pages/Home";
import Offers from "../Pages/Offers";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import Checkout from "../Pages/Checkout";

import About from "../Pages/About";

import ShopIndex from "../Pages/Shop/ShopIndex";
import Shop from "../Pages/Shop/Shop";
import ShopExplore from "../Pages/Shop/ShopExplore";

import FavoritesPage from "../Pages/Profile/FavoritesPage";
import PurchasesPage from "../Pages/Profile/PurchasesPage";
import ProfilePage from "../Pages/Profile/ProfilePage";

import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

import Dashboard from "../Pages/Admin/Dashboard";
import ManageClients from "../Pages/Admin/ManageClients";
import ManagePurchases from "../Pages/Admin/ManagePurchases";
import ManageOffers from "../Pages/Admin/ManageOffers";
import ManageProducts from "../Pages/Admin/ManageProducts";
import Contact from "../Pages/Contact";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Main />,
                children: [
                    {
                        path: "",
                        element: <Home />
                    },
                    {
                        path: "shop",
                        element: <ShopIndex />
                    },
                    {
                        path: "offers",
                        element: <Offers />
                    },
                    {
                        path: "about",
                        element: <About />
                    },
                    {
                        path: "contact",
                        element: <Contact />
                    },
                    {
                        path: "product/:productId",
                        element: <ProductPage />
                    },
                    {
                        path: "cart",
                        element: <CartPage />
                    },
                    {
                        path: "favorites",
                        element: <FavoritesPage />
                    },
                    {
                        path: "purchases",
                        element: <PurchasesPage />
                    },
                    {
                        path: "profile",
                        element: <ProfilePage />
                    }
                ]
            },
            {
                path: "",
                element: <Auth />,
                children: [
                    {
                        path: "/checkout",
                        element: <Checkout />
                    },
                    {
                        path: "/login",
                        element: <Login />
                    },
                    {
                        path: "/register",
                        element: <Register />
                    }
                ]
            },
            {
                path: "/admin",
                element: <Admin />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
                    },
                    {
                        path: "products",
                        element: <ManageProducts />
                    },
                    {
                        path: "clients",
                        element: <ManageClients />
                    },
                    {
                        path: "purchases",
                        element: <ManagePurchases />
                    },
                    {
                        path: "offers",
                        element: <ManageOffers />
                    }
                ]
            }
        ]
        
    }
    
    
]);

export default router;