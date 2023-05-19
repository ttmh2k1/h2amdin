import React from 'react'
import { Navigate } from 'react-router-dom'
import ViewOrder from '../../../features/order/view/viewOrderComponent'

function Order() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ViewOrder />
}

export default Order
