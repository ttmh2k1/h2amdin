import React from 'react'
import { Navigate } from 'react-router-dom'
import ViewDelivery from '../../../features/delivery/view/viewDeliveryComponent'

function Delivery() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ViewDelivery />
}

export default Delivery
