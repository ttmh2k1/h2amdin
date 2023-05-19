import React from 'react';
import { Navigate } from 'react-router-dom';
import UserComponent from '../../features/user/userComponent';

function User() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <UserComponent />;
}

export default User;
