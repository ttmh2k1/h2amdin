import React from 'react'

import BusinessReportComponent from '../../features/businessReport/businessReportComponent'
import { Navigate } from 'react-router-dom'

function BusinessReport() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <BusinessReportComponent />
}

export default BusinessReport
