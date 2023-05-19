import React from 'react';
import { Navigate } from 'react-router-dom';
import ProductComponent from '../../features/product/productComponent';

function Product() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ProductComponent />;
}

export default Product;
