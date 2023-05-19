import React from 'react';
import { Navigate } from 'react-router-dom';
import CustomerGroupComponent from '../../features/customerGroup/customerGroupComponent';

function CustomerGroup() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <CustomerGroupComponent />;
}

export default CustomerGroup;
