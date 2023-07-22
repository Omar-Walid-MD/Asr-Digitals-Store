import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import Shop from "../Pages/Shop";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";

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
                path: "product",
                element: <ProductPage />
            },
            {
                path: "cart",
                element: <CartPage />
            }
        ]
    }
]);

export default router;