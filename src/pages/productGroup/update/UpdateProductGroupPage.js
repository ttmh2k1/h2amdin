import React from 'react'
import { Navigate } from 'react-router-dom'
import UpdateProductGroup from '../../../features/productGroup/update/updateProductGroupComponent'

function ProductGroup() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <UpdateProductGroup />
}

export default ProductGroup
