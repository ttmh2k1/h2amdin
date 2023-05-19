import React from 'react'
import { Navigate } from 'react-router-dom'
import ViewProductGroup from '../../../features/productGroup/view/viewProductGroupComponent'

function ProductGroup() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ViewProductGroup />
}

export default ProductGroup
