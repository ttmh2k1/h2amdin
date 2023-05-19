import React from 'react'
import { Navigate } from 'react-router-dom'
import UpdateProduct from '../../../features/product/update/updateProductComponent'

function Product() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <UpdateProduct />
}

export default Product
