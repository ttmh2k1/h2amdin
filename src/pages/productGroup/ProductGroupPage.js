import React from 'react';
import { Navigate } from 'react-router-dom';
import ProductGroupComponent from '../../features/productGroup/productGroupComponent';

function ProductGroup() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ProductGroupComponent />;
}

export default ProductGroup;
