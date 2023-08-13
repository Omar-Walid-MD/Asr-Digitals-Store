import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import Shop from "../Pages/Shop";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import FavoritesPage from "../Pages/FavoritesPage";
import ProductsManagementPage from "../Pages/ProductsManagementPage";
import ShopExplore from "../Pages/ShopExplore";
import Offers from "../Pages/Offers";
import Checkout from "../Pages/Checkout";
import Main from "../Layout/Main";
import Auth from "../Layout/Auth";
import PurchasesPage from "../Pages/PurchasesPage";
import ProfilePage from "../Pages/ProfilePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
                path: "/products",
                element: <ProductsManagementPage />
            }
        ]
        
    }
    
    
]);

export default router;