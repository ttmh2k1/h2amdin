import React from 'react'

import ViewCustomer from '../../../features/customer/view/viewCustomerComponent'
import { Navigate } from 'react-router-dom'

function Customer() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <ViewCustomer />
}

export default Customer
