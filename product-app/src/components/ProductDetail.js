import React from "react";
import { useParams } from 'react-router-dom';

function ProductDetail()
{
    const { productId } = useParams();
    return(

        <div>
            <h1>Product Detail</h1>
            <p>Product ID: {productId}</p>
        </div>
    );
}

export default ProductDetail; 