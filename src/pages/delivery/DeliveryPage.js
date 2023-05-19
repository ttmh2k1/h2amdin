import React from 'react';
import { Navigate } from 'react-router-dom';
import DeliveryComponent from '../../features/delivery/deliveryComponent';

function Delivery() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <DeliveryComponent />;
}

export default Delivery;
