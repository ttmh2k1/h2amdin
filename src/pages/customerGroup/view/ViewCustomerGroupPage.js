import React from 'react';
import { Navigate } from 'react-router-dom';
import ViewCustomerGroup from '../../../features/customerGroup/view/viewCustomerGroupComponent';

function CustomerGroup() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ViewCustomerGroup />;
}

export default CustomerGroup;
