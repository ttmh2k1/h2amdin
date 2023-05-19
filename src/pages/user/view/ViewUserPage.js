import React from 'react';
import { Navigate } from 'react-router-dom';
import ViewUserComponent from '../../../features/user/view/viewUserComponent';

function User() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ViewUserComponent />;
}

export default User;
