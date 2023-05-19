import React from 'react';
import { Navigate } from 'react-router-dom';
import RoleComponent from '../../features/role/roleComponent';

function Role() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <RoleComponent />;
}

export default Role;
