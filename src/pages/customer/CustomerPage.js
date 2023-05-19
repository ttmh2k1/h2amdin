import React from 'react'

import CustomerComponent from '../../features/customer/customerComponent'
import { Navigate } from 'react-router-dom'

function Customer() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <CustomerComponent />
}

export default Customer
