import React from 'react';
import { Navigate } from 'react-router-dom';

import NotifyComponent from '../features/notify/notifyComponent';

function Notification() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <NotifyComponent />
}

export default Notification;
