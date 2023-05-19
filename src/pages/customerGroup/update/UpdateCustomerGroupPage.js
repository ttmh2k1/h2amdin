import React from 'react';
import UpdateCustomerGroup from '../../../features/customerGroup/update/updateCustomerGroupComponent';
import { Navigate } from 'react-router-dom';

function CustomerGroup() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <UpdateCustomerGroup />;
}

export default CustomerGroup;
