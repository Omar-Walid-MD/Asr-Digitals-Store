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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "shop",
                element: <Shop />
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
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/products",
        element: <ProductsManagementPage />
    }
]);

export default router;