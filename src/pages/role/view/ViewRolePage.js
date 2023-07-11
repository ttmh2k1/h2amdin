import React from 'react'
import { Navigate } from 'react-router-dom'
import ViewRole from '../../../features/role/view/viewRoleComponent'

function Role() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <ViewRole />
}

export default Role
