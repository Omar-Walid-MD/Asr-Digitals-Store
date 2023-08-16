import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import Shop from "../Pages/Shop";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import FavoritesPage from "../Pages/FavoritesPage";
import ShopExplore from "../Pages/ShopExplore";
import Offers from "../Pages/Offers";
import Checkout from "../Pages/Checkout";
import Main from "../Layout/Main";
import Auth from "../Layout/Auth";
import PurchasesPage from "../Pages/PurchasesPage";
import ProfilePage from "../Pages/ProfilePage";
import Admin from "../Layout/Admin";
import Dashboard from "../Pages/Admin/Dashboard";
import ManageClients from "../Pages/Admin/ManageClients";
import ManagePurchases from "../Pages/Admin/ManagePurchases";
import ManageReviews from "../Pages/Admin/ManageReviews";
import ManageOffers from "../Pages/Admin/ManageOffers";
import ManageProducts from "../Pages/Admin/ManageProducts";
import ErrorPage from "../Layout/ErrorPage";

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
                        path: "shop/q",
                        element: <Shop />
                    },
                    {
                        path: "shop",
                        element: <ShopExplore />
                    },
                    {
                        path: "offers",
                        element: <Offers />
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
                        path: "reviews",
                        element: <ManageReviews />
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