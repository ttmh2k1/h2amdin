import React from 'react'
import { Navigate } from 'react-router-dom'
import { CreateProduct } from '../../../features/product/create/createProductComponent'

function Product() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <CreateProduct />
}

export default Product
