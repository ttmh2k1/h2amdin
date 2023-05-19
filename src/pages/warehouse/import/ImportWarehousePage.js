import React from 'react'
import { Navigate } from 'react-router-dom';
import ImportWarehouse from '../../../features/warehouse/import/importWarehouseComponent';

function Warehouse() {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />
    }
    return <ImportWarehouse />
}

export default Warehouse
