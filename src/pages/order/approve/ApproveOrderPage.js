import React from 'react'
import { Navigate } from 'react-router-dom'
import ApproveOrder from '../../../features/order/approve/approveOrderComponent'

function Order() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ApproveOrder />
}

export default Order
