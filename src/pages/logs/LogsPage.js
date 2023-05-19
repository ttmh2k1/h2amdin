import React from 'react';
import { Navigate } from 'react-router-dom';
import LogsComponent from '../../features/logs/logsComponent';

function Logs() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <LogsComponent />;
}

export default Logs;
