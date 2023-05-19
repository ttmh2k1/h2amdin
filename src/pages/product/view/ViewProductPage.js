import React from 'react'
import { Navigate } from 'react-router-dom'
import ViewProduct from '../../../features/product/view/viewProductComponent'

function Product() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ViewProduct />
}

export default Product
