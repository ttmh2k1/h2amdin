import React from 'react';
import { Navigate } from 'react-router-dom';
import OrderComponent from '../../features/order/orderComponent';

function Order() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <OrderComponent />;
}

export default Order;
