import React from 'react';
import { Navigate } from 'react-router-dom';
import WarehouseComponent from '../../features/warehouse/warehouseComponent';

function Warehouse() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <WarehouseComponent />;
}

export default Warehouse;
