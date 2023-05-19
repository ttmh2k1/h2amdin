import React from 'react'

import UpdateCustomer from '../../../features/customer/update/updateCustomerComponent'
import { Navigate } from 'react-router-dom'

function Customer() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <UpdateCustomer />
}

export default Customer
