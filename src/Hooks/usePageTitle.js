import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { getCapitalized } from "../helpers";
import { useSelector } from "react-redux";

function usePageTitle()
{
    const location = useLocation();
    const params = useParams();

    const products = useSelector(store => store.products.products);

    function getTitle()
    {
        const path = getCapitalized(location.pathname.split("/")[1] || "");
        if(path==="Product")
        {
            const product = products.find((p) => p.id === params.productId);
            if(product)
            {
                return `${product.title} - Asr Digitals`;
            }
            else
            {
                return "Asr Digitals - Product";
            }
        }
        else
        {
            return `Asr Digitals ${path ? "-" : ""} ${path}`;
        }
    }
    
    useEffect(()=>{
        document.title = getTitle();
    },[location]);

}

export default usePageTitle;