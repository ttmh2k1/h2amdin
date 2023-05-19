import React from 'react';
import { Navigate } from 'react-router-dom';
import SystemReportComponent from '../../features/systemReport/systemReportComponent';

function SystemReport() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <SystemReportComponent />;
}

export default SystemReport;
